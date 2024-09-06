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
  map!: L.Map;
  popup = L.popup();
  posicao!: any;

  ngOnInit() {
    this.map = L.map("map").setView([-24.652, -51.432], 8);
    let osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    var clean = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      minZoom: 4,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    });
    let googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      minZoom: 4,
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    var satelite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      minZoom: 4,
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });
    osm.addTo(this.map);

    var baseMap = {
      "OSM": osm,
      "Clean": clean,
      "Google Streets": googleStreets,
      "Satelite": satelite
    }

    let marker = L.marker([-25.520, -54.556], { draggable: true }).addTo(this.map);
    let circle = L.circle([-24.954, -53.471], {
      color: "green",
      fillOpacity: 0.5,
      radius: 5000
    });
    let polygon = L.polygon([
      [-25.091, -54.247],
      [-25.356, -54.243],
      [-25.295, -54.093]
    ], {
      color: "blue"
    });

    marker.bindPopup("Foz do Iguaçu");
    circle.bindPopup("Cascavel");
    polygon.bindPopup("SMI, Med, Missal");

    var areas = L.layerGroup([circle, polygon]);

    var overlayMaps = {
      "Marcadores": marker,
      "Areas": areas
    }

    L.control.layers(baseMap, overlayMaps).addTo(this.map);

    this.map.on('click', this.onMapClick);

    let getPosition = (position: GeolocationPosition) => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      let acc = position.coords.accuracy;
      let posicao = L.circle([lat, long], {
        radius: acc
      }).bindPopup("EU").addTo(this.map);
      areas.addLayer(posicao);
      console.log(position);
    }

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(getPosition);
    } else {
      window.alert("Navegador não suporta localização");
    }
  }

  onMapClick = (e: any) => {
    this.popup.setLatLng(e.latlng)
              .setContent("You clicked the map at " + e.latlng.toString())
              .openOn(this.map);
  }
}
