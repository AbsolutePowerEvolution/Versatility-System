<?php

namespace App\Http\Controllers\Api\Manager;

use Auth;
use App\Affair\Loan;
use App\Affair\Property;
use App\Affair\Category;
use App\Affair\User;
use App\Affair\Timezone;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;

class LoanController extends Controller
{
    /**
     * Display a listing of the other properties borrow list.
     *
     * @param Request $request
     * @return Json
     */
    public function index(Request $request)
    {
        // get length
        $length = ($request->input('length') > 0) ? $request->input('length') : 10;

        // get borrow list
        $borrow_list = Loan::with([
                'user',
                'type',
                'status',
            ])
            ->join('properties as pro_t', function ($join) {
                $join->on('pro_t.id', '=', 'property_id')
                    ->where('pro_t.category', '=', Category::getCategoryId('property', 'others'));
            })
            ->orderBy('date_ended_at', 'DESC')
            ->paginate($length, [
                'loans.*',
                'pro_t.name as property_name',
            ]);

        return response()->json($borrow_list);
    }

    /**
     * Display a listing of the classroom borrow list.
     *
     * @param Request $request
     * @return Json
     */
    public function indexClassroomBorrow(Request $request)
    {
        // get length
        $length = ($request->input('length') > 0) ? $request->input('length') : 10;
        $loan_type = Category::getCategoryId('loan.type', $request->input('type'));
        $loan_status = Category::getCategoryId('loan.status', $request->input('status'));

        // get borrow array
        $borrow_query = Loan::with([
                'user',
                'type',
                'status',
            ])
            ->join('properties as pro_t', function ($join) {
                $join->on('pro_t.id', '=', 'property_id')
                    ->where('pro_t.category', '=', Category::getCategoryId('property', 'classroom'));
            });

        // if loan type/status is set
        $borrow_query = ($loan_type > 0) ? $borrow_query->where('type', '=', $loan_type) : $borrow_query;
        $borrow_query = ($loan_status > 0) ? $borrow_query->where('loans.status', '=', $loan_status) : $borrow_query;

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
                    Loan::getConflictList($dates, $query)
                        ->where('loans.status', '=', Category::getCategoryId('loan.status', 'accepted'))
                        ->join('categories as type', 'type.id', '=', 'loans.type')
                        ->join('users', 'users.id', '=', 'user_id');
                },
            ])
            ->where('category', '=', Category::getCategoryId('property', 'classroom'))
            ->get();

        return response()->json($classroom_borrow);
    }

    /**
     * Display a listing of the course borrow list.
     *
     * @return Json
     */
    public function indexCourse()
    {
        // get course list
        $course_list = Loan::join('properties as pro_t', function ($join) {
                $join->on('pro_t.id', '=', 'property_id')
                    ->where('pro_t.category', '=', Category::getCategoryId('property', 'classroom'));
            })
            ->where('loans.type', '=', Category::getCategoryId('loan.type', 'course'))
            ->where('loans.status', '=', Category::getCategoryId('loan.status', 'accepted'))
            ->get(['loans.*', 'pro_t.name as property_name']);

        // translate long-term-token from int to TF array
        foreach ($course_list as $key => $value) {
            $token = str_split(substr(decbin($value->long_term_token + 128), 1, 7));
            $token = array_map(function ($token) {
                return $token === '1';
            }, $token);

            $course_list[$key]->long_term_token = $token;
        }

        return response()->json($course_list);
    }

    /**
     * Store a newly created other property borrow in storage.
     *
     * @param Request $request
     * @return Json
     */
    public function store(Request $request)
    {
        $user = User::where('username', '=', $request->input('username'))->first();

        if ($user === null) {
            return response()->json(['status' => 2]);
        }

        // Borrow out other property, no check for user should borrow property by going to the office personally.
        Loan::create(array_merge(array_only($request->all(), [
                'property_id',
                'date_began_at',
                'date_ended_at',
                'remark',
            ]), [
                'user_id' => $user->id,
                'type' => Category::getCategoryId('loan.type', $request->input('type', 'others')),
                'status' => Category::getCategoryId('loan.status', 'accepted'),
            ]));

        return response()->json(['status' => 0]);
    }

    /**
     * Store a newly created classroom borrow in storage.
     *
     * @param Request $request
     * @return Json
     */
    public function storeClassroomBorrow(Request $request)
    {
        $p_id = $request->input('property_id');
        $date_info = [$request->input('date_began_at'), $request->input('date_ended_at')];
        $time_info = [$request->input('time_began_at'), $request->input('time_ended_at')];
        $LTK = bindec($request->input('long_term_token'));

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
                'type' => Category::getCategoryId('loan.type', $request->input('type', 'course')),
                'status' => Category::getCategoryId('loan.status', 'accepted'),
                'long_term_token' => bindec($request->input('long_term_token')),
            ]));

        return response()->json(['status' => 0]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $affect_row = Loan::where('id', '=', $id)
            ->update(['status' => Category::getCategoryId('loan.status', $request->input('status'))]);

        return response()->json(['status' => ($affect_row == 1) ? 0 : 2]);
    }

    /**
     * Delete the specified resource in storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function deleteClassroomBorrow($id)
    {
        $affect_row = Loan::where('id', '=', $id)
            ->update(['status' => Category::getCategoryId('loan.status', 'deleted')]);

        return response()->json(['status' => ($affect_row == 1) ? 0 : 2]);
    }

    /**
     * Get classroom borrow infomation.
     *
     * @return Json
     */
    public function getClassroomBorrowInfo(Request $request)
    {
        // get all timezone data with today
        $day = Carbon::now()->toDateString();
        $con_str = $request->input('con_str', '<=');

        // get timezone datas
        $timezones_info = Timezone::with(['type'])
            ->where('date_ended_at', $con_str, $day)
            ->get();

        return response()->json($timezones_info);
    }

    /**
     * Set classroom borrow infomation.
     *
     * @param Request $request
     * @return Json
     */
    public function setClassroomBorrowInfo(Request $request)
    {
        // parse timezone info
        $timezone_info = array_only($request->all(), [
                'zone_name',
                'date_began_at',
                'date_ended_at',
                'stu_date_began_at',
                'lab_date_began_at',
            ]);

        Timezone::create(array_merge($timezone_info, [
            'type' => Category::getCategoryId('time.type', $request->input('type')),
        ]));

        return response()->json(['status' => 0]);
    }

    /**
     * Delete classroom borrow infomation
     *
     * @param Int id
     * @return Json
     */
    public function deleteClassroomBorrowInfo($id)
    {
        $result = Timezone::find($id)->delete();

        return response()->json(['status' => ($result? 0:2)]);
    }
}
