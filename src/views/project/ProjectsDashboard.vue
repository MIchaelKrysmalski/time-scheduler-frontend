<template>
  <div>
    <hero-bar>
      Project Administration
      <router-link slot="right" to="/projects/new" class="button"> New Project </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        class="has-table has-mobile-sort-spaced"
        title="Projects"
        icon="account-multiple"
      >
        <b-table
          :loading="isLoading"
          :paginated="paginated"
          :per-page="perPage"
          detailed
          @details-open="(row) => $buefy.toast.open(`Expanded ${row.id}`)"
          detail-key="id"
          default-sort="name"
          :data="projects"
        >
          <b-table-column
            cell-class="has-no-head-mobile is-image-cell"
            v-slot="props"
          >
            <div class="image">
              <img :src="props.row.avatar" class="is-rounded" />
            </div>
          </b-table-column>
          <b-table-column label="Name" field="name" sortable v-slot="props">
            {{ props.row.name }}
          </b-table-column>
          <b-table-column
            label="description"
            field="description"
            sortable
            v-slot="props"
          >
            {{ props.row.description }}
          </b-table-column>
          <b-table-column
            label="Time Spent"
            field="timeSpent"
            sortable
            v-slot="props"
          >
            {{ props.row.timeSpent }}
          </b-table-column>
          <b-table-column
            label="Worktime"
            field="workTime"
            sortable
            v-slot="props"
          >
          {{ props.row.workTime }}
          </b-table-column>
          <b-table-column label="Entries" field="timeEntries" v-slot="props">
            {{ props.row.timeEntries.length }}
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
            <card-component
        class="has-table has-mobile-sort-spaced"
        title="Time Entries"
        icon="account-multiple"
      >
        <b-table
          :loading="isLoading"
          :paginated="paginated"
          :per-page="perPage"
          detailed
          @details-open="(row) => $buefy.toast.open(`Expanded ${row.id}`)"
          detail-key="id"
          default-sort="name"
          :data="props.row.timeEntries"
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
            {{ new Date(props.row.startTime).toLocaleDateString() }}
          </b-table-column>
          <b-table-column
            label="EndTime"
            field="endTime"
            sortable
            v-slot="props"
          >
            {{ new Date(props.row.endTime).toLocaleDateString() }}
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
            {{ props.row.timeSpent }}
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
                    <b-button @click="edit(props.row.id, props.row.userId)" type="is-primary">edit</b-button>
                </div>
            </form>
            </article>
          </template>
        </b-table>
      </card-component>
          </template>
        </b-table>
      </card-component>

      <hr />
    </section>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapState } from "vuex";
import CardComponent from "@/components/CardComponent.vue";
import HeroBar from "@/components/HeroBar.vue";
export default defineComponent({
  name: "TablesView",
  components: {
    //ModalBox,
    HeroBar,
    CardComponent,
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
      tasks: [
        {
          id: 1,
          name: "frontend",
        }
      ],
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: [],
    };
  },
  created() {
    this.projects = this.$store.dispatch('getProjects');
    console.log(this.projects);
    this.setProjects(this.projects);
  },
  computed: {
    ...mapState({
      projects : state => state.projects,
    }),
    ...mapState({
      setProjects: (state) => (newValue) => {
        state.projects = newValue;
      }
    })
  },
  methods: {
    edit(id, projectId){
      const project = this.projects.find(project => project.id === projectId);
      project.timeEntries.find(entry => entry.id === id);
    }
  },
});
</script>
