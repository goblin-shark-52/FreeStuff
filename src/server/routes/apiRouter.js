const express = require('express');
const router = express.Router();

// require in apiController middleware
const apiController = require('../controllers/apiController');

// GET request for all unclaimed items
router.get('/', apiController.getItems, (req, res) =>
  res.status(200).json(res.locals.items)
);

// POST request for adding items
router.post('/add-item', apiController.addItem, (req, res) =>
  res.status(200).send('Item added')
);

// POST request for selecting tag
router.post('/tag', apiController.getItemByTag, (req, res) =>
  res.status(200).json(res.locals.data)
);

// PATCH request for updating "claimed" status
router.patch('/update-item', apiController.updateItem, (req, res) =>
  res.status(200).send('Item claimed')
);

module.exports = router;
