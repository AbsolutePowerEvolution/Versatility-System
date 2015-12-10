<?php

namespace App\Http\Controllers\Api\User;

use App\Affair\Property;
use App\Affair\Category;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Http\Request;

class ClassroomController extends Controller
{
    /**
     * get classroom list with data
     *
     * @return Response $rsponse
     *  @return array classroom data
     *  @return int status
     */
    public function getClassroomList(){
        // get classroom list
        $classroom_list = Property::with([
            'loans' => function ($query) {
                $query
                    ->where('date_ended_at', '>=', date('Y-m-d', time()))
                    // what status should be selected?
                    ->whereIn('status', Category::getCategoryIds([
                        'loan.status' => [
                            'summited',
                            'processing',
                            'accepted'
                        ]
                    ]))
                    // what type should be selected?
                    ->whereIn('type', Category::getCategoryIds([
                        'loan.type' => [
                            'meeting',
                            'course',
                            'speech',
                            'interview',
                            'others'
                        ]
                    ]))
                    ->orderBy('long_term_token', 'asc')
                    ->get([
                        'id',
                        'property_id',
                        'type',
                        'date_began_at',
                        'date_ended_at',
                        'time_began_at',
                        'time_ended_at',
                        'long_term_token'
                    ]);
            },
            'status' => function ($query) {
                $query->get([
                    'id',
                    'name'
                ]);
            }
        ])
        ->where('category', '=', Category::getCategoryIds(['property' => 'classroom'])[0])
        ->get([
            'id',
            'name',
            'status'
        ]);

        // response
        $response = [
            'data'   => $classroom_list->jsonSerialize(),
            'status' => 0
        ];

        dd($response);

        // return
        return response()->json($response);
    }

}
