import React, { useEffect, useState } from "react";
import axios from "axios";
import "../adminpanel/adminpanel.css";


function GetAllUsers() {
    let [allusers,setAllUsers] = useState([])
  const get_all_users = async () => {
    try {
      let { data } = await axios.get("http://localhost:5000/api/getallusers");
      console.log(data);
      const result = data.result;
      console.log("result", result);
      setAllUsers([...data.result])

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_all_users();
  }, []);


  return (<>
      {
            (allusers.length >0) ? (
                <div>
                    <h3 className="fw-bolder mb-3"> 
                        User Details Panel
                    </h3>
                    <div class="table-responsive-xl table-responsive">
                    <table className="table table-bordered table-dark " >
                    <thead className="heading-box">
                        <tr>
                            <th className="text-white fs-4">
                                User Id
                            </th>
                            <th className="text-white fs-4">
                                User Name
                            </th>
                            <th className="text-white fs-4">
                                Email
                            </th>
                            <th className="text-white fs-4">
                                Mobile
                            </th>
                            <th className="text-white fs-4">
                                Admin
                            </th>
                        
                        </tr>
                    </thead>
                    <tbody className="fs-6 text-white">
                        { allusers.map((users,value) =>{
                            return (<><tr>
                                <td className="text-wrap">{users._id}</td>
                                <td>{users.given_name}</td>
                                <td>
                                    {users.email}
                                </td>
                                <td>
                                    {users.mobile}
                                </td>
                                <td >
                                    {(users.isAdmin ) ? (<p className="text-white">Yes</p>) : (<p className="text-white">No</p>)}
                                </td>
                               </tr>
                            </>)
                        } )}
                    </tbody>
                    </table>
                    </div>
                </div>
            ) : (null)
        }
  </>);
}

export default GetAllUsers;
