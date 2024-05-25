// import React from 'react';

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";



const useCart = () => {
    const axiosSecure = useAxiosSecure()
    // tan stack query will load the data
   const {data:cart=[]} = useQuery({
  queryKey:['cart'],
  queryFn: async() =>{
    const res = await axiosSecure.get('/carts')
    return res.data
  }
   })


    return [cart] 
};

export default useCart;