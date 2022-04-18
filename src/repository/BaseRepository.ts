import regionsData from "../data/svg/regions.json";

export abstract class BaseRepository<T> {
  public getAll(): T[] {
    return this.getAllBy();
  }

  public getAllBy(key?: keyof T, value?: any): T[] {
    const regions: T[] = [];
    (regionsData as unknown as T[]).forEach((region) => {
      if (key && region[key] !== value) {
        return;
      }
      regions.push(this.createRegionFromData(region));
    });
    return regions;
  }

  public getByIds(ids: string[]): T[] {
    const list: T[] = [];
    for (const region of regionsData) {
      if (ids.indexOf(region.id) !== -1) {
        list.push(this.createRegionFromData(region));
      }
    }
    return list;
  }

  protected createRegionFromData(data: any): T {
    return data as T;
  }
}
