import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollWithChevron } from "@/components/ScrollWithChevron";

export function GameDescription({ game }: { game: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Description</CardTitle>
      </CardHeader>

      <div className="pr-4">
        <ScrollWithChevron maxHeightClass="max-h-90">
          <CardContent
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: game.description }}
          />
        </ScrollWithChevron>
      </div>
    </Card>
  );
}
