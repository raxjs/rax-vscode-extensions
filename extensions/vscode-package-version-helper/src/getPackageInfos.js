const vscode = require('vscode');
const fs = require('fs-extra');
const path = require('path');
const semver = require('semver');
const spawnSync = require('child_process').spawnSync;

module.exports = function getPackageInfos() {
  // const packageInfos = {};
  // const { workspace } = vscode;

  // try {
  //   const packageJSON = fs.readJsonSync(path.join(workspace.rootPath, 'package.json'), 'utf-8');
  //   const { dependencies = {}, devDependencies = {} } = packageJSON;

  //   Array.prototype.concat.apply(
  //     // dependencies
  //     Object.keys(dependencies).map(packageName => ({
  //       from: 'dependencies', packageName, versionRange: dependencies[packageName]
  //     })),
  //     // devDependencies
  //     Object.keys(devDependencies).map(packageName => ({
  //       from: 'devDependencies', packageName, versionRange: devDependencies[packageName]
  //     }))
  //   ).forEach((info) => {
  //     const { from, packageName, versionRange } = info;
  //     packageInfos[packageName] = { from, versionRange };

  //     // Get local package version
  //     const packageFilePath = path.join(workspace.rootPath, 'node_modules', packageName, 'package.json');
  //     if (fs.existsSync(packageFilePath)) {
  //       packageInfos[packageName].local = fs.readJsonSync(packageFilePath, 'utf-8').version;
  //     }

  //     // Get versions info
  //     const childProcess = spawnSync('npm', [
  //       'show', packageName,
  //       'dist-tags', 'versions',
  //       '--json', '--registry=https://registry.npm.taobao.org/'
  //     ], {
  //       encoding: 'utf-8'
  //     });
  //     if (!childProcess.stderr) {
  //       const result = JSON.parse(childProcess.stdout);
  //       const versions = result.versions, distTags = result['dist-tags'];

  //       // The highest version in the versions that satisfies the range.
  //       packageInfos[packageName].satisfying = semver.maxSatisfying(
  //         versions,
  //         packageInfos[packageName].versionRange
  //       );
  //       // latest version
  //       packageInfos[packageName].latest = distTags.latest || '';
  //     }
  //   });
  // } catch (e) {
  //   console.log(e);
  // }

  // console.log(JSON.stringify(packageInfos));
  return {'rax': {'from': 'dependencies', 'versionRange': '^1.1.0', 'local': '1.1.1', 'satisfying': '1.1.1', 'latest': '1.1.1'}, 'rax-app': {'from': 'dependencies', 'versionRange': '^2.0.0', 'local': '2.1.1', 'satisfying': '2.1.1', 'latest': '2.1.1'}, 'rax-image': {'from': 'dependencies', 'versionRange': '^2.0.0', 'local': '2.1.1', 'satisfying': '2.2.0', 'latest': '2.2.0'}, 'rax-link': {'from': 'dependencies', 'versionRange': '^1.0.1', 'local': '1.2.0', 'satisfying': '1.3.0', 'latest': '1.3.0'}, 'rax-text': {'from': 'dependencies', 'versionRange': '^1.0.0', 'local': '1.2.0', 'satisfying': '1.3.0', 'latest': '1.3.0'}, 'rax-view': {'from': 'dependencies', 'versionRange': '^1.0.0', 'local': '1.1.0', 'satisfying': '1.1.0', 'latest': '1.1.0'}, 'rax-document': {'from': 'dependencies', 'versionRange': '^0.1.0', 'local': '0.1.3', 'satisfying': '0.1.3', 'latest': '0.1.3'}, 'build-plugin-rax-app': {'from': 'devDependencies', 'versionRange': '^4.0.0', 'local': '4.5.5', 'satisfying': '4.6.0', 'latest': '4.6.0'}, '@alib/build-scripts': {'from': 'devDependencies', 'versionRange': '^0.1.0', 'local': '0.1.19', 'satisfying': '0.1.20', 'latest': '0.1.20'}, 'babel-eslint': {'from': 'devDependencies', 'versionRange': '^10.0.3', 'local': '10.1.0', 'satisfying': '10.1.0', 'latest': '10.1.0'}, 'eslint': {'from': 'devDependencies', 'versionRange': '^6.8.0', 'local': '6.8.0', 'satisfying': '6.8.0', 'latest': '6.8.0'}, 'eslint-config-rax': {'from': 'devDependencies', 'versionRange': '^0.0.3', 'local': '0.0.3', 'satisfying': '0.0.3', 'latest': '0.0.3'}, 'eslint-plugin-import': {'from': 'devDependencies', 'versionRange': '^2.20.0', 'local': '2.20.2', 'satisfying': '2.20.2', 'latest': '2.20.2'}, 'eslint-plugin-react': {'from': 'devDependencies', 'versionRange': '^7.18.0', 'local': '7.19.0', 'satisfying': '7.19.0', 'latest': '7.19.0'}, '@ali/build-plugin-rax-app-def': {'from': 'devDependencies', 'versionRange': '^1.0.0', 'local': '1.0.2'}};
};
