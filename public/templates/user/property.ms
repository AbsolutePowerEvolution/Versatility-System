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

    <div id="property_system_content" class="property_system row">
        <div class="row">
            <input id="search_property" class="offset-s3 col s6" type="text" placeholder="財產名稱"/>
            <span id="search_property_btn" class="col s3 left-align"><a class="waves-effect waves-light btn blue darken-4
"><i class="material-icons left">search</i>搜尋</a></span>
        </div>
    </div>

    <div id="property_history_content" class="row" style="display:none">
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
                <input id="maintain" name="clean_type" type="radio" value="6"/>
                <label for="maintain">報修</label>
            </span>
            <div class="input-field">
                <textarea id="reason" class="materialize-textarea"></textarea>
                <label for="reason">理由</label>
            </div>
        </div>
        <div class="modal-footer">
            <a id="property_repair_submit" class=" modal-action modal-close waves-effect waves-green btn blue darken-4">確認送出</a>
        </div>
    </div>

    <div id="history_modal" class="modal">
        <div class="modal-content">
            <h4></h4>
            <span></span><br>
            <p></p>
            <div class="input-field">
            </div>
        </div>
        <div class="modal-footer">
        </div>
    </div>
    <div class="lean-overlay" id="materialize-lean-overlay-30"></div>

    <ul class="property_system pagination center-align">
    </ul>

</div>
