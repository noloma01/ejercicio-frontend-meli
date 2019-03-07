import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs/index";
import {catchError, map} from "rxjs/internal/operators";
import {Resultado} from "./models/resultado.model";
import {MessageService} from "../../message.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class ItemsService {

  private url = 'http://localhost:3000/api';

  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  public getResultados(filtro: string = ''): Observable<Resultado> {
    return this.http.get<any[]>(this.url + '/items?q=' + filtro, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    }).pipe(
      map(resultado => resultado[0]),
      catchError(this.handleError('Get Productos', []))
    );
  }

  public getItemById(id: string): Observable<Resultado> {
    return this.http.get<any[]>(this.url + '/items/' + id, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    }).pipe(
      map(resultado => resultado[0]),
      catchError(this.handleError('Get Item By id', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`Items: ${message}`);
  }

}
