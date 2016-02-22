<?php

namespace App\Http\Controllers\Api\User;

use Auth;
use App\Affair\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /**
     * Display a listing of the others borrow.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function login($account, $passwd)
    {
        if (login_check_sso($account, $passwd) == 'SUCCESS') {
            $user = User::where('username', '=', $account)->find();
            if ($user == null) {
                //add this user to database;
                //User::create();
                //Role::Add...;
                $user = User::where('username', '=', $account)->find();
            }
            Auth::loginUsingId($user->id);
        } else {
            //Manager
            $user = User::where('username', '=', $account)
                ->where('password', '=', $passwd)
                ->find();
            if ($user != null) {
                Auth::loginUsingId($user->id);
            }
        }
    }

    /*
     * 使用說明：
     *  1.請先把HTTP_REFERER改成發出request頁面的URL 
     *  2.呼叫login_check_sso()，判斷回傳值檢視登入成功與否
     *  3.php有安裝curl模組者請使用method = POST, 無curl者請用method = GET
     * 
     * sso代為驗證的function
     * 傳入值： $account:帳號, $passwd:密碼, $method:POST or GET(default)
     * 成功回傳 SUCCESS, 失敗回傳字串 WRONG
     * 錯誤回傳錯誤代碼 
     *  ERROR_01: Empty Parameter!
     *  ERROR_02: Empty Key!
     *  ERROR_O3: wrong decode logintime!
     *  ERROR_O4: wrong decode account!
     *  ERROR_05: Empty Parameter!
     *  ERROR_06: Invalid Source!
     *  ERROR_07: Unknow Error!
     *  ERROR_08: No Response!
     *
     * author: porihuang@ccu.edu.tw
     * last update: 2013/12/17
     */

    //header('Content-type: text/html; charset=UTF-8');

    public function login_check_sso($account, $passwd, $method = 'GET')
    {
        define('HTTP_REFERER', 'http://140.123.104.217/login.php'); //ex: http://140.123.4.9/~porihuang/login_p.php
        define('VERIFY_URL', 'http://140.123.4.218/~porihuang/');
        define('SSO_LOGIN_URL', VERIFY_URL.'ccuVerifyAccount_ciph.php');
        define('CIPHER_SOURCE', VERIFY_URL.'ccuVerifyAccount_ciphkey.php');
        if (empty($account) || empty($passwd)) {
            return 'ERROR_01'; // empty parameter
        }
        $cipher_key = trim(file_get_contents(CIPHER_SOURCE)); // must trim
        if (empty($cipher_key)) {
            return 'ERROR_02:'; // empty key
        }
        //在這裡做SQL injection消毒的意義不大, sso是用LDAP, 不受SQL injection影響, 取消
        //$account = mysql_real_escape_string($account);
        //$passwd = mysql_real_escape_string($passwd);
        // mysql_real_escape_string不能用的話, 改用addslashes
        //$account = addslashes($account);
        //$passwd = addslashes($passwd);

        $key = md5($cipher_key);
        //$cipher = new Cipher($key);
        $securekey = pack('H*', $textkey);
        $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_ECB);
        $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
        //echo 'here';
        $logintime = time();
        // 組成token整串加密
        $token_en = base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $securekey, $logintime.'::'.$account.'::'.$passwd, MCRYPT_MODE_ECB, $iv));
        //$token_en = htmlspecialchars($token_en);

        if ($method == 'POST') {
            $post = ['token' => $token_en];
            $ch = curl_init();
            $options = [
                CURLOPT_URL => SSO_LOGIN_URL,
                CURLOPT_POST => true,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_REFERER => HTTP_REFERER,
                CURLOPT_POSTFIELDS => http_build_query($post),
            ];
            curl_setopt_array($ch, $options);
            $result = curl_exec($ch);
            curl_close($ch);
        } else {
            $result = trim(file_get_contents(SSO_LOGIN_URL.'?token='.$token_en));
        }
        if ($result != '') {
            // 抓取回傳值有加密的中間段來解密
            $res_arr = explode(':-:', $result);
            $login_msg = trim(mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $securekey, base64_decode($res_arr[1]), MCRYPT_MODE_ECB, $iv));
            $dec_arr = explode('::', $login_msg);

            if ($dec_arr[0] == $logintime && $dec_arr[1] == 'SUCCESS' && $dec_arr[2] == $account) {
                return 'SUCCESS';
            } else {
                if ($dec_arr[1] == 'SUCCESS') {
                    // 回傳驗證資料有問題
                    if ($dec_arr[0] != $logintime) {
                        return 'ERROR_O3'; // wrong decode logintime!
                    }
                    if ($dec_arr[2] != $account) {
                        return 'ERROR_O4'; // wrong decode account!
                    }
                } elseif ($dec_arr[1] == 'WRONG') { // account or password not match!';
                    return 'WRONG';
                } elseif ($dec_arr[1] == 'EMPTY_PARAMETERS') {
                    return 'ERROR_05';
                } elseif ($dec_arr[1] == 'INVALID_SOURCE') {
                    return 'ERROR_06'; // Invalid Source!
                } else {
                    return 'ERROR_07'; // Unknow Error!
                }
            }
        } else {
            return 'ERROR_08'; //no response
        }
    }

    //class Cipher {
    //	private $securekey, $iv;
    //    function __construct($textkey) {
    //		$this->securekey = pack('H*', $textkey);
    //		$iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_ECB);
    //		$this->iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
    //    }
    //    function encrypt($input) {
    //		//MCRYPT_3DES,MCRYPT_RIJNDAEL_256,MCRYPT_RIJNDAEL_128
    //        return base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $this->securekey, $input, MCRYPT_MODE_ECB, $this->iv));
    //    }
    //    function decrypt($input) {
    //        return trim(mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $this->securekey, base64_decode($input), MCRYPT_MODE_ECB, $this->iv));
    //    }
    //}
}
