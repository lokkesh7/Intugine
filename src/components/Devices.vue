<template>
  <div id="devices overflow-auto">
    <h1>Devices</h1>
    <ul class="list-group" id="devices">
    	<li class="list-group-item" v-for="device in deviceData">
    		<input type="checkbox" v-on:click="fetchLocation(device.device, $event)" :value="device.device">
    		{{device.device}}
    	</li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "Devices",
  created() {
    // Dispatching action to fetch devices from actions in store.js
  	this.$store.dispatch('fetchDevices')
  },
  computed: {
  	deviceData() {
      // Accessing state from getters in store.js via computed property
  		 return this.$store.getters.getDevices
  	}
  },
  methods: {
  	fetchLocation(value, event) {
  		if(event.target.checked) {
        // Dispatching action to fetch device location from actions in store.js if checkbox is checked
  			this.$store.dispatch('fetchDeviceLoc',{value: value, checked: event.target.checked})
  		} else if(!event.target.checked) {
        // Dispatching action to clear device location from actions in store.js if checkbox is unchecked
  			this.$store.dispatch('clearDeviceLoc', {value: value, checked: event.target.checked})
  		}
  	}
  }
};
</script>

<style scoped>

	.list-group{
	max-height: 694px;
    margin-bottom: 10px;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    list-style-type:none;
}
</style>