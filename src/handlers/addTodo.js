const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");

const addTodo = async (event) => {
  console.log(event, "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
  const body = JSON.parse(event.body);
  console.log(body, "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
  const createdAt = new Date();

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const newTodo = {
    id: v4(),
    todo: body.userName,
    name1: body.message,
    createdAt,
    completed: false,
  };

  await dynamodb
    .put({
      TableName: "TodoTable",
      Item: newTodo,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(newTodo),
  };
};

module.exports = {
  //   handler: middy(addTodo).use(httpJsonBodyParser()),
  handler: addTodo,
};
