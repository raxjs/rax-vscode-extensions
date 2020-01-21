const css = require('css');
const fs = require('fs');
const path = require('path');

// Find styles selectors, ['.wrap', '.header' ....]
module.exports = function findStyleSelectors(directory, styleDependencies = []) {
  let selectors = [];

  for (let i = 0, l = styleDependencies.length; i < l; i++) {
    const file = path.join(directory, styleDependencies[i].source);
    const stylesheet = css.parse(fs.readFileSync(file, 'utf-8')).stylesheet;

    stylesheet.rules.forEach((rule) => {
      selectors = selectors.concat(rule.selectors);
    });
  }

  return selectors;
};
