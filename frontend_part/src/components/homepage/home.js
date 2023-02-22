import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
// import 'antd/dist/reset.css'
// @import '~antd/dist/antd.css'
import "antd/dist/antd.min.css";
import "../homepage/home.css";
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker, Space } from "antd";
import moment from "moment";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";

const { RangePicker } = DatePicker;
function Home() {
  let [fromdate, setFromDate] = useState();
  let [toDate, setToDate] = useState();
  let [room, setRoom] = useState([]);
  let [locationList, setLocationList] = useState([]);
  let [filter, setFilter] = useState({});
  let [duplicaterooms, setDuplicateRooms] = useState([]);
  let [searchkey, setSearchKey] = useState("");
  let [roomtype, setRoomType] = useState("All");
  let [temporaryRooms,setTemporarayRooms] = useState([]);
  let navigate = useNavigate();

  // let temprooms = [];


  const get_all_rooms = async () => {
    try {
      let { data } = await axios.get("http://localhost:5000/api/all_room");
      console.log(data);
      const result = data.result;
      console.log("result", result);
      setRoom(result);
      setDuplicateRooms(result);
      console.log("room", room);
    } catch (error) {
      console.log(error);
    }
  };
  let filterByDate = (dates) => {
    // console.log(dates)
    // console.log(moment(dates[0]).format('DD-MM-YYYY'))
    // console.log(moment(dates[1]).format('DD-MM-YYYY'))
    setFromDate(moment(dates[0]).format("DD-MM-YYYY"));
    setToDate(moment(dates[1]).format("DD-MM-YYYY"));

    let temprooms = [];
    var availability = false;
    duplicaterooms.map((duproom, value) => {
      if (duproom.totalbookings.length > 0) {
        duproom.totalbookings.map((bookedroom, index) => {
          if (
            !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
              bookedroom.frondate,
              bookedroom.todate
            ) &&
            !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
              bookedroom.frondate,
              bookedroom.todate
            )
          ) {
            if (
              moment(dates[0]).format("DD-MM-YYYY") !== bookedroom.fromdate &&
              moment(dates[1]).format("DD-MM-YYYY") !== bookedroom.fromdate &&
              moment(dates[0]).format("DD-MM-YYYY") !== bookedroom.todate &&
              moment(dates[1]).format("DD-MM-YYYY") !== bookedroom.todate
            ) {
              availability = true;
            }
          }
        });
      }
      if (availability == true || duproom.totalbookings.length == 0) {
        temprooms.push(duproom);
      }
    });

    console.log("temprooms",temprooms);
    setRoom(temprooms);
    setTemporarayRooms(temprooms);
    console.log(room);
  };
  function filterbySearch() {
    const newrooms_1 = duplicaterooms.filter((hotelroom) =>
      hotelroom.name.toLowerCase().includes(searchkey.toLowerCase())
    );
    console.log(newrooms_1);
    setRoom(newrooms_1);
  }

  let getLocationList = async () => {
    try {
      let response = await axios.get("http://localhost:5000/api/get-location");
      let data = response.data;
      // console.log(data);
      if (data.status === true) {
        setLocationList([...data.result]);
      } else {
        setLocationList([]);
      }
    } catch (error) {
      // console.log(error);
      // alert("server error");
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong!",
      });
    }
  };
  let funsearchKey = (e) => {
    setSearchKey(e.target.value);
    console.log(searchkey);
  };

  let filterByType = (e) => {
    setRoomType(e.target.value);
    console.log(e.target.value);
    let targetvalue = e.target.value;

    if (targetvalue !== "All") {
      const newrooms_2 = duplicaterooms.filter(
        (hotelroom) =>
          hotelroom.roomtype.toLowerCase() === targetvalue.toLowerCase()
      );
      console.log(newrooms_2);
      setRoom(newrooms_2);
    } else {
      setRoom(duplicaterooms);
    }
  };

  let bookHotelRoom = (room_id) => {
    let currentuserdetails = localStorage.getItem("current-token");
    // console.log(currentuserdetails)
    if (!currentuserdetails) {
      // console.log("login First")
      // alert("login first")
      Swal.fire({
        icon: "error",
        title: "Login First!!",
        text: "Create An Account",
      });
    } else {
      navigate("/bookroom/" + room_id + "/" + fromdate + "/" + toDate);
      // alert("login first")
      // console.log("login First")
    }
  };

  let filterOperation = async (filter) => {
    let URL = "http://localhost:5000/api/filter";

    try {
      let response = await axios.post(URL, filter);
      // console.log(response);
      let data = response.data;
      if (data.status === true) {
        const operation = (list1, list2, isUnion = false) =>
          list1.filter(
            (
              (set) => (a) =>
                isUnion === set.has(a._id)
            )(new Set(list2.map((b) => b._id)))
          );

        // Following functions are to be used:
        const inBoth = (list1, list2) => operation(list1, list2, true),
          inFirstOnly = operation,
          inSecondOnly = (list1, list2) => inFirstOnly(list2, list1);

        var list1 = [...temporaryRooms];
        var list2 = data.result;
        console.log("data result",data.result);
        console.log('list1',list1);
        console.log("list2",list2);
        var listresult = inBoth(list1,list2);
        // filter.sort = 1;
        console.log(filter.hasOwnProperty("sort"));     
        console.log("filter",filter);
        if(filter.hasOwnProperty('sort'))
        {
          console.log(filter.sort);
          if(filter.sort === 1 )
          {
            listresult.sort((a, b) => {
              return a.costperday - b.costperday;
          });
          }
          else{
            listresult.sort((a, b) => {
              return b.costperday - a.costperday;
          });
          }
        }
        else{
          listresult.sort((a, b) => {
            return a.costperday - b.costperday;
        });
        }
        


        console.log("listresult",listresult);
        setRoom([...listresult]);

        // setRoom([...data.result]);



        // console.log(restaurantList);


      }

    } catch (error) {
      // alert("server error");
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong!",
      });

      // console.log(error);
    }
  };

  let makeFiltration = (event, type) => {
    let value = event.target.value;
    console.log(value);
    // let ischecked= event.target.checked;
    // console.log(ischecked);
    // console.log(event);
    // console.log( value);
    // let cuisine=[];

    // let filter = {
    //   meal_type :meal_id
    // }

    switch (type) {
      case "location":
        if (Number(value) > 0) {
          filter["location_id"] = Number(value);
        } else {
          delete filter["location_id"];
        }
        break;
      case "roomtype":
        if (Number(value) > 0) {
          filter["roomtypeid"] = Number(value);
        } else {
          delete filter["roomtypeid"];
        }
        break;
      case "sort":
        filter["sort"] = Number(value);
        break;
      case "cost-for-two":
        let costForTwo = value.split("-");
        filter["lcost"] = Number(costForTwo[0]);
        filter["hcost"] = Number(costForTwo[1]);
        break;
      // case "page":
      //   filter["page"] = Number(value);
      //   break;
      // case "cuisine":
      //   // cuisine.push(Number(value));
      //   if(ischecked === false)
      //   {
      //      let index = cuisineOrder.indexOf(Number(value));
      //     cuisineOrder.splice(index, 1);
      //     setCuisineOrder(cuisineOrder);
      //   }
      //   else{
      //     cuisine.push(Number(value));
      //   cuisineOrder.push(...cuisine);
      //   setCuisineOrder([...new Set(cuisineOrder)])
      //   console.log([...new Set(cuisineOrder)])

      //   }

      // console.log(cuisine);
      // setCuisineOrder();
      // console.log(cuisineOrder);
      // filter["cuisine"] = cuisineOrder;
    }
    setFilter(filter);
    // filterByType();
    filterOperation(filter);
  };

  console.log("location", locationList);
  useEffect(() => {
    get_all_rooms();
    filterOperation(filter);
    getLocationList();
  }, []);
  console.log(room);

  return (
    <>
      <div className="container-fluid">
        <p className="headings fw-bolder fs-1 ms-5 mb-0">
          Discover The Resorts and plan the perfect holidays !!!
        </p>
        <p className="headings fw-bolder fs-2 ms-5 mb-0">
          Explore The New Adventures...
        </p>
        <div className="row mt-4">
          {/* filter section */}
          <div className="col-10 col-lg-3 filter-section ms-5 me-5 fw-bolder p-4  ">
            {/* <p className="fs-4 fw-bolder mb-0">Filter Section</p> */}
            <p className="fs-md-3 fs-5 fw-bolder mb-2 w-md-25 w-lg-25 ">
              Book your dates...{" "}
            </p>
            <RangePicker
              format="DD-MM-YYYY"
              className="ant-picker ant-picker-range mb-3 border border-1 border-dark p-2 w-100"
              onChange={filterByDate}
            />
            {/* <div>
                <input type="text"  className="form-control" placeholder='Search your room' value={searchkey} onchange={(e)=>{ setSearchKey(e.target.value)} } onKeyUp={filterbySearch} />

            </div> */}
            <p className="m-0 text-black fs-md-3 fs-5 fw-bolder mb-2  w-md-25 w-lg-25">
              Select Location...
            </p>
            <select
              className="mt-2 form-select text-dark p-2 mb-2  border border-dark"
              onChange={(event) => {
                makeFiltration(event, "location");
              }}
            >
              <option
                value="-1"
                //   onChange={(event)=>{ makeFiltration(event,"location");
                // }}
              >
                ----select----
              </option>
              {locationList.map((location, index) => {
                return (
                  <option
                    value={location.location_id}
                    key={index}
                    //           onChange={(event)=>{ makeFiltration(event,"location");
                    // }}
                  >
                    {location.name},{location.city}
                  </option>
                );
              })}
            </select>
            <p className="fs-md-3 fs-5 fw-bolder mb-2  w-md-25 w-lg-25 ">
              Search Room...
            </p>
            <div className="form-floating  border border-1 border-dark d-flex justify-content-between p-2 mb-2 ">
              <input
                type="text"
                className="form-control w-75 p-3 "
                id="floatingInput"
                value={searchkey}
                onChange={funsearchKey}
                placeholder="Search your room"
              />
              <label htmlFor="floatingInput" class>
                Search Your Room
              </label>
              <button onClick={filterbySearch} className="searchbutton w-25">
                Search
              </button>
            </div>
            {/* select */}
            <div>
              <p className="fs-md-3 fs-5 fw-bolder mb-2   w-md-25 w-lg-25 ">
                Room Type...
              </p>
              <select
                className="form-control border border-dark text-dark "
                // value={roomtype}
                // onChange={(e) => {
                //   filterByType(e);
                // }}
                onChange={(event) => {
                  makeFiltration(event, "roomtype");
                }}
              >
                <option value="-1" className="text-dark">
                  All
                </option>
                <option value="3" className="text-dark">
                  Deluxe
                </option>
                <option value="2" className="text-dark">
                  Standard
                </option>
              </select>
            </div>
            {/* <select>Select location</select>
            <option>---Select---</option> */}

            <div>
              {/* <button>Name</button> */}
              {/* <!-- cost --> */}
              <p className="m-0 mb-2 mt-3 fw-bold fs-md-3 fs-5 fw-bolder mb-2  w-md-25 w-lg-25 ">
                Cost Per Day..
              </p>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="cost-for-two"
                  value="0-500"
                  onChange={(event) => {
                    makeFiltration(event, "cost-for-two");
                  }}
                />
                <label className="form-check-label text-black fw-bold fs-6">
                  Less than ` 500
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="cost-for-two"
                  value="500-1000"
                  onChange={(event) => {
                    makeFiltration(event, "cost-for-two");
                  }}
                />
                <label className="form-check-label text-black fw-bold fs-6">
                  ` 500 to ` 1000
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="cost-for-two"
                  value="1000-1500"
                  onChange={(event) => {
                    makeFiltration(event, "cost-for-two");
                  }}
                />
                <label className="form-check-label text-black fw-bold fs-6">
                  ` 1000 to ` 1500
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="cost-for-two"
                  value="1500-2000"
                  onChange={(event) => {
                    makeFiltration(event, "cost-for-two");
                  }}
                />
                <label className="form-check-label text-black fw-bold fs-6">
                  ` 1500 to ` 2000
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="cost-for-two"
                  value="2000-99999"
                  onChange={(event) => {
                    makeFiltration(event, "cost-for-two");
                  }}
                />
                <label className="form-check-label text-black fw-bold fs-6">
                  ` 2000+
                </label>
              </div>
              {/* <!-- sort --> */}
              <p className="m-0  mt-4 fw-bold m-0 mb-2 mt-3 fw-bold fs-md-3 fs-5 fw-bolder mb-2  w-md-25 w-lg-25 ">
                Sort...
              </p>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="sort"
                  value="1"
                  onChange={(event) => {
                    makeFiltration(event, "sort");
                  }}
                />
                <label className="form-check-label text-black fw-bold fs-6">
                  Price low to high
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="sort"
                  value="-1"
                  onChange={(event) => {
                    makeFiltration(event, "sort");
                  }}
                />
                <label className="form-check-label text-black fw-bold fs-6">
                  Price high to low
                </label>
              </div>
            </div>
          </div>
          <div className=" col-10 col-lg-7 room-section ms-lg-3 mt-lg-0 mt-5 ms-5">
            {room.map((roomdetails) => {
              return (
                <>
                  <div className="row room-sec d-flex mb-5 ">
                    <img
                      src={roomdetails.image}
                      className="room-img my-3"
                    ></img>

                    <div className="descrip-box mt-3">
                      {/* name,description,maxcount,rating,image,roomtype,locality and city,facility */}
                      <p className="ms-3 fw-bold headings fs-2">
                        {roomdetails.name}
                      </p>
                      <div className="row ms-3">
                        <div className="col-5">
                          <p className="fw-bold fs-5">
                            Maximum Accomodation of people
                          </p>
                          <p className="fw-bold fs-5">Rating</p>
                          <p className="fw-bold fs-5">Facilities</p>
                          <p className="fw-bold fs-5 space">Room type</p>
                          <p className="fw-bold fs-5">locality</p>
                          <p className="fw-bold fs-5">Cost per Day</p>
                        </div>
                        <div className="col-5 fs-5">
                          <p className="fs-5">{roomdetails.no_of_people}</p>
                          {/* <p>8.1</p> */}
                          <p class="badge rounded-pill bg-danger fs-6 ">
                            {roomdetails.aggregate_rating}
                          </p>
                          <p>{roomdetails.facilities}</p>
                          <p>{roomdetails.roomtype}</p>
                          <p>
                            {roomdetails.locality},{roomdetails.city}
                          </p>
                          <p>{roomdetails.costperday}</p>
                        </div>
                      </div>
                      <div className="d-flex flex-end justify-content-end mb-3">
                        {fromdate && toDate ? (
                          <button
                            className="btn btn-dark me-3 p-2"
                            // onClick={() =>
                            //   navigate(
                            //     "/bookroom/" +
                            //       roomdetails._id +
                            //       "/" +
                            //       fromdate +
                            //       "/" +
                            //       toDate
                            //   )
                            // }
                            onClick={() => {
                              bookHotelRoom(roomdetails._id);
                            }}
                          >
                            BOOK NOW !!
                          </button>
                        ) : null}
                        <button
                          className="btn btn-dark p-2 me-3"
                          onClick={() =>
                            navigate("/aboutroom/" + roomdetails._id)
                          }
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
            {/* <div className="row room-sec d-flex mb-5 ">
            
            <img src="Images\excel-3.jpg"  className="room-img my-3"></img>

        <div className="descrip-box mt-3">
    name,description,maxcount,rating,image,roomtype,locality and city,facility }
        <p className="ms-3 fw-bold headings fs-3">Hotel Name</p>
        <div className="row ms-3">
            <div className="col-5">
            <p className="fw-bold fs-5">Maximum Accomodation of people</p>
            <p className="fw-bold fs-5">Rating</p>
            <p className="fw-bold fs-5">Facilities</p>
            <p className="fw-bold fs-5">Room type</p>
            <p className="fw-bold fs-5">locality</p>
        </div>
            <div className="col-5 fs-5">
                <p className="fs-5">2</p>
                 <p>8.1</p> 
                <p class="badge rounded-pill bg-danger fs-6">8.1</p>
                <p >Wifi</p>
                <p>Deluxe</p>
                <p>Shalimar bagh</p>
            </div>

        </div>
     <div className="d-flex flex-end justify-content-end mb-3">
    <button className="btn btn-dark me-3 p-2">BOOK NOW !!</button>
    <button  className="btn btn-dark p-2 me-3">View Details</button>
    </div>   
        </div>
    </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
