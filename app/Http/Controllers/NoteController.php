<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class NoteController extends Controller
{
	//
	public function __construct()
    {
        // $this->middleware('auth');
    }
    
    public function returnAll() {
    	return [
    		'returnAll' => ['0' =>	 'zero', '1' => 'one']
    	];
    }

    public function returnById($id) {
		return [
    		'returnById' => $id
    	];
    }
}
