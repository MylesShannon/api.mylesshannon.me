<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Note;

class NoteController extends Controller
{
	//
    public function getNotes(Request $request) {
    	return Note::where('user_id', '=', $request['user']['sub'])->get();
    }

    public function addNote(Request $request) {
        $note = new Note;
        $note->user_id = $request['user']['sub'];
        $note->title = $request->input('title');
        $note->subtitle = $request->input('subtitle');
        $note->body = $request->input('body');
        $note->body_color = $request->input('body_color') ?: 'FFFFFF';
        $note->text_color = $request->input('text_color') ?: '000000';
        $note->save();
        return $note->id;
    }

    public function removeNote($noteId) {
        Note::destroy($noteId);
        return response()->json(['message' => 'Note was deleted.'], 200);
    }

    public function getNoteById($id) {
        return;
    }
}
