<template>
    <div>
        <h1>New Ticket</h1>
        <ticket-form />
    </div>
</template>

<script>
import TicketForm from '@/components/TicketForm'

export const ROUTE_NAME = 'TicketCreate'

export default {
  name: ROUTE_NAME,
  components: {
    TicketForm
  }
}
</script>
