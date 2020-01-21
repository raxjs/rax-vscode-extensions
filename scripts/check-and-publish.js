/**
 * Scripts to check unpublished version and run publish
 */
const { existsSync, readdirSync, readFileSync } = require('fs');
const { join } = require('path');
const { spawnSync } = require('child_process');
const axios = require('axios');

const RETRY_LIMIT = 3;
const TIMEOUT = 5000;

function checkVersion(folder, callback) {
  const ret = []; // { name: 'foo', workDir, latest: 'x.x.x', local: 'x.x.x', shouldBuild }
  if (existsSync(folder)) {
    const extensions = readdirSync(folder)
      // ignore dot files.
      .filter((filename) => filename[0] !== '.');
    console.log('[PUBLISH] Start check with following extensions:');
    console.log(extensions.map(p => `- ${p}`).join('\n'));

    let finishCount = 0;
    // eslint-disable-next-line
    function finish() {
      finishCount++;
      if (finishCount === extensions.length) {
        callback(ret);
      }
    }

    for (let i = 0; i < extensions.length; i++) {
      const packageFolderName = extensions[i];
      const packageInfoPath = join(folder, packageFolderName, 'package.json');
      if (existsSync(packageInfoPath)) {
        const packageInfo = JSON.parse(readFileSync(packageInfoPath));
        checkVersionExists(packageInfo.name, packageInfo.version)
          .then((exists) => {
            if (!exists) {
              ret.push({
                name: packageInfo.name,
                workDir: join(folder, packageFolderName),
                local: packageInfo.version,
                // If exists scripts.build, then run it.
                shouldBuild: !!(packageInfo.scripts && packageInfo.scripts.build),
              });
            }
            finish();
          });
      } else {
        finish();
      }
    }
  } else {
    callback(ret);
  }
}

function checkVersionExists(extension, version, retry = 0) {
  return axios(
    // Use VS Code Extension assets icon check version.
    `http://rax.gallery.vsassets.io/_apis/public/gallery/publisher/Rax/extension/${encodeURIComponent(extension)}/${encodeURIComponent(version)}/assetbyname/Microsoft.VisualStudio.Services.Icons.Default`,
    { timeout: TIMEOUT },
  )
    .then(res => res.status === 200)
    .catch(err => {
      if (err.response && err.response.status === 404 || retry >= RETRY_LIMIT) {
        return false;
      } else {
        console.log(`Retry ${extension}@${version} Time: ${retry + 1}`);
        return checkVersionExists(extension, version, retry + 1);
      }
    });
}

function publish(extension, workDir, version, shouldBuild) {
  // npm install
  spawnSync('npm', [
    'install',
  ], {
    stdio: 'inherit',
    cwd: workDir,
  });

  if (shouldBuild) {
    // npm run build
    spawnSync('npm', [
      'run',
      'build',
    ], {
      stdio: 'inherit',
      cwd: workDir,
    });
  }

  // vsce publish
  console.log('[VSCE] PUBLISH: ', `${extension}@${version}`);
  spawnSync('vsce', [
    'publish',
    '-p',
    process.env.VSCE_TOKEN
  ], {
    stdio: 'inherit',
    cwd: workDir,
  });
}

function checkVersionAndPublish() {
  checkVersion(join(__dirname, '../extensions'), ret => {
    console.log('');
    if (ret.length === 0) {
      console.log('[PUBLISH] No diff with all extensions.');
    } else {
      console.log('[PUBLISH] Will publish following extensions:');
    }

    for (let i = 0; i < ret.length; i++) {
      const { name, local } = ret[i];
      console.log(`--- ${name}@${local} ---`);
    }

    if (ret.length > 0) {
      for (let i = 0; i < ret.length; i++) {
        const { name, workDir, local, shouldBuild } = ret[i];
        publish(name, workDir, local, shouldBuild);
      }
    }
  });
}

checkVersionAndPublish();