// import React from 'react';

import SectionTitle from "../../../Componants/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
// import Rating from "react-rating";
import '@smastrom/react-rating/style.css'


const Testimonial = () => {
const[reviews,setReviews]=useState([]);
useEffect(()=>{
   fetch('http://localhost:5000/review')
    .then(res=>res.json())
    .then(data => setReviews(data))
   


},[])


    return (
        <section className="my-20">
        <SectionTitle
        subHeading={"what our client say"}
        heading={"Testimonials"}
        >


        </SectionTitle>
        
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        
        {
            reviews.map(review=><SwiperSlide
            key={review._id}
            ><div className="my-16 mx-24 flex flex-col items-center">
              <Rating
      style={{ maxWidth: 180 }}
      value={review.rating}
      readOnly
    />
                <p>{review.details}</p>
                <h3 className="text-orange-500 text-2xl">{review.name}</h3>
                </div></SwiperSlide>)
        }
      </Swiper>



        </section>
    );
};

export default Testimonial;