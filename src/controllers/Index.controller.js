async function getHomepage(req, res) {
  res.json({
    message: 'Hello',
  });
}

async function getCurrentUser(req, res) {
  const { password, ...currentUser } = req.user;
  res.json(currentUser);
}
module.exports = { getHomepage, getCurrentUser };
