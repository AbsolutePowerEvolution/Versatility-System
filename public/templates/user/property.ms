<div id="property_container" class="container">
    <div id="menu" class="row">
        <span class="col s2 offset-s6 center-align">首頁</span>
        <span class="col s2 center-align">教室預借系統</span>
        <span class="col s2 center-align">財產管理系統</span>
    </div>

    <div id="sub_menu" class="row">
        <span id="property_system" class="col s6 center-align waves-effect waves-light btn"><i class="material-icons">gavel</i>財產管理系統</span>
        <span id="property_history" class="col s6 center-align waves-effect waves-light btn"><i class="material-icons">history</i>歷史紀錄</span>
    </div>

    <div id="property_system_content" class="row">
        <div class="row">
            <span>搜尋：</span>
            <input type="text" placeholder="財產名稱"/>
        </div>
    </div>

    <div id="property_history_content" class="row" style="display:none">
        <div class="card">
            <div class="row card-content">
                <span class="col s6 center-align">投影機遙控器</span>
                <span class="col s6 center-align">
                    <a class="waves-effect waves-light btn modal-trigger" data-modal_target="property_modal"><i class="material-icons left">build</i>報修/清理</a>
                </span>
            </div>
        </div>

        <div class="card">
            <div class="row card-content">
                <span class="col s6 center-align">投影機遙控器</span>
                <span class="col s6 center-align">
                    <a class="waves-effect waves-light btn modal-trigger" data-modal_target="property_modal"><i class="material-icons left">build</i>報修/清理</a>
                </span>
            </div>
        </div>
    </div>

    <div id="property_modal" class="modal">
        <div class="modal-content">
            <h4></h4>
            <p></p><br>
            <span>
                <input id="cleanup" name="clean_type" type="radio" value="5"/>
                <label for="cleanup">清理</label>
            </span>
            <span>
                <input id="maint" name="clean_type" type="radio" value="6"/>
                <label for="maint">報修</label>
            </span>
            <div class="input-field">
                <textarea id="reason" class="materialize-textarea"></textarea>
                <label for="reason">理由</label>
            </div>
        </div>
        <div class="modal-footer">
            <a id="property_repair_submit" class=" modal-action modal-close waves-effect waves-green btn-flat">確認送出</a>
        </div>
    </div>
    <div class="lean-overlay" id="materialize-lean-overlay-30"></div>

    <ul class="pagination center-align">
        <li class="waves-effect"><a data-pageNum="prev"><i class="material-icons">chevron_left</i></a></li>
        <!--<li class="active"><a href="#!">1</a></li>
        <li class="waves-effect"><a href="#!">2</a></li>
        <li class="waves-effect"><a href="#!">3</a></li>
        <li class="waves-effect"><a href="#!">4</a></li>
        <li class="waves-effect"><a href="#!">5</a></li>
        <li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>-->
    </ul>

</div>
