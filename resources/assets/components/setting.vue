<template>
  <admin-menu></admin-menu>
  <div class="container">
    <form @submit="applySetting" action="#/admin/setting" method="PUT">
      <div class="input-field">
        <input id="time_name" class="validate Setting-TimeName" type="text" name="time_name" v-model="time_name">
        <label for="time_name" :class="{active: time_name}">名稱 (ex: 104上學期):</label>
      </div>
      <date-field :date.sync="began_date" name="began_date" class-name="Setting-BeganDate">
        開始時間：
      </date-field>
      <date-field :date.sync="ended_date" name="ended_date" class-name="Setting-EndedDate">
        結束時間：
      </date-field>
      <date-field :date.sync="stu_start" name="stu_start" class-name="Setting-StuStart">
        學生借用開始時間：
      </date-field>
      <date-field :date.sync="lab_start" name="lab_start" class-name="Setting-LabStart">
        Lab 借用開始時間：
      </date-field>
      <button id="apply-btn" type="submit" class="waves-effect waves-light btn">
        <i class="material-icons left">done</i>套用設定
      </button>
    </form>
  </div>
</template>

<script>
  import AdminMenu from './admin-menu.vue';
  import DateField from './date-picker.vue';
  let data = {
    time_name: '',
    began_date: '',
    ended_date: '',
    stu_start: '',
    lab_start: ''
  }
  export default {
    data() {
      return data;
    },
    methods: {
      applySetting(event) {
        event.preventDefault();
        console.log(this.$data);
      }
    },
    components: { AdminMenu, DateField }
  }
</script>
