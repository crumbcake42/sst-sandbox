import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

// Set the AWS Region.
const REGION = process.env.REGION; //e.g. "us-east-1"

// Create an Amazon DynamoDB service client object.
const ddbClient = new DynamoDBClient({ region: REGION });

// Create the DynamoDB document client.
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

const TableName = process.env.TABLE_NAME;

async function handler() {
  try {
    const getParams = {
      // Get the table name from the environment variable
      TableName,
      // Get the row where the counter is called "hits"
      Key: {
        counter: "hits",
      },
    };

    const results = await ddbDocClient.send(new GetCommand(getParams));
    // If there is a row, then get the value of the
    // column called "tally"
    let count = results.Item ? results.Item.tally : 0;

    const putParams = {
      ...getParams,
      // Update the "tally" column
      UpdateExpression: "SET tally = :count",
      ExpressionAttributeValues: {
        // Increase the count
        ":count": ++count,
      },
    };

    await ddbDocClient.send(new UpdateCommand(putParams));
    return new Response(count, {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response("-1", { status: 500 });
  }
}

export const POST = handler;
export const GET = handler;
