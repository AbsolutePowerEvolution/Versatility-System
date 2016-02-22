<?php

namespace App\Http\Controllers\Api;

use Auth;
use App\Affair\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * Login with the provided username & password in local first, if
     * failed, try login in center.
     *
     * @param Request
     * @return Json
     */
    public function login(Request $request)
    {
        $username = $request->input('username');
        $password = $request->input('password');

        // if login failed
        if (
            !Auth::attempt(['username' => $username, 'password' => $password ]) &&
            self::loginCheckSSO($username, $password) === 'SUCCESS'// check with center.
        ) {
            $user = User::where('username', '=', $username)->first();
            Auth::login($user);
        }

        $response = [
            'is_student' => \Entrust::hasRole('student'),
            'is_manager' => \Entrust::hasRole('manager'),
            'status' => Auth::check(),
        ];

        return response()->json($response);
    }

    /**
     * Logout.
     *
     * @return Json
     */
    public function logout()
    {
        Auth::logout();

        return response()->json(['status' => ! Auth::check()]);
    }

    /**
     * login check sso
     *
     * @param string account
     * @param string passwd
     */
    private static function loginCheckSSO($account, $passwd, $method = 'GET')
    {
        return false;

        define('HTTP_REFERER', 'http://140.123.104.217/login.php');//ex: http://140.123.4.9/~porihuang/login_p.php
        define('VERIFY_URL', 'http://140.123.4.218/~porihuang/');
        define('SSO_LOGIN_URL', VERIFY_URL.'ccuVerifyAccount_ciph.php');
        define('CIPHER_SOURCE', VERIFY_URL.'ccuVerifyAccount_ciphkey.php');
    	if(empty($account) || empty($passwd)) {
    		return 'ERROR_01';// empty parameter
    	}
    	$cipher_key = trim(file_get_contents(CIPHER_SOURCE)); // must trim
    	if(empty($cipher_key)) {
    		return 'ERROR_02:'; // empty key
    	}
    	//在這裡做SQL injection消毒的意義不大, sso是用LDAP, 不受SQL injection影響, 取消
    	// mysql_real_escape_string不能用的話, 改用addslashes

    	$key = md5($cipher_key);
    	$securekey = pack('H*', $textkey);
    	$iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_ECB);
    	$iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
    	$logintime = time();
    	// 組成token整串加密
    	$token_en = base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $securekey, $logintime.'::'.$account.'::'.$passwd, MCRYPT_MODE_ECB, $iv));

    	if($method == 'POST') {
    		$post = array('token' => $token_en);
    		$ch = curl_init();
    		$options = array(
    			CURLOPT_URL=>SSO_LOGIN_URL,
    			CURLOPT_POST=>true,
    			CURLOPT_RETURNTRANSFER=>true,
    			CURLOPT_REFERER=>HTTP_REFERER,
    			CURLOPT_POSTFIELDS=>http_build_query($post)
    		);
    		curl_setopt_array($ch, $options);
    		$result = curl_exec($ch);
    		curl_close($ch);
    	} else {
    		$result = trim(file_get_contents(SSO_LOGIN_URL.'?token='.$token_en));
    	}
    	if($result != '') {
    		// 抓取回傳值有加密的中間段來解密
    		$res_arr = explode(':-:', $result);
    		$login_msg = trim(mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $securekey, base64_decode($res_arr[1]), MCRYPT_MODE_ECB, $iv));
    		$dec_arr = explode('::', $login_msg);

    		if($dec_arr[0] == $logintime && $dec_arr[1] == 'SUCCESS' && $dec_arr[2] == $account) {
    			return 'SUCCESS';
    		} else {
    			if($dec_arr[1] == 'SUCCESS') {
    				// 回傳驗證資料有問題
    				if($dec_arr[0] != $logintime) {
    					return 'ERROR_O3'; // wrong decode logintime!
    				}
    				if($dec_arr[2] != $account) {
    					return 'ERROR_O4'; // wrong decode account!
    				}
    			} else if($dec_arr[1] == 'WRONG') { // account or password not match!';
    				return 'WRONG';
    			} else if($dec_arr[1] == 'EMPTY_PARAMETERS') {
    				return 'ERROR_05';
    			} else if($dec_arr[1] == 'INVALID_SOURCE') {
    				return 'ERROR_06'; // Invalid Source!
    			} else {
    				return 'ERROR_07'; // Unknow Error!
    			}
    		}
    	} else {
    		return 'ERROR_08';//no response
    	}
    }
}
