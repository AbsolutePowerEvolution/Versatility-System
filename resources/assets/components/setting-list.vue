<template>
  <h5>{{title}}</h5>
  <div class="Setting-List">
    <ul class="collection">
      <li class="collection-item" v-for="setting in settings">
        <div>
          <div>{{setting.zone_name}}: {{setting.date_began_at}} ~ {{setting.date_ended_at}}</div>
          <div>學生借用開始：{{setting.stu_start}}, Lab 借用開始：{{setting.lab_start}}</div>
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
      }
    },
    data() {
      return {settings: []}
    },
    compiled() {
      let self = this;
      console.log(this.filter);
      let filter = this.filter;
      when(this.$http.get('manager/setting', {con_str: filter}))
        .then((response) => {
          self.settings = response.data;
        });
    }
  }
</script>
