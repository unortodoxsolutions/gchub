<template>
  <h3>You are being redirected</h3>
</template>

<script>
import * as loginAPI from '@/api/login'
import { ROUTE_NAME as ROUTE_NAME_TRANSACTION } from '@/views/Transactions'
export const ROUTE_NAME = 'Login'

export default {
  name: ROUTE_NAME,
  data: () => ({}),
  mounted () {
    this.login()
  },
  methods: {
    login () {
      const token = localStorage.getItem('token')
      if (token) {
        this.loading = false
        this.$router.push({
          name: ROUTE_NAME_TRANSACTION
        })
      } else {
        loginAPI.login()
      }
    }
  }
}
</script>
