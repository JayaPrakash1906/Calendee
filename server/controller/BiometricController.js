const BiometricModel = require('../model/BiometricModel');

const BiometricController = {
  async getAllRequests(req, res) {
    try {
      const requests = await BiometricModel.getAllRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching requests' });
    }
  },

  async createRequest(req, res) {
    try {
      const newRequest = await BiometricModel.createRequest(req.body);
      res.status(201).json(newRequest);
    } catch (error) {
      res.status(500).json({ error: 'Error creating request' });
    }
  },
};

module.exports = BiometricController;