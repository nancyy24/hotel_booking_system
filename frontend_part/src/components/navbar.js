import { useState,useEffect } from "react";
import "./navbar.css"
import axios from "axios"
import jwt_decode from "jwt-decode";
import { useNavigate} from "react-router-dom";
import Swal from "sweetalert2";


function Navbar(){

    let [given_name,setgiven_name]= useState("");
    let [email,setEmail]=useState("")
    let [mobile,setMobile]=useState("")
    let [password,setPassword]=useState("")
    let [confirmpassword,setConfirmPassword] =useState("")
    let navigate = useNavigate()

    let getTokenDetails = () => {
        let token = localStorage.getItem("current-token")
        if(token === null)
        {
          return false;
        }
        else{
          return jwt_decode(token);
        }
      }
      
      let [userLogin,setUserLogin] = useState(getTokenDetails());

      
  let f_name =(e)=>{
    setgiven_name(e.target.value)
    console.log(given_name)
  }
  let email_id = (e) =>{
    setEmail(e.target.value)
    console.log(email)

  }

  let mobile_no =(e)=>{
    setMobile(e.target.value)
    console.log(mobile)
  }

  let pwd =(e) =>{
    setPassword(e.target.value)
    console.log(password)
  }

  let confirmpwd = (e) =>{
    setConfirmPassword(e.target.value)
    console.log(confirmpassword)
  }
  let body_message = {
    given_name : given_name,
    email:email,
    mobile:mobile,
    password:password
  }
//   let submit_details =()=>{
//     console.log(body_message)
//   }

let submit_details =async ()=>{
    if(password !== confirmpassword)
    {
        alert("incorrect password")
    }
    else{
    var {data} = await axios.post("http://localhost:5000/api/sign-up",body_message);
    console.log(data)
    if(data.status === true){
      Swal.fire({
        icon: 'success',
        title: 'Account Created Successfully',
        text: 'Discover New Hotels!!',
      })
      .then(() =>
      {
        window.location.replace("/");

      })
      // alert("Registered Successfully");
    }

    // setEmail("")
    // setgiven_name("")
    // setMobile("")
    // setPassword("")
    // setConfirmPassword("")
    // window.location.replace("/");
      }

    }
  let login_msg = {
    email:email,
    password:password
  }

//   let submit_login_details = ()=>{
//     console.log(login_msg)
//   }

let submit_login_details = async () =>{
    var {data} = await axios.post("http://localhost:5000/api/login",login_msg)
    try{
       
        if(data.status === true)
    {
      // alert("login Successfully");
      // console.log(data)
      // console.log(data.result)
      // console.log(data.token)
      localStorage.setItem("current-token",data.token);
      console.log(jwt_decode(data.token))
      Swal.fire({
        icon: 'success',
        title: 'User Login Successfully',
        text: 'Find Amazing Destinations!!',
      })
      .then(() =>
      {
        window.location.reload();
    
      })
      }
      else{
        // alert("something went wrong")
        Swal.fire({
          icon: 'error',
          title: 'Login Failed!!',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>'

        })
      }
      // window.location.replace("/");
    }
    catch(error){
        console.log(error)
        alert(error)
    }
    
    // console.log(userToken);
    // localStorage.setItem("auth-token",userToken);
    // console.log(userLogin);
    // console.log(jwt_decode(userToken));

// setPassword("")
// setEmail("")
// navigate("/");



  }
  let logout =() =>
  {
    // remove the adta from the local storage
    localStorage.removeItem("current-token");
    // alert("User Logout Successfully");
    setUserLogin(false);
    // window.location.reload(false);
    Swal.fire({
      icon: 'success',
      title: 'User LogOut Successfully'
    })
    .then(() =>
    {
      window.location.replace("/");

    })
    // window.location.replace("/");

    
   

  }

//  useEffect(() => {
//     window.location.reload(false);
// //   
//  }, [])
  
    return (
        <>
        {/* Login */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Sign-In</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body d-flex justify-content-center flex-column">
      
        <div className="form-floating mb-3">
         <input type="email" className="form-control " id="floatingInput" onChange={email_id} value={email} placeholder="Enter Email Address" />
         <label htmlFor="floatingInput" >Email Address</label>
        </div>
        <div className="form-floating mb-3">
      <input type="password" className="form-control " id="floatingInput" onChange={pwd} value={password} placeholder="Enter Password" />
        <label htmlFor="floatingInput"  >Password</label>
        </div>
        <button type="button" className="btn btn-primary "
         onClick={submit_login_details} 
        // onDoubleClick={() =>{
        //     navigate("/")
        //   }}
          >Submit</button>
       
        {/* <div className="text-danger text-center fw-bolder fs-4 my-3" >
          OR
        </div> */}
    
      </div>
     
    </div>
  </div>
</div>
{/* create Account */}
<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">Sign Up</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
   
      <div className="modal-body">
   <div className="form-floating mb-3">
  <input type="text" className="form-control " id="floatingInput" value={given_name} onChange={f_name} placeholder="Enter FullName" />
  <label htmlFor="floatingInput" >Full Name</label>
</div>
      <div className="form-floating mb-3">
  <input type="email" className="form-control " id="floatingInput" value={email} onChange={email_id} placeholder="Enter Email-Address" />
  <label htmlFor="floatingInput" >Email address</label>
</div>
  <div className="form-floating mb-3">
  <input type="number" className="form-control " id="floatingInput" value={mobile}onChange={mobile_no} placeholder="Enter Mobile Number" />
  <label htmlFor="floatingInput" >Mobile Number</label>
</div>
<div className="form-floating mb-3">
  <input type="password" className="form-control" id="floatingPassword" value={password} onChange={pwd} placeholder="Enter Password" />
  <label htmlFor="floatingPassword" >Password</label>
</div>
<div className="form-floating">
  <input type="password" className="form-control" id="floatingPassword" value={confirmpassword} onChange={confirmpwd} placeholder="Confirm Password" />
  <label htmlFor="floatingPassword" >Confirm Password</label>
</div>
      </div>
      <div className="modal-footer d-flex flex-column" >
        {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
        <button type="button" className="btn btn-primary"
         onClick={submit_details}
         >Submit</button>
        <p className="pull-right" >Already registered <span className="text-danger">Go to Login Option!!</span></p>
      </div>
    </div>
  </div>
</div>

           <header className="row bg-dark navbar  ">
           <div className="d-flex justify-content-between " >
            <p className="text-white fs-3 ms-4 mt-1 mb-2 "><img className="logo pointer_cursor" src="/Images/ace_logo.png" onClick={()=>{navigate("/")}}/> <span className="ms-3 text-white fs-1 text-logo">ACE  Hotel</span> </p>
            { userLogin ? (<div className="d-flex w-lg-25 w-md-50 justify-content-center p-2">
        
  
            <button className="mt-1 me-3 fw-bold text-white fs-5 mb-0 btn btn-dark"  onClick={() => navigate("/myprofilepage") }><i class="fa fa-2x fa-user text-white" aria-hidden="true"></i> {userLogin.given_name}</button>
            {/* <button className="btn btn-dark">My profile</button> */}
            
            <button className="btn btn-outline-light w-lg-25 w-md-50"
             onClick={logout}
             >Logout</button>
          </div>) : (<div>
                <button className="btn btn-outline-secondary mt-3 me-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Login</button>
                <button className="btn btn-outline-secondary mt-3 me-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Create An Account</button>
            </div>)}
            
             {/* <div>
                <button className="btn btn-outline-secondary mt-3 me-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Login</button>
                <button className="btn btn-outline-secondary mt-3 me-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Create An Account</button>
            </div> */}

           </div>
           </header>
        </>
    )
}

export default Navbar