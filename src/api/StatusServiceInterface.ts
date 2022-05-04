import { RegionId } from "@/types/Region";
import { Status } from "../types/Status";

export interface StatusServiceInterface {
  getStatus(region: RegionId): Promise<Status>;
}
