// import React from 'react';

import { useEffect, useState } from "react";
import SectionTitle from "../../../Componants/SectionTitle/SectionTitle";
// import useMenu from "../../../hooks/useMenu";


import MenuItem from "../../Shared/MenuItem/MenuItem";

// import { data } from "autoprefixer";

const PopularMenu = () => {


const [menu,setMenu] = useState([]);


    useEffect(()=>{
      fetch('menu.json')
      .then(res => res.json())
      .then(data => {
        const popularItems = data.filter(item =>item.category === 'popular');
        setMenu(popularItems)

      })
    },[])

    return (
        <section className="mb-12">
            <SectionTitle
            heading={"From our menu"}
            subHeading={"Popular Items"}
            >
            
            </SectionTitle>
            <div className="grid md:grid-cols-2 gap-10">
                {
                    menu.map(item=><MenuItem
                    key={item._id}
                    item={item}
                    ></MenuItem>)
                }
            </div>
        </section>
    );
};

export default PopularMenu;