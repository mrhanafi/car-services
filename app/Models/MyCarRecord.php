<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MyCarRecord extends Model
{
    protected $fillable = [
        'current_mileage',
        'date_of_service',
        'service_mileage',
        'mycar_id',
        'remark',
    ];

    public function recordDetails()
    {
        return $this->hasMany(RecordDetail::class,'record_id','id');
    }
}
