import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutFailure,
  signOutStart,
  signOutSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../store/userSlice/userSlice";
import { Link } from "react-router-dom";

export const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const fileRef = useRef();
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingError, setshowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POSt",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart);
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSuccess());
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setshowListingError(false);
      const res = await fetch(`/api/user/listing/${currentUser._id}`);
      const data = await res.json();
      if(data.success === false){
        setshowListingError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setshowListingError(true)
    }
  };
  
  const handleDeleteListing = async(listingId)=>{
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`,{
        method : 'DELETE'
      });
      const data = await res.json();
      if(data.success === false){
        console.log(data.message);
        return
      }
      console.log(data)
      setUserListings((prev)=> prev.filter(listing => listing._id !== listingId))
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSumbit} className="flex flex-col gap-4">
        {/* <input type="file" ref={fileRef} hidden accept="image/*" /> */}
        <img
          // onClick={()=> fileRef.current.click()}
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center"
        />
        <input
          type="text"
          placeholder="username"
          id="username"
          defaultValue={currentUser.username}
          className="input"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="input"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="input"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase cursor-pointer hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          className="bg-green-700 text-center text-white rounded-lg p-3 uppercase cursor-pointer hover:opacity-95"
          to="/create-listing"
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDelete} className="text-red-700 cursor-pointer">
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign Out
        </span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "User is updated successfully" : ""}
      </p>
      <button onClick={handleShowListings} className="text-green-700 w-full">Show Listings</button>
     {showListingError &&(
       <p className="text-red-700 mt-5">Error showing Listings </p>
     )} 
     { userListings && userListings.length > 0 && (
      <div className="flex flex-col gap-4">
        <h1 className="text-center text-3xl mt-5 font-semibold">Your Listings</h1>
       { userListings.map((listing,idx)=>(
        <div key={idx} className="border p-3 rounded-lg flex justify-between items-center border-gray-200 gap-4">
          <Link to={`/listing/${listing._id}`}>
          <img src={listing.imageUrls[0]} alt="listing_image" className="h-16 w-16 object-contain rounded-lg" />
          </Link>
          <Link to={`/listing/${listing._id}`} className="text-slate-700 font-semibold flex-1 hover:underline truncate">
          <p >{ listing.name }</p>
          </Link>
          <div className="flex flex-col items-center">
            <button onClick={()=>handleDeleteListing(listing._id)} className="text-red-700 uppercase cursor-pointer">Delete</button>
            <button className="text-green-700 uppercase cursor-pointer">Edit</button>
            <button></button>
          </div>
        </div>
      ))} 
      </div>
     )}
    </div>
  );
};
