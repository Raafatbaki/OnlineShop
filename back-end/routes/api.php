<?php

use App\Http\Controllers\Api\Dashboard\ProductImageController;
use App\Http\Controllers\Api\Dashboard\ProductsControler;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\UsersContoller;
use App\Http\Controllers\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Dashboard\CategoriesController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
//
//Route::middleware('guest:sanctum')->post('/login', function (Request $request) {
//    return $request->user();
//});
//
Route::get('/',function (Request $request){
    return $request->user();
})->middleware('auth:admin');

Route::post('admin/login', [AuthController::class, 'loginAdmin']);
Route::post('user/login', [AuthController::class, 'loginUser']);
Route::post('user/register', [AuthController::class, 'register']);
Route::get('/dashboard',[\App\Http\Controllers\Dashboard\HomeController::class,"index"]);


// Protected Routes for Admin
Route::middleware('auth:admin')->group(function () {
    Route::post('/logoutAdmin', [AuthController::class, 'logoutAdmin']);
    Route::get('/users', [UsersContoller::class, 'GetUsers']);
    Route::post('/authAdmin', [UsersContoller::class, 'AuthAdmin']);
    Route::get('/user/{id}', [UsersContoller::class, 'getUser']);
    Route::get('/userProfile/{id}', [ProfileController::class, 'getProfileById']);
    Route::put('/user/edit/{id}', [UsersContoller::class, 'editUser']);
    Route::delete('/user/delete/{id}', [UsersContoller::class, 'destroy']);
    Route::put('/profile/edit/{id}',[ProfileController::class,"updateProfileById"]);

});

//protected linke for Categories
Route::middleware(['auth:admin','forceJson'])->group(function () {

    Route::get('/admin/categories',[CategoriesController::class,'index']);
    Route::post('/admin/addcategory',[CategoriesController::class,'store']);
    Route::get('/admin/category/{id}',[CategoriesController::class,'getcategoryById']);
    Route::post('/admin/categoryEdit/{id}',[CategoriesController::class,'updateCategoryById']);
    Route::Delete('/admin/categories/delete/{id}',[CategoriesController::class,'destroy']);

});
//protected linke for products
Route::middleware('auth:admin')->group(function () {

    Route::get('/admin/products',[ProductsControler::class,'index']);
    Route::post('/admin/products/add',[ProductsControler::class,'store']);
    Route::get('/admin/product/{id}',[ProductsControler::class,'show']);
    Route::post('/admin/products/edit/{id}',[ProductsControler::class,'edit']);
    Route::delete('/admin/products/delete/{id}',[ProductsControler::class,'destroy']);
});
Route::middleware('auth:admin')->controller(ProductImageController::class)->group(function () {
    Route::post('/product-img/add', 'store');
    Route::delete('admin/product-foto-delete/{id}', 'destroy');
});
// Protected Routes for User
Route::middleware('auth:user')->group(function () {
    Route::post('/logoutUser', [AuthController::class, 'logoutUser']);
    Route::post('/loginUser', [UsersContoller::class, 'AuthUser']);
    Route::get('/user-info/{id}', [UsersContoller::class, 'getUser']);
});
