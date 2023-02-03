<template>
  <div>
    <hero-bar>
      Time Entries
      <router-link slot="right" to="/" class="button"> New Entry </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component title="Time Spent">
        <section>
          <tiles-block>
            <card-widget
              class="tile is-child"
              value="8"
              max="8"
              label="Today"
            />
            <card-widget
              class="tile is-child"
              value="40"
              max="40"
              label="Week"
            />
            <card-widget
              class="tile is-child"
              value="40"
              max="160"
              label="Month"
            />
          </tiles-block>
        </section>
      </card-component>
      <card-component
        class="has-table has-mobile-sort-spaced"
        title="Time Entries"
        icon="account-multiple"
      >
        <b-table
          detailed
          @details-open="(row) => $buefy.toast.open(`Expanded ${row.id}`)"
          detail-key="id"
          default-sort="name"
          :data="timeEntries"
        >
          <b-table-column
            cell-class="has-no-head-mobile is-image-cell"
            v-slot="props"
          >
            <div class="image">
              <img :src="props.row.avatar" class="is-rounded" />
            </div>
          </b-table-column>
          <b-table-column label="Type" field="type" sortable v-slot="props">
            {{ props.row.type }}
          </b-table-column>
          <b-table-column
            label="StartTime"
            field="startTime"
            sortable
            v-slot="props"
          >
            {{ new Date(props.row.startTime).getHours()+":"+new Date(props.row.startTime).getMinutes() }}
          </b-table-column>
          <b-table-column
            label="EndTime"
            field="endTime"
            sortable
            v-slot="props"
          >
            {{ new Date(props.row.endTime).getHours()+":"+new Date(props.row.endTime).getMinutes() }}
          </b-table-column>
          <b-table-column
            label="Break"
            field="break"
            sortable
            v-slot="props"
          >
          {{ props.row.break }}
          </b-table-column>
          <b-table-column label="Time Spent" field="timeSpent" v-slot="props">
            {{ props.row.timeSpent / 60 +" hr" }}
          </b-table-column>
          <b-table-column
          label="Description"
            field="description"
            sortable
            v-slot="props"
          >
            {{ props.row.description }}
          </b-table-column>

          <section class="section" slot="empty">
            <div class="content has-text-grey has-text-centered">
              <template v-if="isLoading">
                <p>
                  <b-icon icon="dots-horizontal" size="is-large" />
                </p>
                <p>Fetching data...</p>
              </template>
              <template v-else>
                <p>
                  <b-icon icon="emoticon-sad" size="is-large" />
                </p>
                <p>Nothing's here&hellip;</p>
              </template>
            </div>
          </section>
          <template #detail="props">
            <article class="media">
              <form @submit.prevent="submit">
                <b-field label="Time Entry" vertical>
                    <b-select placeholder="Select Task" v-model="props.row.project" required>
                    <option v-for="(task) in tasks" :key="task.id" :value="task.name">
                        {{ task.name }}
                    </option>
                </b-select>
                </b-field>
                <b-field label="Starttime" vertical>
                    <b-timepicker v-model="props.row.startTime" placeholder="" icon="clock" hour-format="24" locale="de-DE"/>
                </b-field>
                <b-field label="Endtime" vertical>
                    <b-timepicker v-model="props.row.endTime" placeholder="click to select" icon="clock" hour-format="24" locale="de-DE"/>
                </b-field>
                <b-field label="Description" vertical>
                    <b-input v-model="props.row.description"/>
                </b-field>
                <div class="control">
                    <b-button @click="edit(props.row.id)" type="is-primary">edit</b-button>
                </div>
            </form>
            </article>
          </template>
        </b-table>
      </card-component>

      <hr />
    </section>
  </div>
</template>

<script>
//import ModalBox from '@/components/ModalBox'
import CardComponent from "@/components/CardComponent.vue";
import HeroBar from "@/components/HeroBar.vue";
import CardWidget from "@/components/CardWidget.vue";

import TilesBlock from "@/components/TilesBlock.vue";
import { mapState } from "vuex";
export default {
  name: "TablesView",
  components: {
    HeroBar,
    CardWidget,
    CardComponent,
    TilesBlock,
  },
  props: {
    dataUrl: {
      type: String,
      default: null,
    },
    checkable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isLoading: false
    }
  },
  created() {
    this.timeEntries = this.$store.dispatch('getUserTimeEntries');
    this.tasks = this.$store.dispatch('getProjects');
    this.setTimeEntries(this.timeEntries),
    this.setTasks(this.tasks);
  },
  computed: {
    ...mapState({
      tasks : state => state.projects,
      timeEntries: state => state.timeEntries
    }),
    ...mapState({
      setTimeEntries: (state) => (newValue) => {
        state.timeEntries = newValue;
      }
    }),
    ...mapState({
      setTasks: (state) => (newValue) => {
        state.projects = newValue;
      }
    })
  },
  methods: {
    //vuex here with this.timeEntries[]
    edit(id){
      const entry = this.timeEntries.find(entry => entry.id === id);
      entry.timeSpent = (entry.endTime.getTime() - entry.startTime.getTime()) / (1000 * 60)
      this.$store.dispatch("editEntry",entry);
    }
  },
};
</script>
