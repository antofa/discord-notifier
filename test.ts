import { DiscordClient } from "./src/index";

const client = new DiscordClient({
  webhookUrl: process.env.DISCORD_WEBHOOK_URL,
  name: "Demo Bot",
});

async function main(): Promise<void> {
  await client.notify({
    title: "Test Message",
    description: "Hello from discord-notifier test.ts",
    color: 0x2ecc71,
    fields: [{ name: "Env", value: "local", inline: true }],
  });
}

main().catch((error) => {
  console.error("Failed to send test notification:", error);
  process.exit(1);
});
