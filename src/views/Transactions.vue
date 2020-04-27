<template>
  <v-card>
    <v-card-title>
      Your recent transactions
      <v-spacer></v-spacer>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="700px">
          <div class="v-sheet theme--light">
            <v-card-title>
              <span class="headline">Transactions Detail</span>
              <v-spacer></v-spacer>
              <v-btn color="black darken-1" text @click="dialog = false">X</v-btn>
            </v-card-title>
            <hr />
            <v-card-text>
              <v-container>
                <iframe style="width: 100%; height:230px" v-bind:src="src()" name="Getcoins Bitcoin ATM" frameborder="0" scrolling="yes" marginheight="0" marginwidth="0"></iframe>
                <p>Transaction Date: {{modalData.date}}</p>
                <p>Amount in {{modalData.currency_fiat}}: $ {{modalData.amount_fiat}}</p>
                <p>Amount in Crypto: {{modalData.amount_fiat/100000}}{{modalData.currency_crypto}}</p>

                <p style="text-align: center; font-size: 20px;">
                  <b>Additional Details</b>
                </p>
                <p>Address: <a v-bind:href="url+modalData.address" target="_black"><label style="color:blue">{{modalData.address}}</label></a></p>
                <p>Transaction Type: {{modalData.type}}</p>
                <p>Transaction Crypto: {{modalData.currency_crypto}}</p>
                <p>{{modalData.currency_crypto}} Transaction id: <a v-bind:href="'https://live.blockcypher.com/btc/tx/'+modalData.txid" target="_black"><label style="color:blue">{{modalData.txid}}</label></a></p>
                <p>ATM Transaction ID: <strong>{{modalData.shortcode}}</strong></p>
                <p>ATM Status: {{modalData.status}}</p>
                <p>Blockchain Status: COMPLETED</p>
                <p
                  style="text-align: center; font-size: 17px; font-color: blue"
                  @click="openReport()"
                >
                  <a>Report this transaction</a>
                </p>
              </v-container>
            </v-card-text>
          </div>
        </v-dialog>
      </v-row>
      <v-spacer></v-spacer>
      <v-row justify="center">
        <v-dialog v-model="reportDialog" persistent max-width="600px">
          <div class="v-sheet theme--light">
            <v-card-title>
              <span class="headline">Report a Transaction</span>
              <v-spacer></v-spacer>
              <v-btn color="black darken-1" text @click="reportDialog = false">X</v-btn>
            </v-card-title>
            <v-card-text>
              <v-container>
                <form @submit.prevent="saveTransaction" enctype="multipart/form-data">
                  <v-text-field label="Transactions Date" required v-bind:value="modalData.date"></v-text-field>
                  <v-text-field
                    label="Transactions Amount($)"
                    required
                    v-bind:value="modalData.amount_fiat"
                  ></v-text-field>
                  <v-text-field
                    label="Amount in Crypto"
                    required
                    v-bind:value="modalData.amount_crypto"
                  ></v-text-field>
                  <v-text-field label="Transaction Status" required value="COMPLETE"></v-text-field>
                  <v-text-field
                    label="Crypto Wallet Address"
                    required
                    v-bind:value="modalData.address"
                  ></v-text-field>
                  <v-text-field label="Explain info about the Scam" required v-model="transactionData.info"></v-text-field>
                  <v-text-field label="Email Address" required v-model="transactionData.email"></v-text-field>
                  <v-text-field label="Phone Number" required v-model="transactionData.phone"></v-text-field>
                  <p>Kindly upload your photo ID, police report, and any other releated info to the scam</p>
                  <input type="file" id="file" ref="file" v-on:change="onChangeFileUpload()" accept="image/*" />
                </form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn color="blue darken-1" @click="saveTransaction">Submit</v-btn>
            </v-card-actions>
          </div>
        </v-dialog>
      </v-row>
    </v-card-title>
    <v-card-title>
      <v-btn color="blue darken-1" dark style="margin-right: 5px;" @click="doCopy">Copy</v-btn>
      <v-btn color="blue darken-1" dark style="margin-right: 5px;" @click="exportPDF">PDF</v-btn>
      <v-btn color="blue darken-1" dark style="margin-right: 5px;" @click="printWindow">Print</v-btn>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <transaction-list :search="search" @click:row="viewTransaction" ref="datatable"/>
  </v-card>
</template>

<script>
import TransactionList from '@/components/TransactionList'
import { ROUTE_NAME as ROUTE_NAME_TICKET } from '@/views/Tickets'
// import * as transactionAPI from '@/api/transactions'
import * as ticketAPI from '@/api/tickets'
import * as JsPDF from 'jspdf'
import 'jspdf-autotable'
import VueClipboard from 'vue-clipboard2'
import Vue from 'vue'
import * as getAmtAddress from '@/api/getAmtAddress'
import { currentUserID } from '@/api/user'

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

export const ROUTE_NAME = 'Transactions'
const googleMapAPIKey = 'AIzaSyCN55Eaaol4NW22SiO752Nb8LB22nPn4ok'

export default {
  name: ROUTE_NAME,
  components: {
    TransactionList
  },
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
    this.getAtmAddress()
  },
  methods: {
    async getAtmAddress () {
      try {
        const resp = await getAmtAddress.getAmtAddress()
        if (resp) {
          this.locations = resp.data.locations
        }
      } catch (err) {
        this.handleError(err)
      }
    },
    openReport () {
      this.dialog = false
      this.reportDialog = true
    },
    src: function () {
      return (
        this.map_url + '?key=' + this.Key + '&q=' + this.latitude + ',' + this.longitude + ',' + this.name + '&zoom=14'
      )
    },
    viewTransaction (value) {
      this.dialog = true
      this.modalData = value
      this.select_location = this.locations.filter((item) => {
        let kiock = value.kiosk_id ? value.kiosk_id : value.external_network_kiosk_id
        return item.kiosk_id === kiock
      })
      if (this.select_location[0]) {
        console.log('select location: ', this.select_location[0])
        this.latitude = this.select_location[0].lat
        this.longitude = this.select_location[0].lng
        this.name = this.select_location[0].name
      }
    },
    exportPDF () {
      var columns = [
        { title: 'Transaction Date', dataKey: 'date' },
        { title: 'Amount', dataKey: 'amount_fiat' },
        { title: 'Transaction Type', dataKey: 'type' },
        { title: 'CryptoCurrency', dataKey: 'currency_crypto' },
        { title: 'ATM Status', dataKey: 'status' },
        { title: 'Blockchain Status', dataKey: 'confirmations' }
      ]
      var doc = new JsPDF('p', 'pt')
      doc.text('Transaction List', 40, 40)
      doc.autoTable(columns, this.$refs.datatable.items, {
        margin: { top: 60 }
      })
      doc.save('transaction.pdf')
    },
    doCopy () {
      var table = document.getElementById('transaction_list_table').firstElementChild.innerHTML
      var html = `!DOCTYPE html>
        <html>
          <head>
          </head>
          <body>
            <div style="width: 90%; margin:auto; text-align: center;">
            ${table}
            </div>
          </body>
        </html>`
      this.$copyText(html).then(function (e) {
        alert('Copied')
      }, function (e) {
        alert('Can not copy')
      })
    },
    printWindow () {
      var prtHtml = document.getElementById('transaction_list_table').firstElementChild.innerHTML
      const WinPrint = window.open('', '', 'left=500,top=20,width=800,height=800,toolbar=10,scrollbars=0,status=0')
      WinPrint.document.write(`<!DOCTYPE html>
        <html>
          <head>            
          </head>
          <body>
            <div style="width: 90%; margin:auto; text-align: center;">
            ${prtHtml}
            </div>
          </body>
        </html>`)

      WinPrint.document.close()
      WinPrint.focus()
      WinPrint.print()
      WinPrint.close()
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
        this.transactionData.transaction_id = this.modalData.txid
        this.transactionData.transaction_date = new Date(this.modalData.date)
        this.transactionData.amount_fiat = parseInt(this.modalData.amount_fiat)
        this.transactionData.amount_crypto = parseFloat(this.modalData.amount_crypto)
        this.transactionData.address = this.modalData.address
        this.transactionData.status = this.modalData.status
        this.transactionData.atm_id = parseInt(this.modalData.source_id)
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
      message: 'Transaction create failed. Please again!',
      type: 'error' // You also can use 'VueNotifications.types.error' instead of 'error'
    },
    showCreateSuccess: {
      title: 'Success',
      message: 'Transaction created successfully!',
      type: 'success'
    }
  }
}
</script>
