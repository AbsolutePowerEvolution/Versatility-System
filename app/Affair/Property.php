<?php

namespace App\Affair;

use App\Affair\Core\Entity;

class Property extends Entity
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'properties';

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
    protected $fillable = ['name', 'describe', 'category', 'status', 'code'];

    /**
     * 取得財產分類
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category()
    {
        return $this->belongsTo(Category::class, 'category');
    }

    /**
     * 取得財產狀態
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function status()
    {
        return $this->belongsTo(Category::class, 'status');
    }

    /**
     * 取得財產借用紀錄
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function loans()
    {
        return $this->hasMany(Loan::class);
    }

    /**
     * 取得有效教室借用
     *
     * @return
     */
    public function loanClassroom(){
        return $this->hasMany(Loan::class)
            ->join('categories', 'type', '=', 'categories.id')
            ->whereIn('status', Category::getCategoryIds(['loan.status' => [
                'accepted',
                'processing'
            ]]));
    }

    /**
     * 取得財產維修紀錄
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function repairs()
    {
        return $this->hasMany(Repair::class);
    }
}
