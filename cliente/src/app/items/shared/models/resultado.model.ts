import {Author} from "./author.model";
import {Item} from "./item.model";

export class Resultado {
  public author: Author;
  public categories: string[];
  public items: Item[];
}
