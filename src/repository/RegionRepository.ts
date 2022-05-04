import { RegionId } from "@/types/Region";
import { BaseRepository } from "./BaseRepository";

export class RegionRepository extends BaseRepository<RegionId> {
  protected createFromData(data: { id: string }): RegionId {
    return data.id;
  }
}
