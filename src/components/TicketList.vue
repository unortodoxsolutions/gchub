<template>
  <v-card>
    <v-card-title >
      <v-spacer></v-spacer>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <div class="v-sheet theme--light">
            <v-card-title>
              <span class="headline">UPDATE TICKET</span>
              <v-spacer></v-spacer>
              <v-btn color="black darken-1" text @click="dialog = false">X</v-btn>
            </v-card-title>
            <hr>
            <v-card-text>
              <v-container>
                <p>Transaction Date: {{this.modalData.new_transaction_date}}</p>
                <p>Transaction Amount: ${{this.modalData.amount_fiat}}</p>
                <p>Wallet Address: {{this.modalData.address}}</p>
                <p>Status: {{this.modalData.status}}</p>
                <!-- <p>Crypto Transaction ID: {{this.modalData.transaction_id}}</p> -->

                <p style="text-align: center;">Additional Details</p>
                <p>Please upload additional files if necessary</p>
                <input type="file" id="file" ref="file" v-on:change="onChangeFileUpload()" accept="image/*" />
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn style="color: #fff;" color="blue darken-1" @click="updateTicket">Submit</v-btn>
            </v-card-actions>
          </div>
        </v-dialog>
      </v-row>
    </v-card-title>
    <v-card-title>
      <v-btn color="blue darken-1" dark style="margin-right: 5px;">Copy</v-btn>
      <v-btn color="blue darken-1" dark style="margin-right: 5px;">PDF</v-btn>
      <v-btn color="blue darken-1" dark style="margin-right: 5px;">Print</v-btn>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="items"
      :search="search"
    >
    <template v-slot:item="row">
          <tr>
            <td>{{row.item.new_transaction_date}}</td>
            <td>
                <v-btn style="color: blue;" @click="handleClick(row.item)">
                  Add more details
                </v-btn>
            </td>
            <td>{{row.item.amount_crypto}}</td>
            <td>{{row.item.address}}</td>
            <td>{{row.item.new_created_at}}</td>
            <td>{{row.item.updates}}</td>
            <td>{{row.item.status}}</td>
          </tr>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</template>

<script>
/* eslint-disable */
import transactionCreate from '@/components/TransactionCreate.vue'
import transactionDetail from '@/components/TransactionDetail.vue'
import Vue from 'vue'
import * as ticketAPI from '@/api/tickets'
import { currentUserID } from '@/api/user'
import VueNotifications from 'vue-notifications'
import miniToastr from 'mini-toastr'

const toastTypes = {
  success: 'success',
  error: 'error',
  info: 'info',
  warn: 'warn'
}

miniToastr.init({types: toastTypes})

function toast ({title, message, type, timeout, cb}) {
  return miniToastr[type](message, title, timeout, cb)
}

const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}

Vue.use(VueNotifications, options)

export default {
  data () {
    return {
      dialog:false,
      selected:[],
      search: '',
      closeOnEscape: true,
      headers: [
        {
          text: 'Date',
          align: 'left',
          sortable: false,
          value: 'new_transaction_date'
        },
        { text: 'Update Report', value: 'update_link' },
        { text: 'Transaction Amount', value: 'amount_crypto' },
        { text: 'Bitcoin Wallet', value: 'address' },
        { text: 'Date Submitted', value: 'new_created_at' },
        { text: 'Updates', value: 'updates' },
        { text: 'Status', value: 'status' }
      ],
      items: [],
      modalData: {},
      ticketData: {
        user_id: currentUserID,
        files: []
      }
    }
  },
  components: {
    transactionCreate,
    transactionDetail
  },
  mounted () {
    this.loadTransactions()
  },
  methods: {
    src: function(){
      return this.url + "&origin=" + this.origin + "&destination=" + this.destination;
    },
    async loadTransactions () {
      try {
        const resp = await ticketAPI.list({
          pageSize: 15
        })
        console.log(resp.data)
        if (resp.data.data) {
          this.items = resp.data.data
          this.items.forEach(element => {

            var date_str1 = (element.transaction_date).split('T');
            var date_arr1 = date_str1[0].split('-');
            var day = date_arr1[2];
            var month = date_arr1[1];
            var year = date_arr1[0];
            element.new_transaction_date = month + '-' + day + '-' +year;

            var date_str2 = (element.transaction_date).split('T');
            var date_arr2 = date_str2[0].split('-');
            var day = date_arr2[2];
            var month = date_arr2[1];
            var year = date_arr2[0];
            element.new_created_at = month + '-' + day + '-' +year;

            var date_str3 = (element.zendesk_ticket.updated_at).split('T');
            var date_arr3 = date_str3[0].split('-');
            var day = date_arr3[2];
            var month = date_arr3[1];
            var year = date_arr3[0];
            // element.updates = month + '-' + day + '-' +year;
            element.updates = element.zendesk_ticket.status
            element.status = 'closed';
          });
        }
      } catch (err) {
        this.handleError(err)
      }
    },
    viewTransaction (transaction) {
      // console.log('viewing transaction', transaction.id)
      this.$router.push({
        name: ROUTE_NAME_TRANSACTION_DETAIL,
        params: {
          id: transaction.id
        }
      })
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
        vm.ticketData.files.push(data)
      }
      reader.readAsDataURL(files)
    },
    async updateTicket () {
      try {
        this.ticketData.id = this.modalData.id
        this.ticketData.transaction_id = this.modalData.transaction_id
        this.ticketData.transaction_date = new Date(this.modalData.new_transaction_date)
        this.ticketData.amount_fiat = this.modalData.amount_fiat
        this.ticketData.amount_crypto = this.modalData.amount_crypto
        this.ticketData.address = this.modalData.address
        this.ticketData.status = this.modalData.status
        this.ticketData.atm_id = this.modalData.atm_id
        this.ticketData.email = this.modalData.email
        this.ticketData.phone = this.modalData.phone
        this.ticketData.zendesk_id = this.modalData.zendesk_id
        this.ticketData.zendesk_ticket = this.modalData.zendesk_ticket
        console.log('post data: ', this.ticketData)
        await ticketAPI.update(this.modalData.id, this.ticketData).then(response => {
          console.log('Response is: ' + response)
          this.dialog = false
          this.showUpdateSuccess()
        })
          .catch(error => {
            console.log(error)
            this.showUpdateError({message: error})
          })
      } catch (err) {
        this.handleError(err)
        this.showUpdateError()
      }
    },
    handleClick(value){
      this.dialog = true;
      this.modalData = value;
      console.log('modal data: ', this.modalData)
    }
  },
  notifications: {
    showUpdateError: { // You can have any name you want instead of 'showLoginError'
      title: 'Update Failed',
      message: 'Please again!',
      type: 'error' // You also can use 'VueNotifications.types.error' instead of 'error'
    },
    showUpdateSuccess : {
      title: 'Success!',
      message: 'Ticket updated successfully!',
      type: 'success'
    }
  }
}
</script>

<style scoped>
.v-data-table__wrapper{
  border: 1px gray solid;
}
.v-card__actions{
    padding: 20px;
    padding-top: 0px;
}
.v-card__actions>.v-btn{
    width: 100%;
}
.v-card {
  margin: 30px 0px;
}
.v-data-table{
  padding: 16px;
}
</style>
