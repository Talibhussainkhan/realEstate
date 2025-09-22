import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'

const UpdateListing = () => {
const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);
const navigate = useNavigate();
const { id } = useParams();
const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });


  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listing/update/${id}`, {
        method: "POST",
        headers :{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`)
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDelete = (index) =>{
    if(formData.imageUrls.length === 1) return setError('You haven’t deleted the last photo. Please refresh the page to restore all photos if you don’t update.');
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  }

  const fetchListing = async ()=>{
    const res = await fetch(`/api/listing/get/${id}`);
    const data = await res.json();
    if( data.success === false ){
        console.log(data.message)
        return
    }
    setFormData(data)
  }
  useEffect(() => {
      fetchListing()
  }, [])
  

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Update a Listing
      </h1>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            id="name"
            maxLength="62"
            minLength="10"
            className="input focus:ring-1 ring-blue-400"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <textarea
            className="input focus:ring-1 ring-blue-400"
            placeholder="Description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Address"
            id="address"
            className="input focus:ring-1 ring-blue-400"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                className="input"
                onChange={handleChange}
                value={formData.bedrooms}
                required
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                className="input"
                onChange={handleChange}
                value={formData.bathrooms}
                required
              />
              <p>Bath</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                className="input"
                onChange={handleChange}
                value={formData.regularPrice}
                required
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">($ / months)</span>
              </div>
            </div>
            { formData.offer && (
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                className="input"
                onChange={handleChange}
                value={formData.discountPrice}
                required
              />
              <div className="flex flex-col items-center">
                <p>Discount Price</p>
                <span className="text-xs">($ / months)</span>
              </div>
            </div>
            )}
          </div>
        </div>
        <div className="flex flex-col  flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-medium text-gray-600 ml-2">
              Image can't be edit
            </span>
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((file, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 border border-gray-300"
              >
                <img
                  src={file}
                  alt="preview"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button type="button" onClick={()=> handleDelete(index)} className="text-red-700">Delete</button>
              </div>
            ))}

          <button
          disabled={loading}
            type="submit"
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Updating..." : "Update Listing"}
          </button>
          <p className="mt-3 text-red-700">{error}</p>
        </div>
      </form>
    </main>
  );
};

export default UpdateListing;
