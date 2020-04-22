const vscode = require('vscode');
const fs = require('fs-extra');
const path = require('path');
const semver = require('semver');
const spawnSync = require('child_process').spawnSync;

module.exports = function getPackageInfos() {
  const packageInfos = {};
  const { workspace } = vscode;

  try {
    const packageJSON = fs.readJsonSync(path.join(workspace.rootPath, 'package.json'), 'utf-8');
    const { dependencies = {}, devDependencies = {} } = packageJSON;

    Array.prototype.concat.apply(
      // dependencies
      Object.keys(dependencies).map(packageName => ({
        from: 'dependencies', packageName, versionRange: dependencies[packageName]
      })),
      // devDependencies
      Object.keys(devDependencies).map(packageName => ({
        from: 'devDependencies', packageName, versionRange: devDependencies[packageName]
      }))
    ).forEach((info) => {
      const { from, packageName, versionRange } = info;
      packageInfos[packageName] = { name: packageName, from, versionRange };

      // Get local package version
      const packageFilePath = path.join(workspace.rootPath, 'node_modules', packageName, 'package.json');
      if (fs.existsSync(packageFilePath)) {
        packageInfos[packageName].local = fs.readJsonSync(packageFilePath, 'utf-8').version;
      }

      // Get versions info
      const childProcess = spawnSync('npm', [
        'show', packageName,
        'dist-tags', 'versions',
        '--json', '--registry=https://registry.npm.taobao.org/'
      ], {
        encoding: 'utf-8'
      });
      if (!childProcess.stderr) {
        const result = JSON.parse(childProcess.stdout);
        const versions = result.versions, distTags = result['dist-tags'];

        // The highest version in the versions that satisfies the range.
        packageInfos[packageName].satisfying = semver.maxSatisfying(
          versions,
          packageInfos[packageName].versionRange
        );
        // latest version
        packageInfos[packageName].latest = distTags.latest || '';
      }
    });
  } catch (e) {
    console.log(e);
  }

  return packageInfos;
};
