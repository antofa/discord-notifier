# Discord Notifier

Lightweight Discord webhook notifier.

## Install

```bash
pnpm add @a1-dev/discord-notifier
```

Or directly from GitHub:

```json
{
  "dependencies": {
    "@a1-dev/discord-notifier": "github:antofa/discord-notifier#main"
  }
}
```

## Usage

```ts
import { DiscordClient } from "@a1-dev/discord-notifier";

const client = new DiscordClient({
  webhookUrl: process.env.DISCORD_WEBHOOK_URL,
  name: "My Bot",
});

await client.notify({
  title: "Job Failed",
  description: "Unexpected error while running task",
  color: 0xf1c40f,
  fields: [{ name: "Env", value: "prod", inline: true }],
});
```

## Example file

See `test.ts` for a runnable example.

## Build

```bash
pnpm run build
```

## Run test.ts

```bash
DISCORD_WEBHOOK_URL="your_webhook_url" pnpm dlx tsx test.ts
```

Windows CMD:
```bash
set DISCORD_WEBHOOK_URL=your_webhook_url && pnpm dlx tsx test.ts
```

## License

MIT
