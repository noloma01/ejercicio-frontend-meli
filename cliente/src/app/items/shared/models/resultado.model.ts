import {Author} from "./author.model";
import {Item} from "./item.model";

export class Resultado {
  public author: Author;
  public item: Item;


  constructor(author?: Author, item?: Item) {
    this.author = author;
    this.item = item;
  }
}
