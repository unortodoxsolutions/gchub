<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on">Detail</v-btn>
            </template>
            <div class="v-sheet theme--light">
            <v-card-title>
              <span class="headline">Transactions Detail</span>
              <v-spacer></v-spacer>
              <v-btn color="black darken-1" text @click="dialog = false">X</v-btn>
            </v-card-title>
            <hr>
            <v-card-text>
              <v-container>
                <iframe style="width: 100%"></iframe>
                <p>Transaction Date: 06-27-2019</p>
                <p>Amount: $20</p>
                <p>Amount in Bitcoin: 0.00129543 BTC</p>

                <p style="text-align: center;">Additional Details</p>
                <p>Address: 12Hy.......................</p>
                <p>Transaction Type: BUY</p>
                <p>Transaction Crypto: BTC</p>
                <p>Crypto Transaction id: 9a7c7e.................</p>
                <p>ATM Transaction ID: 4be06...........</p>
                <p>ATM Status: COMPLETE</p>
                <p>Blockchain Status: COMPLETED</p>
              </v-container>
            </v-card-text>
          </div>
        </v-dialog>
      </v-row>
</template>

<script>
/* eslint-disable */
  export default {
    data () {
      return {
        dialog: false,
      }
    },
  }
</script>

<style scoped>
.v-data-table__wrapper{
  border: 1px gray solid;
}
</style>