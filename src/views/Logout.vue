<template>
  <div></div>
</template>

<script>
/* eslint-disable */
import { ROUTE_NAME as ROUTE_NAME_LOGIN } from '@/views/Login';

export const ROUTE_NAME = 'Logout';

export default {
  name: ROUTE_NAME,

  mounted() {
    this.loggedOut();
  },
  methods: {
    loggedOut() {
      localStorage.removeItem('x-getcns-token');
      localStorage.removeItem('token');
      this.$router.push({
        name: ROUTE_NAME_LOGIN
      });
      window.location.reload()
    }
  }
};
</script>