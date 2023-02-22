import React, { useState } from "react"
import "../adminpanel/adminpanel.css"
import axios from "axios";
import { useEffect } from "react";

function GetAllRooms () {

    let [allrooms , setAllRooms] = useState([])
    const get_all_rooms = async () => {
        try {
          let { data } = await axios.get("http://localhost:5000/api/all_room");
          console.log(data);
        //   const result = data.result;
        //   console.log("result", result);
          setAllRooms([...data.result])


        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
        get_all_rooms()
    }, [])
    
   return ( <>
     {
            (allrooms.length >0) ? (
                <div>
                    <h3 className="fw-bolder mb-3">
                        Room Details Panel
                    </h3>
                    <div class="table-responsive-xl table-responsive">
                    <table className="table table-bordered table-dark " >
                    <thead className="heading-box">
                        <tr>
                            <th className="text-white fs-4">
                                Hotel Name
                            </th>
                            <th className="text-white fs-4">
                                Contact Details
                            </th>
                            <th className="text-white fs-4">
                                Accomodation
                            </th>
                            <th className="text-white fs-4">
                                Room Type
                            </th>
                            <th className="text-white fs-4 ">
                                Bookings
                            </th>
                            <th className="text-white fs-4">
                                Rating
                            </th>
                            <th className="text-white fs-4">
                                Cost per Day
                            </th>
                            <th className="text-white fs-4">
                                locality
                            </th>
                        </tr>
                    </thead>
                    <tbody className="fs-6 text-white">
                        { allrooms.map((room,value) =>{
                            return (<><tr>
                                <td className="text-wrap">{room.name}</td>
                                <td>{room.contact}</td>
                                <td>
                                    {room.no_of_people}
                                </td>
                                <td>
                                    {room.roomtype}
                                </td>
                                <td>
                                    {room.totalbookings.length}
                                </td>
                                <td>
                                    {room.aggregate_rating}
                                </td>
                                <td>
                                    {room.costperday}
                                </td>
                                <td>
                                    {room.locality},{room.city}
                                </td></tr>
                            </>)
                        } )}
                    </tbody>
                    </table>
                    </div>
                </div>
            ) : (null)
        }
   </>)
    
}

export default GetAllRooms
