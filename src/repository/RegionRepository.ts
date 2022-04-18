import { Region } from "@/types/Region";
import { Status } from "@/types/Status";
import { BaseRepository } from "./BaseRepository";

export class RegionRepository extends BaseRepository<Region> {
  protected createRegionFromData(data: { id: string; title: string }): Region {
    const region = new Region();
    region.id = data.id;
    region.title = data.title;
    region.status = Status.OK;
    return region;
  }
}
