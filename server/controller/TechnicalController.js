const TechnicalModel = require('../model/TechnicalModel');

const TechnicalController = {
  async getAllRequests(req, res) {
    try {
      const requests = await TechnicalModel.getAllRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching requests' });
    }
  },

  async createRequest(req, res) {
    try {
      const newRequest = await TechnicalModel.createRequest(req.body);
      res.status(201).json(newRequest);
    } catch (error) {
      res.status(500).json({ error: 'Error creating request' });
    }
  },
};

module.exports = TechnicalController;