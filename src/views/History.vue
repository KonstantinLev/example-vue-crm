<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">Записей необнаружено <router-link to="/record">Добавьте их!</router-link></p>

    <section v-else>
      <Table :records="records" />
    </section>
  </div>
</template>

<script>
  import Table from "../components/history/Table";
  export default {
    name: 'history',
    components: {
      Table
    },
    data: () => ({
      loading: true,
      records: [],
      categories: []
    }),
    async mounted() {
      //this.records = await this.$store.dispatch('fetchRecords')
      this.categories = await this.$store.dispatch('fetchCategories')
      const records = await this.$store.dispatch('fetchRecords')

      this.records = records.map(record => {
        return {
          ...record,
          categoryName: this.categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход',
        }
      })


      this.loading = false
    }
  }
</script>
