import { Region } from "@/types/Region";
import { BaseRepository } from "./BaseRepository";

export class RegionRepository extends BaseRepository<Region> {
  protected createRegionFromData(data: { id: string }): Region {
    return new Region(data.id);
  }
}
