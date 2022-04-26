import { Status } from "./Status";

export class Region {
  public id!: string;
  public title?: string;
  public status: Status = Status.OK;
}
