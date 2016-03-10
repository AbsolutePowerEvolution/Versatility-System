<?php

namespace App\Http\Controllers\Api\User;

use Auth;
use Carbon\Carbon;
use App\Affair\Property;
use App\Affair\Loan;
use App\Affair\Category;
use App\Affair\Timezone;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoanController extends Controller
{
    /**
     * Display a listing of the others borrow.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // get length
        $length = ($request->input('length') > 0) ? ($request->input('length')) : 10;
        $loan_type = Category::getCategoryId('loan.type', $request->input('type'));

        // get borrow query
        $borrow_query = Loan::with([
                'type',
                'status',
            ])
            ->join('properties as pro_t', function ($query) {
                $query->on('pro_t.id', '=', 'property_id')
                    ->where('pro_t.category', '=', Category::getCategoryId('property', 'others'));
            })
            ->where('user_id', '=', Auth::user()->id);

        // if loan type is set
        $borrow_query = ($loan_type > 0) ? $borrow_query->where('type', '=', $loan_type)
            : $borrow_query;

        // get borrow list
        $borrow_list = $borrow_query
            ->paginate($length, [
                'loans.*',
                'pro_t.name as property_name',
            ]);

        return response()->json($borrow_list);
    }

    /**
     * Display a listing of the classroom borrow.
     *
     * @param string date
     * @return Json
     */
    public function indexDatedClassroomBorrow($date_began_at, $date_ended_at)
    {
        $dates = [$date_began_at, $date_ended_at];

        $classroom_borrow = Property::with([
                'status',
                'loans' => function ($query) use ($dates) {
                    $query = Loan::getConflictList($dates, $query)
                        ->join('categories as type', 'type.id', '=', 'loans.type')
                        ->join('users', 'users.id', '=', 'user_id');

                    // signle day or not
                    if ($dates[0] == $dates[1]) {
                        $query->where('loans.user_id', '=', Auth::user()->id);
                    } else {
                        $query->where('loans.status', '=', Category::getCategoryId('loan.status', 'accepted'));
                    }
                },
            ])
            ->where('category', '=', Category::getCategoryId('property', 'classroom'))
            ->get();

        return response()->json($classroom_borrow);
    }

    /**
     * Store a newly created resource in borrow classroom.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storeClassroomBorrow(Request $request)
    {
        $p_id = $request->input('property_id');
        $LTK = $request->input('long_term_token');
        $timezone = $request->input('timezone');
        $date_info = [$request->input('date_began_at'), $request->input('date_ended_at')];
        $time_info = [$request->input('time_began_at'), $request->input('time_ended_at')];

        // return if the loan duration is bad
        if (! Loan::checkDuration($date_info, $time_info, $timezone)) {
            return response()->json(['status' => 3]);
        }

        // return if time provided conflict
        if (Loan::checkConflict($p_id, $date_info, $time_info, $LTK)) {
            return response()->json(['status' => 2]);
        }

        // create loan request
        Loan::create(array_merge(array_only($request->all(), [
                'property_id',
                'date_began_at',
                'date_ended_at',
                'time_began_at',
                'time_ended_at',
                'remark',
            ]), [
                'user_id' => Auth::user()->id,
                'type' => Category::getCategoryId('loan.type', $request->input('type')),
                'status' => Category::getCategoryId('loan.status', 'processing'),
                'long_term_token' => $request->input('long_term_token'),
            ]));

        return response()->json(['status' => 0]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroyClassroomBorrow($id)
    {
        $affect_rows = Loan::where('id', '=', $id)
            ->where('user_id', '=', Auth::user()->id)
            ->update([
                'status' => Category::getCategoryId('loan.status', 'canceled'),
            ]);

        return response()->json(['status' => ($affect_rows == 1) ? 0 : 2]);
    }

    /**
     * Get classroom borrow infomation.
     *
     * @return Json
     */
    public function getClassroomBorrowInfo(Request $request)
    {
        // get all timezone data that ended after today
        $day = Carbon::now()->toDateString();

        // get timezone datas
        $timezones_info = Timezone::with(['type'])
            ->where('date_ended_at', '>=', $day)
            ->get();

        return response()->json($timezones_info);
    }
}
