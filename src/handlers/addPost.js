const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const addPost = async (event) => {
  const { name, message, fontColor, bgColor } = JSON.parse(event.body);

  const createdAt = new Date();
  const id = v4();

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const newPost = {
    id,
    name,
    message,
    fontColor,
    bgColor,
    createdAt,
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
  };
};

module.exports = {
  handler: addPost,
};
