import "../landingpage/landingpage.css"
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function LandingPage(){
    let navigate = useNavigate()

    let moveToHomepage=()=>{
        Swal.fire({
            icon: 'success',
            title: 'Welcome To the Hotel HomePage',
            text: 'Discover New Hotels!!',
          })
          .then(() =>
          {
            // window.location.replace("/");
        navigate("/homepage");

    
          })
        // navigate("/homepage")

    }
    return (<>
        <div className="container-fluid background ">
        <div className="row home-box d-flex justify-content-center p-5" >
           <h1 className="text-white  text-center heading mb-0 ">ACE HOTEL BOOKING</h1>
           <p className="text-white text-center fs-5 mt-3">Hotel rooms are a second home, only you get to escape.</p>
           <button className="btn btn-white text-dark bg-white homebutton mt-3" onClick={moveToHomepage}>Get Started</button>
        </div>

        </div>
    </>)
}
export default LandingPage