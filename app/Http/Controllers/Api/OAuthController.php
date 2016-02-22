<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Auth;
use Cache;
use Crypt;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class OAuthController extends Controller
{
    /**
     * redirect_uri 所需附加上的參數.
     *
     * @var array
     */
    private $parameters = [];

    /**
     * OAuth 請求
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function OAuth(Request $request)
    {
        $this->checkParameters($request);

        if (Auth::guest()) {
            return redirect()->route('home', ['oauth' => $request->fullUrl()]); // need redirect to sign in page
        }

        $this->storeOAuthDataToCache();

        return redirect()->away(
            $request->input('redirect_uri').$this->generateParameters()
        );
    }

    /**
     * 檢查參數是否正確.
     *
     * @param Request $request
     * @return void
     * @throws BadRequestHttpException
     */
    protected function checkParameters(Request $request)
    {
        if (! $request->has('redirect_uri')) {
            throw new BadRequestHttpException('The parameter redirect_uri is required.');
        } elseif (false === filter_var($request->input('redirect_uri'), FILTER_VALIDATE_URL)) {
            throw new BadRequestHttpException('The parameter redirect_uri is invalid.');
        }

        $this->parameters = array_merge($this->parameters, $request->except(['redirect_uri']));
    }

    /**
     * 將使用者資訊存到 Cache 中.
     *
     * @return void
     */
    protected function storeOAuthDataToCache()
    {
        /** @var $user \App\Affair\User */
        list($token, $user) = [str_random(64), Auth::user()];

        Cache::tags('oauth')->put($token, [
            'student_id' => $user->getAttribute('username'),
            'name' => $user->getAttribute('nickname'),
            'email' => $user->getAttribute('email'),
        ], 1);

        $this->parameters['token'] = Crypt::encrypt($token);
    }

    /**
     * 產生回傳網址參數.
     *
     * @return string
     */
    protected function generateParameters()
    {
        $parameters = [];

        foreach ($this->parameters as $key => $value) {
            $parameters[] = "{$key}={$value}";
        }

        $result = implode('&', $parameters);

        return empty($result) ? '' : "?{$result}";
    }

    /**
     * 驗證 token 並回傳 OAuth 資料.
     *
     * @param string $encryptToken
     * @return \Illuminate\Http\JsonResponse
     */
    public function verifyToken($encryptToken)
    {
        try {
            $decryptToken = Crypt::decrypt($encryptToken);

            $user = Cache::tags('oauth')->get($decryptToken);

            if (null === $user) {
                throw new Exception;
            }

            Cache::tags('oauth')->forget($decryptToken);

            $data = [
                'data' => $user,
                'status' => 200,
            ];
        } catch (Exception $e) {
            $data = [
                'errors' => [
                    'Invalid token.',
                ],
                'status' => 422,
            ];
        }

        return response()->json($data);
    }
}
