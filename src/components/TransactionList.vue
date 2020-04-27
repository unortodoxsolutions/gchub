<template>
  <v-data-table id="transaction_list_table"
    v-model="selected"
    :headers="headers"
    :items="items"
    :search="search"
    @click:row="handleClick"
  >
    <v-alert
      slot="no-results"
      :value="true"
      color="error"
      icon="warning"
    >Your search for "{{ search }}" found no results.</v-alert>
  </v-data-table>
</template>

<script>
/* eslint-disable */
import * as transactionAPI from '@/api/transactions'

export default {
  props: {
    search: String
  },
  data() {
    return {
      selected: [],
      headers: [
        { text: 'Transaction Date', value: 'date' },
        {
          text: 'Amount',
          align: 'left',
          sortable: false,
          value: 'amount_fiat'
        },
        { text: 'Transaction Type', value: 'type' },
        { text: 'CryptoCurrency', value: 'currency_crypto' },
        { text: 'ATM Status', value: 'status' },
        { text: 'Blockchain Status', value: 'confirmations' },
      ],
      items: []
    }
  },
  mounted() {
    this.loadTransactions()
  },
  methods: {
    async loadTransactions() {
      try {
        const resp = await transactionAPI.list({
          pageSize: 15
        })

        if (resp.data) {
          this.items = resp.data.data
          this.items.forEach(element => {
            var date = new Date(element.created_at * 1000)
            var hours = date.getHours()
            var minutes = '0' + date.getMinutes()
            var seconds = '0' + date.getSeconds()
            var formattedTime =
              hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
            element.time = formattedTime
            var day = date.getDate()
            var month = date.getMonth()
            var year = date.getFullYear()
            element.date = month + '-' + day + '-' + year
            // console.log(formattedTime)
          })
          // console.log(resp.data)
        }
      } catch (err) {
        this.handleError(err)
      }
    },
    handleClick(value) {
      this.$emit('click:row', value)
    }
  }
}
</script>

<style scoped>
.v-data-table__wrapper {
  border: 1px gray solid;
}
.v-card__actions {
  padding: 20px;
  padding-top: 0px;
}
.v-card__actions > .v-btn {
  width: 100%;
}
.v-card {
  margin: 30px 0px;
}
.v-data-table {
  padding: 16px;
}
.v-application a {
  color: blue;
}
</style>
