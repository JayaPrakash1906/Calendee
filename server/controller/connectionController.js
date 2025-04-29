const Connection = require('../model/connectionModel');

exports.createConnection = async (req, res) => {
  try {
    const newConnection = await Connection.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        connection: newConnection
      }
    });
  } catch (err) {
    if (err.code === '23505') { // Unique violation error code for PostgreSQL
      return res.status(400).json({
        status: 'fail',
        message: 'A connection with this email already exists.'
      });
    }
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getAllConnections = async (req, res) => {
  try {
    const connections = await Connection.getAll();
    res.status(200).json({
      status: 'success',
      results: connections.length,
      data: {
        connections
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

exports.deleteConnection = async (req, res) => {
  try {
    const email = req.params.email;
    const deletedConnection = await Connection.delete(email);
    
    if (!deletedConnection) {
      return res.status(404).json({
        status: 'fail',
        message: 'No connection found with that email'
      });
    }
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};