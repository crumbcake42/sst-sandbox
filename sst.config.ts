import { SSTConfig } from "sst";
import { NextjsSite, StackContext, Table } from "sst/constructs";

function Site({ stack, app }: StackContext) {
  // Create the table
  const table = new Table(stack, "Counter", {
    fields: {
      counter: "string",
    },
    primaryIndex: { partitionKey: "counter" },
  });

  const site = new NextjsSite(stack, "site", {
    // customDomain: `${app.stage}.crummy.link`,
    // Allow the Next.js API to access the table
    // bind: [table],
    environment: {
      REGION: app.region,
      TABLE_NAME: table.tableName,
    },
  });

  // Allow the Next.js API to access the table
  site.attachPermissions([table]);

  stack.addOutputs({
    SiteUrl: site.url || "localhost:3000",
    Stage: app.stage,
  });
}

export default {
  config(_input) {
    return {
      name: "sst",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(Site);
  },
} satisfies SSTConfig;
