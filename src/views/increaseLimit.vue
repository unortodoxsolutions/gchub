<template>
  <v-card>
    <div style="margin-top: 20%;">
      <v-btn color="blue darken-1" dark style="margin-left: 35%; margin-right:5px;" @click="vipApplication">Vip Application</v-btn>
      <v-btn color="blue darken-1" dark style="margin-right: 5px;" @click="increaseAction">Increase Limit</v-btn>
      <v-spacer></v-spacer>
    </div>
  </v-card>
</template>

<script>
import VueClipboard from 'vue-clipboard2'
import Vue from 'vue'



import miniToastr from 'mini-toastr'

const toastTypes = {
  success: 'success',
  error: 'error',
  info: 'info',
  warn: 'warn'
}

miniToastr.init({ types: toastTypes })

function toast ({ title, message, type, timeout, cb }) {
  return miniToastr[type](message, title, timeout, cb)
}

const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}



VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)

export const ROUTE_NAME = 'Increselimit'
const googleMapAPIKey = 'AIzaSyCN55Eaaol4NW22SiO752Nb8LB22nPn4ok'

export default {
  name: ROUTE_NAME,
  data () {
    return {
      search: '',
    }
  },
  mounted () {
    
  },
  methods: {
    vipApplication () {
      let url = "https://www.getcoins.com/vipapplication";
      let routeData = this.$router.resolve({name: url});
      window.open(url, '_blank');
    },    
    increaseAction () {
      const url = 'IncreselimitForm';
      console.log("execute increase limit")
      this.$router.push({name: url});
    },
  }
}
</script>
