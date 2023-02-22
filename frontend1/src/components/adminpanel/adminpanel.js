import "../adminpanel/adminpanel.css"
import React from "react"
import {Tabs} from "antd";
import GetAllBookings from "./getbookings";
import GetAllRooms from "./getallrooms";
import GetAllUsers from "./getallusers";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import AddRoom from "./addroom";


const {TabPane} = Tabs;
function AdminPanel () 
{
    useEffect(() => {
     
        if(!jwt_decode(localStorage.getItem("current-token")).isAdmin){
            window.location.href="/"
        }
    }, )
    
    return (<>
        <div className="container-fluid d-flex justify-content-center box mt-5">
        <div className="admin-box p-5 font-large ">
        <h1 className="text-center fw-bolder fs-1">Admin Panel</h1>
        <Tabs defaultActiveKey="1">
            <TabPane tab="Bookings" key="1" className="fs-3">
                <GetAllBookings/>
            </TabPane>
            <TabPane tab="Rooms" key="2">
                <GetAllRooms/>
            </TabPane>
            <TabPane tab="Add Room" key="3">
                <AddRoom/>
            </TabPane>
            <TabPane tab="Users" key="4">
                <GetAllUsers/>
            </TabPane>
          

        </Tabs>
        </div>
        </div>
    </>)
}


export default AdminPanel