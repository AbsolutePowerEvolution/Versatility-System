<?php

namespace App\Affair;

use App\Affair\Core\Entity;
use DB;
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
        'user_id', 'property_id', 'type', 'status',
        'date_began_at', 'date_ended_at', 'time_began_at', 'time_ended_at',
        'remark', 'long_term_token',
    ];

    /**
     * 取得借用之財產.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function property()
    {
        return $this->belongsTo(Property::class);
    }

    /**
     * 取得借用狀態.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function status()
    {
        return $this->belongsTo(Category::class, 'status');
    }

    /**
     * 取得借用類型.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function type()
    {
        return $this->belongsTo(Category::class, 'type');
    }

    /**
     * 取得借用者.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * get conflict loan record query.
     *
     * @param array $date_info
     * @param array $time_info
     * @param int $LTK
     * @return Illuminate\Database\Eloquent\Builder
     */
    private static function getConflictQuery($property_id, $date_info, $time_info, $LTK)
    {
        $loans = new Loan;

        if ($property_id != null) {
            $loans = $loans->where('property_id', '=', $property_id);
        }

        $conflict_query = $loans
            ->where(function ($query) use ($date_info) {
                $query
                    ->whereBetween('date_ended_at', $date_info)
                    ->orWhereRaw('? BETWEEN `date_began_at` AND `date_ended_at`', [$date_info[1]]);
            })
            ->where(function ($query) use ($time_info) {
                $query
                    ->whereBetween('time_ended_at', $time_info)
                    ->orWhereRaw('? BETWEEN `time_began_at` AND `time_ended_at`', [$time_info[1]]);
            })
            ->where(function ($query) use ($LTK) {
                $query
                    ->whereRaw('long_term_token & ? > 0', [$LTK])
                    ->orWhereNull('long_term_token')
                    ->orWhere('long_term_token', '=', 0);
            });

        return $conflict_query;
    }

    /**
     * check loan data conflict or not.
     *
     * @param array $date_info
     * @param array $time_info
     * @param int $LTK
     * @return bool
     */
    public static function checkConflict($p_id, $date_info, $time_info, $LTK)
    {
        $LTK = ((int) $LTK === 0) ? 1 << date('w', strtotime($date_info[0])) : (int) $LTK;

        $conflict_num = self::getConflictQuery($p_id, $date_info, $time_info, $LTK)->count();

        return $conflict_num > 0;
    }

    /**
     * get the query for that conflict to the provide date.
     *
     * @param int $p_id
     * @param string $date
     * @return Illuminate\Database\Eloquent\Builder
     */
    public static function getConflictList($p_id, $date)
    {
        $LTK = 1 << date('w', strtotime($date));

        $conflict_query = self::getConflictQuery(
                $p_id,
                [$date, $date],
                ['00:00:00', '23:59:59'],
                $LTK
            );

        return $conflict_query;
    }

    /**
     * check the loan duration is bad or not.
     *
     * @param array $date_info
     * @param array $time_info
     * @param App\Affair\Timezone
     * @return bool
     */
    public static function checkDuration($date_info, $time_info, $timezone)
        {
        if ($date_info[0] > $date_info[1] || $time_info[0] >= $time_info[1]) {
            return false;
        }

        // is student?
        if (\Entrust::hasRole('student')) {
            // is in special time?
            if ($timezone->date_began_at < $date_info[0]) {
                // is start/end date equal or the time duration bigger than 3 hours
                if (
                    $date_info[0] != $date_info[1] ||
                    (strtotime($time_info[1]) - strtotime($time_info[0])) > 3600 * 3
                ) {
                    return false;
                }
            }
        }

        return true;
    }
}
