import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';


@Injectable({ providedIn: 'root' })
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = '2rKkIxvbQInax0G1ucLTJqdVCKk2aLp9';
  private serviceURL: string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient ) { }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    //* convierte a minúsculas el texto introducido en el buscador
    tag = tag.toLowerCase();

    //* filtra el contenido en la lista para que solo pase el contenido distinto a tag
    this._tagsHistory = this._tagsHistory.filter( oldTag => oldTag !== tag );

    //* introduce en la primera posición de _tagsHistory el valor de tag
    this._tagsHistory.unshift( tag );

    //* se queda solo con los 10 primeros valores de _tagsHistory
    this._tagsHistory = this._tagsHistory.splice(0, 10);
  }

  async searchTag( tag: string ): Promise<void> {
    //* remplaza los espacios múltiples por uno solo y elimina aquellos al principio y
    //* al final del string
    tag = tag.replace(/\s+/g, ' ').trim();
    if ( tag.length === 0 ) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag );

    this.http.get<SearchResponse>(`${ this.serviceURL }/search`, { params })
      .subscribe( resp => {

        this.gifList = resp.data;
        console.log({ gifs: this.gifList });

      })

  }

}
