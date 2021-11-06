const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
  "Access-Control-Allow-Methods": "PATCH",
  "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
};

const updatePost = async (event) => {
  const { message, userName, picture } = JSON.parse(event.body);
  const { id } = event.pathParameters;

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  try {
    await dynamodb
      .update({
        TableName: "PostTable",
        Key: { id },
        UpdateExpression:
          "set message = :message, userName = :userName, picture = :picture",
        ExpressionAttributeValues: {
          ":message": message,
          ":userName": userName,
          ":picture": picture,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        msg: "Post is nice so its  updated",
      }),
      headers,
    };
  } catch (error) {
    return {
      statusCode: 200,
      body: JSON.stringify(error),
      headers,
    };
  }
};

module.exports = {
  handler: updatePost,
};
