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
        $headers = [
            'X-Content-Type-Options' => 'nosniff',
            'X-Frame-Options' => 'sameorigin',
            'X-XSS-Protection' => '1; mode=block',
        ];

        if ($request->secure() || env('WEBSITE_HTTPS', false)) {
            $headers['Strict-Transport-Security'] = 'max-age=15552000; preload';

            if (! is_null($pins = env('PUBLIC_KEY_PINS')) && strlen($pins) > 0) {
                $publicKeyPins = '';

                foreach (explode(',', $pins) as $pin) {
                    $publicKeyPins .= " pin-sha256=\"{$pin}\";";
                }

                $headers['Public-Key-Pins'] = "{$publicKeyPins} max-age=600;";
            }

            if (! $request->secure()) {
                return redirect()->secure($request->getRequestUri(), 302, $headers);
            }
        }

        /** @var $response \Illuminate\Http\Response */

        $response = $next($request);

        $response->headers->add($headers);

        return $response;
    }
}
