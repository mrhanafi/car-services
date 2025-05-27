<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CarMaintenance extends Model
{
    protected $fillable = [
        'mileage',
        'item',
        'price',
        'quantity',
        'model_id',
    ];

    public function carModel():BelongsTo
    {
        return $this->belongsTo(CarModel::class);
    }
}
