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
