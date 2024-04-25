<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory ,SoftDeletes;
    protected $fillable=[
        'name','slug','status','category_id','description','imag'
    ];


    protected $connection="mysql";
    protected $table="categories";
    protected $primaryKey="id";
    public $incrementing =true;

    public  function products(){
        return $this->hasMany(Product::class,"category_id",'id');
    }

    public function parent(){
        return $this->belongsTo(Category::Class,"category_id")->withDefault(['name'=>'--']);
    }

    public function childern(){
        return $this->hasMany(Category::class,"category_id","id");
    }
}
