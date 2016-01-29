<template>
  <table>
    <thead>
      <tr>
        <td>Time</td>
        <td>Mon</td>
        <td>Tue</td>
        <td>Wed</td>
        <td>Thu</td>
        <td>Fri</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="schedule in schedules">
        <td>
          {{schedule.time}}
        </td>
        <td>
          {{{schedule.mon}}}
        </td>
        <td>
          {{{schedule.tue}}}
        </td>
        <td>
          {{{schedule.wed}}}
        </td>
        <td>
          {{{schedule.thu}}}
        </td>
        <td>
          {{{schedule.fri}}}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import when from 'when';
import transformSchedule from '../javascript/lib/transform-schedule.js';
let schedules = {};
export default {
  data() {
    return {schedules: schedules}
  },
  compiled() {
    let self = this;
    when(self.$http.get('manager/loan/courses'))
      .then((response) => {
        return transformSchedule(response.data);
      }).then((schedules) => {
        console.log(schedules);
        self.$set('schedules', schedules);
      }).catch((error) => {
        if(error instanceof Error) {
          console.warn(error);
          throw error;
        } else {
          console.warn(error);
        }
      })
  }
}
</script>
