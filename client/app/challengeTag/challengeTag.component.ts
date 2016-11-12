'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './challengeTag.routes';

export class ChallengeTagComponent {
  L;
  mapboxKey;
  map;
  markers = [];
  myIcon;
  /*@ngInject*/
  constructor(appConfig) {
    this.L = L;
    this.mapboxKey = appConfig.mapboxKey;
    this.initMap();
    this.markers = [];
    this.map;
    this.challenge = {
      classes: [
        {
          name: 'Forest'
        },
        {
          name: 'Water'
        },
        {
          name: 'Other'
        }
      ]
    }
    this.selectedClassIndex = 0;
  }

  initMap() {
    this.L.mapbox.accessToken = this.mapboxKey;

    this.map = this.L.mapbox.map('map', 'mapbox.satellite')
      .setView([54.559322, -5.767822], 20)
    this.removeControls(this.map);
    this.map.on('click', e => {
      this.handleClick(e)
    });
  }

  removeControls(map){
    /*map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.zoomControls.disable();
    map.dragRotate.disable();
    map.dragPan.disable();
    map.keyboard.disable();
    map.doubleClickZoom.disable();
    map.touchZoomRotate.disable();*/

  }

  handleClick(e){
    var marker = this.L.marker(e.latlng);
    marker.on('click', e => {
      this.handleMarkerClick(e);
    });
    this.markers.push(marker);
    marker.addTo(this.map);
  }

  handleMarkerClick(e){
    this.removeMarker(e.target);
    e.originalEvent.preventDefault();
  }

  removeMarker(target){
    this.map.removeLayer(target);
    this.markers.forEach((marker, m) =>{
      if(marker._leaflet_id == target._leaflet_id){
        console.log('Splicing at ' + m)
        this.markers.splice(m, 1);
        console.log(this.markers);
      }
    })
  }

  save(){
    console.log(this.markers)
    this.posted = {
      labels: []
    }
    this.markers.forEach((marker, m) => {
      var label = {
        geo: marker._latlng
      }
      this.posted.labels.push(label);
    })
    //save
  }

  /*
  var myIcon = this.L.icon({
    iconUrl: 'assets/images/my-icon.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
  });
  */
}


export default angular.module('geosourcerApp.challengeTag', [uiRouter])
  .config(routes)
  .component('challengeTag', {
    template: require('./challengeTag.html'),
    controller: ChallengeTagComponent,
    controllerAs: 'tagCtrl'
  })
  .name;
