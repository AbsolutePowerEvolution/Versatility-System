{{>menu}}

<div>
    <div class="container">
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
            </div>
        </div>
    </div>
</div>

<div id="loan_container" class="container">
  <div class="row">
    <div class="col s9">
      <table class="row-table centered">
        <thead>
          <tr>
            <th>時段</th>
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
            <th>2200~2230</th>
            <th>2230~2300</th>
            <th>2300~2330</th>
            <th>2330~2400</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td id="classroom_prev"><i class="material-icons">chevron_left</i></td>
          </tr>
          {{#TableTimes}}
          <tr class="tr_classroom">
            <td class="td_classroom_name"></td>
            {{#PeriodTimes}}
            <td class="td_time_period"></td>
            {{/PeriodTimes}}
          </tr>
          {{/TableTimes}}
          <tr>
            <td id="classroom_next"><i class="material-icons">chevron_right</i></td>
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

<!-- History Page -->
<div id="history_container">
  <ul id="history_card_container" class="collapsible" data-collapsible="accordion">
  </ul>
  <ul id="history_page_container" class="pagination center">
  </ul>
</div>

<!-- Create Loan Modal -->
<div id="loan_form" class="modal materialize_modal">
  <div class="modal-content">
    <input type="date" class="datepicker days for_many_days for_one_day" placeholder="選擇借用日期" name="start_date">
    <input type="date" class="datepicker days for_many_days" placeholder="選擇借用到期日" name="end_date">
    <div class="input-field">
      <select id="classroom" name="classroom">
        <option disabled>教室</option>
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
    <div class="input-field">
      <input type="text" name="remark" placeholder="填寫借用理由(可以不填)">
    </div>
  </div>
  <div class="modal-footer">
    <button id="create_loan" class="center btn">
      確認送出
    </button>
  </div>
</div>

<div class="lean-overlay" id="materialize-lean-overlay-30">
</div>

</div>
