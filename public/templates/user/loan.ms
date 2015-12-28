<div id="account_container">
  {{>menu}}
  <div id="sub_menu" class="row">
    <span id="loan_classroom" class="col s6 center-align waves-effect waves-light btn">
      <i class="material-icons">list</i>
      借用教室
    </span>
    <span id="loan_history" class="col s6 center-align waves-effect waves-light btn">
      <i class="material-icons">history</i>
      修改借用
    </span>
  </div>

  <div id="loan_container">
    <div id="classroom_status">

    </div>
    <div class="date_container">
      <input type="text" id="datepicker">
      <div id="datepicker_container"></div>
    </div>
  </div>

  <div id="history_container">
    <div id="search_bar" class="row">
      <span>搜尋：</span>
      <input type="text" placeholder="帳號名稱" name="search"/>
    </div>
  </div>

  <!-- Modal Structure -->
  <div id="card_detail" class="modal">
    <div class="modal-content">
      <input type="text" name="account" placeholder="account">
      <input type="text" name="password" placeholder="password">
    </div>
    <div class="modal-footer">
      <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
  </div>
  <div class="lean-overlay" id="materialize-lean-overlay-30">
  </div>

</div>
