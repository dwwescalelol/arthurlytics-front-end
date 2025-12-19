import Image from "next/image";

type InDevelopmentProps = {
  title: string;
  description?: string;
  svgPath: string;
};

export function InDevelopment({
  title,
  description = "In developemnt, coming soon!",
  svgPath,
}: InDevelopmentProps) {
  return (
    <div className="min-h-[80vh] grid place-items-center">
      <div className="max-w-[420px] flex flex-col items-center gap-5">
        <Image
          src={svgPath}
          alt=""
          width={360}
          height={260}
          priority
          className="dark:opacity-90"
        />

        <div className="flex flex-col gap-1.5 text-center">
          <h1 className="text-lg font-semibold tracking-tight text-foreground">
            {title}
          </h1>

          <span className="text-sm text-muted-foreground">{description}</span>
        </div>
      </div>
    </div>
  );
}
