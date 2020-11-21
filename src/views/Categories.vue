<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div v-else class="row">
        <CategoryCreate @created="addNewCategory" />
        <CategoryEdit
          v-if="categories.length"
          :categories="categories"
          :updatedCategoryId="updatedCategoryId"
          :key="categories.length + updateCount"
          @updated="updateCategories"
        />
        <p v-else>Категорий нет</p>
      </div>
    </section>
  </div>
</template>

<script>
  import CategoryCreate from '@/components/category/Create'
  import CategoryEdit from '@/components/category/Edit'
  export default {
    data: () => ({
      categories: [],
      loading: true,
      updateCount: 0,
      updatedCategoryId: null
    }),
    components: {
      CategoryCreate, CategoryEdit
    },
    methods: {
      addNewCategory(category) {
        this.categories.push(category)
      },
      updateCategories(category) {
        const idx = this.categories.findIndex(c => c.id === category.id)
        this.categories[idx].title = category.title
        this.categories[idx].limit = category.limit
        this.updatedCategoryId = category.id
        this.updateCount++
      }
    },
    async mounted() {
      this.categories = await this.$store.dispatch('fetchCategories')
      this.loading = false
    }
  }
</script>