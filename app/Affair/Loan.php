<?php

namespace App\Affair;

use DB;
use App\Affair\Core\Entity;
use Illuminate\Database\Eloquent\SoftDeletes;

class Loan extends Entity
{
    use SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'loans';

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
    protected $fillable = [
        'user_id', 'property_id', 'type','status',
        'date_began_at', 'date_ended_at', 'time_began_at', 'time_ended_at',
        'remark', 'long_term_token'
    ];

    /**
     * 取得借用之財產
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function property()
    {
        return $this->belongsTo(Property::class);
    }

    /**
     * 取得借用狀態
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function status()
    {
        return $this->belongsTo(Category::class, 'status');
    }

    /**
     * 取得借用類型
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function type()
    {
        return $this->belongsTo(Category::class, 'type');
    }

    /**
     * 取得借用者
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * check loan data conflict or not
     *
     * @param array $date_info
     * @param array $time_info
     * @param int $LTK
     * @return bool
     */
    public static function checkConflict($p_id, $date_info, $time_info, $LTK)
    {
        $LTK = ((int)$LTK === 0)? 1<<date('w'):(int)$LTK;

        $conflict_num = DB::table('loans')
            ->where('property_id', '=', $p_id)
            ->whereBetween('date_ended_at', $date_info)
            ->whereBetween('time_ended_at', $time_info)
            ->where(function ($query) use ($LTK) {
                $query
                    ->where(DB::raw("long_term_token & {$LTK}"), '>', 0)
                    ->orWhereNull('long_term_token');
            })
            ->count();

        return ($conflict_num > 0);
    }
}
