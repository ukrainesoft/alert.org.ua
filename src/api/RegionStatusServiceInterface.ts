import { RegionId } from "@/types/Region";
import { RegionStatus } from "@/types/RegionStatus";

export interface RegionStatusServiceInterface {
  getRegionStatus(regionId: RegionId): Promise<RegionStatus>;
}
