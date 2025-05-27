<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RecordDetail extends Model
{
    protected $fillable = [
        'item',
        'price',
        'service_id',
        'record_id',
        'remark',
    ];

    public function record()
    {
        return $this->belongsTo(MyCarRecord::class,'record_id','id');
    }

    public function maintenance()
    {
        return $this->hasOne(MyCarRecord::class,'id','service_id');
    }
}
