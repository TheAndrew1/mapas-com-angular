import { Component } from '@angular/core';
import { Camera } from '../../models/camera';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import L, { latLng, marker } from 'leaflet';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent {
  layersControl = {
    baseLayers: {
      "OSM": L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors" })
    },
    overlays: {
    }
  }

  options: L.MapOptions = {
    layers: [
      this.layersControl.baseLayers.OSM
    ],
    zoom: 8,
    center: L.latLng(-24.652, -51.432)
  };

  cameras: Camera[] = [
    new Camera("Foz do Iguaçu", -25.520, -54.556),
    new Camera("Cascavel", -24.954, -53.471),
    new Camera("Guarapuava", -25.368, -51.481),
    new Camera("Ponta Grossa", -25.136, -50.164),
    new Camera("Curitiba", -25.430, -49.281),
  ];

  ngOnInit() {
    let markers = []
    for(let camera of this.cameras) {
      let marker = L.marker([camera.lat, camera.long]);
      markers.push(marker.bindPopup(`<h4>${camera.cidade}</h4>`));
    }
    let overlay = L.layerGroup(markers);
    this.layersControl.overlays = { "Cidades": overlay }

    let marker = L.marker([-23.448, -51.933]).bindPopup("<h4>Maringá</h4>");
    overlay.addLayer(marker);
  }
}
