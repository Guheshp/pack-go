import { db } from '@/service/firebase'
import { collection, getDocs, query, queryEqual, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserTrip from './UserTrip'
import { SkeletonCard } from './options'
import { Skeleton } from '@/components/ui/skeleton'


const MyTrip = () => {

    const navigate = useNavigate()

    const [userTrips, setUserTrips] = useState([])



    // get all users trip 
    const getUserTrip = async () => {

        try {
            const user = JSON.parse(localStorage.getItem("user"))
            console.log("user.", user)

            if (!user || !user.email) {
                navigate("/");
                return;
            }
            setUserTrips([])
            const tripCollectionRef = collection(db, "pack&go");
            const q = query(tripCollectionRef, where("userEmail", "==", user.email));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                setUserTrips(prevVal => [...prevVal, doc.data()])
            });

        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        getUserTrip()
    }, [])
    if (!userTrips) return <div>
        <SkeletonCard />
    </div>
    return (

        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
            <h1 className='font-bold text-3xl'>MyTrip</h1>

            <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-10'>
                {userTrips?.length > 0 ? userTrips?.map((trip, index) => (
                    <UserTrip trip={trip} />
                ))
                    : [1, 2, 3, 4, 5, 6].map((item, index) => (
                        <div key={index} >
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

export default MyTrip
