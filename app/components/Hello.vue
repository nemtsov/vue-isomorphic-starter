<template>
  <div :class="$style.hello">
    {{ msg }}
    <div>{{ item.title }}</div>
  </div>
</template>

<script>
export default {
  name: 'hello',

  asyncData({ store, route }) {
    return store.dispatch('items/fetchItem', route.params.id);
  },

  data() {
    return {
      msg: 'Hello, incredible world!',
    };
  },

  computed: {
    item () {
      return this.$store.getters['items/getItem'](this.$route.params.id);
    },
  }
};
</script>

<style module>
.hello {
  font-size: 130%;
}
</style>
