<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;


class ProfileController extends Controller
{



        public function getProfileById($id){

            if(Auth::guard("admin")){
                return Response::json([
                    "profile"=>User::findOrFail($id)->profile()->get(),
                    'user'=>User::findOrFail($id)
                ]);
            } elseif (Auth::guard("user")->check() && Auth::guard("user")->user()->id == $id) {
                return Response::json([
                    "profile" => User::findOrFail($id)->profile()->get(),
                    'user'=>User::findOrFail($id)]);
        }
            return Response::json(["error" => "Unauthorized"], 401);
    }



    public function updateProfileById(RegisterRequest $request, $id)
    {

        return DB::transaction(function () use ($request, $id) {
            $user = User::findOrFail($id);
            $user->name = $request->username;
            $user->email = $request->email;
            $user->save();

            $updated = $user->profile()->update([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'birthday' => $request->birthday,
                'gender' => $request->gender,
                'address' => $request->street_address,
                'city' => $request->city,
                'state' => $request->state,
                'postal_code' => $request->postal_code,
                'country' => $request->country
            ]);

            if (!$updated) {
                return response()->json([
                    "message" => "Failed to update"
                ], 500);
            }

            return response()->json([
                "message" => "Successfully updated"
            ], 200);
        }, 5);
    }

    private function convertDateToISO($date) {
        $dateTime = DateTime::createFromFormat('m-d-Y', $date);
        if ($dateTime) {
            return $dateTime->format('Y-m-d');  // تنسيق التاريخ إلى الصيغة المطلوبة
        } else {
            return false;  // أو رمي خطأ إذا كان التاريخ غير صالح
        }
    }




}
