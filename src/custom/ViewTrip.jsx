import { db } from '@/service/firebase'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import Information from './Information'
import Recommended from './Recommended'
import PlaceToVisit from './PlaceToVisit'
import Footer from './Footer'

const ViewTrip = () => {

    const { tripId } = useParams()

    const [trip, setTrip] = useState([])
    console.log("trip", trip)

    const getData = async () => {
        try {
            const docRef = doc(db, "pack&go", tripId);
            const docSnap = await getDoc(docRef);

            if (docSnap) {
                setTrip(docSnap.data());
            } else {
                toast("No Such Data")
            }

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        tripId && getData()
    }, [tripId])



    return (
        <div className='p-4 sm:p-8 md:px-16 lg:px-32 xl:px-48'>
            {/* Information Section */}
            <Information trip={trip} />
            {/* Recommended Hotels */}
            <Recommended trip={trip} />
            {/* Daily Plan */}
            <PlaceToVisit trip={trip} />
            {/* Footer */}
            <Footer />
        </div>
    )
}

export default ViewTrip
