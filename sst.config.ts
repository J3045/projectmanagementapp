import { App, Stack } from "@serverless-stack/resources";
import { NextjsSite } from "@serverless-stack/resources";

export default {
  config() {
    return {
      name: "projectmanagementapp",
      region: "ap-south-1",
    };
  },

  stacks(app: App) {
    app.stack(function Site({ stack }: { stack: Stack }) {
      const site = new NextjsSite(stack, "site", {
        path: ".", // Path of your Next.js app
        environment: {
          NEXTAUTH_URL: process.env.NEXTAUTH_URL || "",
          DATABASE_URL: process.env.DATABASE_URL || "",
          AUTH_SECRET: process.env.AUTH_SECRET || "",
          AUTH_DISCORD_ID: process.env.AUTH_DISCORD_ID || "",
          AUTH_DISCORD_SECRET: process.env.AUTH_DISCORD_SECRET || "",
          DIRECT_URL: process.env.DIRECT_URL || "",
        },
      });

      // Adding outputs for site URL
      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
  
  // Global Lambda function runtime configuration
  functionDefaults: {
    runtime: "nodejs18.x", // Updated runtime to nodejs18.x
  },
};
