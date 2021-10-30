const { v4 } = require("uuid");
const AWS = require("aws-sdk");

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
  };
};

module.exports = {
  handler: getPosts,
};
