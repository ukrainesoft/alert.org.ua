import { RegionId } from "./Region";
import { RegionStatus } from "./RegionStatus";

export class RegionInfo {
  constructor(public id: RegionId, public regionStatus: RegionStatus) {}
}
