<template>
  <h5>{{title}}</h5>
  <div class="Setting-List">
    <ul class="collection">
      <li class="collection-item" v-for="setting in settings">
        <div>
          <a v-if="delete" @click.prevent="deleteSetting(1)" class="btn-floating wave-effect secondary-content">
            <i class="material-icons">delete</i>
          </a>
          <div>{{setting.zone_name}}: {{setting.date_began_at}} ~ {{setting.date_ended_at}}</div>
          <div>學生借用開始：{{setting.stu_date_began_at}}, Lab 借用開始：{{setting.lab_date_began_at}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import when from 'when';
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      filter: {
        type: String,
        required: true
      },
      delete: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {settings: []}
    },
    compiled() {
      this.update();
    },
    methods: {
      deleteSetting(id) {
        console.log(`Delete setting ${id}`);
      },
      update() {
        let self = this;
        let filter = this.filter;
        when(this.$http.get('manager/setting', {con_str: filter}))
          .then((response) => {
            self.settings = response.data;
          });
      }
    }
  }
</script>
