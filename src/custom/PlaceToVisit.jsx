import React from 'react'
import { Link } from 'react-router-dom';
import { FaMapMarkedAlt } from "react-icons/fa";
import VisitCard from './VisitCard';


const PlaceToVisit = ({ trip }) => {
    return (
        <div>
            <h2 className='font-bold text-lg mt-8'>Places to Visit</h2>
            <div>
                {trip?.tripData?.itinerary &&
                    Object.entries(trip.tripData.itinerary)
                        .sort(([dayA], [dayB]) => {
                            const dayNumA = parseInt(dayA.replace('day', ''), 10);
                            const dayNumB = parseInt(dayB.replace('day', ''), 10);
                            return dayNumA - dayNumB;
                        }).map(([day, details], index) => (
                            <div key={index} className="my-4 rounded-lg ">
                                <h2 className="text-xl font-bold">{day.toUpperCase()}</h2>
                                <h3 className="text-lg font-semibold text-gray-700">{details?.theme}</h3>
                                <p className="text-sm text-gray-500">
                                    Best Time to Visit: {details?.bestTimeToVisit}
                                </p>
                                <div className="mt-2">
                                    <div className="gap-3 text-gray-600 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
                                        {details?.places?.map((place, idx) => (
                                            <>

                                                <VisitCard key={idx} place={place} />

                                            </>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
            </div>

        </div>
    )
}

export default PlaceToVisit
