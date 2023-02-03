<template>
    <div>
      <hero-bar>
        Projects
      </hero-bar>
      <section class="section is-main-section">
        <card-component title="New Project">
            <form @submit.prevent="submit">
                <b-field label="Name" vertical>
                    <b-input v-model="form.name"/>
                </b-field>
                <b-field label="Description" vertical>
                    <b-input v-model="form.description"/>
                </b-field>
                <b-field label="WorkTime" vertical>
                    <b-input v-model="form.workTime"/>
                </b-field>
                <div class="control">
                    <b-button @click="submit" type="is-primary">Submit</b-button>
                </div>
            </form>
        </card-component>
      </section>
    </div>
  </template>
  
  <script>
  import CardComponent from '@/components/CardComponent'
  import HeroBar from '@/components/HeroBar'
  
  export default {
    name: 'newProject',
    components: { HeroBar, CardComponent },
    data () {
      return {
        isLoading: false,
        form: {
          name: null,
          description: null,
          workTime: null,
        },
      }
    },
    computed: {
    },
    methods: {
      submit () {
        this.$store.dispatch('newProject', this.form);
        this.$router.replace('/project/dashboard');
      },
    }
  }
  </script>
  