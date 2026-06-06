/*Här styrs ramschemat och hämtar kurserna som man lägger till från kurssidan. Det går att ta bort kurser
och se totalpoäng*/
import { Component, computed, inject } from '@angular/core';
//Importerar min ramschema-service som håller koll på vilka kurser som finns i ramschemat och sparar dem i localStorage
import { RamschemaService } from '../../services/ramschema';

@Component({
  selector: 'app-ramschema',
  imports: [],
  templateUrl: './ramschema.html',
  styleUrl: './ramschema.css',
})

//Det som finns här under kan användas i ramschema.html
export class Ramschema {
  //Hämtar in RamschemaService så att komponenten kan använda den
  ramschemaService = inject(RamschemaService);

  //Gör en koppling till ramschemat som är i servicen, det är därför jag kan använda @for i html-koden
  ramschema = this.ramschemaService.ramschema;

  //Uträkning av totalpoängen, baserat på listan med valda kurser i ramschemat. Det räknas om om man lägger till/raderar kurs
  totalPoints = computed(() => {
    //Reduce lägger ihop poängen, dvs reducerar till ett totalvärde, från det som hittils räknats ihop + den aktuella kursen
    return this.ramschema().reduce((summa, kurs) => summa + kurs.points, 0);
  });

  //Detta hör ihop med deleteKurs i servicen, och tar bort vald kurs från ramschemat
  deleteKurs(courseCode: string): void {
    this.ramschemaService.deleteKurs(courseCode);
  }
}
