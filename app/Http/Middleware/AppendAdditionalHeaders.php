<?php

namespace App\Http\Middleware;

use Closure;

class AppendAdditionalHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        if ($request->secure()) {
            $response->header('Strict-Transport-Security', 'max-age=15552000; preload');

            if (! is_null($pins = env('PUBLIC_KEY_PINS')) && strlen($pins) > 0) {
                $publicKeyPins = 'max-age=3600;';

                foreach (explode(',', $pins) as $pin) {
                    $publicKeyPins .= " pin-sha256=\"{$pin}\";";
                }

                $response->header('Public-Key-Pins', $publicKeyPins);
            }
        }

        $response->header('X-Content-Type-Options', 'nosniff');

        $response->header('X-Frame-Options', 'sameorigin');

        $response->header('X-XSS-Protection', '1; mode=block');

        return $response;
    }
}
