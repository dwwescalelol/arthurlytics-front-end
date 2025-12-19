type NullableBoolean = boolean | null;
type NullableString = string | null;

export type Game = {
  // Identity
  site_game_id: number | null;
  name: string;
  slug: string;
  url: string;

  // Platform support
  ios_friendly: NullableBoolean;
  android_friendly: NullableBoolean;
  desktop_friendly: NullableBoolean;
  mobile_friendly: NullableBoolean;

  // Classification
  categories: string[];
  tags: string[];
  related_games: string[];

  // Content
  description: NullableString;
  short_description: NullableString;

  // Developer
  developer_id: number | null;
  developer_name: NullableString;

  // Media
  thumbnail_url: NullableString;
  large_url: NullableString;

  // Metadata
  fullscreen: NullableBoolean;
  technology: NullableString; // iframe | unity | html5 | webgl | flash
  orientation: NullableString; // portrait | landscape | auto
  is_self_hosted: NullableBoolean;
  esbr_rating: NullableString;

  // Links
  linked_urls: Record<string, string>;

  // Timestamps
  created_at: string | null;
  updated_at: string | null;

  // Voting history (existing)
  history: {
    upvotes: number;
    totalvotes: number;
    timestamp: number;
  }[];
};
