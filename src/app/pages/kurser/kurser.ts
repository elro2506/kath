/*Detta berör kurssidan. Jag hämtar kurser från JSON-filen, sparar dem i en lista, filtrerar dem baserat på vad man skriver
i sökfältet, väljer ämne, sorterar utifrån rubriker och har en funktion för att skicka kurser som man lägger till, till ramschemat*/
import { Component, computed, inject, signal } from '@angular/core';
import { Kurs } from '../../models/kurser';
//Importerar KursService från services, och det är där som jag tämtar alla kurser från JSON-filen
import { KursService } from '../../services/kurser';
//Importerar RamschemaService som håller koll på ramschemat
import { RamschemaService } from '../../services/ramschema';

@Component({
  selector: 'app-kurser',
  imports: [],
  templateUrl: './kurser.html',
  styleUrl: './kurser.css',
})

//Allt innanför denna export kan användas av kurser.html
export class Kurser {
  /*En lista med Kurs-object, som är hämtade från models/kurser. Det skapas med signalen som innehåller listan med kurser. Börjar
  med en tom lista, därav []. Den fylls sedan på med kurserna när JSON-filen laddats*/
kursschema = signal<Kurs[]>([]);
//Felmeddelande om något skulle gå fel när kuserna ska hämtas
error = signal<string | null>(null);
/*Signal för att bestämma vilken kolumn som tabellen ska sorteras efter när den laddas, i mitt fall på kurskod. keyof Kurs innebär
att värdet (courseCode) är ett fält som måste finnas i interfacet Kurs*/
sortColumn = signal<keyof Kurs>('courseCode');
//Hämtar med inject från RamschemaService så attjag kan använda metoder som finns den servicen
ramschemaService = inject(RamschemaService);
//Denna metod körs när man klickar på Lägg till i tabellen, är kopplat till Lägg till-knappen i kurser.html
addRamschema(kurs: Kurs): void {
  this.ramschemaService.addKurs(kurs);
}
//Sorteringen när man klickar på en rubrik i tabellen. Varje th i kurser.html har en sortBy-kod som hör ihop med detta
sortBy(column: keyof Kurs) {
  this.sortColumn.set(column);
}
/*En signal som sparar det man skriver i sökfältet, i början är den tom. När man börjar skriva uppdateras tabellen, i input-fältet i
kurser.html har jag skrivit ...(input)="filterText.set($any($event.target).value) som hör ihop med detta och betyder ungefär
"varje gång något skrivs, uppdatera filterText*/
filterText = signal("");
/*Nästan som filterText men här väljer man från färdig select-lista med olika ämnen som finns, dessa är hämtade från
JSON-filen. Från början är den tom och innehåller alla ämnen*/
selectedSubject = signal("");
subjects = computed(() => {
  //Går igenom alla kurser och tra fram ämne från varje kurs
const allSubjects = this.kursschema().map(kurs => kurs.subject);
/*För att undvika dubbletter och sortera ämnena i alfabetisk ordning. Hör ihop med select i kurser.html så att jag inte
behöver skriva alla ämnen manuellt*/
return [...new Set(allSubjects)].sort();
});
/*En computed signal som skapar den listan som faktiskt visas i min tabell. Denna computed är påverkad av filterText,
selectedSubject, sortColumn och kursschema. Så varje gång man söker, väljer ämne eller sorterar,s å uppdateras listan*/
filterCourses = computed(() => {
  //Först hämtas alla värden, i filterText tar jag bort eventuella mellanslag i början och slut, och gör att det blir små bokstäver
  const filter = this.filterText().trim().toLocaleLowerCase();
  //Detta hämtar valt ämne
  const subject = this.selectedSubject();
  //Detta hämtar vilken kolumn man ska sortera listan på
  const column = this.sortColumn();
//Här hämtar jag kurserna innan den filtreras
  let courses = this.kursschema();

  /*Om någon har skrivit något i sökfältet, ska kurslistan filtreras utefter det. Den kollar kurskod eller kursnamn, alltså
  inte progression, kursplan eller poäng*/
  if(filter) {
    courses = courses.filter(kurs => 
      /*Om kurskoden/kursnamnet innehållet ordet som skrivs i sökfältet*/
    kurs.courseCode.toLowerCase().includes(filter) || 
    kurs.courseName.toLowerCase().includes(filter)
  );
}

/*Ungefär som ovan, om man har valt ett ämne så visas bara kurserna som tillhör det ämnet. Detta körs inte om man inte valt ämne*/
if(subject) {
  courses = courses.filter(kurs => kurs.subject === subject);
}
/*Det är här som listan returneras så att man ser på webbplatsen. Den ersätter inte originallistan utan blir som en kopia.
LocalCompare används för att jämförta texter och sortera. Dvs jämför string a med string b och se vad som
kommer först i den alfabetiska ordningen*/
return [...courses].sort((a, b) => String(a[column]).localeCompare(String(b[column])));
});

//Hämtar in KursService, som jag använder för att hämta kursdatan från JSON-filen
kursService = inject(KursService);

//Körs när componenten startas
ngOnInit() {
  //Hämta kurserna när kurssidan öppnas
  this.loadKursschema();
}

//Asynkron funktion för att hämta filen, läsa filen och sen ge tillbaka datan, för JSON-filen laddar inte alltid jättesnabbt
async loadKursschema() {
  //Försök att hämta kurserna från KursService
  try {
    //Det är denna rad som hämtar själva kurslistan
const response = await this.kursService.loadKurser();
/*Här sparas kurserna i signalen kursschema, den börjar ju som tom men här fylls den på och hämtas i denna funktion. Dvs
innan är den tom [] och nu fylls den på med kurserna*/
this.kursschema.set(response);
  } catch(error) {
console.log(error);
this.error.set("Kunde inte ladda data");
  }
}
}