import underConstruction from "@/app/icons/undraw_under-construction_hdrn.svg";
import { InDevelopment } from "@/components/in-development";

export default function VendorsPage() {
  return (
    <InDevelopment
      title="Venders"
      description="In developemnt, coming soon!"
      svgPath={underConstruction}
    />
  );
}
