//Service för att hålla koll på listan med kurser, lägg till en kurs (men inte dubbletter), ta bort en kurs
import { Injectable, signal } from '@angular/core';
import { Kurs } from '../models/kurser';

//Injectable = att detta är en service som Angular kan använda på flera ställen
@Injectable({
  providedIn: 'root'
})

//Här gör jag all logik för att lägga till, ta bort och spara kurser i localStorage
export class RamschemaService {
  //Börjar med tom lista OM det inte finns något från localStorage. Går alltså att ladda om sidan och ändå ha kvar
  ramschema = signal<Kurs[]>(this.getFromLocalStorage());

  //Denna funktion körs när man trycker på Lägg till inne på kurs-sidan
  addKurs(kurs: Kurs): void {
    //Kontrollerar så det inte är en dubblett
    //this.ramschema är redan valda kurser, man kontrollerar om kurskod redan finns
    const alreadyExists = this.ramschema().some(valdKurs => valdKurs.courseCode === kurs.courseCode);

    //Om kurskoden inte redan finns, skapas en ny lista med nya kursen också.
    if (!alreadyExists) {
      //de tre punkterna innebär att det gamla innehållet finns med i nya listan
      const updateRamschema = [...this.ramschema(), kurs];
      this.ramschema.set(updateRamschema);
      //Efter att listan har uppdaterats så sparas det också i localStorage
      this.saveInLocalStorage();
    }
  }

  //Funktion för att ta bort en kurs från ramschemat, det uitgår från kurskoden eftersom den är unik
  deleteKurs(courseCode: string): void {
    //Skapar en ny lista där man tagit bort den valda kurskoden, dvs behåll bara kurserna som inte är desamma som denna kurskod
    const updateRamschema = this.ramschema().filter(kurs => kurs.courseCode !== courseCode);

    //Uppdatera ramschemat därefter och spara i localStorage
    this.ramschema.set(updateRamschema);
    this.saveInLocalStorage();
  }

  //Funktion för att spara ramschemat i webbläsaren. Private = bara i denna service
  private saveInLocalStorage(): void {
    //JSON.stringify behövs för att kunna spara det korrekt
    localStorage.setItem('ramschema', JSON.stringify(this.ramschema()));
  }

  //Hämtar listan som ovan sparats i 'ramschema', om inget sparats så blir det inget värde
  private getFromLocalStorage(): Kurs[] {
    const savedRamschema = localStorage.getItem('ramschema');

    //Om det finns något sparat så görs det om till en Javascript-lista igen (behöver använda parse efter stringify)
    if (savedRamschema) {
      return JSON.parse(savedRamschema);
    }
    //Om inget finns så visas inget, då blir det tomt
    return [];
  }
}
