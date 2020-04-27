<template>
    <div>
    </div>
</template>

<script>
/* eslint-disable */
import { ROUTE_NAME as ROUTE_NAME_LOGIN } from '@/views/Login'

export const ROUTE_NAME = 'Dashboard'

export default {
  name: ROUTE_NAME,
  
  mounted () {
    this.tokenCheck()
  },

  methods: {
    async tokenCheck () {
      const tokenHeaderName = localStorage.getItem('x-getcns-token')
      const token = localStorage.getItem('token')
      if (token) {
        this.loading = false
      } else {
        this.$router.push({
          name: ROUTE_NAME_LOGIN
        })
      }
    }
  }
}
</script>
