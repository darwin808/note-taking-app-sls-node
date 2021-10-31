const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const headers = {
  "Access-Control-Allow-Origin": "*", // Required for CORS support to work
  "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
};

const getPosts = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  let todos;

  try {
    const result = await dynamodb.scan({ TableName: "PostTable" }).promise();
    todos = result.Items;
  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(todos),
    headers,
  };
};

module.exports = {
  handler: getPosts,
};
