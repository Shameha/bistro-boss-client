// import React from 'react';

const FoodCard = ({item}) => {
    const{image,price,name,recipe}=item
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
  <figure><img src={image} alt="Shoes" /></figure>
  <p className="bg-slate-900 text-white absolute right-0" >${price}</p>
  <div className="card-body flex flex-col items-center">
    <h2 className="card-title text-center">{name}</h2>
    <p >{recipe}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-outline border-0 border-b-4 bg-slate-100 mt-4 border-orange-400">Buy Now</button>
    </div>
  </div>
</div>
    );
};

export default FoodCard;