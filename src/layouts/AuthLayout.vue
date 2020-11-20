<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
  import msgs from '@/utils/msgs'
  export default {
    computed: {
      error() {
        return this.$store.getters.getError
      }
    },
    watch: {
      error(fbError) {
        console.log(fbError)
        this.$error(msgs[fbError.code] || 'Woops!')
      }
    }
  }
</script>