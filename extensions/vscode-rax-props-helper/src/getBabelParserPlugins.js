module.exports = function getBabelParserPlugins(language) {
  const plugins = [
    'doExpressions',
    'objectRestSpread',
    'decorators-legacy',
    'classProperties',
    'exportExtensions',
    'asyncGenerators',
    'functionBind',
    'functionSent',
    'dynamicImport'
  ];

  if (language === 'ts') {
    plugins.unshift('typescript');
  } else {
    plugins.unshift('flow');
    plugins.unshift('jsx');
  }

  return plugins;
};
