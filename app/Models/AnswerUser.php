<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnswerUser extends Model
{
    use HasFactory;

    protected $table = 'answer_user';
    
    protected $fillable = [
        'category_user_id',
        'word_id',
        'choice_id',
        'is_correct'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function categoryUser()
    {
        return $this->belongsTo(CategoryUser::class);
    }
}
