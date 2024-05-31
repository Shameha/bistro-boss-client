// import React from 'react';

import { useForm } from "react-hook-form";
import SectionTitle from "../../Componants/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../hook/useAxiosPublic";
import useAxiosSecure from "../../hook/useAxiosSecure";
import Swal from "sweetalert2";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddItems = () => {
    
    const { register, handleSubmit,reset } = useForm();
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
            const menuRes = await axiosSecure.post('/menu',menuItem);
            console.log(menuRes.data);
            if(menuRes.data.insertedId){
                //show success alart
                reset();
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
            <SectionTitle heading={'News here'} subHeading={'whats new'}>

            </SectionTitle>
            <div>
            <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      <label className="form-control w-full my-6">
  <div className="label w-full">
    <span className="label-text">Recipe name</span>
  </div>
  <input type="text" placeholder="Recipe" {...register("name",{required:true})} className="input input-bordered w-full max-w-xs" />
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
    <span className="label-text">Recipe name</span>
  </div>
  <input type="number" placeholder="price" {...register("price")} className="input input-bordered w-full max-w-xs" />
</label>
</div>
</div>
<div>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">recipi details</span>
  </div>
  <input type="text" {...register("recipe")} placeholder="Bio" className="input input-bordered w-full max-w-xs" />
</label>
</div>
<div>
<input type="file" {...register("image")} className="file-input w-full max-w-xs" />
</div>
      
      
      <button className="btn">Add item<FaUtensils></FaUtensils></button>
    </form>
            </div>
        </div>
    );
};

export default AddItems;