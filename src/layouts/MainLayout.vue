<template>
  <div>
    <Loader v-if="loading" />
    <div v-else class="app-main-layout">

      <Navbar @navbar-collapse-click="isOpen = !isOpen" />

      <Sidebar :isOpen="isOpen" :key="locale" />

      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record" v-tooltip:top="'Создать новую запись'">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from '@/components/app/Navbar'
  import Sidebar from '@/components/app/Sidebar'
  import Loader from '@/components/app/Loader'
  import msgs from '@/utils/msgs'
  export default {
    name: 'main-layout',
    data: () => ({
      isOpen: true,
      loading: true
    }),
    components: {
      Navbar, Sidebar, Loader
    },
    computed: {
      error() {
        return this.$store.getters.getError
      },
      locale() {
        return this.$store.getters.info.locale
      }
    },
    watch: {
      error(fbError) {
        console.log(fbError)
        this.$error(msgs[fbError.code] || 'Woops!')
      },
      // locale() {
      //
      // }
    },
    async mounted() {
      if (!Object.keys(this.$store.getters.info).length) {
        await this.$store.dispatch('fetchInfo')
      }

      this.loading = false
    }
  }
</script>