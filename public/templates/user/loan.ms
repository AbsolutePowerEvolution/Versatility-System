{{>menu}}

<<<<<<< Updated upstream
<div>
    <div class="container">
        <div class="row">
            <div class="col s6 right">
                <ul id="sub_menu" class="tabs">
                    <li id="screen_classroom" class="tab center"><a herf=""><i class="material-icons">list</i>借用教室</a></li>
                    <li id="screen_history" class="tab center"><a herf=""><i class="material-icons">history</i>歷史紀錄</a></li>
                </ul>
            </div>
        </div>
=======
<div class="row">
    <div class="col s6 right">
        <ul id="sub_menu" class="tabs">
          <li class="tab center switch_screen" data-screen_type="loan">
            <a herf=""><i class="material-icons">list</i>借用教室</a>
          </li>
          <li class="tab center switch_screen" data-screen_type="history">
            <a herf=""><i class="material-icons">history</i>歷史紀錄</a>
          </li>
        </ul>
>>>>>>> Stashed changes
    </div>
</div>

<div id="loan_container" class="container">
<<<<<<< Updated upstream
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
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><i class="material-icons">chevron_left</i></td>
          </tr>
          <tr>
            <td>教室0</td>
            <td>DEMO</td>
            <td>O</td>
            <td>O</td>
            <td>O</td>
            <td>O</td>
            <td>O</td>
            <td>O</td>
            <td>X</td>
            <td>X</td>
            <td>X</td>
            <td>O</td>
            <td>O</td>
            <td>O</td>
            <td>O</td>
            <td>O</td>
            <td>O</td>
          </tr>
          <tr></tr>
          <tr></tr>
          <tr></tr>
          <tr></tr>
          <tr></tr>
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
        <span class="waves-effect waves-light btn modal-trigger" data-modal_target="loan_class" data-button="add">
          新增借用
        </span>
      </div>
=======
  <table class="row-table centered">
    <thead>
      <tr>
        <th>時段</th>
        <th>1</th>
        <th>2</th>
        <th>3</th>
        <th>4</th>
        <th>5</th>
        <th>6</th>
        <th>7</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><i class="material-icons">chevron_left</i></td>
      </tr>
      {{#FiveTimes}}
      <tr class="tr_classroom">
        <td class="td_classroom_name"></td>
        {{#ThirtyTimes}}
        <td class="td_time_period"></td>
        {{/ThirtyTimes}}
      </tr>
      {{/FiveTimes}}
      <tr>
        <td><i class="material-icons">chevron_right</i></td>
      </tr>
    </tbody>
  </table>
  <div class="date_container">
    <div class="add_container">
      <span class="waves-effect waves-light btn modal-trigger" data-modal_target="loan_form">
        <i class="material-icons">add</i>
      </span>
>>>>>>> Stashed changes
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
        {{#time.PeriodStart}}
          <option value="{{.}}">{{.}}</option>
        {{/time.PeriodStart}}
      </select>
      <select name="time_end">
        <option value="" disabled>結束時間</option>
        {{#time.PeriodEnd}}
          <option value="{{.}}">{{.}}</option>
        {{/time.PeriodEnd}}
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
    <div>
      <span>類型：</span>
      <span></span>
    </div>
    <div>
      <span>日期</span>
      <span></span>
    </div>
  </div>
  <div class="modal-footer">
    <button id="delete_loan">
      刪除
    </button>
  </div>
</div>


<div class="lean-overlay" id="materialize-lean-overlay-30">
</div>

</div>
