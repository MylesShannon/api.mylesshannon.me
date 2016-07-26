<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\User;

class UserController extends Controller
{
    //
    public function getUser(Request $request)
    {
        $user = User::find($request['user']['sub']);

        return $user;
    }
}
