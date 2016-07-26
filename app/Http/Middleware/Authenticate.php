<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Firebase\JWT\JWT;
use Log;

class Authenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    // public function handle($request, Closure $next, $guard = null)
    // {
    //     if (Auth::guard($guard)->guest()) {
    //         if ($request->ajax() || $request->wantsJson()) {
    //             return response('Unauthorized.', 401);
    //         } else {
    //             return redirect()->guest('login');
    //         }
    //     }

    //     return $next($request);
    // }

    public function handle($request, Closure $next)
    {
        if ($request->header('Authorization'))
        {
            $token = explode(' ', $request->header('Authorization'))[1];
            $payload = (array) JWT::decode($token, env('GOOGLE_CLIENT_SECRET'), array('HS256'));

            Log:info($payload);

            if ($payload['exp'] < time())
            {
                return response()->json(['message' => 'Token has expired']);
            }

            $request['user'] = $payload;

            return $next($request);
        }
        else
        {
            return response()->json(['message' => 'Please make sure your request has an Authorization header'], 401);
        }
    }
}
