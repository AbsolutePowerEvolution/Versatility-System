<div id="account_container">
  <div id="menu" class="row">
    <span class="col s2 offset-s6 center-align">審核系統</span>
    <span class="col s2 center-align">教室預借系統</span>
    <span class="col s2 center-align">財產管理系統</span>
    <span class="col s2 center-align">帳號管理系統</span>
  </div>

  <div id="sub_menu" class="row">
    <span id="account_system" class="col s6 center-align waves-effect waves-light btn">
      <i class="material-icons">list</i>
      帳號列表
    </span>
    <span id="account_history" class="col s6 center-align waves-effect waves-light btn">
      <i class="material-icons">history</i>
      編輯權限
    </span>
  </div>

  <div id="account_system_content" class="row">
    <div id="search_bar" class="row">
      <span>搜尋：</span>
      <input type="text" placeholder="帳號名稱" name="search"/>
    </div>

    <div class="row">
      <span class="waves-effect waves-light btn modal-trigger" data-modal_target="add_card">
        <i class="material-icons">add</i>
      </span>
    </div>

    <div class="card">
      <div class="row card-content">
        <span class="col s4 center-align">帳號</span>
        <span class="col s4 center-align">權限</span>
        <span class="col s4 center-align">
          <a class="waves-effect waves-light btn modal-trigger" data-modal_target="card_detail">
            <i class="material-icons left">build</i>
            修改/刪除
          </a>
        </span>
      </div>
    </div>
  </div>


  <ul class="pagination center-align">
    <li class="disabled page_prev">
      <a href="#!"><i class="material-icons">chevron_left</i></a>
    </li>


    <li class="waves-effect page_next">
      <a href="#!"><i class="material-icons">chevron_right</i></a>
    </li>
  </ul>

  <!-- Modal Structure -->
  <div id="add_card" class="modal">
    <div class="modal-content">
      <h4>Add New Card</h4>
      <p>A bunch of text</p>
    </div>
    <div class="modal-footer">
      <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
  </div>

  <!-- Modal Structure -->
  <div id="card_detail" class="modal">
    <div class="modal-content">
      <h4>Detail</h4>
      <p>A bunch of text</p>
    </div>
    <div class="modal-footer">
      <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
  </div>
  <div class="lean-overlay" id="materialize-lean-overlay-30""></div>



</div>
