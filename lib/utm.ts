export type MarketingChannel =
  | "whatsapp"
  | "whatsapp_status"
  | "instagram"
  | "facebook_marketplace"
  | "linkedin"
  | "referral";

export type UtmConfig = {
  source: string;
  medium: string;
  campaign: string;
};

export const CHANNEL_CONFIG: Record<
  MarketingChannel,
  UtmConfig
> = {
  whatsapp: {
    source: "whatsapp",
    medium: "direct",
    campaign: "emg_launch",
  },

  whatsapp_status: {
    source: "whatsapp_status",
    medium: "social",
    campaign: "emg_launch",
  },

  instagram: {
    source: "instagram",
    medium: "social",
    campaign: "emg_launch",
  },

  facebook_marketplace: {
    source: "facebook_marketplace",
    medium: "marketplace",
    campaign: "emg_launch",
  },

  linkedin: {
    source: "linkedin",
    medium: "social",
    campaign: "emg_portfolio",
  },

  referral: {
    source: "referral",
    medium: "referral",
    campaign: "emg_launch",
  },
};

type BuildTrackedUrlOptions = {
  url: string;
  channel: MarketingChannel;
  content: string;
};

export function buildTrackedUrl({
  url,
  channel,
  content,
}: BuildTrackedUrlOptions) {
  const config = CHANNEL_CONFIG[channel];
  const trackedUrl = new URL(url);

  trackedUrl.searchParams.set(
    "utm_source",
    config.source
  );

  trackedUrl.searchParams.set(
    "utm_medium",
    config.medium
  );

  trackedUrl.searchParams.set(
    "utm_campaign",
    config.campaign
  );

  trackedUrl.searchParams.set(
    "utm_content",
    content.toLowerCase()
  );

  return trackedUrl.toString();
}
