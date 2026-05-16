import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function formatDate(s: string | null) {
  if (!s) return null;
  let d = new Date(s);
  if (isNaN(d.getTime())) {
    // fall back to just the date portion (e.g. malformed "2024-07-09T12:03:000000Z")
    d = new Date(s.slice(0, 10));
  }
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatOrientation(o: string | null) {
  if (!o) return null;
  if (o === "both") return "Portrait & Landscape";
  return cap(o);
}

const ESRB_LABELS: Record<string, string> = {
  E: "E — Everyone",
  "E10+": "E10+ — Everyone 10+",
  T: "T — Teen (13+)",
  M: "M — Mature (17+)",
  AO: "AO — Adults Only (18+)",
};

const LINK_LABELS: Record<string, string> = {
  apple_store: "App Store",
  google_play: "Google Play",
  fandom: "Fandom Wiki",
  wikipedia: "Wikipedia",
  steam: "Steam",
  source: "Source Site",
};

export function GameInfoSection({ game }: { game: any }) {
  const platformParts = [
    game.desktop_friendly && "Desktop",
    game.mobile_friendly && "Mobile",
  ].filter(Boolean);

  const appParts = [
    game.ios_friendly && "iOS",
    game.android_friendly && "Android",
  ].filter(Boolean);

  const linkedEntries = Object.entries(
    (game.linked_urls as Record<string, string>) ?? {}
  ).filter(([key, url]) => url && LINK_LABELS[key]);

  const rows: { label: string; value: React.ReactNode }[] = [
    {
      label: "ID",
      value: game.site_game_id?.split("#")[1] ?? game.site_game_id ?? null,
    },
    {
      label: "Released",
      value: formatDate(game.created_at),
    },
    {
      label: "Last updated",
      value: formatDate(game.updated_at),
    },
    {
      label: "Technology",
      value: game.technology ? cap(game.technology) : null,
    },
    {
      label: "Platform",
      value: platformParts.length ? platformParts.join(", ") : null,
    },
    {
      label: "iOS / Android",
      value: appParts.length ? appParts.join(", ") : null,
    },
    {
      label: "Orientation",
      value: formatOrientation(game.orientation),
    },
    {
      label: "Fullscreen",
      value:
        game.fullscreen === true
          ? "Yes"
          : game.fullscreen === false
          ? "No"
          : null,
    },
    {
      label: "Self-hosted",
      value:
        game.is_self_hosted === true
          ? "Yes"
          : game.is_self_hosted === false
          ? "No"
          : null,
    },
    {
      label: "ESRB",
      value: game.esbr_rating ? ESRB_LABELS[game.esbr_rating] ?? game.esbr_rating : null,
    },
    {
      label: "Tags",
      value: game.tags?.length ? game.tags.join(", ") : null,
    },
    {
      label: "Slug",
      value: game.slug ?? null,
    },
    ...linkedEntries.map(([key, url]) => ({
      label: LINK_LABELS[key],
      value: (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-primary hover:underline"
        >
          {url.replace(/^https?:\/\//, "").split("/")[0]}
          <ExternalLink className="h-3 w-3" />
        </a>
      ),
    })),
  ].filter((r) => r.value !== null && r.value !== "");

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_5fr]">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Game Info
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <tbody>
              {rows.map(({ label, value }) => (
                <tr key={label} className="border-t first:border-t-0">
                  <td className="py-2 pr-6 font-medium text-muted-foreground whitespace-nowrap">
                    {label}
                  </td>
                  <td className="py-2">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="pb-2 shrink-0">
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Description
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 min-h-0 overflow-y-auto space-y-6">
          <div className="space-y-1">
            <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
              Short
            </p>
            {game.short_description ? (
              <p className="text-sm leading-relaxed">{game.short_description}</p>
            ) : (
              <p className="text-sm text-muted-foreground italic">No short description available.</p>
            )}
          </div>

          {game.description && (
            <div className="space-y-1">
              <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
                Full
              </p>
              <div
                className="prose max-w-none text-sm"
                dangerouslySetInnerHTML={{ __html: game.description }}
              />
            </div>
          )}

          {!game.short_description && !game.description && (
            <p className="text-sm text-muted-foreground italic">No description available for this game.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
