import { Region } from "@/types/Region";
import { RegionStatusServiceInterface } from "../RegionStatusServiceInterface";
import { getStatuses } from "./Api";
import { RegionsMap } from "./RegionsMap";
import { Status } from "../../types/Status";

export class TelegramRegionStatusService
  implements RegionStatusServiceInterface
{
  private static regionStatuses: Record<string, Status> = {};

  constructor() {
    TelegramRegionStatusService.regionStatuses = {};
  }

  async getStatus(region: Region): Promise<Status> {
    if (Object.keys(TelegramRegionStatusService.regionStatuses).length === 0) {
      TelegramRegionStatusService.regionStatuses = await getStatuses();
    }
    for (const regionString in TelegramRegionStatusService.regionStatuses) {
      if (regionString.indexOf(RegionsMap[region.id]) !== -1) {
        return TelegramRegionStatusService.regionStatuses[regionString];
      }
    }
    return Status.OK;
  }
}

export const telegramRegionStatusService = new TelegramRegionStatusService();
