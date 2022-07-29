import { TitleGeneratorInterface } from "../TitleGeneratorInterface";

export class None implements TitleGeneratorInterface {
  generate(): string {
    return "";
  }
}
