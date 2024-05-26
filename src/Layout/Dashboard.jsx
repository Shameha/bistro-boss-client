// import React from 'react';

import { FaAd, FaCalendar, FaHome, FaList, FaSearch, FaShoppingCart } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hook/useCart";

const Dashboard = () => {
    const[cart] = useCart();
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
                <li>
                    <NavLink to='/dashboard/userHome'><FaHome></FaHome> My Home</NavLink>
                </li>
                <li>
                    <NavLink to='/dashboard/cart'><FaShoppingCart></FaShoppingCart> My cart ({cart.length})</NavLink>
                </li>
                <li>
                    <NavLink to='/dashboard/reserv'><FaCalendar></FaCalendar> My calender</NavLink>
                </li>
                <li>
                    <NavLink to='/dashboard/review'><FaAd></FaAd> Add review</NavLink>
                </li>
                <li>
                    <NavLink to='/dashboard/book'><FaList></FaList> My booking</NavLink>
                </li>
                <div className="divider"></div>
                <li>
                    <NavLink to='/'><FaHome></FaHome> My Home</NavLink>
                </li>
                <li>
                    <NavLink to='/order/salad'><FaSearch></FaSearch> Menu</NavLink>
                </li>
                </ul>
            </div>
            <div className="flex-1 p-8">
        <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;