export type RegionName = string;
export enum StatusName {
  OK = "Відбій",
  ALERT = "F09F94B4", // Red symbol for "alert"
}
export class MessageDTO {
  constructor(
    public regionName: RegionName,
    public statusName: StatusName,
    public datetime: Date
  ) {}
}
