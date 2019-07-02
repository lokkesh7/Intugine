<template>
  <div id ="map">
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "GoogleMap",
  data() {
    return {
      values: [],
      map: null,
      allMarker: [],
      icon: null
    };
  },

   mounted() {
    //creating maps instance
    this.map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 28.645, lng: 77.217 },
            scrollwheel: false,
            zoom: 5
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
      console.log(this.values)
      this.addMarker()
    },
    getChecked(newValue, oldValue) {
      console.log(newValue)
      console.log(oldValue)
      console.log(this.allMarker)
      if(newValue === false) {
        for (var i = 0; i < this.allMarker.length; i++) {
          this.allMarker[i].setMap(null);
        }
        this.values = []
      }
    }
  },
  methods: {
    //Method to add markers in the google map for given position
    addMarker() {
          let prevLoc = {}
          let marker
          const markers = this.values.map(x => {
            if (!Object.keys(x.position).length) {
              marker = new google.maps.Marker({
                position: {
                lat : prevLoc.position.lat,
                lng : prevLoc.position.lng
                },
                icon: this.icon,
                map: this.map
              })
              prevLoc = prevLov
            } else {
              marker = new google.maps.Marker({
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
            console.log(marker)      
            this.allMarker.push(marker)
            // marker.setPosition(new google.maps.LatLng(
            //     x.position.lat,
            //     x.position.lng
            //   ))
          });
    }
  }
  // methods: {
  //   //Method to add markers in the google map for given position
  //   addMarker() {
  //         const markers = this.values.map(x => {
  //           let marker = new google.maps.Marker({
  //           position: {
  //           lat : x.position.lat,
  //           lng : x.position.lng
  //           },
  //           icon: this.icon,
  //           map: this.map
  //         })
  //   //Aligning marker position based on the direction of travel        
  //           this.allMarker.push(marker)
  //           marker.setPosition(new google.maps.LatLng(
  //               x.position.lat,
  //               x.position.lng
  //             ))
  //         });
  //   }
  // }
};
</script>

<style scoped>
    #map {
    height:750px;
    width: 100%;
   }
</style>















