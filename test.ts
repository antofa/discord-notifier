import { DiscordClient } from "./src/index";

const client = new DiscordClient({
  webhookUrl: process.env.DISCORD_WEBHOOK_URL,
  name: "Demo Bot",
});

async function main(): Promise<void> {
  await client.notify({
    title: "Test Message",
    description: "Hello from discord-notifier test.ts",
    color: 0x312ecc,
    fields: [{ name: "Env", value: "local", inline: true }],
  });

  await client.notify({
    title: "Warning message",
    description: "Warning from discord-notifier test.ts",
    color: 0x312ecc, // color will be overrided
    type: "warning",
    fields: [{ name: "Env", value: "local", inline: true }],
  });

  await client.notify({
    title: "Alert message",
    description: "Alert from discord-notifier test.ts",
    type: "alert",
    fields: [
      { name: "Env", value: "local", inline: true }, { name: "Version", value: "0.1.5", inline: true },
    ],
  });
}

main().catch((error) => {
  console.error("Failed to send test notification:", error);
  process.exit(1);
});
