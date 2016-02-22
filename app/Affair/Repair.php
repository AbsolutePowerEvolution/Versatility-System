<?php

namespace App\Affair;

use App\Affair\Core\Entity;
use Illuminate\Database\Eloquent\SoftDeletes;

class Repair extends Entity
{
    use SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'repairs';

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
    protected $fillable = ['user_id', 'title', 'type', 'remark', 'status'];

    /**
     * 取得報修狀態.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function status()
    {
        return $this->belongsTo(Category::class, 'status');
    }

    /**
     * 取得報修類型.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function type()
    {
        return $this->belongsTo(Category::class, 'type');
    }

    /**
     * 取得報修者.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
