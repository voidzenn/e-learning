<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;

    protected $fillable = ["user_id", "activable_id", "activable_type"];

    protected $hidden = ["updated_at"];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function followed()
    {
        return $this->hasOne(User::class, 'id', 'activable_id');
    }

    public function category()
    {
        return $this->hasOne(Category::class, 'id', 'activable_id');
    }
}
