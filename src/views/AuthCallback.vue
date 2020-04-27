<template>
  <h3>You are being redirected</h3>
</template>

<script>
import { hubAPI } from '@/api/client'

export const ROUTE_NAME = 'AuthCallback'

export default {
  name: ROUTE_NAME,
  data: () => ({}),
  computed: {
    code () {
      return this.$route.query.code
    },
    scope () {
      return this.$route.query.scope
    },
    state () {
      return this.$route.query.state
    }
  },

  mounted () {
    hubAPI.exchangeCode(this.code, this.state).then(redirect => {
      // console.log(redirect)
      if (redirect) {
        window.location = redirect
      }
    })
  }
}
</script>
