<template>
  <form @submit="applySetting" action="#/admin/setting" method="PUT">
    <div class="input-field">
      <input id="time-name"
        class="validate Setting-TimeName"
        type="text" name="time_name"
        v-model="timeName">
      <label for="time-name"
        :class="{active: timeName}">
        名稱 (ex: 104上學期):
      </label>
    </div>
    <date-field
      :date.sync="beganDate"
       name="began_date"
       class-name="Setting-BeganDate">
      開始時間：
    </date-field>
    <date-field
      :date.sync="endedDate"
      name="ended_date"
      class-name="Setting-EndedDate">
      結束時間：
    </date-field>
    <date-field
      :date.sync="stuStart"
      name="stu_start"
      class-name="Setting-StuStart">
      學生借用開始時間：
    </date-field>
    <date-field
       :date.sync="labStart"
       name="lab_start"
       class-name="Setting-LabStart">
      Lab 借用開始時間：
    </date-field>
    <button id="apply-btn"
      type="submit"
      class="waves-effect waves-light btn">
      <i class="material-icons left">done</i>套用設定
    </button>
  </form>
</template>

<script>
  import DateField from './date-field.vue';
  let mapData = {
    timeName: 'time_name',
    beganDate: 'began_date',
    ended_date: 'ended_date',
    stuStart: 'stu_start',
    labStart: 'lab_start'
  };
  export default {
    props: {
      timeName: {
        type: String,
        default: ''
      },
      beganDate: {
        type: String,
        default: ''
      },
      endedDate: {
        type: String,
        default: ''
      },
      stuStart: {
        type: String,
        default: ''
      },
      labStart: {
        type: String,
        default: ''
      }
    },
    methods: {
      applySetting(event) {
        event.preventDefault();
        console.log(this.$data);
      }
    },
    components: { DateField },
    compiled() {
    }
  }
</script>
