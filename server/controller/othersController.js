let othersController = (req, res) => {
    try {
      res.send("Test Controller");
    }
    catch (err)
    {
      res.send("Error in Test Controller");
    }
}

module.exports = othersController