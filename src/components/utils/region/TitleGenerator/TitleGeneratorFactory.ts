import { Mode } from "./Mode";
import { Minutes } from "./generator/Minutes";

import { ComposerTranslation } from "vue-i18n";
import { Name } from "./generator/Name";
import { None } from "./generator/None";
import { TitleGeneratorInterface } from "./TitleGeneratorInterface";

export class TitleGeneratorFactory {
  constructor(private translateFunction: ComposerTranslation) {}

  create(mode: Mode): TitleGeneratorInterface {
    if (mode === Mode.MINUTES) {
      return new Minutes(this.translateFunction);
    }
    if (mode === Mode.NAME) {
      return new Name(this.translateFunction);
    }
    return new None();
  }
}
