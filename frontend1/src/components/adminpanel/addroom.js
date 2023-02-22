import Swal from "sweetalert2";
import axios from "axios";
import React, { useState } from "react";
import "../adminpanel/adminpanel.css"
function AddRoom (){

    let[name,setName] = useState("")
    let[location_id,setLocation_id] = useState()
    let[city_id,setCity_id] = useState()
    let [location,setLocation] = useState("")
    let[city,setCity] = useState("")
    let[contact,setContact] = useState()
    let[roomtype,setRoomType] = useState("")
    let[hotelDescription,setHotelDescription]=useState("")
    let[accomodation,setaccomodation] = useState()
    let[hotelImage,setHotelImage]= useState('')
    let [hotel_Image_1,setHotelImg_1] = useState("")
    let[hotel_Image_2,setHotel_Image_2]= useState("")
    let[hotel_Image_3,setHotel_Image_3] = useState("")
    let[costperday,setCostPerDay]=useState()
    let[facilities,setfacilities] = useState("")
    let[rating,setRating]=useState()
    let[reviews,setreviews]=useState("")

    let addbutton = async ()=>{
        let roomdetails = {
            name:name,
            location_id:location_id,
            city_id:city_id,
            locality:location,
            city:city,
            contact:contact,
            roomtype:roomtype,
            description:hotelDescription,
            no_of_people:accomodation,
            image:hotelImage,
            images:[ hotel_Image_1,hotel_Image_2, hotel_Image_3,],
           
            
           
            costperday:costperday,
            facilities:facilities,
            aggregate_rating:rating,
            rating_text:reviews
        }
        console.log(roomdetails)

        let { data } = await axios.post("http://localhost:5000/api/addroom",roomdetails);
        if(data.status == true)
        {
            Swal.fire({
                icon: 'success',
                title: 'Room Added Successfully'
              })
              .then(() =>
              {
                window.location.reload();
          
              })

        }
          console.log(data);
    }

    return (<>
        <div className="container addroombox w-75 d-flex justify-content-center">
            <div className="row  text-center p-3">
    
            <div className="form-floating mb-3 mt-3 " >
         <input type="text" className="form-control text-dark" id="floatingInput" placeholder=" Enter Hotel Name"  value={name} onChange={(e)=>{setName(e.target.value)}}/>
         <label  htmlFor="floatingInput" className="text-dark ms-4 ">Hotel Name</label>
        </div>
        <div className="form-floating mb-3">
         <input type="number" className="form-control " id="floatingInput" value={location_id}  onChange={(e)=>{setLocation_id(e.target.value)}} placeholder="Enter location Id" />
         <label  htmlFor="floatingInput" className="text-dark ms-4 ">Location Id</label>
        </div>
        <div className="form-floating mb-3">
         <input type="number" className="form-control " id="floatingInput" placeholder="Enter City Id"  value={city_id}  onChange={(e)=>{setCity_id(e.target.value)}}/>
         <label  htmlFor="floatingInput" className="text-dark ms-4 " >City Id</label>
        </div>
        <div className="form-floating mb-3">
         <input type="text" className="form-control " id="floatingInput" placeholder="Enter location Name" value={location}  onChange={(e)=>{setLocation(e.target.value)}} />
         <label  htmlFor="floatingInput" className="text-dark ms-4 " >Location Name</label>
        </div>
        <div className="form-floating mb-3">
         <input type="text" className="form-control " id="floatingInput" placeholder="Enter City Name"  value={city}  onChange={(e)=>{setCity(e.target.value)}}/>
         <label  htmlFor="floatingInput" className="text-dark ms-4 " >City Name</label>
        </div>
        <div className="form-floating mb-3">
         <input type="number" className="form-control " id="floatingInput" placeholder="Enter Contact Details" value={contact}  onChange={(e)=>{setContact(e.target.value)}} />
         <label  htmlFor="floatingInput" className="text-dark ms-4 " >Contact No.</label>
        </div>
        <div className="form-floating mb-3">
         <input type="text" className="form-control " id="floatingInput" placeholder="Enter Room Type" value={roomtype}  onChange={(e)=>{setRoomType(e.target.value)}}/>
         <label  htmlFor="floatingInput" className="text-dark ms-4 " >Room Type</label>
        </div>
        <div className="form-floating mb-3">
         <input type="text" className="form-control " id="floatingInput" placeholder="Enter Hotel Description " value={hotelDescription}  onChange={(e)=>{setHotelDescription(e.target.value)}}/>
         <label  htmlFor="floatingInput" className="text-dark ms-4 " >Hotel Description</label>
        </div>

        <div className="form-floating mb-3">
         <input type="text" className="form-control " id="floatingInput" placeholder="Enter Accomodation Number" value={accomodation}  onChange={(e)=>{setaccomodation(e.target.value)}} />
         <label  htmlFor="floatingInput" className="text-dark ms-4 " >Accomodation Number</label>
        </div>
        <div className="form-floating mb-3">
         <input type="text" className="form-control " id="floatingInput" placeholder=" Enter Hotel Image URL" value={hotelImage}  onChange={(e)=>{setHotelImage(e.target.value)}} />
         <label  htmlFor="floatingInput" className="text-dark ms-4 " >Hotel Image</label>
        </div>
        <div className="form-floating mb-3">
         <input type="text" className="form-control " id="floatingInput" placeholder="Enter First Image URL"  value={hotel_Image_1}  onChange={(e)=>{setHotelImg_1(e.target.value)}}/>
         <label  htmlFor="floatingInput" className="text-dark ms-4 " >Image URL</label>
        </div>
        <div className="form-floating mb-3">
         <input type="text" className="form-control " id="floatingInput" placeholder="Enter Second Image URL" value={hotel_Image_2}  onChange={(e)=>{setHotel_Image_2(e.target.value)}} />
         <label  htmlFor="floatingInput" className="text-dark ms-4 " >Image URL</label>
        </div>
        <div className="form-floating mb-3">
         <input type="text" className="form-control " id="floatingInput" placeholder="Enter Third Image URL" value={hotel_Image_3}  onChange={(e)=>{setHotel_Image_3(e.target.value)}}/>
         <label  htmlFor="floatingInput" className="text-dark ms-4 " >Image URL</label>
        </div>

        <div className="form-floating mb-3">
         <input type="text" className="form-control " id="floatingInput" placeholder="Enter Cost Per Day" value={costperday}  onChange={(e)=>{setCostPerDay(e.target.value)}}/>
         <label  htmlFor="floatingInput" className="text-dark ms-4 " >Cost Per Day</label>
        </div>
        <div className="form-floating mb-3">
         <input type="text" className="form-control " id="floatingInput" placeholder=" Enter Facilites" value={facilities}  onChange={(e)=>{setfacilities(e.target.value)}}/>
         <label  htmlFor="floatingInput" className="text-dark ms-4 " >Facilities</label>
        </div>

        <div className="form-floating mb-3">
         <input type="text" className="form-control " id="floatingInput" placeholder="Enter Rating " value={rating}  onChange={(e)=>{setRating(e.target.value)}} />
         <label  htmlFor="floatingInput" className="text-dark ms-4 " >Rating</label>
        </div>
        <div className="form-floating mb-3">
         <input type="text" className="form-control " id="floatingInput" placeholder=" Enter Reviews" value={reviews}  onChange={(e)=>{setreviews(e.target.value)}}/>
         <label  htmlFor="floatingInput" className="text-dark ms-4 " >Reviews</label>
        </div>

        <div className="">
            <button className="btn btn-dark btn-lg" onClick={addbutton}>
                Add New Room
            </button>
        </div>
            </div>

        </div>
    </>)
}

export default AddRoom