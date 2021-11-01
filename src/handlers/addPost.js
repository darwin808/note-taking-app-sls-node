const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
  "Access-Control-Allow-Methods": "POST",
};
const addPost = async (event) => {
  const { userName, message, fontColor, bgColor } = JSON.parse(event.body);

  const createdAt = new Date();
  const id = v4();

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const newPost = {
    id,
    userName,
    message,
    fontColor,
    bgColor,
    createdAt: createdAt.toISOString(),
  };

  await dynamodb
    .put({
      TableName: "PostTable",
      Item: newPost,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(newPost),
    headers,
  };
};

module.exports = {
  handler: addPost,
};
