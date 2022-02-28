<?php

namespace App\Models;

use App\Models\Choice;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Word extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'category_id',
        'name',
    ];
    
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function choices() {
        return $this->hasMany(Choice::class);
    }
}
