async function getHomepage(req, res) {
  res.json({
    message:'Hello'
  })
}

module.exports = { getHomepage };
