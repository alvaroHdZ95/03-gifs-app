import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GifsService {

  private _tagsHistory: string[] = [];

  constructor() { }

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

  searchTag( tag: string ): void {
    //* remplaza los espacios múltiples por uno solo y elimina aquellos al principio y
    //* al final del string
    tag = tag.replace(/\s+/g, ' ').trim();
    if ( tag.length === 0 ) return;
    this.organizeHistory(tag);

    console.log(this._tagsHistory);
  }

}
