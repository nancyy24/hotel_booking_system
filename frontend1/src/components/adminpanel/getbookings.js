import React, { useEffect, useState } from "react"
import axios from "axios"
import "../adminpanel/adminpanel.css"
function GetAllBookings()
{
    let [ bookings,setBookings] = useState([])
    const get_all_bookings = async () => {
        try {
          let { data } = await axios.get("http://localhost:5000/api/getallroombookings");
          console.log(data);
          const result = data.result;
        //   console.log("result", result);
          setBookings([...data.result])
        } 
        catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
    get_all_bookings()
    }, [])
    

    return (<>
        {
            (bookings.length >0) ? (
                <div>
                    <h3 className="fw-bolder mb-3">
                        Bookings Panel
                    </h3>
                    <div class="table-responsive-xl table-responsive">
                    <table className="table table-bordered table-dark " >
                    <thead className="heading-box">
                        <tr>
                            <th className="text-white ">
                                Booking Id
                            </th>
                            <th className="text-white">
                                User Id
                            </th>
                            <th className="text-white ">
                                Hotel Name 
                            </th>
                            <th className="text-white fs-4">
                                CheckIn
                            </th>
                            <th className="text-white fs-4">
                                CheckOut
                            </th>
                            <th className="text-white">
                                Stay
                            </th>
                            <th className="text-white">
                                Amount
                            </th>
                            <th className="text-white">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="fs-6 text-white">
                        { bookings.map((book,value) =>{
                            return (<><tr>
                                <td className="text-wrap">{book._id}</td>
                                <td>{book.userid}</td>
                                <td>
                                    {book.room}
                                </td>
                                <td>
                                    {book.fromdate}
                                </td>
                                <td>
                                    {book.todate}
                                </td>
                                <td>
                                    {book.totaldays}
                                </td>
                                <td>
                                    {book.totalamount}
                                </td>
                                <td>
                                    {book.status}
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

export default GetAllBookings