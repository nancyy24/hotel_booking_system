import Navbar from "./components/navbar";
import { Route,Routes } from "react-router-dom";
import Home from "./components/homepage/home"
import AboutRoom from "./components/roomdetails/aboutroom";
import BookRoom from "./components/bookingpage/bookingroom";
import Profile from "./components/profilepage/profilepage";
import AdminPanel from "./components/adminpanel/adminpanel";
import LandingPage from "./components/landingpage/landingpage";

function App() {
  return (
    <div className="App">

     <Navbar />
     <Routes>
     <Route path="/homepage" element= {<Home/>}></Route>
     <Route path="/aboutroom/:id" element={ <AboutRoom/>}></Route>
     <Route path="/bookroom/:id/:fromDate/:toDate" element={<BookRoom />}></Route>
     <Route path="/myprofilepage" element={<Profile/>}></Route>
     <Route path="/adminpanel" element={<AdminPanel/>}></Route>
     <Route path="/" element={<LandingPage/>}></Route>
     </Routes>

    </div>
  );
}

export default App;
