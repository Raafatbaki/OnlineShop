<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{

    use HasFactory,SoftDeletes;
    protected $connection="mysql";
    protected $table="products";
    protected $primaryKey="id";
    public $incrementing =true;


    protected $fillable=[
        'product_name','slug','status','category_id','description','stock',
        "product_image",'price','category_id'
    ];

    public  function category(){
        return $this->belongsTo(Category::class,"category_id",'id');
    }
}
