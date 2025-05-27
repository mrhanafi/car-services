<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MyCar extends Model
{
    protected $fillable = [
        'title',
        'brand',
        'model',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class,'user_id','id');
    }

    public function brand()
    {
        return $this->hasOne(Brand::class,'id','brands_id');
    }

    public function model()
    {
        return $this->hasOne(CarModel::class,'id','models_id');
    }
}
