import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Contact = ({ listing }) => {
    const [landloard, setLandloard] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
      const fetchLandlord = async () =>{
        try {
            const res = await fetch(`/api/user/${listing.userRef}`);
            const data = await res.json();
            console.log(data)
            setLandloard(data)
        } catch (error) {
            console.log(error)
        }
    }
    fetchLandlord()
    }, [listing.userRef])
  return (
    <>
    { landloard && (
        <div className='flex flex-col gap-2'>
            <p>Contact <span className='font-semibold'>{ landloard.username }</span> for {' '}
             <span className='font-semibold'>{listing.name.toLowerCase()}</span>
            </p>
            <textarea name="message" id="message" rows={2}
            value={message} onChange={e => setMessage(e.target.value)}
            placeholder='Enter your message here...'
            className='w-full border border-gray-300 p-3 rounded-lg'
            ></textarea>
            <Link
            to={`mailto:${landloard.email}?subject=Regarding ${listing.name}&body=${message}`}
            className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
            >
                Send Message
            </Link>
        </div>
    ) }
    </>
  )
}

export default Contact