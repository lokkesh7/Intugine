<template>
  <div id ="map">
  </div>
</template>

<script>
import customSort from '@/utils/sort'

export default {
  name: "GoogleMap",
  data() {
    return {
      values: [],
      map: null,
      allMarker: [],
      icon: null,
      polyline: null,
      polyLineCoord: []
    };
  },

   mounted() {
    //creating maps instance
    this.map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 28.645, lng: 77.217 },
            scrollwheel: false,
            zoom: 5,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            })
    this.icon = 'https://assetsstatic.s3.ap-south-1.amazonaws.com/navigation.svg'
  },
  computed: {
    getLocation() {
      // Accessing state(location by device) from getters in store.js via computed property
      return this.$store.state.resultByDevice
    },
    getChecked() {
      // Accessing state(checkbox event) from getters in store.js via computed property
      return this.$store.state.checked
    }
  },
  watch: {
    //Setting up watchers for state update in store.js
    getLocation(newValue, oldValue) {
      let newResult = Object.values(newValue)
      this.values = this.values.concat(...newResult)
      this.addMarker()
    },
    getChecked(newValue, oldValue) {
      if(newValue === false) {
        for (var i = 0; i < this.allMarker.length; i++) {
          this.allMarker[i].setMap(null)
        }
        this.allMarker = []
        this.values = []
        this.polyline.setMap(null)
        this.polyLineCoord = []
      }
    }
  },
  methods: {
    //Method to add markers in the google map for given position
    addMarker() {
          let prevLoc = {}
          let marker = {}
          this.value 
          const markers = this.values.map(x => {
            if (!Object.keys(x.position).length) {
              marker = new window.google.maps.Marker({
                position: {
                lat : prevLoc.position.lat,
                lng : prevLoc.position.lng
                },
                icon: this.icon,
                map: this.map
              })
              prevLoc = prevLoc
            } else {
              marker = new window.google.maps.Marker({
                position: {
                lat : x.position.lat,
                lng : x.position.lng
                },
                icon: this.icon,
                map: this.map
              })
              prevLoc = x
            }
    //Aligning marker position based on the direction of travel        
            this.allMarker.push(marker)
            let markers = marker.getPosition()
            marker.setPosition(new window.google.maps.LatLng(
                x.position.lat,
                x.position.lng
              ))
          });

          this.values.forEach((elem) => {
            let LatLng = new window.google.maps.LatLng(elem.position.lat, elem.position.lng)
            this.polyLineCoord.push(LatLng)
          })
          this.polyline = new window.google.maps.Polyline({
            path: this.polyLineCoord,
            geodesic: true,
            strokeOpacity: 1.0,
            strokeColor: '#FF0000',
            strokeWeight: 2,
            map: this.map
          })
          

    },
  }
};
</script>

<style scoped>
    #map {
    height:750px;
    width: 100%;
   }
</style>















