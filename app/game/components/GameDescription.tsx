"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function GameDescription({ game }: { game: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Description</CardTitle>
      </CardHeader>
      <CardContent
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: game.description }}
      />
    </Card>
  );
}
