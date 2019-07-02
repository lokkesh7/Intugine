<template>
  <div class="dashboard">
  	<div class="row">
    <!--imported google maps component-->
	  <div class="col-10"><Gmaps /></div>
    <!--imported Device component-->
	  <div class="col-2"><Devices /></div>
	</div>
  </div>
</template>

<script>
// @ is an alias to /src
import Gmaps from '@/components/Gmaps.vue'
import Devices from '@/components/Devices.vue'

export default {
  name: 'dashboard',
  components: {
    Gmaps,
    Devices
  }
}
</script>
