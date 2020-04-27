<template>
    <div>
        <div v-if="loading">
            <h3>Loading</h3>
        </div>
        <div v-else>
            <pre>{{ticket}}</pre>
        </div>
    </div>

</template>

<script>
import * as ticketAPI from '@/api/tickets'

export default {
  name: 'TicketDetails',
  props: {
    id: Number
  },
  data: () => ({
    ticket: null,
    loading: true
  }),
  watch: {
    id (val) {
      if (val) {
        this.loadTicket().catch(this.handleError)
      }
    }
  },
  mounted () {
    // console.log('mounted ticket details component', this.id)
    if (this.id) this.loadTicket().catch(this.handleError)
  },
  methods: {
    async loadTicket () {
      // console.log('loading ticket', this.id)
      this.loading = true
      try {
        const resp = await ticketAPI.read(this.id)

        if (resp.data) {
          this.ticket = resp.data
        }
      } catch (err) {
        this.handleError(err)
      }
      this.loading = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
