const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const updatePost = async (event) => {
  const { message } = JSON.parse(event.body);
  const { id } = event.pathParameters;

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  try {
    await dynamodb
      .update({
        TableName: "PostTable",
        Key: { id },
        UpdateExpression: "set message = :message",
        ExpressionAttributeValues: {
          ":message": message,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        msg: "todo updated",
      }),
    };
  } catch (error) {
    return {
      statusCode: 200,
      body: JSON.stringify(error),
    };
  }
};

module.exports = {
  handler: updatePost,
};
