import { useEffect, useState } from "react"
import "../profilepage/profilepage.css"
import jwt_decode from "jwt-decode";
import axios from "axios"
import Swal from "sweetalert2";

function Profile(){

  let [tab,setTab] = useState(1);
 let[bookedroomsbyId,setBookedroomsbyId] = useState([])
  let profiledetails = localStorage.getItem("current-token")
  
if(localStorage.getItem("current-token") ){

  var userdetails = jwt_decode(localStorage.getItem("current-token"))
    
}
  let getbookingdetails = async ()=> {
    const userIdDetails = {
    id : userdetails._id
    }
    try{
        let URL = "http://localhost:5000/api/getroomsbyId";
        let response = await axios.post(URL,userIdDetails);
        const data = response.data;
        // console.log(data);
        if(data.status === true)
        {
          console.log(data)
          setBookedroomsbyId([...data.result])
          // setRestaurant({...data.result});
        //   setRoom_detail({...data.result});
        }
        else{
        //   setRoom_detail({...defaultValue});
        console.log("no such room")
        }
      }
        
      
      catch(error){
        alert("server error");
        
      }
  }

  let cancelBooking = async(bookingid,roomid) =>{
    let cancelroomsobj = {
        bookingid : bookingid,
        roomid : roomid
    }
        try{            
            const result = await axios.post("http://localhost:5000/api/cancelroom",cancelroomsobj)
        //     console.log(result)
        Swal.fire({
                icon: 'success',
                title: 'Cancel Booking',
                text: 'Booking Cancelled!!',
              })
              .then(() =>
              {
                window.location.reload();
        
              })
        }
        catch(error)
        {
            console.log(error)
        }
  }
  

    return (<>
    { (profiledetails) ? ( <div>
         <div >
            <ul className="tabstyle ms-5 mt-4">
              <li className="me-5 border-bottom border-danger pb-3 cursor-pointer fs-2 fw-bolder" onClick={()=>{setTab(1)}}>Profile</li>
              <li className=" border-bottom border-danger cursor-pointer fs-2 fw-bolder" onClick={()=>{setTab(2)
              getbookingdetails()}}>Bookings</li>
            </ul>
          </div>

          {  (tab === 1) ?        
       (<div className="ms-5 overview-box ">
        <p className="fw-bold my-4 fs-1 headings">Details About You !!</p>
        <div className="border-bottom border-danger w-75  pb-3 mb-3">
                <h4 className="fw-bold fs-2 headings">Name </h4>
                
                <p className="mb-0 ms-5 fs-5">
                  {userdetails.given_name}</p>
        </div>
        <div  className="border-bottom border-danger w-75  pb-3 mb-3">
                <h4 className="fw-bold fs-2 headings">Email Id</h4>
                <p className="mb-0 ms-5 fs-5">{userdetails.email}</p>
        </div>
        <div className="border-bottom border-danger w-75  pb-3 mb-3" >
                <h4 className="fw-bold fs-2 headings ">Contact No.</h4>
                <p className="mb-0 ms-5 fs-5">{userdetails.mobile}</p>
        </div>
        <div className="border-bottom border-danger w-75  pb-3 mb-3" >
                <h4 className="fw-bold fs-2 headings">User Id</h4>
                <p className="mb-0  ms-5 fs-5">{userdetails._id}</p>
        </div>
       
      
        </div>)
        : 
        bookedroomsbyId.length > 0  ?
        (   bookedroomsbyId.map((rooms,value) =>{
          return(  <div className="ms-5 contact-box headings mb-5">
        <p className="fw-bold mb-4  fs-1 headings">Booking details</p>
        <div className="border-bottom border-danger w-75  pb-3 mb-2">
                <h4 className="fw-bold fs-2 headings">Hotel Name</h4>
                <p className="text-danger mb-0  ms-5 fs-5">{rooms.room}</p>
        </div>
        <div className="border-bottom border-danger w-75  pb-3 mb-2">
                <h4 className="fw-bold fs-2 headings">Booking Id</h4>
                <p className="mb-0  ms-5 fs-5">{rooms._id}</p>
        </div>
        <div className="border-bottom border-danger w-75  pb-3 mb-2">
                <h4 className="fw-bold fs-2 headings">Check-In</h4>
                <p className="mb-0  ms-5 fs-5">{rooms.fromdate}</p>
        </div>
        <div className="border-bottom border-danger w-75  pb-3 mb-2">
                <h4 className="fw-bold fs-2 headings">Check-Out</h4>
                <p className="mb-0  ms-5 fs-5">{rooms.todate}</p>
        </div>
        <div className="border-bottom border-danger w-75  pb-3 mb-2">
                <h4 className="fw-bold fs-2 headings">Check-In</h4>
                <p className="mb-0  ms-5 fs-5">{rooms.fromdate}</p>
        </div>
        <div className="border-bottom border-danger w-75  pb-3 mb-2">
                <h4 className="fw-bold fs-2 headings">Total Days</h4>
                <p className="mb-0  ms-5 fs-5">{rooms.totaldays}</p>
        </div>
        <div className="border-bottom border-danger w-75  pb-3 mb-2">
                <h4 className="fw-bold fs-2 headings">Status</h4>
                <p className="mb-0  ms-5 fs-5">{ rooms.status === "booked" ? (<span class="badge bg-success rounded-pill">Booked</span>) : (<span class="badge bg-danger rounded-pill">Cancelled</span>)}</p>
        </div>
        <div className="border-bottom border-danger w-75  pb-3 mb-2">
                <h4 className="fw-bold fs-2 headings">Total Amount</h4>
                <p className="mb-0  ms-5 fs-5">{rooms.totalamount}</p>
        </div>
        { rooms.status !== "Cancelled" ? ( <div className="d-flex justify-content-end mt-3 p-3">
            <button className="btn btn-dark btn-lg" onClick={() =>{ cancelBooking(rooms._id,rooms.roomid)  }}>Cancel Booking</button>
        </div>) : ( <div className="d-flex justify-content-end mt-3 p-3">
            <button className="btn btn-danger btn-lg" >This Booking Room has been Cancelled</button>
        </div>)}
       
        </div>)
        }) 

        ) : 
        (<div className="d-flex justify-content-center justify-align-center border border-3 border-danger mt-5 oops-box">
            <h1 className="fs-1 fw-bolder">OOps !! NO booking Found  <i className="fa fa-frown-o text-danger" aria-hidden="true"></i></h1>
        </div>) 
        
    
       }
       </div> )  : (<div className="d-flex justify-content-center justify-align-center border border-3 border-danger mt-5 oops-box">
            <h1 className="fs-1 fw-bolder">Alert !! Need to Login First </h1>
        </div>)
      
    }
    </>)
}


export default Profile