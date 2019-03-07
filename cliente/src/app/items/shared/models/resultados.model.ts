import {Author} from "./author.model";
import {Item} from "./item.model";

export class Resultados {
  public author: Author;
  public categories: string[];
  public items: Item[];


  constructor(author?: Author, categories?: string[], items?: Item[]) {
    this.author = author;
    this.categories = categories;
    this.items = items;
  }
}
