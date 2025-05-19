<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CarModel extends Model
{
    protected $fillable = [
        'model',
        'brand_id',
    ];

    public function carBrand():BelongsTo
    {
        return $this->belongsTo(Brand::class,'brand_id','id');
    }

    public function carModel():HasMany
    {
        return $this->hasMany(CarMaintenance::class,'model_id');
    }
}
