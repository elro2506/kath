import { Component, computed, inject, signal } from '@angular/core';
import { Kurs } from '../../models/kurser';
import { KursService } from '../../services/kurser';

@Component({
  selector: 'app-kurser',
  imports: [],
  templateUrl: './kurser.html',
  styleUrl: './kurser.css',
})
export class Kurser {
kursschema = signal<Kurs[]>([]);
error = signal<string | null>(null);
sortColumn = signal<keyof Kurs>('courseCode');
sortBy(column: keyof Kurs) {
  this.sortColumn.set(column);
}

filterText = signal("");
selectedSubject = signal("");
subjects = computed(() => {
const allSubjects = this.kursschema().map(kurs => kurs.subject);
return [...new Set(allSubjects)].sort();
});
filterCourses = computed(() => {
  const filter = this.filterText().trim().toLocaleLowerCase();
  const subject = this.selectedSubject();
  const column = this.sortColumn();

  let courses = this.kursschema();

  if(filter) {
    courses = courses.filter(kurs => 
    kurs.courseCode.toLowerCase().includes(filter) || 
    kurs.courseName.toLowerCase().includes(filter)
  );
}

if(subject) {
  courses = courses.filter(kurs => kurs.subject === subject);
}

return [...courses].sort((a, b) => String(a[column]).localeCompare(String(b[column])));
});

kursService = inject(KursService);

//Körs när användargränssnittet är renderat och klart
ngOnInit() {
  this.loadKursschema();
}

async loadKursschema() {
  try {
const response = await this.kursService.loadKurser();
this.kursschema.set(response);
console.table(this.kursschema());
  } catch(error) {
console.log(error);
this.error.set("Kunde inte ladda data");
  }
}
}