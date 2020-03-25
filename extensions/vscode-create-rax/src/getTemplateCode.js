const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const _cache = {};

module.exports = function getTemplateCode(extensionPath, templateName, data) {
  let template = _cache[templateName];

  if (!template) {
    template = _cache[templateName] =
      fs.readFileSync(
        path.join(extensionPath, 'src/templates/', templateName),
        'utf-8'
      );
  }

  return ejs.render(template, data);
};