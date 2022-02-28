<?php

namespace App\Models;

use App\Models\Word;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Choice extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'word_id',
        'name',
        'is_correct_answer'
    ];

    public function word()
    {
        return $this->belongsTo(Word::class);
    }
}
