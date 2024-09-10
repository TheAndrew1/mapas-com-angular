import { Component, inject } from '@angular/core';
import { Camera } from '../../models/camera';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import L, { LeafletMouseEvent, Marker, markerClusterGroup } from 'leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
//@ts-ignore
import { estadosJSON } from "../../../assets/brazil-states.js";
import { Router } from '@angular/router';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [LeafletModule, LeafletMarkerClusterModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent {
  router = inject(Router);

  layersControl = {
    baseLayers: {
      "OSM": L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, minZoom: 4, attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors" })
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
    new Camera("São Paulo", -23.569, -46.669),
    new Camera("Campinas", -22.904, -47.059)
  ];

  cluster: L.MarkerClusterGroup[] = [];
  clusterOptions: L.MarkerClusterGroupOptions = {
  }

  posicao!: any;

  ngOnInit() {
    let estados = {
      "Paraná": [] as Marker[],
      "São Paulo": [] as Marker[]
    }
    let markers = []
    for(let camera of this.cameras) {
      let marker = L.marker([camera.lat, camera.long]);
      if(camera.cidade != "São Paulo" && camera.cidade != "Campinas")
      {
        estados["Paraná"].push(marker.bindPopup(`<h4>${camera.cidade}</h4>`));
      } else {
        estados["São Paulo"].push(marker.bindPopup(`<h4>${camera.cidade}</h4>`));
      }
      markers.push(marker.bindPopup(`
        <h4>${camera.cidade}</h4>
        <a href="/leaflet">Buscar na camera</a>
        `));
    }
    this.cluster[0] = markerClusterGroup();
    this.cluster[1] = markerClusterGroup();
    this.cluster[0].addLayers(estados["Paraná"]);
    this.cluster[1].addLayers(estados["São Paulo"]);
    this.layersControl.overlays = {
      "Paraná": this.cluster[0],
      "São Paulo": this.cluster[1]
    };
    let overlay = L.layerGroup(markers);

    let marker = L.marker([-23.448, -51.933]).bindPopup("<h4>Maringá</h4>").on("click", () => {
      this.router.navigate(["leaflet"])
    });
    this.cluster[0].addLayer(marker);

    let json = L.geoJSON(estadosJSON);
    (this.layersControl.overlays as any)["Estados"] = json;
  }

  pegarPosicao(e: LeafletMouseEvent){
    this.posicao = e.latlng;
  }
}