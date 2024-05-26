// import React from 'react';

import Swal from "sweetalert2";
import useAuth from "../../hook/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useCart from "../../hook/useCart";




const FoodCard = ({item}) => {
    const{image,price,name,recipe,_id}=item;
    const{user} = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [ ,refetch] = useCart();
   
   
   
    const handleAddToCart = () =>{
    if(user && user.email){
      //to sent item

      // console.log(user.email,food);
      const cartItem = {
        menuId : _id,
        email:user.email, 
        name,
        image,
        price
      }
      axiosSecure.post('/carts',cartItem)
     .then(res =>{
      console.log(res.data)
      if(res.data.insertedId){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${name} added`,
          showConfirmButton: false,
          timer: 1500
        });
        //refetch the cart
        refetch()
      }
     })


    }
    else{
      Swal.fire({
        title: "you are not login",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login"
      }).then((result) => {
        if (result.isConfirmed) {
          // send to the login page
          navigate('/login',{state: {from: location}});
        }
      });
    }
    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
  <figure><img src={image} alt="Shoes" /></figure>
  <p className="bg-slate-900 text-white absolute right-0" >${price}</p>
  <div className="card-body flex flex-col items-center">
    <h2 className="card-title text-center">{name}</h2>
    <p >{recipe}</p>
    <div className="card-actions justify-end">
      <button onClick={handleAddToCart}
       className="btn btn-outline border-0 border-b-4 bg-slate-100 mt-4 border-orange-400">Buy Now</button>
    </div>
  </div>
</div>
    );
};

export default FoodCard;