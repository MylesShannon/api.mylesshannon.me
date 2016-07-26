<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    //
    protected $fillable = [
        'owner', 'title', 'subtitle', 'body', 'body_color', 'text_color'
    ];

    public function user()
    {
        return $this->hasMany(Note::class);
    }
}
