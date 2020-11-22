<template>
  <div>
    <div class="page-title">
      <h3>{{'ProfileTitle' | localize}}</h3>
    </div>

    <form class="form" @submit.prevent="onSubmit">
      <div class="input-field">
        <input
          v-model="name"
          id="description"
          type="text"
          :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
        >
        <label for="description">{{'Name' | localize}}</label>
        <span
            class="helper-text invalid"
            v-if="$v.name.$dirty && !$v.name.required"
        >{{'Message_EnterName' | localize}}</span>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale">
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'Update' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import {required} from 'vuelidate/lib/validators'
  export default {
    metaInfo() {
      return {
        title: this.$title('ProfileTitle')
      }
    },
    data: () => ({
      name: '',
      isRuLocale: true
    }),
    validations: {
      name: {required},
    },
    mounted() {
      this.$nextTick(() => {
        M.updateTextFields()
      });
      this.name = this.info.name
      this.isRuLocale = this.info.locale === 'ru-RU'
    },
    computed: {
      ...mapGetters(['info'])
    },
    methods: {
      ...mapActions(['updateInfo']),
      async onSubmit() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }

        try {
          await this.updateInfo({
            name: this.name,
            locale: this.isRuLocale === true ? 'ru-RU' : 'en-US'
          })
        } catch (e) {

        }
      }
    }
  }
</script>

<style scoped>
  .switch {
    margin-bottom: 2rem;
  }
</style>
