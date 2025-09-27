import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingItems from "../components/ListingItems";

const Home = () => {
  
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);


  useEffect(() => {
    const fetchingOfferListing = async () => {
    try {
    const res = await fetch('/api/listing/get?offer=true&limit=4');
    const data = await res.json();
    setOfferListings(data);
    fetchingRentListing();  
    } catch (error) {
      console.log(error)
    }
    }
    
    const fetchingRentListing = async () => {
    try {
    const res = await fetch('/api/listing/get?type=rent&limit=4');
    const data = await res.json();
    setRentListings(data);
    fetchingSaleListing();  
    } catch (error) {
      console.log(error)
    }
    }

    const fetchingSaleListing = async () => {
    try {
    const res = await fetch('/api/listing/get?type=sale&limit=4');
    const data = await res.json();
    setSaleListings(data);  
    } catch (error) {
      console.log(error)
    }
    }
    fetchingOfferListing();
  }, [])

  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-gray-500 text-xs sm:text-sm">
          Real Estate is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link to="/search"
        className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >Let's get started...</Link>
      </div>
      {/* Listing result for offer, sale and rent */}
      <div className="max-w-7xl mx-auto p-3 flex flex-col gap-8 my-7">
        {
        offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Recents offer</h2>
              <Link to={'/search?offer=true'} className="text-sm text-blue-800">
              Show more offer
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              { offerListings.map((listing)=>(
                <ListingItems listing={listing} key={listing._id} />
              )) }
            </div>
          </div>
        )
        }
        {
        rentListings && rentListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Recents places for rent</h2>
              <Link to={'/search?type=rent'} className="text-sm text-blue-800">
              Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              { rentListings.map((listing)=>(
                <ListingItems listing={listing} key={listing._id} />
              )) }
            </div>
          </div>
        )
        }
        {
        saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Recents places for sale</h2>
              <Link to={'/search?type=sale'} className="text-sm text-blue-800">
              Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              { saleListings.map((listing)=>(
                <ListingItems listing={listing} key={listing._id} />
              )) }
            </div>
          </div>
        )
        }
      </div>
    </div>
  );
};

export default Home;
