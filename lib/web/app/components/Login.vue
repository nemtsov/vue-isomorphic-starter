<template>
  <div>
  </div>
</template>

<script>
import auth0 from 'auth0-js';

export default {
  name: 'login',

  mounted() {
    const { env } = this.$store.state;

    const auth = new auth0.WebAuth({
      domain: env.AUTH0_DOMAIN,
      clientID: env.AUTH0_CLIENT_ID,
      redirectUri: env.AUTH0_CALLBACK_URL,
      responseType: 'code',
      scope: 'openid'
    });

    auth.authorize();
  },
};
</script>

<style>
</style>