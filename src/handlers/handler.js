"use strict";

const hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "DARWINNNN???????????????????",
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports = {
  hello,
};
