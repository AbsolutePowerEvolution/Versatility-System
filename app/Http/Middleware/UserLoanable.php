<?php

namespace App\Http\Middleware;

use Cache;
use Closure;

class UserLoanable
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
        $date = date('Y-m-d', time());
        $bad = '9000-01-01';

        if (
            \Entrust::hasRole('lab')     && Cache::get('lab_start', $bad) <= $date ||
            \Entrust::hasRole('student') && Cache::get('stu_start', $bad) <= $date
        ) {
            return $next($request);
        } else {
            return abort(403);
        }

    }
}
