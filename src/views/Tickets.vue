<template>
    <div>
        <ticket-list />
    </div>
</template>

<script>
import TicketList from '@/components/TicketList'

export const ROUTE_NAME = 'Tickets'

export default {
  name: ROUTE_NAME,
  components: {
    TicketList
  }
}
</script>
