import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Kurser } from './pages/kurser/kurser';
import { Ramschema } from './pages/ramschema/ramschema';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'kurser', component: Kurser },
    { path: 'ramschema', component: Ramschema }
];
