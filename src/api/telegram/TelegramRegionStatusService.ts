import { RegionsMap } from "./RegionsMap";
import { RegionStatusServiceInterface } from "../RegionStatusServiceInterface";
import { RegionStatus } from "@/types/RegionStatus";
import { getMessages } from "./Api";
import { Status } from "@/types/Status";
import { Region, RegionId } from "@/types/Region";
import { StatusName } from "./MessageDTO";

export class TelegramRegionStatusService
  implements RegionStatusServiceInterface
{
  private static regionStatuses: Record<string, RegionStatus> = {};

  constructor() {
    TelegramRegionStatusService.regionStatuses = {};
  }

  async getRegionStatus(regionId: RegionId): Promise<RegionStatus> {
    if (
      Object.values(TelegramRegionStatusService.regionStatuses).length === 0
    ) {
      const messages = await getMessages();
      for (const message of messages) {
        const id = RegionsMap[message.regionName];
        TelegramRegionStatusService.regionStatuses[id] = new RegionStatus(
          new Region(id),
          this.parseStatus(message.statusName),
          message.datetime
        );
      }
    }
    if (TelegramRegionStatusService.regionStatuses[regionId]) {
      return TelegramRegionStatusService.regionStatuses[regionId];
    }
    throw new NotFoundError(`Region status for ${regionId} not found`);
  }

  private parseStatus(statusName: string): Status {
    if (statusName.indexOf(StatusName.ALERT) !== -1) {
      return Status.ALERT;
    }
    return Status.OK;
  }
}

export class NotFoundError extends Error {}

export const telegramRegionStatusService = new TelegramRegionStatusService();
