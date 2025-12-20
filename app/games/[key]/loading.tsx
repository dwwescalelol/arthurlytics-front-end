import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* META CARD */}
      <Card className="p-2">
        <Skeleton className="h-6 w-48" />
      </Card>

      {/* MAIN INFO CARD */}
      <Card>
        <div className="grid grid-cols-[auto_1fr_auto] gap-8 p-6">
          {/* IMAGE */}
          <Skeleton className="h-56 w-48 rounded-md" />

          {/* HEADER / DESCRIPTION */}
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-20 w-full" />
          </div>

          {/* STATS */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
          </div>
        </div>
      </Card>

      {/* DESCRIPTION */}
      <Card className="p-6 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-10/12" />
      </Card>

      {/* CHART */}
      <Card className="p-6">
        <Skeleton className="h-[250px] w-full" />
      </Card>
    </div>
  );
}
