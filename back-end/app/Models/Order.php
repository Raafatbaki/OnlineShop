<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    public function user(){
        return $this->belongsTo(User::class)->withDefault([
            'name'=>'Guest Customer'
        ]);
    }



    public function products(){
        return $this->belongsToMany(Product::class,"order_items",'order_id',"product_id",'id','id')
            ->using(OrderItem::class)
            ->withPivot([
                "product_name",'price','quantity','options'
            ]);
    }




}
