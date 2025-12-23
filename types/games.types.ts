type NullableNumber = number | null;

export type GameStats = {
  site_id: string;
  game_id: string;
  name: string;
  url: string;

  totalvotes: number;
  upvotes: number;

  daily_new_totalvotes: number;
  daily_new_upvotes: number;

  site_rank: number;
  global_rank: number;

  daily_delta_vote: NullableNumber;
  weekly_delta_vote: NullableNumber;
  monthly_delta_vote: NullableNumber;

  daily_delta_site_rank: NullableNumber;
  weekly_delta_site_rank: NullableNumber;
  monthly_delta_site_rank: NullableNumber;

  daily_delta_global_rank: NullableNumber;
  weekly_delta_global_rank: NullableNumber;
  monthly_delta_global_rank: NullableNumber;
};

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
  technology: NullableString; // iframe | unity | html5 | webgl | flash | ruffle
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

export type AllGamesQuery = {
  page: string;
  sort: string;
  order: string;
  search: string;
};

export type AllGamesResponse = {
  data: GameStats[];
  meta: {
    page: number;
    count: number;
    totalPages: number;
  };
};
