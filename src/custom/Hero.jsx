import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <>
            <div className="flex flex-col items-center gap-6 md:gap-8 px-4 sm:px-6 lg:px-8">
                <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl text-center mt-10 sm:mt-12 lg:mt-16 mx-4 sm:mx-16 lg:mx-32 ">
                    <span className="text-[#7C0A02]">Discover Your Next Adventure With AI: </span>
                    Personalized Itineraries at Your FingerTips
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-500 text-center px-2 sm:px-8 md:px-12">
                    Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
                </p>
                <Link to={'/create-trip'}>
                    <Button className="text-sm sm:text-base">Get Started, It's Free</Button>
                </Link>
            </div>

            <div className="w-full p-4">
                <img
                    className="w-full h-auto max-h-[500px] object-cover md:max-h-[400px] lg:max-h-[500px]"
                    src="/hero.png"
                    alt="Aeroplane"
                />
            </div>
        </>

    )
}

export default Hero
