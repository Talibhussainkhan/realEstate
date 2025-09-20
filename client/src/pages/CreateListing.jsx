import { useState } from "react";

const CreateListing = () => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    imageUrls : [],
  })
   
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if(selectedFiles.length > 6){
      setError('you upload maximum 6 image')
    }else{
      setFormData({ ...formData, imageUrls : selectedFiles });
      setError(null)
    }
  };

  const handleDeleteImage = (index) =>{
   setFormData({
    ...formData,
    imageUrls : formData.imageUrls.filter((_,i)=> i !== index )
   })     
  }



  
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
        <input type="text" placeholder="Name" id="name" maxLength='62' minLength='10'  className="input focus:ring-1 ring-blue-400" required />        
        <textarea className="input focus:ring-1 ring-blue-400" placeholder="Description" id="description" required/>
        <input type="text" placeholder="Address" id="address" className="input focus:ring-1 ring-blue-400" required />
        
        <div className="flex gap-6 flex-wrap">
        <div className="flex gap-2">
          <input type="checkbox" id="sale" className="w-5" />
          <span>Sale</span>
        </div>
        <div className="flex gap-2">
          <input type="checkbox" id="rent" className="w-5" />
          <span>Rent</span>
        </div>
        <div className="flex gap-2">
          <input type="checkbox" id="parking" className="w-5" />
          <span>Parking spot</span>
        </div>
        <div className="flex gap-2">
          <input type="checkbox" id="furnished" className="w-5" />
          <span>Furnished</span>
        </div>
        <div className="flex gap-2">
          <input type="checkbox" id="offer" className="w-5" />
          <span>Offer</span>
        </div>

        </div>        
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <input type="number" id="bedrooms" min='1' max='10' className="input" required />
            <p>Beds</p>
          </div>
          <div className="flex items-center gap-2">
            <input type="number" id="bathrooms" min='1' max='10' className="input" required />
            <p>Bath</p>
          </div>
          <div className="flex items-center gap-2">
            <input type="number" id="regularPrice" min='1' max='10' className="input" required />
            <div className="flex flex-col items-center">
            <p>Regular Price</p>
              <span className="text-xs">($ / months)</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="number" id="discountPrice" min='1' max='10' className="input" required />
            <div className="flex flex-col items-center">
            <p>Discount Price</p>
            <span className="text-xs">($ / months)</span>
            </div>
          </div>
        </div>
        </div>
        <div className="flex flex-col  flex-1 gap-4">
          <p className="font-semibold">Images:
            <span className="font-medium text-gray-600 ml-2">The first image will be the cover (max 6)</span>
          </p>
          <div className="flex gap-4">
            <input onChange={handleFileChange} className="p-3 border border-gray-300 w-full" type="file" id="images" accept="image/*" multiple />
          </div>
        {  error && <p className="text-red-500">{error}</p> }
        { formData.imageUrls.length > 0 && formData.imageUrls.map((file, index) => (
          <div key={index} className="flex justify-between items-center p-3 border border-gray-300">
            <img
              src={URL.createObjectURL(file)}  
              alt="preview"
              className="w-20 h-20 object-contain rounded-lg"
            />
            <button type="button" onClick={()=>handleDeleteImage(index)} className="p-3 text-red-700 rounded-lg uppercase hover:opacity-90">Delete</button>
          </div>
        ))}


          <button type="button" className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Create Listing</button>
        </div>
        
        
        

      </form>
    </main>
  );
};

export default CreateListing;
