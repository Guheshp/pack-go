import React, { useEffect, useState } from 'react'
import { FaMapMarkedAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { GetPlaceDetails, PHOTO_REF_URL } from './GlobalApi'

const VisitCard = ({ place }) => {


    const [photoUrl, setPhotoUrl] = useState()

    const GetPlacePhoto = async () => {
        const Data = {
            textQuery: place?.placeName
        }
        const result = await GetPlaceDetails(Data)
            .then(resp => {
                console.log(resp?.data?.places[0]?.photos[3]?.name)
                const Photo_url = PHOTO_REF_URL.replace('{NAME}', resp?.data?.places[0]?.photos[3]?.name)
                setPhotoUrl(Photo_url)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        place && GetPlacePhoto()
    }, [place])
    return (
        <div>

            <div className='border mt-2 rounded-xl flex gap-3 p-2 hover:scale-95 hover:shadow-xl transition-all cursor-pointer'>

                <img className='w-[130px] h-[130px] rounded-xl' src={photoUrl ? photoUrl : "/aeroplane.jpg"} alt="" />
                <div>
                    <p className='font-bold text-lg text-black'>{place?.placeName}</p>
                    <p className='font-semibold text-sm text-black'>⭐ {place?.rating}</p>
                    <p className='text-sm text-gray-400 py-2'>{place?.placeDetails}</p>
                    <p className='text-sm text-orange-600 pt-2'>⏱️ {place?.travelTime}</p>
                    <Link to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place?.placeName)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='cursor-pointer'>
                        <FaMapMarkedAlt className='size-5 m-2 text-black ' />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default VisitCard
