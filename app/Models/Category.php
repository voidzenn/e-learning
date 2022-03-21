<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'is_active'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function words() 
    {
        return $this->hasMany(Word::class);
    }

    public function choices()
    {
        return $this->hasManyThrough(Choice::class , Word::class);
    }

    public function categoryUsers()
    {
        return $this->hasMany(CategoryUser::class, 'category_id');
    }

    public function answerUsers()
    {
        return $this->hasManyThrough(AnswerUser::class, CategoryUser::class);
    }
}
