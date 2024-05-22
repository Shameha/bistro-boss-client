// import React from 'react';

import { Helmet } from "react-helmet";
import Cover from "../../Shared/Cover/Cover";
import menuImg from "../../../assets/menu/banner3.jpg"
import dessertImg from "../../../assets/menu/dessert-bg.jpeg"
import pizzaImg from "../../../assets/menu/pizza-bg.jpg"
import soupImg from "../../../assets/menu/soup-bg.jpg"
import saladImg from "../../../assets/menu/salad-bg.jpg"
import useMenu from "../../../hook/useMenu";
import SectionTitle from "../../../Componants/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";
// import useMenu from "../../../Hooks/UseMenu";


const Menu = () => {
    const [menu] = useMenu();
    const desserts = menu.filter(item => item.category === "dessert")
    const soup = menu.filter(item => item.category === "soup")
    const salad = menu.filter(item => item.category === "salad")
    const pizza = menu.filter(item => item.category === "pizza")
    const offer = menu.filter(item => item.category === "offered")
    return (
        <div>
            <Helmet><title>Bistro | menu</title></Helmet>
       <Cover img={menuImg}
       title={"our menu"}
       ></Cover>
        <SectionTitle
        subHeading={"Do not miss"}
        heading={"Dont miss"}
        >
      
        </SectionTitle>
        <MenuCategory items={offer}></MenuCategory>
        <MenuCategory
        items={desserts}
        title={"dessert"}
        img={dessertImg}
        ></MenuCategory>

        <MenuCategory
        items={pizza}
        title={"pizza"}
        img={pizzaImg}
        ></MenuCategory>
        
        
        <MenuCategory
        items={soup}
        title={"soup"}
        img={soupImg}
        ></MenuCategory>
        
        <MenuCategory
        items={salad}
        title={"salad"}
        img={saladImg}
        ></MenuCategory>
        
        </div>
    );
};

export default Menu;