// import React from 'react';

import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../Componants/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import Swal from "sweetalert2";
import { FaUtensils } from "react-icons/fa";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const UpdateItems = () => {
    const {name,category,price,recipe,_id} = useLoaderData();
    const { register, handleSubmit} = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) =>{
        console.log(data)
        //image upload get url 
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(image_hosting_api,imageFile,{
            headers:{
                "Content-Type":'multipart/form-data'
            }
        })
        if(res.data.success){
            //send to the menu 
            const menuItem ={
                name:data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe:data.recipe,
                image:res.data.data.display_url
            }
            //
            const menuRes = await axiosSecure.patch(`/menu/${_id}`,menuItem);
            console.log(menuRes.data);
            if(menuRes.data.modifiedCount>0){
                //show success alart
                // reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title:`${data.name} is added`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }

        }
        console.log('with image url',res.data);
    } ;
  
  
    return (
        <div>
         <SectionTitle heading={'Update Items'} subHeading={'manage all items'}></SectionTitle>
         <div>
            <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      <label className="form-control w-full my-6">
  <div className="label w-full">
    <span className="label-text">Recipe name</span>
  </div>
  <input type="text" placeholder="Recipe" defaultValue={name} {...register("name",{required:true})} className="input input-bordered w-full max-w-xs" />
</label>
<div className="flex gap-6">
    {/* category */}
    
  <div>
  <select defaultValue="default" {...register("category",{required:true})}
       className="select select-bordered w-full">
  <option disabled value="default">select a category</option>
  <option value="salad">salad</option>
  <option value="pizza">pizza</option>
  <option value="soup">soup</option>
  <option value="dessert">dessert</option>
  <option value="drinks">drinks</option>
</select>
  </div>
{/* price */}
<div >
<label className="form-control w-full my-6">
  <div className="label w-full">
    <span defaultValue={category} className="label-text">Recipe name</span>
  </div>
  <input type="number" defaultValue={price} placeholder="price" {...register("price")} className="input input-bordered w-full max-w-xs" />
</label>
</div>
</div>
<div>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">recipi details</span>
  </div>
  <input defaultValue={recipe} type="text" {...register("recipe")} placeholder="Bio" className="input input-bordered w-full max-w-xs" />
</label>
</div>
<div>
<input type="file" {...register("image")} className="file-input w-full max-w-xs" />
</div>
      
      
      <button className="btn">Update Items<FaUtensils></FaUtensils></button>
    </form>
            </div>
        </div>
        
    );
};

export default UpdateItems;