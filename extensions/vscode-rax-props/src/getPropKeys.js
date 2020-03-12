const getPropKeysFromCode = require('./getPropKeysFromCode');
const getPropKeysFromDefinition = require('./getPropKeysFromDefinition');


module.exports = function getPropKeys(componentPath, componentName) {
  let propKeys = [];

  // Use Identifier
  if (/\.(js|jsx)$/.test(componentPath)) {
    propKeys = getPropKeysFromCode(componentPath, componentName);
  }

  // Use .d.ts
  if (componentPath.endsWith('.d.ts')) {
    propKeys = getPropKeysFromDefinition(componentPath);
  }

  return propKeys;
};