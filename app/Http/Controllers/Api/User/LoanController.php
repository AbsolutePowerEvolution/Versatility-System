<?php

namespace App\Http\Controllers\Api\User;

use Illuminate\Http\Request;

use DB;
use Auth;
use App\Affair\Loan;
use App\Affair\Category;
use App\Http\Requests;
use App\Http\Controllers\Controller;

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
        $length = $request->input('length', 10);

        $borrow_list = Loan::with([
                'type',
                'status'
            ])
            ->join('properties as pro_t', function ($query) {
                $query->on('pro_t.id', '=', 'property_id')
                    ->where('pro_t.category', '=', Category::getCategoryId('property', 'others'));
            })
            ->where('user_id', '=', Auth::user()->id)
            ->paginate($length, [
                'loans.*',
                'pro_t.name as property_name',
            ]);

        return response()->json($borrow_list);
    }

    /**
     * Display a listing of the classroom borrow.
     *
     * Request $request
     * @return \Illuminate\Http\Response
     */
    public function indexClassroomBorrow(Request $request)
    {
        // get length
        $length = $request->input('length', 10);

        $borrow_list = Loan::with([
                'type',
                'status'
            ])
            ->join('properties as pro_t', function ($query) {
                $query->on('pro_t.id', '=', 'property_id')
                    ->where('pro_t.category', '=', Category::getCategoryId('property', 'classroom'));
            })
            ->where('user_id', '=', Auth::user()->id)
            ->paginate($length, [
                'loans.*',
                'pro_t.name as property_name',
            ]);

        return response()->json($borrow_list);
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
                'type' => Category::getCategoryId('loan.type', $request->input('type')),
                'status' => Category::getCategoryId('loan.status', 'processing'),
                'long_term_token' => bindec($request->input('long_term_token'))
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
                'status' => Category::getCategoryId('loan.status', 'canceled')
            ]);

        return response()->json(['status' => ($affect_rows==1)? 0:2]);
    }
}
