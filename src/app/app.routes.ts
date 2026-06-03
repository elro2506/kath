import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Kurser } from './pages/kurser/kurser';
import { Ramschema } from './pages/ramschema/ramschema';
import { About } from './pages/about/about';
import { Notfound } from './pages/notfound/notfound';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'kurser', component: Kurser },
    { path: 'ramschema', component: Ramschema },
    { path: 'about', component: About },
    { path: "", redirectTo: "home", pathMatch: 'full'},
    { path: '**', component: Notfound }
];
