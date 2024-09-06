import { Routes } from '@angular/router';
import { LeafletComponent } from './components/leaflet/leaflet.component';
import { MapaComponent } from './components/mapa/mapa.component';

export const routes: Routes = [
    {path: "leaflet", component: LeafletComponent, pathMatch: 'full'},
    {path: "mapa", component: MapaComponent, pathMatch: 'full'},
    {path: "*", redirectTo: "leaflet"}
];
