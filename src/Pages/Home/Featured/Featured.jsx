// import React from 'react';

import SectionTitle from "../../../Componants/SectionTitle/SectionTitle";
import image from "../../../assets/home/featured.jpg"
import './Featured.css';

const Featured = () => {
    return (
        <div className="featured-item my-20 text-white pt-8">
            <SectionTitle
            subHeading={"check it out"}
            heading={"Featured items"}
            ></SectionTitle>
     <div className="md:flex justify-center  items-center pb-20 pt-12 px-36">
     <div>
        <img src={image} alt="" />
     </div>
     <div className="md:ml-10">
        <p>Aug 20,2023</p>
        <p className="uppercase">where i can get?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, nesciunt praesentium maxime accusantium dolorum reprehenderit tenetur ad rerum quos corporis eveniet voluptates aliquam necessitatibus officia odit facilis hic velit quibusdam aut obcaecati, odio, ea quasi. Delectus sed fugit vel aliquid officia earum aperiam expedita labore dicta, nam deserunt, nobis explicabo.</p>
        <button className="btn btn-outline">Order now</button>
     </div>
     </div>


        </div>
    );
};

export default Featured;