import React, { useEffect, useState } from 'react'
import { GetPlaceDetails, PHOTO_REF_URL } from './GlobalApi'
import { Link } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const UserTrip = ({ trip }) => {

    const [photoUrl, setPhotoUrl] = useState()

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
        }
        const result = await GetPlaceDetails(data)
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
        trip && GetPlacePhoto()
    }, [trip])

    return (
        <div className='hover:scale-95 transition-all cursor-pointer'>
            <Link to={`/view-trip/` + trip?.id}>
                <img className={`${photoUrl ? "rounded-xl h-[150px] sm:h-[180px] md:h-[200px] lg:h-[240px] w-full object-cover" : "rounded-xl h-[150px] sm:h-[180px] md:h-[200px] lg:h-[240px] w-full object-cover"} `}
                    src={photoUrl ? photoUrl : "/debian-svgrepo-com.svg"} alt="" />
                <div>
                    <h1 className='text-xl font-semibold'>{trip?.userSelection?.location?.label}</h1>
                    <p className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays}
                        days trip with
                        {trip?.userSelection?.budget}  budget</p>
                </div>
            </Link>
        </div>
    )
}

export default UserTrip
