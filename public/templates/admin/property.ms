{{>menu}}
<div id="property_container" class="container">
    <div class="row">
        <div class="col s6 right">
            <ul id="sub_menu" class="tabs">
                <li id="property_system" class="tab center"><a herf="#property_system_content"><i class="material-icons">gavel</i>財產列表</a></li>
                <li id="property_manage" class="tab center"><a herf="#property_manage_content"><i class="material-icons">settings</i>財產借用紀錄</a></li>
                <li id="property_repair" class="tab center"><a herf="#property_repair_content"><i class="material-icons left">build</i>財產報修紀錄</a></li>
            </ul>
        </div>
    </div>

    <div id="property_system_content" class="property_system row">
        <div class="row">
            <div class="row card-content">
                <span class="col s4 center-align">
                    <a id="create_property" class=" center-align waves-effect waves-light btn modal-trigger s4"><i class="material-icons left">add_circle</i>新增財產</a>
                </span>
                <span class="col s4 center-align">
                    <a id="loan_property" class=" center-align waves-effect waves-light btn modal-trigger s4"><i class="material-icons left">alarm</i>財產借用</a>
                </span>
                <span class="col s4 center-align">
                    <a id="return_property" class=" center-align waves-effect waves-light btn modal-trigger s4"><i class="material-icons left">alarm</i>財產歸還</a>
                </span>
            </div>
        </div>
        <div id="property_content" class="card">
            <div class="row">
                <h4 class="card-content center-align">財產列表</h4>
                <input id="search_property" class="offset-s3 col s6" type="text" placeholder="財產名稱或條碼"/>
                <span id="search_property_btn" class="col s3 left-align"><a class="waves-effect waves-light btn blue darken-4"><i class="material-icons left">search</i>搜尋</a></span>
            </div>
            {{#propertyData}}
            <div class="card showContent propertyContent searched hide">
                <div class="row card-content" data-name="{{name}}" data-propertyid="{{id}}" data-describe="{{describe}}" data-code="{{code}}">
                    <span class="col s4 center-align">{{name}}</span>
                    <span class="col s4 center-align" style="color: {{status.color}}">{{status.name}}</span>
                    <span class="col s4 center-align">
                        <a class="waves-effect waves-light btn modal-trigger"><i class="material-icons left">description</i>詳細資料</a>
                    </span>
                </div>
            </div>
            {{/propertyData}}
        </div>
    </div>

    <div id="property_manage_content" class="manage_system row">
        <div id="return_property_content" class="card">
            <div class="row">
                <h4 class="card-content center-align">借用紀錄</h4>
                <input id="search_loanData" class="offset-s3 col s6" type="text" placeholder="財產名稱或條碼或學號"/>
                <span id="search_loanData_btn" class="col s3 left-align"><a class="waves-effect waves-light btn blue darken-4"><i class="material-icons left">search</i>搜尋</a></span>
            </div>
            {{#loanData}}
            <div class="card showContent propertyContent searched hide">
                <div class="row card-content" data-loan_id="{{id}}" data-name="{{property_name}}" data-remark="{{remark}}" data-property_id="{{property_id}}" data-status="{{status.name}}"
                     data-time="{{time}}" data-created_at="{{user.created_at}}" data-update_at="{{updated_at}}"
                     data-email="{{user.email}}" data-user_id = "{{user.id}}" data-user_nickname="{{user.nickname}}" data-phone="{{user.phone}}"
                     data-username="{{user.username}}"
                >
                    <i class="{{isReturn}} isReturn material-icons left">assignment_late</i>
                    <span class="col s2 center-align">{{property_name}}</span>
                    <span class="col s2 center-align">{{user.username}}</span>
                    <span class="col s5 center-align">{{time}}</span>
                    <span class="col s3 center-align">
                        <a class="waves-effect waves-light btn returnLoanModalTrigger"><i class="material-icons left">description</i>詳細資料</a>
                    </span>
                </div>
            </div>
            {{/loanData}}
        </div>
    </div>

    <div id="property_repair_content" class="repair_system row">
        <div class="card">
            <div class="row">
                <h4 class="card-content center-align">報修紀錄</h4>
            </div>
            {{#repairData}}
            <div class="card showContent propertyContent searched">
                <div class="row card-content" data-repair_id="{{id}}" data-name="{{title}}" data-remark="{{remark}}" data-status="{{status.name}}" data-time="{{created_at}}" data-type="{{type.cname}}"
                     data-email="{{user.email}}" data-user_id = "{{user.id}}" data-user_nickname="{{user.nickname}}" data-phone="{{user.phone}}" data-username="{{user.username}}"
                >
                    <i class="{{isReturn}} isReturn material-icons left">assignment_late</i>
                    <span class="col s2 center-align">{{title}}</span>
                    <span class="col s2 center-align">{{user.username}}</span>
                    <span class="col s5 center-align">{{created_at}}</span>
                    <span class="col s3 center-align">
                        <a class="waves-effect waves-light btn repairModalTrigger"><i class="material-icons left">description</i>詳細資料</a>
                    </span>
                </div>
            </div>
            {{/repairData}}
        </div>
    </div>

    <div id="property_modal" class="modal">
        <div class="modal-content">
            <a id="delete_property_btn" class=" modal-action modal-close waves-effect btn red right"><i class="material-icons left">delete</i>刪除財產</a>
            <h4></h4>
            <div>
                <span>財產條碼：</span>
                <span class="code"></span>
            </div>
            <div>
                <span>財產描述：</span>
                <span class="discribe"></span>
            </div>
        </div>
        <div class="modal-footer">
            <a class=" modal-action modal-close waves-effect waves-green btn-flat">關閉</a>
        </div>
    </div>

    <div id="create_property_modal" class="modal">
        <div class="modal-content">
            <a class=" modal-action modal-close waves-effect waves-green btn-flat right">關閉</a>
            <h4>新增財產</h4><br>
            <div>
                <span>
                    <input id="create_property_others" name="property_type" type="radio" value="others"/>
                    <label for="create_property_others">一般財產</label>
                </span>
                <span>
                    <input id="create_property_classroom" name="property_type" type="radio" value="classroom"/>
                    <label for="create_property_classroom">教室</label>
                </span>
            </div>
            <div class="input-field">
                <input id="create_property_name" type="text"/>
                <label for="create_property_name">財產名稱</label>
            </div>
            <div class="input-field">
                <input id="create_property_code" type="text"/>
                <label for="create_property_code">財產條碼</label>
            </div>
            <div class="input-field">
                <textarea id="create_property_describe" class="materialize-textarea"/>
                <label for="create_property_describe">財產描述</label>
            </div>
        </div>
        <div class="modal-footer">
            <a id="create_property_btn" class=" modal-action modal-close waves-effect waves-green btn blue darken-4">確定新增</a>
        </div>
    </div>

    <div id="loan_property_modal" class="modal">
        <div class="modal-content">
            <a class=" modal-action modal-close waves-effect waves-green btn-flat right">關閉</a>
            <h4>財產借用</h4><br/>
            <div class="input-field">
                <input id="loan_username" type="text"/>
                <label for="loan_username">學號</label>
            </div>
            <div class="input-field row">
                <input id="loan_property_code" class="col s5" type="text"/>
                <label for="loan_property_code">財產條碼</label>
            </div>
            <div id="loan_property_content">
                <div class="row">
                    <h5 class="property_code col offset-s1"></h5>
                    <h5 class="property_name col offset-s6"></h5>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <a id="loan_property_btn" class=" modal-action modal-close waves-effect waves-green btn blue darken-4">確定新增</a>
        </div>
    </div>

    <div id="total_return_property_modal" class="modal">
        <div class="modal-content">
            <a class=" modal-action modal-close waves-effect waves-green btn-flat right">關閉</a>
            <h4>財產歸還</h4><br/>
            <div class="input-field">
                <input id="total_return_username" type="text"/>
                <label for="total_return_username">學號</label>
            </div>
            <div class="input-field row">
                <input id="total_return_property_code" class="col s5" type="text"/>
                <label for="total_return_property_code">財產條碼</label>
            </div>
            <div id="total_return_property_content">
                <div class="row">
                    <h5 class="property_code col offset-s1"></h5>
                    <h5 class="property_name col offset-s6"></h5>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <a id="total_return_property_btn" class=" modal-action modal-close waves-effect waves-green btn blue darken-4">確定歸還</a>
        </div>
    </div>

    <div id="return_property_modal" class="modal">
        <div class="modal-content">
            <a class=" modal-action modal-close waves-effect waves-green btn-flat right">關閉</a>
            <h4>歸還財產</h4>
            <div class="row">
                <span class="col s3">借用人：</span>
                <span class="userName"></span>
            </div>
            <div class="row">
                <span class="col s3">借用人學號：</span>
                <span class="userID"></span>
            </div>
            <div class="row">
                <span class="col s3">借用人電話：</span>
                <span class="phone"></span>
            </div>
            <div class="row">
                <span class="col s3">借用人email：</span>
                <span class="email"></span>
            </div>
            <div class="row">
                <span class="col s3">財產名稱：</span>
                <span class="propertyName"></p>
            </div>
            <div class="row">
                <span class="col s3">借用時間：</span>
                <span class="time"></span>
            </div>
            <div class="row">
                <span class="col s3">借用理由：</span>
                <span class="remark"></span>
            </div>
        </div>
        <div class="modal-footer">
            <a id="return_property_btn" class=" modal-action modal-close waves-effect waves-green btn blue darken-4">確認歸還</a>
            <a id="loanOtherAction" class="modal-action modal-close waves-effect waves-green btn-flat"></a>
        </div>
    </div>

    <div id="repair_property_modal" class="modal">
        <div class="modal-content">
            <div class="row">
                <h4 class="left">報修財產 </h4>
                <a class=" modal-action modal-close waves-effect waves-green btn-flat right">關閉</a>
            </div>
            <div class="row">
                <span class="col s3">申請地點：</span>
                <span class="propertyName"></p>
            </div>
            <div class="row">
                <span class="col s3">申請項目：</span>
                <span class="remark"></span>
            </div>
            <div class="row">
                <span class="col s3">申請時間：</span>
                <span class="time"></span>
            </div>
            <div class="row">
                <span class="col s3">報修者：</span>
                <span class="userName"></span>
            </div>
            <div class="row">
                <span class="col s3">報修者學號：</span>
                <span class="userID"></span>
            </div>
            <div class="row">
                <span class="col s3">報修者電話：</span>
                <span class="phone"></span>
            </div>
            <div class="row">
                <span class="col s3">報修者email：</span>
                <span class="email"></span>
            </div>
        </div>
        <div class="modal-footer">
            <a id="repair_property_btn" class="left modal-action modal-close waves-effect waves-green btn blue darken-4" style="margin-left:20px">確認報修</a>
            <a id="repair_property_printer_btn" class="modal-action waves-effect waves-green btn teal">列印</a>
            <a id="repairOtherAction" class="modal-action modal-close waves-effect waves-green btn-flat"></a>
        </div>
    </div>

    <div class="lean-overlay" id="materialize-lean-overlay-30"></div>

    <div class="property_system">
        <ul class="pagination center-align">
            <li onselectstart="return false">
                <a class="page" data-pagenum="prev"><i class="material-icons">chevron_left</i></a>
            </li>
            {{#propertyPage}}
                <li onselectstart="return false" class="{{classes}}">
                    <a class="page" data-pagenum="{{pageNum}}">{{pageNum}}</a>
                </li>
            {{/propertyPage}}
            <li onselectstart="return false">
                <a class="page" data-pagenum="next"><i class="material-icons">chevron_right</i></a>
            </li>
        </ul>
    </div>

    <div class="manage_system">
        <ul class="pagination center-align">
            <li onselectstart="return false">
                <a class="page" data-pagenum="prev"><i class="material-icons">chevron_left</i></a>
            </li>
            {{#loanPage}}
            <li onselectstart="return false" class="{{classes}}">
                <a class="page" data-pagenum="{{pageNum}}">{{pageNum}}</a>
            </li>
            {{/loanPage}}
            <li onselectstart="return false">
                <a class="page" data-pagenum="next"><i class="material-icons">chevron_right</i></a>
            </li>
        </ul>
    </div>

    <div class="repair_system">
        <ul class="pagination center-align">
            <li onselectstart="return false">
                <a class="page" data-pagenum="prev"><i class="material-icons">chevron_left</i></a>
            </li>
            {{#repairPage}}
            <li onselectstart="return false" class="{{classes}}">
                <a class="page" data-pagenum="{{pageNum}}">{{pageNum}}</a>
            </li>
            {{/repairPage}}
            <li onselectstart="return false">
                <a class="page" data-pagenum="next"><i class="material-icons">chevron_right</i></a>
            </li>
        </ul>
    </div>

    <div id="repair_printer">
        <div class="row">
            <h5 class="col">國立中正大學</h5>
            <p  class="col">修繕/庶務申請單</p>
            {{#date}}
                <p class="col">填單日期：中華民國{{year}}年{{month}}月{{day}}日</p>
            {{/date}}
        </div>
        <div class="row">
            <table>
                <tr>
                    <td rowspan="6" width="10%">
                        <p align="center">類別</p>
                        <p align="center">（打V）</p>
                    </td>
                    <td rowspan="6" width="37%" style="vertical-align: top;">
                        <p>□土木建築修繕 □水電空調消防修繕 □一般庶務</p>
                    </td>
                    <td rowspan="7" width="10%">
                        <p align="center">申</p>
                        <p align="center">請</p>
                        <p align="center">單</p>
                        <p align="center">位</p>
                    </td>
                    <td width="13%">
                        <p>申請單位</p>
                    </td>
                    <td width="20%">
                        <p><br/>

                        </p>
                    </td>
                </tr>
                <tr>
                    <td width="13%">
                        <p>申請人</p>
                    </td>
                    <td width="20%">
                        <p><br/>

                        </p>
                    </td>
                </tr>
                <tr>
                    <td width="13%">
                        <p>聯絡電話（或分機）</p>
                    </td>
                    <td width="20%">
                        <p><br/>

                        </p>
                    </td>
                </tr>
                <tr>
                    <td width="13%">
                        <p>管理員</p>
                    </td>
                    <td width="20%">
                        <p><br/>

                        </p>
                    </td>
                </tr>
                <tr>
                    <td width="13%">
                        <p>經費來源</p>
                    </td>
                    <td width="20%">
                        <p><br/>

                        </p>
                    </td>
                </tr>
                <tr>
                    <td width="13%">
                        <p>經費來源單位會簽</p>
                    </td>
                    <td width="20%">
                        <p><br/>

                        </p>
                    </td>
                </tr>
                <tr>
                    <td width="10%">
                        <p align="center">申</p>
                        <p align="center">請</p>
                        <p align="center">地</p>
                        <p align="center">點</p>
                    </td>
                    <td class="repair_title" width="37%" valign="top" style="vertical-align: top">
                        <p  style="vertical-align: top;">□學人宿舍區請先送保管組會核。（是者打V）</p>
                        <p></p>
                    </td>
                    <td width="13%">
                        <p>主管或其授權人</p>
                    </td>
                    <td width="20%">
                    </td>
                </tr>
                <tr>
                    <td rowspan="2" width="10%">
                        <p align="center"><br/>

                        </p>
                        <p align="center">申</p>
                        <p align="center">請</p>
                        <p align="center">項</p>
                        <p align="center">目</p>
                    </td>
                    <td class="repair_remark" rowspan="2" width="37%"  style="vertical-align: top">
                    </td>
                    <td rowspan="2" width="10%">
                        <p align="center"><br/>

                        </p>
                        <p align="center">會</p>
                        <p align="center">核</p>
                        <p align="center">單</p>
                        <p align="center">位</p>
                    </td>
                    <td width="13%">
                        <p>經辦人</p>
                    </td>
                    <td width="20%">
                        <p><br/>

                        </p>
                    </td>
                </tr>
                <tr>
                    <td width="13%">
                        <p>主管或其授權人</p>
                    </td>
                    <td width="20%">
                        <p><br/>

                        </p>
                    </td>
                </tr>
                <tr>
                    <td width="10%">
                        <p align="center">承</p>
                        <p align="center">辦</p>
                        <p align="center">單</p>
                        <p align="center">位</p>
                        <p align="center">登</p>
                        <p align="center">錄</p>
                    </td>
                    <td width="37%">
                        <p><br/>

                        </p>
                    </td>
                    <td width="10%">
                        <p align="center">申確</p>
                        <p align="center">請認</p>
                        <p align="center">單完</p>
                        <p align="center">位成</p>
                    </td>
                    <td colspan="2" width="34%" valign="top" style="vertical-align: top;">
                        <p>（請確認數量或功能是否相符後簽章）</p>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</div>
