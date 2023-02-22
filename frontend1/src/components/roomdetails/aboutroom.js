
import { useEffect, useState } from "react"
import "../roomdetails/aboutroom.css"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel} from "react-responsive-carousel";


function AboutRoom(){

  let [tab,setTab] = useState(1);
  let defaultValue ={
    name:"",
    no_of_people:-1,
    contact:0,
    images:[],
    totalbookings:[],
    roomtype:"",
    description:"",
    city:"",
    location:-1,
    city_id:-1,
    locality:"",
    aggregate_rating:-1,
    rating_text:"",
    image:"",
    facilities:""
  }
  let [room_detail,setRoom_detail] = useState({...defaultValue})
  let navigate = useNavigate();
  let {id} = useParams();

 
  let getRoomDetails = async()=>{
    try{
    let URL = "http://localhost:5000/api/get-room-details-by-id/"+id;
    let response = await axios.get(URL);
    const data = response.data;
    // console.log(data);
    if(data.status === true)
    {
      console.log(data)
      // setRestaurant({...data.result});
      setRoom_detail({...data.result});
    }
    else{
      setRoom_detail({...defaultValue});
    }
  }
    
  
  catch(error){
    alert("server error");
    
  }
  // console.log(data)


  }

     
  useEffect(()=>{
    getRoomDetails()

  },[])
  // console.log(data)
  room_detail.images.map((value,index)=>{
    console.log(value)
  })

 return (
    <>
    {/* carousel */}
    <div className="modal fade" id ="slideShow" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog modal-lg " style={{ height :"75vh"}}>
    <div className="modal-content carousel-width ">
      <div className="modal-body h-75 ">
      <h1 className="fw-bold text-center">{room_detail.name}</h1>
      <Carousel showThumbs={false} infiniteLoop={true}>
      {
      
        room_detail.images.map((value,index) => {
          return (<div key={index} className="w-100 ">
                <img src={"/"+value} className="carousel-img"/>
          </div>);
        })
      }

      </Carousel>

      </div>
      </div>
    </div>

    </div>
        <div className="conatiner ">
        <p className="headings fs-1 mb-0 fw-bold my-3 text-center">{room_detail.name}</p>
        <div className="row d-flex justify-content-between mt-3">
        <img src={"/"+room_detail.image} alt="" className="hotel-img gallery-img px-0"/>
        <button className="btn btn-outline-white fw-bold col-4 col-sm-7 col-md-6 col-lg-4  gallerybutton" data-bs-toggle="modal" data-bs-target="#slideShow">
          Click to see Image Gallery
        </button>
        </div>
       <div className="ms-5 fs-4  text-dark des-box  ">
        <p className="text-dark fw-bolder  mb-0">Description</p>
        <p className="headings fs-2 fw-bolder">{room_detail.description}</p>
        
       </div>
       <div >
            <ul className="tabstyle ms-5">
              <li className="me-5 border-bottom border-danger pb-3 cursor-pointer fs-2 fw-bolder" onClick={()=>{setTab(1)}}>Overview</li>
              <li className=" border-bottom border-danger cursor-pointer fs-2 fw-bolder" onClick={()=>{setTab(2)}}>Contact</li>
            </ul>
          </div>
       {  (tab === 1) ?        
       (<div className="ms-5 overview-box">
        <p className="fw-bold my-4 fs-1 headings">More Details of This Place...</p>
        <div className="border-bottom border-danger w-75  pb-3 mb-3">
                <h4 className="fw-bold fs-2 headings">Cost Per Day</h4>
                
                <p className="mb-0 ms-5 fs-5">
                  {room_detail.costperday}   </p>
        </div>
        <div  className="border-bottom border-danger w-75  pb-3 mb-3">
                <h4 className="fw-bold fs-2 headings">Room Type</h4>
                <p className="mb-0 ms-5 fs-5">{room_detail.roomtype}</p>
        </div>
        <div className="border-bottom border-danger w-75  pb-3 mb-3" >
                <h4 className="fw-bold fs-2 headings ">location</h4>
                <p className="mb-0 ms-5 fs-5">{room_detail.locality},{room_detail.city}</p>
        </div>
        <div className="border-bottom border-danger w-75  pb-3 mb-3" >
                <h4 className="fw-bold fs-2 headings">Rating</h4>
                <p className="mb-0  ms-5 fs-5">{room_detail.aggregate_rating}</p>
        </div>
        <div className="border-bottom border-danger w-75  pb-3 mb-3" >
                <h4 className="fw-bold fs-2 headings ">Reviews</h4>
                <p className="mb-0 ms-5 fs-5">{room_detail.rating_text}</p>
        </div>
        <div className="border-bottom border-danger w-75  pb-3 mb-3">
                <h4 className="fw-bold fs-2 headings">Accomodation of people per room</h4>
                <p className="mb-0 ms-5 fs-5">{room_detail.no_of_people}</p>
        </div>
        </div>)
        :
        (<div className="ms-5 contact-box headings">
        <p className="fw-bold mb-4  fs-1 headings">Contact Details ...</p>
        <div className="border-bottom border-danger w-75  pb-3 mb-2">
                <h4 className="fw-bold fs-2 headings">Phone Number</h4>
                <p className="text-danger mb-0  ms-5 fs-5">{room_detail.contact}</p>
        </div>
        <div className="border-bottom border-danger w-75  pb-3 mb-2">
                <h4 className="fw-bold fs-2 headings">locality</h4>
                <p className="mb-0  ms-5 fs-5">{room_detail.locality},{room_detail.city}</p>
        </div>
        </div>)
       }


        
        </div>
    </>
 )
}

export default AboutRoom
