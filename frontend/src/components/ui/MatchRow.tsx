import { cn, formatDate, getResultColor } from "@/lib/utils";
import type { Match } from "@/types";

interface MatchRowProps {
  match: Match;
  team?: string;
  className?: string;
}

export default function MatchRow({ match, team, className }: MatchRowProps) {
  const isHome = team ? match.home_team === team : true;
  const result = match.result || (isHome
    ? match.home_score > match.away_score
      ? "win"
      : match.home_score < match.away_score
      ? "loss"
      : "draw"
    : match.away_score > match.home_score
    ? "win"
    : match.away_score < match.home_score
    ? "loss"
    : "draw");

  return (
    <tr
      className={cn(
        "border-b border-border-pitch transition-all duration-200 hover:bg-surface",
        className
      )}
    >
      <td className="py-3 px-4 text-muted text-sm">{formatDate(match.date)}</td>
      <td className="py-3 px-4 text-light font-medium">{match.home_team}</td>
      <td className="py-3 px-4 text-center">
        <span className={cn("font-bold", getResultColor(result))}>
          {match.home_score} - {match.away_score}
        </span>
      </td>
      <td className="py-3 px-4 text-light font-medium">{match.away_team}</td>
      <td className="py-3 px-4 text-muted text-sm">{match.tournament}</td>
      <td className="py-3 px-4 text-muted text-sm">{match.country}</td>
    </tr>
  );
}
