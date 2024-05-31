// import React from 'react';

import { FaTrashAlt, FaUsers } from "react-icons/fa";
import SectionTitle from "../../../Componants/SectionTitle/SectionTitle";
import useMenu from "../../../hook/useMenu";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItems = () => {
    const [menu, ,refetch] = useMenu();
    const axiosSecure = useAxiosSecure();
    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`)
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }

            }
        });
    }
    return (
        <div>
            <SectionTitle heading={'hurry up'} subHeading={'manage all items'}></SectionTitle>

            <div>

                <div className="overflow-x-auto w-full">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>price</th>
                                <th>update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                menu.map((item, index) => <tr key={item._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>{item.price}</td>
                                    <td>
                                       <Link to={`/dashboard/updateItem/${item._id}`}><button className="btn btn-lg bg-orange-500"><FaUsers className="text-white font-2xl"></FaUsers> </button></Link>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteItem(item)} className="btn btn-ghost btn-xs"><FaTrashAlt className="text-red-600"></FaTrashAlt> </button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                        {/* foot */}

                    </table>
                </div>
            </div>

        </div>

    );
};

export default ManageItems;