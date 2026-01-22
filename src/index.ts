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

export type DiscordNotificationType = "warning" | "alert";

export interface DiscordNotificationOptions {
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
   * Notification type:
   *  "warning" - yellow color
   *  "alert" - red color
   */
  type?: DiscordNotificationType;
  /**
   * Embed color as a decimal number (default: 0xed4245).
   */
  color?: number;
  /**
   * Mention @here in a channel
   */
  mention?: boolean;
}

export class DiscordClient {
  private readonly webhookUrl?: string;
  private readonly name?: string;

  constructor(config: DiscordClientConfig) {
    this.webhookUrl = config.webhookUrl;
    this.name = config.name;
  }

  private resolveColor(options: DiscordNotificationOptions): number {
    switch (options.type) {
      case "warning":
        return 0xfee75c;
      case "alert":
        return 0xed4245;
      default:
        return options.color ?? 0x57f287;
    }
  }

  /**
   * Send a single embed message to Discord.
   */
  async notify(options: DiscordNotificationOptions): Promise<void> {
    if (!this.webhookUrl) {
      return;
    }

    try {
      const payload = {
        content: options.type === "alert" || options.mention ? "@here" : "",
        embeds: [
          {
            title: options.title,
            description: options.description,
            color: this.resolveColor(options),
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
        console.warn(
          `Discord notification failed with status ${response.status}`,
        );
      }
    } catch (error) {
      console.warn(`Failed to send Discord notification: ${error}`);
    }
  }
}
