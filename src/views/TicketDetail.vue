<template>
    <div>
        <h1>Tickets</h1>
        <ticket-details :id="id" />
    </div>
</template>

<script>
import TicketDetails from '@/components/TicketDetails'

export const ROUTE_NAME = 'TicketDetail'

export default {
  name: ROUTE_NAME,
  components: {
    TicketDetails
  },
  computed: {
    id () {
      return parseInt(this.$route.params.id || 0)
    }
  }
}
</script>
