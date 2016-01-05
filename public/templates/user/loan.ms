{{>menu}}

<div class="row">
    <div class="col s6 right">
        <ul id="sub_menu" class="tabs">
            <li id="screen_classroom" class="tab center"><a herf=""><i class="material-icons">list</i>借用教室</a></li>
            <li id="screen_history" class="tab center"><a herf=""><i class="material-icons">history</i>歷史紀錄</a></li>
        </ul>
    </div>
</div>

<div id="loan_container" class="container">
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
      <tr>
        <td>教室0</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
      </tr>
      <tr>
        <td>教室1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
      </tr>
      <tr></tr>
      <tr></tr>
      <tr></tr>
      <tr></tr>
      <tr>
        <td><i class="material-icons">chevron_right</i></td>
      </tr>
      
    </tbody>
  </table>
  <div class="date_container">
    <div class="add_container">
      <span class="waves-effect waves-light btn modal-trigger" data-modal_target="loan_class" data-button="add">
        <i class="material-icons">add</i>
      </span>
    </div>
    <input type="text" id="datepicker">
    <div id="datepicker_container"></div>
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

<!-- Modal Structure -->
<div id="loan_class" class="modal">
  <div class="modal-content">
    <div class="switch_type_container">
      <button id="short" class="btn">短期</button>
      <button id="long" class="btn">長期</button>
    </div>
    <input type="date" class="datepicker long short" placeholder="選擇借用日期" name="start_date">
    <input type="date" class="datepicker long" placeholder="選擇借用到期日" name="end_date">
    <div class="input-field">
      <select id="classroom" name="classroom">
        <option value="" disabled>教室</option>
      </select>
    </div>
    <div class="long checkbox_container">
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
      <button id="user_btn" class="btn switch_time" data-switch_time_target="user_period">30分鐘</button>
      <button id="number_btn" class="btn switch_time" data-switch_time_target="number_period">數字</button>
      <button id="english_btn" class="btn switch_time" data-switch_time_target="english_period">英文</button>
    </div>

    <div class="input-field user_period time_container">
      <select name="user_start">
        <option value="" disabled>起始時間</option>
        {{#time.userPeriodStart}}
        <option value="{{time}}">{{time}}</option>
        {{/time.userPeriodStart}}
      </select>
      <select name="user_end">
        <option value="" disabled>結束時間</option>
        {{#time.userPeriodEnd}}
        <option value="{{time}}">{{time}}</option>
        {{/time.userPeriodEnd}}
      </select>
    </div>

    <div class="input-field number_period time_container">
      <select name="number_start">
        <option value="" disabled>起始時間</option>
        {{#time.numberPeriodStart}}
        <option value="{{time}}">{{time}}</option>
        {{/time.numberPeriodStart}}
      </select>
      <select name="number_end">
        <option value="" disabled>結束時間</option>
        {{#time.numberPeriodEnd}}
        <option value="{{time}}">{{time}}</option>
        {{/time.numberPeriodEnd}}
      </select>
    </div>

    <div class="input-field english_period time_container">
      <select name="english_start">
        <option value="" disabled>起始時間</option>
        {{#time.englishPeriodStart}}
        <option value="{{time}}">{{time}}</option>
        {{/time.englishPeriodStart}}
      </select>
      <select name="english_end">
        <option value="" disabled>結束時間</option>
        {{#time.englishPeriodEnd}}
        <option value="{{time}}">{{time}}</option>
        {{/time.englishPeriodEnd}}
      </select>
    </div>

    <input type="text" name="remark" placeholder="填寫借用理由(可以不填)">
  </div>
  <div class="modal-footer">
    <button id="create_loan" class="belong_loan">
      確認送出
    </button>
    <button id="edit_loan" class="belong_history">
      更改
    </button>
    <button id="delete_loan" class="belong_history">
      刪除
    </button>
  </div>
</div>

<div class="lean-overlay" id="materialize-lean-overlay-30">
</div>

</div>
