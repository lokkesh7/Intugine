import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import router from '../router'
import customAxios from '@/utils/axios-auth'
import sortArray from '@/utils/sort'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	token: null,
    devices: [],
    deviceLoc: [],
    resultByDevice: {},
    checked: null
  },
  mutations: {
    //Mutations are used to update state in store. Should be synchronous No Async code
  	authUser (state, userData) {
  		state.token = userData.token
  		router.replace('/dashboard')
  	},
  	clearAuthData (state) {
  		state.token = null,
      state.devices = []
  	},
    storeDevices (state, deviceData) {
      state.devices = [...deviceData]
    },
    setDeviceLocation(state, locData) {
      let deviceID = locData.deviceId
      state.resultByDevice = { [deviceID]: locData.result.map((item) => ({ position: { lat: item.gps[0], lng: item.gps[1] }}))}
      state.checked = locData.checked
    },
    removeLocation(state, values) {
      let { [values.value]: data, ...res } = state.resultByDevice;
      state.resultByDevice = {};
      state.checked = values.checked
    }
  },
  actions: {
    //Actions are used to commit data to state and to dispatch another action (Asynchronous code is implemented here)
  	login ({commit,dispatch}, authData) {
  		  let token = btoa(`${authData.username}:${authData.password}`)
        let basic_auth = `Basic ${token}`
  		  axios.defaults.headers.post['Authorization'] = basic_auth
  		  const expires = 3600 * 1000
        axios.post('https://dl5opah3vc.execute-api.ap-south-1.amazonaws.com/latest/login')
        .then(res => {
        	commit('authUser', {
        		token: res.data.token
        	})
        	const now = new Date()
        	const expirationDate = new Date(now.getTime() + expires)
        	localStorage.setItem('token', res.data.token)
        	localStorage.setItem('expirationDate', expirationDate)
        	dispatch('setLogoutTimer', expires)
        })
        .catch(error => console.log(error))
  	},
  	autoLogin({commit}) {
  		const token = localStorage.getItem('token')
  		if(!token) {
  			return
  		}
  		const expirationDate = localStorage.getItem('expirationDate')
  		const now = new Date()
  		if(now >= expirationDate) {
  			return
  		}
  		commit('authUser',{
        token: token
      })
  	},
  	logout({commit}) {
  		commit('clearAuthData')
      localStorage.removeItem('token')
      localStorage.removeItem('expirationDate')
  		router.replace('/signin')
  	},
  	setLogoutTimer({dispatch}, expiration) {
  		setTimeout(() => {
  			dispatch('logout')
  		},expiration)
  	},
    fetchDevices({commit}) {
      customAxios.get('/latest/devices')
      .then(res => {
        let result = []
        for (let device of res.data.result) {
          result.push(device)
        }
        let sortedResult = result.sort(sortArray)
        commit('storeDevices', sortedResult)
      })
      .catch(error => console.log(error))
    },
    fetchDeviceLoc({commit},values) {
      customAxios.get(`/latest?device=${values.value}`)
      .then(res => {
        if (res.data.result === []) {
          return
        } else {
          commit('setDeviceLocation', {
            result: res.data.result,
            deviceId: values.value,
            checked: values.checked
          });
        }
      })
      .catch(error => console.log(error))
    },
    clearDeviceLoc({commit}, values) {
      commit('removeLocation', {
        value: values.value,
        checked: values.checked
      })
    }

  },
  getters: {
    //Getters are used to access state data in the vue component
  	isAuthenticated (state) {
  		return state.token !== null
  	},
    getDevices(state) {
      return state.devices
    },
    getLocation(state) {
      if(!state.resultByDevice === {}) {
        console.log(Object.values(state.resultByDevice));
      }
    },
  }
})
