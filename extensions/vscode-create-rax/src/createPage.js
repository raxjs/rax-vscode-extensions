const createComponent = require('./createComponent');

module.exports = async function createPage(context) {
  const afterCreate = () => {
    // todos
    console.log(111);
  };


  createComponent(context, 'page', 'src/pages', afterCreate);
};