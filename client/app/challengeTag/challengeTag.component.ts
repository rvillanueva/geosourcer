'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './challengeTag.routes';

export class ChallengeTagComponent {
  L;
  mapboxKey;
  map;
  markers = [];
  challenge;
  myIcon;
  geoLib;
  target;
  $http;
  $q;
  defaultZoom;
  challengeId;
  icons;
  selectedClassIndex;
  viewCenter;
  /*@ngInject*/

  constructor($http, $q, $stateParams, appConfig) {
    this.L = L;
    this.defaultZoom = 16;
    this.mapboxKey = appConfig.mapboxKey;
    this.challengeId = $stateParams.challengeId;
    this.markers = [];
    this.geoLib = require('geolib');
    this.map;
    this.challenge;
    this.$http = $http;
    this.$q = $q;
    this.target;
    this.icons = [
      'assets/images/markers/marker-1.png',
      'assets/images/markers/marker-2.png',
      'assets/images/markers/marker-3.png',
      'assets/images/markers/marker-4.png',
      'assets/images/markers/marker-5.png'
    ]
    console.log(this.getChallenge)
    this.getChallenge().then(challenge => {
      this.challenge = challenge;
      console.log(this.challenge);
      this.initMap();
    }).catch(err => {
      console.log(err)
    })
    this.selectedClassIndex = 0;
  }

  getChallenge(){
    return this.$q((resolve, reject) => {
      if(this.challengeId){
        this.$http.get('/api/challenges/' + this.challengeId).success(challenge => {
          resolve(challenge)
        })
        .error(err => {
          reject(err)
        })
      } else {
        reject();
        alert('No challenge id');
      }
    });
  }

  initMap() {
    this.L.mapbox.accessToken = this.mapboxKey;

    this.map = this.L.mapbox.map('map', 'mapbox.satellite')
    this.removeControls(this.map);
    this.selectNewView();
    this.map.on('click', e => {
      this.handleClick(e)
    });
  }


  removeControls(map){
    //map.dragging.disable();
  }

  handleClick(e){
    var myIcon = this.L.icon({
      iconUrl: this.icons[this.selectedClassIndex],
      iconSize: [14, 14],
      iconAnchor: [8, 8],
    });
    var marker = this.L.marker(e.latlng, {icon: myIcon});
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
    var posted = {
      labels: [],
      targetId: this.target._id,
      challengeId: this.challenge._id,
      viewCenter: this.viewCenter
    }
    this.markers.forEach((marker, m) => {
      var label = {
        geo: marker._latlng
      }
      posted.labels.push(label);
    })
  this.$http.post('/api/challenges/' + this.challenge._id + '/labels', posted)
    .success(res => {
      this.clearAllMarkers();
      this.selectNewView();
    })
    .catch(err => {
      alert(err);
    })
  }

  clearAllMarkers(){
    this.markers.forEach((marker, m) => {
      this.map.removeLayer(marker);
    })
    this.markers = []
  }

  selectNewView(){
    this.target = this.challenge.search.targets[Math.floor(Math.random() * this.challenge.search.targets.length)];
    var newBearing = Math.random() * 360;
    var newCenter = this.geoLib.computeDestinationPoint({
      latitude: this.target.geo.lat,
      longitude: this.target.geo.lng
    }, this.challenge.search.radiusKm*1000, newBearing);
    this.map.setView([newCenter.latitude, newCenter.longitude], this.defaultZoom)
    console.log(this.target, newCenter);
    this.viewCenter = {
      geo: {
        lat: newCenter.latitude,
        lng: newCenter.longitude
      }
    }
  }

  /*
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
