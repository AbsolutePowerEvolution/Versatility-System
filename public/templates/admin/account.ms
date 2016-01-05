{{>menu}}
<div id="account_container">
    <div class="row">
        <div class="col s6 right">
            <ul id="sub_menu" class="tabs">
                <li id="account_system" class="tab center"><a herf=""><i class="material-icons">list</i>帳號列表</a></li>
                <li id="account_history" class="tab center"><a herf=""><i class="material-icons">history</i>編輯權限</a></li>
            </ul>
        </div>
    </div>

    <div id="account_system_content" class="row">
        <div id="search_bar" class="row">
            <span>搜尋：</span>
            <input type="text" placeholder="帳號名稱" name="search"/>
        </div>
        <div id="first_row" class="row">
            <span class="waves-effect waves-light btn modal-trigger" data-modal_target="add_card">
                <i class="material-icons">add</i>
            </span>
        </div>
    </div>


    <ul class="pagination center-align">
        <li class="disabled page_prev">
            <a href="#!"><i class="material-icons">chevron_left</i></a>
        </li>
        <li class="waves-effect account_page">1</li><!-- For init -->
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
