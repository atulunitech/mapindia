import { Component, OnInit } from '@angular/core';
import { mappls, mappls_plugin } from 'mappls-web-maps';


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit{
  mapobject:any;
  mapplsClassObject:any= new mappls()
  mapplsPluginObject:any= new mappls_plugin()
  title = 'Map_angular';
  markerForAvailableProperty: any;
  markerForSoldProperty: any;
  geoDataForSoldProperty =
  {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties":
        {
          "htmlPopup": 
            `<p style="font-weight:bold"> 
               Builder Name : PV builder, 
               <br>
              Builder Email : pv@gmail.com 
              <br>
              <h1>Sold</h1>
              </p>`
        },
        "geometry":
        {
          "type": "Point",
          "coordinates": [28.544, 79.5454]
        }
      },
      {
        "type": "Feature",
        "properties":
        {
          "htmlPopup":
            `<p style="font-weight:bold"> 
               Builder Name : AK builder, 
               <br>
              Builder Email : ak@gmail.com 
              <br>
              <h1>Sold</h1>
              </p>`
        },
        "geometry":
        {
          "type": "Point",
          "coordinates": [28.27189158, 80.2158203125]
        }
      },
      {
        "type": "Feature",
        "properties":
        {
          "htmlPopup":
            `<p style="font-weight:bold"> 
               Builder Name : LP builder, 
               <br>
              Builder Email : lp@gmail.com 
              <br>
              <h1>Sold</h1>
              </p>`
        },
        "geometry":
        {
          "type": "Point",
          "coordinates": [28.549511, 80.2678250]
        }
      }
    ]
  };

geoDataForAvailableProperty =
  {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties":
        {
          "htmlPopup":
            `<p style="font-weight:bold"> 
               Builder Name : DK builder, 
               <br>
              Builder Email : dk@gmail.com 
              <br>
              <h1>Available</h1>
              </p>`
        },
        "geometry":
        {
          "type": "Point",
          "coordinates": [28.544, 79.6454]
        }
      },
      {
        "type": "Feature",
        "properties":
        {
          "htmlPopup":
            `<p style="font-weight:bold"> 
               Builder Name : MJ builder, 
               <br>
              Builder Email : mj@gmail.com 
              <br>
              <h1>Available</h1>
              </p>`
        },
        "geometry":
        {
          "type": "Point",
          "coordinates": [28.27189158, 80.3158203125]
        }
      },
      {
        "type": "Feature",
        "properties":
        {
          "htmlPopup":
            `<p style="font-weight:bold"> 
               Builder Name : AP builder, 
               <br>
              Builder Email : ap@gmail.com 
              <br>
              <h1>Available</h1>
              </p>`
        },
        "geometry":
        {
          "type": "Point",
          "coordinates": [28.549511, 80.3678250]
        }
      }
    ]
  };

  ngOnInit():void {
    const loadObject = {
      map: true,
      layer: 'raster', // Optional Default Vector
      version: '3.0', // Optional, other version 3.5 also available with CSP headers
      libraries: ['airspacelayers'], // Optional for Polydraw and airspaceLayers
      plugins: ['direction'], // Optional for any plugins

    };

  this.mapplsClassObject.initialize(
    'c5ee6261d6de3b6eed7d296ccc6a8164',
    loadObject,
    () => {
      this.mapobject = this.mapplsClassObject.Map({
        id: 'map',
        properties: {
          center: [28.61, 77.23],
          zoomControl: true,
          location: true,
        },
      });
      this.mapobject.on("load", () => {
        // Activites after mapload
        this.addingMarker()
      })
    }
    
  );

  }
  addingMarker() {
    /* Adding single marker */

    // this.markerObject = this.mapplsClassObject.Marker({
    //   map: this.mapObject,
    //   position: { lat: 18.407957, lng: 76.576767 },
    //   width: 25, // marker's icon width
    //   height: 40,
    // });

    // this.markerObject.setPosition({ lat: 18.407957, lng: 76.576767 });
    // this.markerObject.setIcon("https://apis.mapmyindia.com/map_v3/1.png");


    /* Adding multiple marker */
    this.markerForAvailableProperty= this.mapplsClassObject.Marker(
      {
        map: this.mapobject,
        position: this.geoDataForAvailableProperty,
        icon:  'https://cdn-icons-png.flaticon.com/512/25/25613.png',
        clusters: true,
        fitbounds: true,
        fitboundOptions:
        {
          padding: 120,
          duration: 1000
        },
        popupOptions:
        {
          offset: { 'bottom': [0, -20] }
        },
        width: 10, // marker's icon width
        height: 10,
      }
    );

    this.markerForSoldProperty = this.mapplsClassObject.Marker(
      {
        map: this.mapobject,
        position: this.geoDataForSoldProperty,
        icon: 'https://cdn-icons-png.flaticon.com/512/25/25613.png',
        clusters: true,
        fitbounds: true,
        fitboundOptions:
        {
          padding: 120,
          duration: 1000
        },
        popupOptions:
        {
          offset: { 'bottom': [0, -20] }
        },
        width: 10, // marker's icon width
        height: 10,
      }
    );

    this.markerForAvailableProperty.addListener('load', function () {
      console.log('markerForAvailableProperty loaded !!!!!!!!!!!!');
    });

    this.markerForSoldProperty.addListener('load', function () {
      console.log('markerForSoldProperty loaded !!!!!!!!!!!!');
    });

  }
}
