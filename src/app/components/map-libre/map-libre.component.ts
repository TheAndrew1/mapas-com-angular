import { Component } from '@angular/core';
import maplibregl from 'maplibre-gl';

@Component({
  selector: 'app-map-libre',
  standalone: true,
  imports: [],
  templateUrl: './map-libre.component.html',
  styleUrl: './map-libre.component.css'
})
export class MapLibreComponent {
  map!: any;
  ngOnInit(){
    this.map = new maplibregl.Map({
      container: 'map', // container id
      style: 'https://demotiles.maplibre.org/style.json', // style URL
      center: [0, 0], // starting position [lng, lat]
      zoom: 5// starting zoom
    });
  }
}
