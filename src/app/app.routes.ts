import { Routes } from '@angular/router';
import { MapLibreComponent } from './components/map-libre/map-libre.component';
import { LeafletComponent } from './components/leaflet/leaflet.component';

export const routes: Routes = [
    {path: "map-libre", component: MapLibreComponent, pathMatch: 'full'},
    {path: "leaflet", component: LeafletComponent, pathMatch: 'full'},
    {path: "*", redirectTo: "/"}
];
