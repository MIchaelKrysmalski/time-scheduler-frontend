<template>
    <div>
      <hero-bar>
        Time Entry
      </hero-bar>
      <section class="section is-main-section">
        <card-component title="New Time Entry">
            <form @submit.prevent="submit">
                <b-field label="Project" vertical>
                    <b-select placeholder="Select Task" v-model="form.task" required>
                    <option v-for="(task) in tasks" :key="task.id" :value="task.id">
                        {{ task.name }}
                    </option>
                </b-select>
                </b-field>
                <b-field label="Starttime" vertical>
                    <b-timepicker v-model="form.startTime" placeholder="click to select" icon="clock" hour-format="24" locale="de-DE"/>
                </b-field>
                <div class="control">
                    <b-button type="is-primary is-outlined" @click="startTimer">Start</b-button>
                </div>
                <b-field label="Endtime" vertical>
                    <b-timepicker v-model="form.endTime" placeholder="click to select" icon="clock" hour-format="24" locale="de-DE"/>
                </b-field>
                <div class="control">
                    <b-button type="is-primary is-outlined" @click="stopTimer">Stop</b-button>
                </div>
                <b-field label="Description" vertical>
                    <b-input v-model="form.description"/>
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
    name: 'newTimeEntry',
    components: { HeroBar, CardComponent },
    async created () {
      this.tasks = await this.$store.dispatch('getProjects')
      console.log(this.tasks);
    },
    data () {
      return {
        isLoading: false,
        form: {
          task: null,
          startTime: null,
          endTime: null,
          description: null
        },
        tasks: [],
        
      }
    },
    methods: {
      submit () {
        this.$store.dispatch('newEntry', this.form);
        this.$router.replace(`/client/dashboard:${this.$store.state.userId}`)
        //Submit form
      },
      startTimer() {
        this.form.startTime = new Date();
      },
      stopTimer () {
        this.form.endTime = new Date();
      },
    }
  }
  </script>
  