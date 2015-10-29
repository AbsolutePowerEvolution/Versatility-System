<?php

namespace App\Affair;

use App\Affair\Core\Entity;
use Illuminate\Database\Eloquent\SoftDeletes;

class Repair extends Entity
{
    use SoftDeletes;

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['user_id', 'property_id', 'type', 'remark', 'status'];
}
