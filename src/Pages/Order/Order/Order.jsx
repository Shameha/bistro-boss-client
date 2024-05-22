// import React from 'react';
import { useState } from "react";
import orderCover from "../../../assets/shop/banner2.jpg"
import Cover from "../../Shared/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from "../../../hook/useMenu";
// import FoodCard from "../../../Componants/FoodCard/FoodCard";
import OrderTab from "../OrderTab/OrderTab";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
// import { Helmet } from "react-helmet-async";

const Order = () => {
const categories = ['salad','pizza','soup','dessert','offered']
const {category} = useParams();
const initialIndex = categories.indexOf(category);

    const[tabIndex,setTabIndex] = useState(initialIndex);
    const[menu] = useMenu();
    



    const desserts = menu.filter(item => item.category === "dessert")
    const soup = menu.filter(item => item.category === "soup")
    const salad = menu.filter(item => item.category === "salad")
    const pizza = menu.filter(item => item.category === "pizza")
    const offer = menu.filter(item => item.category === "offered")
    return (
        <div>
           <Helmet><title>Bistro | order</title></Helmet>
         
            <Cover img={orderCover} title={"Order food"}></Cover>
            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
  <TabList>
    <Tab>Salad</Tab>
    <Tab>Pizza</Tab>
    <Tab>Soup</Tab>
    <Tab>Dessert</Tab>
    <Tab>Drinks</Tab>
  </TabList>
  <TabPanel>
<OrderTab items={salad}></OrderTab>
  </TabPanel>
  <TabPanel>
  <OrderTab items={pizza}></OrderTab>
  </TabPanel>
  <TabPanel>
  <OrderTab items={soup}></OrderTab>
  </TabPanel>
  <TabPanel>
  <OrderTab items={desserts}></OrderTab>
  </TabPanel>
  <TabPanel>
  <OrderTab items={offer}></OrderTab>
  </TabPanel>
</Tabs>
        </div>
    );
};

export default Order;