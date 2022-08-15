const express = require('express');
const db = require('../models/freeStuffModel');

const apiController = {};

// helper function to invoke global error handler on server.js
const createErr = errInfo => {
  const { method, type, err, status } = errInfo;
  return {
    log: `apiController.${method} ${type}: ERROR: ${
      typeof err === 'object' ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in apiController.${method}. Check server logs for details.`,
    },
    status,
  };
};

// This middleware function will send a query to retrieve all "unclaimed" items in the database and return an array of objects to the frontend to be displayed.
apiController.getItems = async (req, res, next) => {
  const queryStr = `SELECT * 
    FROM item
    WHERE item.claimed = false;
  `;
  try {
    const data = await db.query(queryStr);
    // console.log('Data returned from get req to /api', data);
    res.locals.items = data.rows;
    return next();
  } catch (err) {
    return next(
      createErr({
        method: 'getItems',
        type: 'did not connect to database',
        err,
        status: 500,
      })
    );
  }
};

// Iteration goal:
// If user is logged in, then the user name should be sent in the body of the request
// The following middleware should query the database to get the id of the user with that name
// Add the item with the user_id
apiController.addItem = async (req, res, next) => {
  // need to discuss with front end - do they want to send a date?
  // or just use default date? (I WANT THIS!)
  const { name, description, quantity, imageURL, tag } = req.body;
  // should we handle errors if the name (or other properties) are missing here? or on front end?

  try {
    // insert item to item table and return the item id
    const queryStrInsert = `INSERT INTO item (name, description, quantity, imageURL)
      VALUES ($1, $2, $3, $4)
      RETURNING _id;
    `;
    const insertValues = [name, description, quantity, imageURL];
    const insertData = await db.query(queryStrInsert, insertValues);
    const itemID = insertData.rows[0]._id;

    // query the tag table to get tag id from the tag name
    const queryStrTag = `SELECT _id 
      FROM tag
      WHERE name=$1;
    `;
    const tagValue = [tag];
    const tagData = await db.query(queryStrTag, tagValue);
    const tagID = tagData.rows[0]._id;

    // insert the item id and tag id into the tag_for_item table
    const queryStrTagForItem = `INSERT INTO tag_for_item (item_id, tag_id)
      VALUES ($1, $2);
    `;
    const tagForItemValues = [itemID, tagID];
    await db.query(queryStrTagForItem, tagForItemValues);

    return next();
  } catch (err) {
    return next(
      createErr({
        method: 'addItem',
        type: 'did not connect to database',
        err,
        status: 500,
      })
    );
  }
};

// This middleware function will be invoked when a request is made to the /api/tag endpoint. It will:
// 1) Query 1 - Extract the tag sent from the frontend and make a query to retrieve the tag id
// 2) Query 2 - Query for items that match that tag id by JOINING the item_table and tag_for_item join table
// 3) Send the results back to the frontend

apiController.getItemByTag = async (req, res, next) => {
  try {
    // Get tag id
    const { tag } = req.body;
    const query = 'SELECT * FROM tag t WHERE t.name = $1';
    const params = [tag];
    const data = await db.query(query, params);
    const tagId = data.rows[0]._id;

    // Get all items with input tag id from previous query
    const query2 = `
    SELECT * 
    FROM item i 
    INNER JOIN tag_for_item tfi ON i._id = tfi.item_id 
    WHERE tag_id = $1;`;
    const params2 = [tagId];
    const data2 = await db.query(query2, params2);

    res.locals.data = data2.rows;
    return next();
  } catch (error) {
    return next(
      createErr({
        method: 'getItemByTag',
        type: 'could not connect to database',
        err,
        status: 500,
      })
    );
  }
};

// This middleware function will receive the id of a posted, unclaimed item from the frontend. It will:
// Send a query to UPDATE the item's "claimed status" in the item table under the "claimed" column which is a boolean

// Iteration goal:
// Once an item's claimed status is updated, this should return the email of the user who posted this item to the person who claimed the item.
// We currently do not have login/signup/auth set up.

apiController.updateItem = async (req, res, next) => {
  const { _id: item_id } = req.body;
  const query = 'UPDATE item SET claimed = $1 WHERE item._id = $2';
  const params = [true, item_id];

  try {
    await db.query(query, params);
    return next();
  } catch (err) {
    return next(
      createErr({
        method: 'updateItem',
        type: 'error connecting to database',
        err,
        status: 500,
      })
    );
  }
};

module.exports = apiController;
