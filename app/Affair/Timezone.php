<?php

namespace App\Affair;

use App\Affair\Core\Entity;

class Timezone extends Entity
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'timezones';

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'zone_name', 'type',
        'date_began_at', 'date_ended_at',
        'stu_date_began_at',
        'lab_date_began_at'
    ];

    /**
     * 取得借用類型
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function type()
    {
        return $this->belongsTo(Category::class, 'type');
    }
}
