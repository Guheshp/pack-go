import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetPlaceDetails, PHOTO_REF_URL } from './GlobalApi'
import HotelCard from './HotelCard'
import { SkeletonCard } from './options'
import { Skeleton } from '@/components/ui/skeleton'

const Recommended = ({ trip }) => {




    return (
        <div>
            <h1 className='font-bold text-xl my-5'>Hotel Recommended</h1>

            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 '>
                {trip?.tripData?.hotelOptions?.length > 0 ?
                    trip?.tripData?.hotelOptions?.map((data, index) => {
                        return (
                            <Link to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data?.hotelName)},${encodeURIComponent(data?.hotelAddress)}`}
                                target="_blank"
                                rel="noopener noreferrer">
                                <HotelCard data={data} />
                            </Link>
                        )
                    }


                    )
                    : [1, 2, 3].map((item, index) => (
                        <div>
                            <SkeletonCard className="h-[500px] w-[500px] rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Recommended
