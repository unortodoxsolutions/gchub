<template>
    <form @submit.prevent="saveTicket">
        <label for="transactionID">Transaction ID</label>
        <input id="transactionID" type="text"
               v-model="ticket.transaction_id">
        <label for="transactionDate">Transaction Date</label>
        <input id="transactionDate" type="date"
               v-model="ticket.transaction_date">
        <label for="amountFiat">Fiat Amount</label>
        <input id="amountFiat" type="number"
               v-model="ticket.amount_fiat">
        <label for="amountCrypto">Crypto Amount</label>
        <input id="amountCrypto" type="number"
               v-model="ticket.amount_crypto">
        <label for="status">Status</label>
        <input id="status" type="text"
               v-model="ticket.status">
        <label for="address">Address</label>
        <input id="address" type="text"
               v-model="ticket.address">
        <label for="atmID">ATM ID</label>
        <input id="atmID" type="number"
               v-model="ticket.atm_id">
        <label for="email">Email</label>
        <input id="email" type="email"
               v-model="ticket.email">
        <label for="phone">Phone Number</label>
        <input id="phone" type="phone"
               v-model="ticket.phone">
        <label for="info">Additional Info</label>
        <input id="info" type="text"
               v-model="ticket.info">
        <button type="submit">Save</button>
    </form>
</template>

<script>
import * as ticketAPI from '@/api/tickets'
import { currentUserID } from '@/api/user'
import { ROUTE_NAME as ROUTE_NAME_TICKET_DETAIL } from '@/views/TicketDetail.vue'

export default {
  name: 'TicketForm',
  data: () => ({
    ticket: {
      user_id: currentUserID
    }
  }),
  methods: {
    async saveTicket () {
      this.ticket.transaction_date = new Date(this.ticket.transaction_date)

      const resp = await ticketAPI.create(this.ticket)

      if (resp.data) {
        this.$router.push({
          name: ROUTE_NAME_TICKET_DETAIL,
          params: {
            id: resp.data.id
          }
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

form {
    width: 50%
}

form > * {
    width: 100%;
}

</style>
