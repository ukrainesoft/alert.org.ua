import { Region } from "@/types/Region";
import { Status } from "../types/Status";

export interface RegionStatusServiceInterface {
  getStatus(region: Region): Promise<Status>;
}
