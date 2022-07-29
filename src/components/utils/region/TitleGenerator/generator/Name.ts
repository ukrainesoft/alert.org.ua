import { RegionStatus } from "@/types/RegionStatus";
import { ComposerTranslation } from "vue-i18n";
import { TitleGeneratorInterface } from "../TitleGeneratorInterface";

const I18N_PREFIX = "region.";

export class Name implements TitleGeneratorInterface {
  constructor(private translateFunction: ComposerTranslation) {}

  generate(regionStatus: RegionStatus): string {
    return this.translateFunction(I18N_PREFIX + regionStatus.regionId);
  }
}
