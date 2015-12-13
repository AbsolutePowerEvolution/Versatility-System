<?php

namespace App\Http\Controllers\Api\Manager;

use Illuminate\Http\Request;

use App\Affair\Loan;
use App\Affair\Category;
use App\Affair\User;
use App\Http\Requests;
use App\Http\Controllers\Controller;

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
        $length = (int)$request->input('length', 10);

        // get borrow list
        $borrow_list = Loan::with([
                'user',
                'type',
                'status'
            ])
            ->join('properties as pro_t', function ($join) {
                $join->on('pro_t.id', '=', 'property_id')
                    ->where('pro_t.category', '=', Category::getCategoryId('property', 'others'));
            })
            ->paginate($length);

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
        $length = $request->input('length', 10);

        // get borrow list
        $borrow_list = Loan::with([
                'user',
                'type',
                'status'
            ])
            ->join('properties as pro_t', function ($join) {
                $join->on('pro_t.id', '=', 'property_id')
                    ->where('pro_t.category', '=', Category::getCategoryId('property', 'classroom'));
            })
            ->paginate($length);

        return response()->json($borrow_list);
    }

    /**
     * Store a newly created other property borrow in storage.
     *
     * @param Request $request
     * @return Json
     */
    public function store(Request $request)
    {
        // Borrow out other property, no check for user should borrow property by going to the office personally.
        Loan::create(array_merge(array_only($request->all(), [
                'property_id',
                'date_began_at',
                'date_ended_at',
                'remark'
            ]), [
                'user_id' => Auth::user()->id,
                'type' => Category::getCategoryId('loan.type', $request->input('type', 'others')),
                'status' => Category::getCategoryId('loan.status', 'accepted')
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
        $LTK = $request->input('long_term_token');

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
                'status' => Category::getCategoryId('loan.status', $request->input('accepted')),
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
    public function updateClassroomBorrow(Request $request, $id)
    {
        $affect_row = Loan::where('id', '=', $id)
            ->update(['status' => Category::getCategoryId('loan.status', $request->input('status'))]);

        return response()->json(['status' => ($affect_row==1)? 0:2]);
    }

    /**
     * Get classroom borrow infomation
     *
     * @return Json
     */
    public function getClassroomBorrowInfo()
    {
        $redis_cli = new \Predis\Client;
        $borrow_info = $redis_cli->mget([
                'time_name',
                'began_date',
                'ended_date',
                'stu_start',
                'lab_start'
            ]);

        return response()->json($borrow_info);
    }

    /**
     * Set classroom borrow infomation
     *
     * @param Request $request
     * @return Json
     */
    public function setClassroomBorrowInfo(Request $request)
    {
        $redis_cli = new \Predis\Client;
        $redis_cli->mset(array_only($request->all(), [
                'time_name',
                'began_date',
                'ended_date',
                'stu_start',
                'lab_start'
            ]));

        return response()->json(['status' => 0]);
    }
}
