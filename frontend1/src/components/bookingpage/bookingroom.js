import "../bookingpage/bookingroom.css"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"
import moment from "moment";
import jwt_decode from "jwt-decode";
import StripeCheckout from "react-stripe-checkout"
import Swal from "sweetalert2";



function BookRoom(){

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
    let {id , fromDate, toDate} = useParams();
     let fromDate_ = moment(fromDate,"DD-MM-YYYY")
    let toDate_ = moment(toDate,"DD-MM-YYYY")
    const totaldays = moment.duration(toDate_.diff(fromDate_)).asDays()+1
    const totalamount = totaldays * room_detail.costperday
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
    
    let bookRoom = async () => {
        const bookingdetails = {
          room : room_detail,
          userid : jwt_decode(localStorage.getItem("current-token"))._id,
          fromdate : moment(fromDate_).format("DD-MM-YYYY"),
          todate : moment(toDate_).format("DD-MM-YYYY"),
          totalamount : totalamount,
          totaldays :totaldays
        }

        console.log(bookingdetails)
        try{

          const result = await axios.post("http://localhost:5000/api/bookedrooms",bookingdetails)
          console.log(result)
        }
        catch(error){
          alert("server error")
        }

        displayRazorpay()
    }

    async function loadScript() {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
         return true;
      };
      script.onerror = () =>
      {
        return false;
      };
      window.document.body.appendChild(script);
    }

    let displayRazorpay = async () =>
    {
    let isLoaded = await loadScript()
    if(isLoaded === false){
      // alert("sdk is not loaded")
      Swal.fire({
        icon: 'error',
        title: 'SDK is not Loaded',
        text: 'Something went wrong!',
      })
      .then(()=>
      {
        return false;
      })
      
    }
    let serverData = {
      amount:totalamount
    }
    // console.log(serverData);
    var {data} = await axios.post("http://localhost:5000/api/payment/gen-order",serverData    );
    // console.log(data);
    // return false;
      var order = data.order;
var options = {
"key": "rzp_test_smUx8oAyn9O4KS", // Enter the Key ID generated from the Dashboard
"amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
"currency": order.currency,
"name": "ACE Hotel Booking",
"description": "Booking Room",
"image": "/Images/acehotel_logo.png",

"order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
"handler": async function (response){
  var sendData = {
  razorpay_payment_id :response.razorpay_payment_id,
  razorpay_order_id : response.razorpay_order_id,
  razorpay_signature : response.razorpay_signature
  };
  var {data} = await axios.post("http://localhost:5000/api/payment/verify",sendData);
  // console.log(data);
  if(data.status === true)
  {
    // alert("Order Placed Successfully");
    Swal.fire({
      icon: 'success',
      title: 'Room Booked Successfully',
      text: 'Thanks for Booking!',
    })
    .then(() =>
    {
      window.location.replace("/");

    })
    // navigate("/");
  }
  else{
    // alert("Payment Failed Try Again")
    Swal.fire({
      icon: 'error',
      title: 'Payment Failed Try Again',
      text: 'Something went wrong!',
    })
  }

},
"prefill": {
    "name": jwt_decode(localStorage.getItem("current-token")).given_name,
    "email": jwt_decode(localStorage.getItem("current-token")).email,
    "contact": jwt_decode(localStorage.getItem("current-token")).mobile
},

};
var razorpayObject= window.Razorpay(options);
razorpayObject.open();
  }
    // async function onToken(token){
    //   console.log(token)
    //   const bookingdetails = {
    //     room : room_detail,
    //     userid : jwt_decode(localStorage.getItem("current-token"))._id,
    //     fromdate : moment(fromDate_).format("DD-MM-YYYY"),
    //     todate : moment(toDate_).format("DD-MM-YYYY"),
    //     totalamount : totalamount,
    //     totaldays :totaldays,
    //     token : token
    //   }

    //   console.log(bookingdetails)
    //   try{

    //     const result = await axios.post("http://localhost:5000/api/bookedrooms",bookingdetails)
    //     console.log(result)
    //   }
    //   catch(error){
    //     alert("server error")
    //   }
    // }

    useEffect(()=>{
        getRoomDetails()
    
      },[])

    return (<>
        <div className="container-fluid d-flex justify-content-center">
            <div className="row mt-5 bookingbox ">
                <div className="col-6 border border-1 p-5">
                    <p className="headings fs-2 fs-xs-1 fw-bolder mb-0">{room_detail.name}</p>
                    <p className="headings fs-4 fs-xs-3 fw-bolder mb-0">Near {room_detail.locality},{room_detail.city}</p>
                    <img src={"/"+room_detail.image} className="roomimg"></img>
                </div>
                <div className="col-6 border border-1 p-md-5 p-xs-3">
                    <h2 className="border-bottom border-danger mb-3  w-md-50 w-sm-75 fw-bolder mt-3">Booking Details</h2>
                    <div className="row d-flex">
                    <div className="col-6 fw-bolder fs-5">
                        <p>Name  </p>
                        <p>CheckIn</p>
                        <p>CheckOut </p>
                        <p>Max Count </p>
                    </div>
                    <div className="col-6 fw-bold fs-5 ">
                    <p>{jwt_decode(localStorage.getItem("current-token")).given_name}</p>
                        <p className="">{fromDate} </p>
                        <p>{toDate} </p>
                        <p>{room_detail.no_of_people}</p>
                    </div>
                    </div>
                    <h2 className="border-bottom border-danger mb-3  w-md-50 w-sm-75 fw-bolder">Amount</h2>
                    <div className="row d-flex ">
                        <div className="col-7 fw-bolder fs-5">
                            <p>Total Days  </p>
                            <p>Rent Per Day  </p>
                            <p>Total Amount  </p>
                        </div>
                        <div className="col-5 fw-bolder fs-5">
                        <p>{totaldays}</p>
                            <p>{room_detail.costperday}</p>
                            <p><i class="fa fa-inr" aria-hidden="true"> </i> {totalamount}</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                    {/* <StripeCheckout
 amount={totalamount * 100}
        token={onToken}
        currency='INR'
        stripeKey="pk_test_51MPNrzSJWOfmpb77kRtUl2DOWqGwfS52Q9zvOve7yCkG7cmDoNYFbbfdZPQcqCpTRYJm7dY8xp59va2wXXxwrM2U00fFJrbXUE"
      > */}
 <button className="btn btn-dark btn-lg mt-4 mb-3 " 
                    onClick={bookRoom}
                    >Pay Now</button>
      {/* </StripeCheckout> */}
                   

</div>
 
                </div>

            </div>
        </div>
    </>)
}


export default BookRoom