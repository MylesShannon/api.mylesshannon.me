<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/


Route::group(['middleware' => 'auth', 'prefix' => '/note'], function () {
	Route::get('/', 'NoteController@getNotes');
	Route::post('/' , 'NoteController@addNote');
	Route::delete('/{noteId}' , 'NoteController@removeNote');
    //Route::get('/{noteId}', 'NoteController@getNoteById');
});

Route::group(['middleware' => 'auth', 'prefix' => '/user'], function () {
	Route::get('/', 'UserController@getUser');
	// Route::get('/{userId}', 'UserController@getUserById');
});

Route::get('/' , function(){
    return response()->make('API is available' , 200);
});

Route::post('auth/google', 'Auth\AuthController@googleAuth');