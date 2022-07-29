import { RegionStatus } from "@/types/RegionStatus";
import { Status } from "@/types/Status";
import { ComposerTranslation } from "vue-i18n";
import { getDatesDiff } from "../../../date";
import { TitleGeneratorInterface } from "../TitleGeneratorInterface";

const I18N_HOURS_SHORT = "message.region_info_hours_short";
const I18N_MINUTES_SHORT = "message.region_info_minutes_short";

export class Minutes implements TitleGeneratorInterface {
  constructor(private translateFunction: ComposerTranslation) {}

  generate(regionStatus: RegionStatus): string {
    if (!regionStatus?.date || regionStatus.status === Status.OK) {
      return "";
    }

    const dateDiff = getDatesDiff(regionStatus.date, new Date());
    dateDiff.h = dateDiff.d * 24 + dateDiff.h;

    return (
      this.translateFunction(I18N_HOURS_SHORT, dateDiff.h) +
      " " +
      this.translateFunction(I18N_MINUTES_SHORT, dateDiff.m)
    );
  }
}
