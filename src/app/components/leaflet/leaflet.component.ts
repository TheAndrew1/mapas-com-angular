import { Component } from '@angular/core';
import L from 'leaflet';

@Component({
  selector: 'app-leaflet',
  standalone: true,
  imports: [],
  templateUrl: './leaflet.component.html',
  styleUrl: './leaflet.component.css'
})
export class LeafletComponent {
  map!: any;

  ngOnInit() {
    this.map =L.map("map").setView([-13.758035, -52.735660], 5);
    let osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 4,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    osm.addTo(this.map);
  }
}
