<template>
  <!-- <v-card style="margin-top: 20%;"> -->
    <div style="margin-top: 5%;">
      <v-row justify="center">
          <div class="v-sheet theme--light">
            <v-card-title>
              <span class="headline">Increase Account Limit</span>
              <v-spacer></v-spacer>
              <v-btn color="black darken-1" text @click="reportDialog = false">X</v-btn>
            </v-card-title>
            <v-card-text>
              <v-container>
                <form @submit.prevent="saveTransaction" enctype="multipart/form-data">
                  <p>Kindly upload your photo ID, police report, and any other releated info to the scam</p>
                  <input type="file" id="file" ref="file" v-on:change="onChangeFileUpload()" accept="image/*" />
                </form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn color="blue darken-1" @click="saveTransaction">Submit</v-btn>
            </v-card-actions>
          </div>
      </v-row>
    </div>
  <!-- </v-card> -->
</template>

<script>
import { ROUTE_NAME as ROUTE_NAME_TICKET } from '@/views/Tickets'
import VueClipboard from 'vue-clipboard2'
import Vue from 'vue'
import { currentUserID } from '@/api/user'
import * as ticketAPI from '@/api/tickets'
import VueNotifications from 'vue-notifications'
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


Vue.use(VueNotifications, options)
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)

export const ROUTE_NAME = 'IncreselimitForm'
const googleMapAPIKey = 'AIzaSyCN55Eaaol4NW22SiO752Nb8LB22nPn4ok'

export default {
  name: ROUTE_NAME,
  data () {
    return {
      search: '',
      dialog: false,
      reportDialog: false,
      origin: 'marylad',
      destination: 'detroit',
      modalData: {},
      Key: googleMapAPIKey,
      address: 'Hong Kong',
      url:
        'https://live.blockcypher.com/btc/address/',
      map_url:
        'https://www.google.com/maps/embed/v1/place',
      locations: [],
      select_location: {},
      latitude: 39.84733,
      longitude: -86.13057,
      name: 'Sunoco Gas Station',
      transactionData: {
        user_id: currentUserID,
        files: []
        // {
        //   filename: '',
        //   data: '',
        //   mimetype: ''
        // }
      }
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
      this.$router.resolve({name: "IncreselimitForm"});
    },
    onChangeFileUpload () {
      let data = {
        filename: '',
        data: '',
        mimetype: ''
      }
      let files = this.$refs.file.files[0]
      var reader = new FileReader()
      var vm = this
      reader.onload = (e) => {
        data.filename = files.name
        let base64 = e.target.result
        data.data = base64.split(',')[1]
        data.mimetype = files.type
        vm.transactionData.files.push(data)
      }
      reader.readAsDataURL(files)
    },
    async saveTransaction () {

      try {
        this.transactionData.transaction_id = "0"
        this.transactionData.transaction_date = new Date()
        this.transactionData.amount_fiat = 0
        this.transactionData.amount_crypto = 0
        this.transactionData.address = ""
        this.transactionData.status = "COMPLETE"
        this.transactionData.atm_id = 0
        await ticketAPI.create(this.transactionData).then(response => {
          console.log('Response is: ' + response)
          this.dialog = false
          this.showCreateSuccess()
          this.$router.push({
            name: ROUTE_NAME_TICKET
          })
        })
          .catch(error => {
            console.log(error)
            this.showCreateError({ message: error })
          })
      } catch (err) {
        this.handleError(err)
        this.showCreateError()
      }
    }
  },
  notifications: {
    showCreateError: { // You can have any name you want instead of 'showLoginError'
      title: 'Error',
      message: 'Document Upload failed. Please again!',
      type: 'error' // You also can use 'VueNotifications.types.error' instead of 'error'
    },
    showCreateSuccess: {
      title: 'Success',
      message: 'Document Upload successfull!',
      type: 'success'
    }
  }
}
</script>
