const vscode = require('vscode');
const fs = require('fs-extra');
const path = require('path');
const semver = require('semver');
const { spawn } = require('child_process');

module.exports = function getPackageInfos(source) {
  const { workspace } = vscode;
  const configuration = workspace.getConfiguration();

  return new Promise((resolve) => {
    const packageInfos = {};

    const callback = () => {
      resolve(packageInfos);
    };

    try {
      const packageJSON = JSON.parse(source);
      const { dependencies = {}, devDependencies = {} } = packageJSON;

      packageInfos.__SOURCE__ = source;

      const packages = Array.prototype.concat.apply(
        // dependencies
        Object.keys(dependencies).map(packageName => ({
          from: 'dependencies', packageName, versionRange: dependencies[packageName]
        })),
        // devDependencies
        Object.keys(devDependencies).map(packageName => ({
          from: 'devDependencies', packageName, versionRange: devDependencies[packageName]
        }))
      );

      // Process package infos
      packages.forEach((packageInfo) => {
        const { from, packageName, versionRange } = packageInfo;

        // Get versions info
        const childProcess = spawn('npm', [
          'show', packageName,
          'dist-tags', 'versions',
          '--json', `--registry=${configuration.get('packageVersion.registry')}`
        ], {
          encoding: 'utf-8'
        });
        childProcess.stdout.on('data', setPackageInfo);
        childProcess.stderr.on('data', setPackageInfo);

        function setPackageInfo(data) {
          packageInfos[packageName] = { name: packageName, from, versionRange };

          // Get local package version
          const packageFilePath = path.join(workspace.rootPath, 'node_modules', packageName, 'package.json');

          if (fs.existsSync(packageFilePath)) {
            packageInfos[packageName].local = fs.readJsonSync(packageFilePath, 'utf-8').version;
          }

          try {
            const result = JSON.parse(data);
            const versions = result.versions, distTags = result['dist-tags'];

            // The highest version in the versions that satisfies the range.
            packageInfos[packageName].satisfying = semver.maxSatisfying(
              versions,
              packageInfos[packageName].versionRange
            );
            // latest version
            packageInfos[packageName].latest = distTags.latest || '';
          } catch (e) {
            // ignore
          }

          // Finish
          if (Object.keys(packageInfos).length === packages.length) {
            resolve(packageInfos);
          }
        };
      });
    } catch (e) {
      // ignore
      callback();
    }
  });
};
