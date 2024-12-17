import React, { useEffect, useState } from 'react'
import { GetPlaceDetails, PHOTO_REF_URL } from './GlobalApi'

const HotelCard = ({ data }) => {
    const [photoUrl, setPhotoUrl] = useState()

    const GetPlacePhoto = async () => {
        const Data = {
            textQuery: data?.hotelName
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
        data && GetPlacePhoto()
    }, [data])

    return (
        <div className='hover:scale-95 transition-all cursor-pointer'>
            <img
                className='rounded-xl h-[150px] sm:h-[180px] md:h-[200px] lg:h-[240px] w-full object-cover'
                src={photoUrl ? photoUrl : "/aeroplane.jpg"}
                alt="hotelimages"
            />
            <div className='my-2 flex flex-col gap-1 sm:gap-2 '>
                <h2 className='font-medium text-base sm:text-lg md:text-xl'>
                    {data?.hotelName}
                </h2>
                <h2 className='text-sm sm:text-base text-gray-500'>
                    📍 {data?.hotelAddress}
                </h2>
                <h2 className='text-sm sm:text-base'>
                    💰 {data?.price}
                </h2>
                <h2 className='text-sm sm:text-base'>
                    ⭐ {data?.rating}
                </h2>
            </div>
        </div>

    )
}

export default HotelCard
