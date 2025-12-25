export interface DiscordClientConfig {
  /**
   * Discord webhook URL to send messages to.
   */
  webhookUrl?: string;
  /**
   * Bot name shown in the embed footer.
   */
  name?: string;
}

export interface DiscordAlertOptions {
  /**
   * Embed title.
   */
  title: string;
  /**
   * Embed description text.
   */
  description?: string;
  /**
   * Optional fields to show in the embed.
   */
  fields?: { name: string; value: string; inline?: boolean }[];
  /**
   * Embed color as a decimal number (default: 0xed4245).
   */
  color?: number;
}

export class DiscordClient {
  private readonly webhookUrl?: string;
  private readonly name?: string;

  constructor(config: DiscordClientConfig) {
    this.webhookUrl = config.webhookUrl;
    this.name = config.name;
  }

  /**
   * Send a single embed message to Discord.
   */
  async notify(options: DiscordAlertOptions): Promise<void> {
    if (!this.webhookUrl) {
      return;
    }

    try {
      const payload = {
        embeds: [
          {
            title: options.title,
            description: options.description,
            color: options.color ?? 0xed4245,
            fields: options.fields ?? [],
            footer: this.name ? { text: this.name } : undefined,
            timestamp: new Date().toISOString(),
          },
        ],
      };

      const response = await fetch(this.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.warn(`Discord notification failed with status ${response.status}`);
      }
    } catch (error) {
      console.warn(`Failed to send Discord notification: ${error}`);
    }
  }
}
