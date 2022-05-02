import { Region } from "./Region";
import { Status } from "./Status";

export class RegionStatus {
  public constructor(
    public region: Region,
    public status: Status,
    public date?: Date
  ) {}
}
