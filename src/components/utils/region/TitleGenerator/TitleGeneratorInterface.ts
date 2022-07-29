import { RegionStatus } from "@/types/RegionStatus";

export interface TitleGeneratorInterface {
  generate(regionStatus: RegionStatus): string;
}
