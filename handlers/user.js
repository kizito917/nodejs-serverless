'use strict';
require('dotenv').config({ path: '.env' });
const connectToDatabase = require("../config/dbConn");
const { registerNewUser, fetchUsers, fetchSingleUser, updateUser, deleteUser} = require("../controllers/user.controller");

const createErrorResponse = (statusCode, message) => ({
  statusCode: statusCode || 501,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    error: message || 'An Error occurred.',
  }),
});

const returnError = (error) => {
  if (error.name) {
    const message = `Invalid ${error.path}: ${error.value}`;
    callback(null, createErrorResponse(400, `Error:: ${message}`));
  } else {
    callback(
      null,
      createErrorResponse(error.statusCode || 500, `Error:: ${error.name}`)
    );
  }
};

module.exports.createUser = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const { name, email } = JSON.parse(event.body);
  try {
    await connectToDatabase();
    const user = await registerNewUser(name, email)
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(user)
    });
  } catch (error) {
    returnError(error);
  }
}

module.exports.getAllUser = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();
    const allUsers = await fetchUsers()
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(allUsers)
    })
  } catch (error) {
    returnError(error)
  }
}

module.exports.getOneUser = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();
    const id = event.pathParameters.id
    const singleUser = await fetchSingleUser(id)
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(singleUser)
    })
  } catch (error) {
    returnError(error)
  }
}

module.exports.updateUser = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();
    const id = event.pathParameters.id
    const data = JSON.parse(event.body)
    const updatedUser = await updateUser(id, data)
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(updatedUser)
    })
  } catch (error) {
    returnError(error)
  }
}

module.exports.deleteUser = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();
    const id = event.pathParameters.id
    const deletedUser = await deleteUser(id)
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(deletedUser)
    })
  } catch (error) {
    returnError(error)
  }
}