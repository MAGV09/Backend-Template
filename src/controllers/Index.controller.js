const IndexService = require('../services/Index.service');
async function getHomepage(req, res) {
  res.render('index', { title: 'Homepage' });
}

module.exports = { getHomepage };
