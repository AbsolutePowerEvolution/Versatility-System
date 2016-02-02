<template>
  <div id="loan_container" class="container">
    <div class="row">
      <div class="col s9">
        <table class="row-table centered">
          <thead>
            <tr>
              <th>時段</th>
              <th>0700~0730</th>
              <th>0730~0800</th>
              <th>0800~0830</th>
              <th>0830~0900</th>
              <th>0900~0930</th>
              <th>0930~1000</th>
              <th>1000~1030</th>
              <th>1030~1100</th>
              <th>1100~1130</th>
              <th>1130~1200</th>
              <th>1200~1230</th>
              <th>1230~1300</th>
              <th>1300~1330</th>
              <th>1330~1400</th>
              <th>1400~1430</th>
              <th>1430~1500</th>
              <th>1500~1530</th>
              <th>1530~1600</th>
              <th>1600~1630</th>
              <th>1630~1700</th>
              <th>1700~1730</th>
              <th>1730~1800</th>
              <th>1800~1830</th>
              <th>1830~1900</th>
              <th>1900~1930</th>
              <th>1930~2000</th>
              <th>2000~2030</th>
              <th>2030~2100</th>
              <th>2100~2130</th>
              <th>2130~2200</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><i class="material-icons">chevron_left</i></td>
            </tr>
            <tr class="tr_classroom" v-for="n in 5">
              <td class="td_classroom_name"></td>
              <td class="td_time_period" v-for="m in 30"></td>
            </tr>
            <tr>
              <td><i class="material-icons">chevron_right</i></td>
            </tr>

          </tbody>
        </table>
      </div>
      <div class="col s3">
        <div class="date_container">
          <input type="text" id="datepicker">
          <div id="datepicker_container"></div>
        </div>
        <div class="add_container">
          <span class="waves-effect waves-light btn modal-trigger" data-modal_target="loan_form">
            新增借用
          </span>
        </div>
      </div>
    </div>
  </div>

  <div id="history_container">
    <div id="history_card_container"></div>
    <ul class="pagination">
      <li onselectstart="return false">
        <i class="material-icons">chevorn_left</i>
      </li>
    </ul>
  </div>

  <!-- Create Loan Modal -->
  <div id="loan_form" class="modal materialize_modal">
    <div class="modal-content">
      <div class="switch_type_container">
        <button class="btn switch_date" data-date_type="one_day">短期(一天)</button>
        <button class="btn switch_date" data-date_type="few_days">短期(多天)</button>
        <button class="btn switch_date" data-date_type="many_days">長期</button>
      </div>
      <input type="date" class="datepicker days for_many_days for_few_days for_one_day" placeholder="選擇借用日期" name="start_date">
      <input type="date" class="datepicker days for_many_days for_few_days" placeholder="選擇借用到期日" name="end_date">
      <div class="input-field">
        <select id="classroom" name="classroom">
          <option value="" disabled>教室</option>
        </select>
      </div>
      <div class="checkbox_container days for_many_days">
        <p>選星期幾</p>
        <input type="checkbox" value="0" id="day0">
        <label for="day0">日</label>
        <input type="checkbox" value="1" id="day1">
        <label for="day1">一</label>
        <input type="checkbox" value="2" id="day2">
        <label for="day2">二</label>
        <input type="checkbox" value="3" id="day3">
        <label for="day3">三</label>
        <input type="checkbox" value="4" id="day4">
        <label for="day4">四</label>
        <input type="checkbox" value="5" id="day5">
        <label for="day5">五</label>
        <input type="checkbox" value="6" id="day6">
        <label for="day6">六</label>
      </div>

      <div class="switch_time_container">
        <button class="btn switch_time" data-time_period="thirty_minutes">30分鐘區間</button>
        <button class="btn switch_time" data-time_period="all_day">整天</button>
      </div>

      <div class="input-field user_period time_container">
        <select name="time_start">
          <option value="" disabled>起始時間</option>
          <option v-for="item in PeriodStart">{{item}}</option>
        </select>
        <select name="time_end">
          <option value="" disabled>結束時間</option>
        </select>
      </div>

      <input type="text" name="remark" placeholder="填寫借用理由(可以不填)">
    </div>
    <div class="modal-footer">
      <button id="create_loan">
        確認送出
      </button>
    </div>
  </div>

  <!-- Loan Detail Modal -->
  <div id="loan_detail" class="modal materialize_modal">
    <div class="modal-content">
      <div class="date_type">
        <span>類型：</span>
        <span class="content"></span>
      </div>
      <div class="start_date">
        <span>日期</span>
        <span class="content"></span>
      </div>
      <div class="end_date">
        <span>日期</span>
        <span class="content"></span>
      </div>
      <div class="long_term_token">
        <span>星期</span>
        <span class="content"></span>
      </div>
      <div class="start_time">
        <span>開始時間</span>
        <span class="content"></span>
      </div>
      <div class="end_time">
        <span>結束時間</span>
        <span class="content"></span>
      </div>
    </div>
    <div class="modal-footer">
      <button id="delete_loan">
        刪除
      </button>
    </div>
  </div>
</template>
<script>
import when from 'when';
import $ from 'jquery';

export default({
  methods: {
    getClassroom(date) {
      let request = {};
      request.date = date;

      return when(this.$http.get('/api/user/property/classrooms', request))
        .then(function(response) {
          Materialize.toast('取得教室資料成功', 500);
          return response.data;
        })
        .catch(function(error) {
          Materialize.toast('取得教室資料失敗', 500);
          console.log('getClassroom Error');
        });
    },
    loanMaterialEvent() {
      // init material
      $('.datepicker').pickadate({
         selectMonths: true, // Creates a dropdown to control month
         selectYears: 15 // Creates a dropdown of 15 years to control year
      });
    }
  },
  compiled() {
    let self = this;// for function in then
    // get classroom name
    let today = moment(new Date()).format('YYYY-MM-DD');

    this.getClassroom(today)
      .then(function(classroom) {// append classroom name
        var text;
        for(let i = 0; i < classroom.length; i++) {
          text =  '<option value=' + classroom[i].id + '>';
          text += classroom[i].name;
          text += '</option>';

          $('.modal')
            .find('#classroom')
            .find('option:last')
            .after(text);
        }

        // bind Material Event
        self.loanMaterialEvent();
     });
  }
});
</script>
