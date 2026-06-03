import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Kurs } from '../models/kurser';
import { firstValueFrom } from 'rxjs';

//För att man ska kunna använda detta i hela min webbplats
@Injectable({
  providedIn: 'root',
})
export class KursService {
  //url till json-filen hos miun, har lagt den lokalt i public
  private url: string ="/miun_courses.json";
/*Hämtar httpclient så att servicen kan göra en http-förfrgan.
Filen ligger lokalt i public men har ändå kvar denna eftersom jag använder localhost och det kanske behövs då*/
  http = inject(HttpClient);

  //Hämtar kurserna från json-filen och returnerar det i sin tur som en lista med alla kursobjekt
  async loadKurser(): Promise<Kurs[]> {
    const kurser = this.http.get<Kurs[]>(this.url);
    return await firstValueFrom(kurser);
  }
}
