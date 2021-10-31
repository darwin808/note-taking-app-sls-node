const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const createError = require("http-errors");

const getPost = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  let todo;

  try {
    const result = await dynamodb
      .get({
        TableName: "PostTable",
        Key: { id },
      })
      .promise();
    todo = result.Item;
  } catch (error) {
    throw new createError.InternalServerError(error);
  }

  if (!todo) {
    throw new createError.NotFound(`Todo is ID ${id} is not found`);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(todo),
    headers: {
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
    },
  };
};

module.exports = {
  handler: getPost,
};
