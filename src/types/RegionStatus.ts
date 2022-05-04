import { RegionId } from "./Region";
import { Status } from "./Status";

export class RegionStatus {
  public constructor(
    public regionId: RegionId,
    public status: Status,
    public date?: Date
  ) {}
}
