import {Price} from "./price.model";

export class Item {
  public id: string;
  public title: string;
  public price: Price;
  public picture: string;
  public condition: string;
  public free_shipping: boolean;
  public state: string;
  public sold_quantity: number;
  public description: number;


  constructor(id?: string,
              title?: string,
              price?: Price,
              picture?: string,
              condition?: string,
              free_shipping?: boolean,
              state?: string,
              sold_quantity?: number,
              description?: number) {

    this.id = id;
    this.title = title;
    this.price = price;
    this.picture = picture;
    this.condition = condition;
    this.free_shipping = free_shipping;
    this.state = state;
    this.sold_quantity = sold_quantity;
    this.description = description;
  }
}
