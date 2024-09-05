import { Routes } from '@angular/router';
import { LeafletComponent } from './components/leaflet/leaflet.component';

export const routes: Routes = [
    {path: "leaflet", component: LeafletComponent, pathMatch: 'full'},
    {path: "*", redirectTo: "leaflet"}
];
