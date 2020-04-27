<template>
    <v-row justify="center">
        <v-dialog v-model="reportDialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on" class="ml-12">Add</v-btn>
            </template>
            <div class="v-sheet theme--light">
            <v-card-title>
              <span class="headline">Transactions Create</span>
              <v-spacer></v-spacer>
              <v-btn color="black darken-1" text @click="reportDialog = false">X</v-btn>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-text-field label="Transactions Date" required></v-text-field>
                <v-text-field label="Transactions Amount($)" required></v-text-field>
                <v-text-field label="Amount in Crypto" required></v-text-field>
                <v-text-field label="Transaction Status" required></v-text-field>
                <v-text-field label="Crypto Wallet Address" required></v-text-field>
                <v-text-field label="Explain info about the Scam" required></v-text-field>
                <v-text-field label="Email Address" required></v-text-field>
                <v-text-field label="Phone Number" required></v-text-field>
                <p>Kindly upload your photo ID, police report, and any other releated info to the scam</p>
                <input type="file" id="file" name="file">
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn color="blue darken-1" @click="reportDialog = false">Submit</v-btn>
            </v-card-actions>
          </div>
        </v-dialog>
      </v-row>
</template>

<script>
/* eslint-disable */
  export default {
    data () {
      return {
        reportDialog: false,
      }
    },
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
.v-btn{
    float: right;
}
</style>