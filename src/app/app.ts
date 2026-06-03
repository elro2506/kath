import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('kath-university');
//Kollar om menyn är öppen eller stängd (främst för responsivt läge)
  menuOpen = false;

  //Öppnar och stänger menyn när man klickar på menyknappen
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  //Stänger menyn om man tar sig vidare, tex när man klickar på en länk
  closeMenu(): void {
    this.menuOpen = false;
  }
}


