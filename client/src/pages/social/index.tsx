import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { spotifyData } from "@/data/spotify";
import { facebookData } from "@/data/facebook";

type Tab = "spotify" | "facebook";

function formatMinutes(ms: number) {
  const mins = Math.round(ms / 60000);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  const rem = mins % 60;
  return rem > 0 ? `${hrs}h ${rem}m` : `${hrs}h`;
}

function SpotifyTab() {
  const { subscribedShows, ownedShows, streamingHistory } = spotifyData;

  const deduped = streamingHistory
    .filter((h) => h.msPlayed > 30000)
    .reduce<typeof streamingHistory>((acc, h) => {
      const key = h.podcastName + h.episodeName;
      if (!acc.find((x) => x.podcastName + x.episodeName === key)) acc.push(h);
      return acc;
    }, [])
    .slice()
    .reverse();

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-green-500">{subscribedShows.length}</div>
            <div className="text-sm text-muted-foreground mt-1">Subscribed shows</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-green-500">{ownedShows.length}</div>
            <div className="text-sm text-muted-foreground mt-1">Shows you host</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-green-500">{deduped.length}</div>
            <div className="text-sm text-muted-foreground mt-1">Episodes in history</div>
          </CardContent>
        </Card>
      </div>

      {ownedShows.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Shows You Host</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {ownedShows.map((show) => (
              <div key={show.showName} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-green-500/20 flex items-center justify-center text-green-500 text-xs font-bold">
                    {show.showName[0]}
                  </div>
                  <span className="font-medium text-sm">{show.showName}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  since {show.authorizationDate}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Listening History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {deduped.map((item, i) => (
            <div key={i} className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="font-medium text-sm truncate">{item.episodeName}</div>
                <div className="text-xs text-muted-foreground">{item.podcastName}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs text-green-500 font-medium">{formatMinutes(item.msPlayed)}</div>
                <div className="text-xs text-muted-foreground">{item.endTime.split(" ")[0]}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Subscribed Podcasts ({subscribedShows.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2">
            {subscribedShows.map((show) => (
              <div key={show.uri} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="w-8 h-8 rounded bg-green-500/20 flex items-center justify-center text-green-500 text-xs font-bold shrink-0">
                  {show.name[0]}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{show.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{show.publisher}</div>
                </div>
                {show.publisher === "Joshua Parris" && (
                  <Badge variant="secondary" className="text-xs shrink-0">yours</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function FacebookTab() {
  const { friends, profile } = facebookData;
  const [search, setSearch] = useState("");

  const filtered = friends.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const recentFriends = friends.slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-blue-500">{friends.length}</div>
            <div className="text-sm text-muted-foreground mt-1">Facebook friends</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium">{profile.name}</div>
            <div className="text-xs text-muted-foreground mt-1">Data exported {profile.exportDate}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recently Added</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentFriends.map((f) => (
            <div key={f.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 text-sm font-bold">
                  {f.name[0]}
                </div>
                <span className="text-sm font-medium">{f.name}</span>
              </div>
              <span className="text-xs text-muted-foreground">{f.friendsSince}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Friends</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <input
            type="text"
            placeholder="Search friends..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {filtered.map((f) => (
              <div key={f.name} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 text-xs font-bold shrink-0">
                    {f.name[0]}
                  </div>
                  <span className="text-sm">{f.name}</span>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{f.friendsSince}</span>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No friends match "{search}"</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SocialPage() {
  const [tab, setTab] = useState<Tab>("spotify");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Social</h1>
            <Link href="/">
              <Button variant="ghost" size="sm">Back to Hub</Button>
            </Link>
          </div>
          <nav className="flex space-x-2">
            {(["spotify", "facebook"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-colors capitalize",
                  tab === t
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-muted-foreground"
                )}
              >
                {t === "spotify" ? "Spotify" : "Facebook"}
              </button>
            ))}
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {tab === "spotify" ? <SpotifyTab /> : <FacebookTab />}
      </main>
    </div>
  );
}
