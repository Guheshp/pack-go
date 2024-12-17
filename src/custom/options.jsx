
export const selectTravelList = [
    {
        id: 1,
        title: "Just Me",
        desc: "Relax on the sunny beaches with a refreshing ocean breeze.",
        icon: "🛫",
        people: " 1"
    },
    {
        id: 2,
        title: "Couple",
        desc: "Explore the majestic mountains and enjoy outdoor activities.",
        icon: "🥂",
        people: "2 people"
    },
    {
        id: 3,
        title: "Friends",
        desc: "Experience the hustle and bustle of vibrant city life.",
        icon: "🏙️",
        people: "4 to 7 people"
    },
    {
        id: 4,
        title: "Family",
        desc: "Set sail on a luxury cruise for a scenic ocean journey.",
        icon: "🧑‍🧑‍🧒",
        people: "3 to 4 people"
    },
]



export const selectedBudgetOption = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💵'
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on Average side',
        icon: '💰'
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Dont Worry about cost',
        icon: '💸'
    },
]

export const AI_PROMPT = "Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format."



import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    )
}