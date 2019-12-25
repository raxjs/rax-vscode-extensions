const fs = require('fs-extra');
const path = require('path');
const execSync = require('child_process').execSync;
const spawn = require('cross-spawn');

const EXTENSIONS_PATH = path.join(__dirname, '../extensions');

/**
 * run npm/yarn install
 * @param directory - the cwd directory
 */
function install(directory) {
  const shouldUseYarn = () => {
    try {
      execSync('yarn --version', { stdio: 'ignore' });
      return true;
    } catch (e) {
      return false;
    }
  };
  spawn(shouldUseYarn() ? 'yarn' : 'npm', ['install'], { stdio: 'inherit', cwd: directory });
}

function run() {
  fs.readdirSync(EXTENSIONS_PATH).forEach(function (file) {
    // Install vscode-xxx/client node modules
    const targetPath = `${EXTENSIONS_PATH}/${file}/client`;
    if (fs.pathExistsSync(targetPath)) {
      install(targetPath);
    }
  });
}

run();