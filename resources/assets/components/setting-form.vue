<template>
  <form @submit.prevent="applySetting" action="#/admin/setting" method="PUT">
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
    <div>
      <span>類型：</span>
      <input class="with-gap"
        name="type"
        type="radio"
        id="semester-radio"
        value="semester"
        v-model="type">
      <label for="semester-radio">
        學期
      </label>
      <input class="with-gap"
        name="type"
        type="radio"
        id="vacation-radio"
        value="vacation"
        v-model="type">
      <label for="vacation-radio">
        寒暑假
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
      @click.prevent="applySetting"
      type="submit"
      class="waves-effect waves-light btn">
      <i class="material-icons left">done</i>套用設定
    </button>
  </form>
</template>

<script>
  import when from 'when';
  import DateField from './date-field.vue';
  let mapData = {
    timeName: 'zone_name',
    type: 'type',
    beganDate: 'began_date',
    endedDate: 'ended_date',
    stuStart: 'stu_date_began_at',
    labStart: 'lab_date_began_at'
  };
  export default {
    props: {
      timeName: {
        type: String,
        default: ''
      },
      type: {
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
      applySetting() {
        let data = {};
        for(let key in mapData) {
          data[mapData[key]] = this.$data[key];
        }
        when(this.$http.put('manager/setting', data))
          .then((response) => {
            if(response.data.hasOwnProperty('status')) {
              if(response.data.status === 0) {
                Materialize.toast('新增成功', 2000);
              } else {
                Materialize.toast('新增失敗', 2000);
              }
            }
          })
          .catch(() => {
            Materialize.toast('伺服器錯誤', 2000);
          });
      }
    },
    components: { DateField }
  }
</script>
