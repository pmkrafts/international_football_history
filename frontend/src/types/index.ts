export interface Match {
  date: string;
  home_team: string;
  away_team: string;
  home_score: number;
  away_score: number;
  tournament: string;
  city: string;
  country: string;
  neutral: boolean;
  result?: "win" | "loss" | "draw";
  goals?: Goal[];
  shootout?: Shootout;
}

export interface Goal {
  team: string;
  scorer: string;
  own_goal: boolean;
  penalty: boolean;
}

export interface Shootout {
  winner: string;
  first_shooter?: string;
}

export interface TeamProfile {
  name: string;
  former_names: string[];
  total_matches: number;
  wins: number;
  draws: number;
  losses: number;
  goals_for: number;
  goals_against: number;
  first_match: string;
  latest_match: string;
}

export interface DashboardStats {
  total_matches: number;
  total_goals: number;
  avg_goals_per_match: number;
  top_tournaments: { tournament: string; count: number }[];
  highest_scoring_match: Match;
  most_active_decade: string;
}
