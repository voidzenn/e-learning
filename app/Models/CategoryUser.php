<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryUser extends Model
{
    use HasFactory;

    protected $table = 'category_user';

    protected $fillable = [
        'user_id',
        'category_id',
        'completed',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function category() 
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function answerUsers()
    {
        return $this->hasMany(AnswerUser::class, 'category_user_id');
    }
}
