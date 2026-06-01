import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Kurs } from '../models/kurser';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KursService {
  private url: string ="/miun_courses.json";

  http = inject(HttpClient);

  //Ladda kurser
  async loadKurser(): Promise<Kurs[]> {
    const kurser = this.http.get<Kurs[]>(this.url);
    return await firstValueFrom(kurser);
  }
}
