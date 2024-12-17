import React, { useEffect, useState } from 'react'
import { BsFillSendFill } from "react-icons/bs";
import { Button } from "@/components/ui/button"
import { GetPlaceDetails, PHOTO_REF_URL } from './GlobalApi';



const Information = ({ trip }) => {

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
        <div className='p-4 md:p-6'>
            <img
                className='h-[200px] md:h-[300px] w-full object-cover rounded-xl'
                src={photoUrl ? photoUrl : "/aeroplane.jpg"}
                alt="aeroplane.jpg"
            />
            <div className='flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 lg:gap-8 p-4'>
                <div className='flex flex-col gap-2 my-4 md:my-5'>
                    <h1 className='font-bold text-lg sm:text-xl md:text-2xl text-center md:text-left'>
                        {trip?.userSelection?.location?.label}
                    </h1>
                    <div className='flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-start'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm sm:text-base'>
                            📅 {trip?.userSelection?.noOfDays} Days
                        </h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm sm:text-base'>
                            💰 {trip?.userSelection?.budget}
                        </h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm sm:text-base'>
                            🧑‍🧑‍🧒 No of People: {trip?.userSelection?.noOfDays}
                        </h2>
                    </div>
                </div>

                <Button className='text-sm md:text-base'>
                    <BsFillSendFill />
                </Button>
            </div>
        </div>

    )
}

export default Information
