import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from "@/components/ui/input"
import { AI_PROMPT, selectedBudgetOption, selectTravelList } from '@/custom/options';
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { chatSession } from '@/custom/AIModel';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebase';
import { useNavigate } from 'react-router-dom';

const Createtrip = () => {
    const [selectedPlace, setSelectedPlace] = useState(null);

    const [formData, setFormData] = useState([])

    const [openDailog, setOpenDailog] = useState(false)

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    useEffect(() => {
        // console.log(formData)
    }, [formData])

    const login = useGoogleLogin({
        onSuccess: (response) => GetUSerProfile(response),
        onError: (error) => console.log(error),
        redirect_uri: "http://localhost:5173",
    });

    const onGenerate = async () => {
        const user = localStorage.getItem("user")
        if (!user) {
            setOpenDailog(true)
            return;
        }
        if (formData?.noOfDays > 5 && !formData.location || !formData.budget || !formData.traveler) {
            toast.error("Please fill correct details!", {
                style: {
                    border: '',
                    color: "red"
                },
            })
            return;
        }
        setLoading(true)

        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', formData?.location?.label)
            .replace('{totalDays}', formData?.noOfDays)
            .replace('{traveler}', formData?.traveler)
            .replace('{budget}', formData?.budget)

        // console.log("FINAL_PROMPT", FINAL_PROMPT)
        const result = await chatSession.sendMessage(FINAL_PROMPT)
        console.log("result", result?.response?.text())
        setLoading(false)
        SaveAiTrip(result?.response?.text())
    }

    //save the data in fireStore.
    const SaveAiTrip = async (TripData) => {
        setLoading(true)
        const user = JSON.parse(localStorage.getItem('user'))

        if (!user) {
            toast("User is not authenticated.")
            console.log("User is not authenticated.");
            return;
        }

        const docId = Date.now().toString();
        await setDoc(doc(db, "pack&go", docId), {
            userSelection: formData,
            tripData: JSON.parse(TripData),
            userEmail: user?.email,
            id: docId
        });
        setLoading(false)
        navigate(`/view-trip/` + docId)
    }

    const GetUSerProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'Application/json'
            }
        })
            .then(response => {
                console.log('User info:', response);
                localStorage.setItem("user", JSON.stringify(response?.data))
                setOpenDailog(false)
                onGenerate()
            })
            .catch(error => {
                console.error('Error fetching user info:', error);
            });
    }


    return (

        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
            <div>
                <h2 className='font-bold text-3xl'>Tell us your travel preferences 🌴⛰️🏖️</h2>
                <p className='mt-3 text-gray-400 text-xl'>
                    Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
                </p>
            </div>

            <div className='mt-20 flex flex-col gap-9'>
                <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                    libraries={['places']} >
                    <div className=''>
                        <h2 className='font-medium text-xl my-3'>What is your destination of choice?</h2>
                        <GooglePlacesAutocomplete
                            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                            selectProps={{
                                selectedPlace,
                                onChange: (v) => { setSelectedPlace(v); handleInputChange("location", v) }
                            }}
                        />
                    </div>
                </LoadScript>

                <div>
                    <h2 className='font-medium text-xl my-3'>How many days are you plannaing your trip?</h2>
                    <Input placeholder={"Ex.3"} type="number"
                        onChange={(e) => handleInputChange("noOfDays", e.target.value)}
                    />
                </div>
            </div>

            <div className="mt-14">
                <h2 className="font-medium text-xl my-3 text-center sm:text-left">
                    What is your budget
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5 gap-5 cursor-pointer">
                    {selectedBudgetOption.map((data, index) => (
                        <div
                            key={index}
                            className={`p-4 border rounded-lg hover:shadow-lg ${formData.budget == data?.title
                                ? "border border-red-950 shadow-xl"
                                : ""
                                }`}
                            onClick={() => handleInputChange("budget", data.title)}
                        >
                            <h2 className="text-4xl">{data?.icon}</h2>
                            <h2 className="font-bold text-lg">{data?.title}</h2>
                            <h2>{data?.desc}</h2>
                        </div>
                    ))}
                </div>
            </div>

            <div className='mt-14'>
                <h2 className='font-medium text-xl my-3'>Why do you plan n travel with on your next adventure</h2>
                <div className='grid grid-cols-3 mt-5 gap-5 cursor-pointer'>
                    {selectTravelList.map((data, index) => (
                        <div key={index} className={`p-4 border rounded-lg hover:shadow-lg ${formData.traveler == data?.people ? "border border-red-950 shadow-xl" : ""}`}
                            onClick={() => handleInputChange("traveler", data.people)}
                        >
                            <h2 className='text-4xl'>{data?.icon}</h2>
                            <h2 className='font-bold text-lg'>{data?.title}</h2>
                            <h2>{data?.desc}</h2>
                        </div>
                    ))}
                </div>
            </div>
            <div className='my-10 flex justify-end'>
                <Button
                    disabled={loading}
                    onClick={onGenerate}
                    className="px-6 py-3 text-lg mb-4"
                >
                    {loading ? (
                        <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
                    ) : (
                        "Generate Trip"
                    )}
                </Button>
            </div>

            <Dialog open={openDailog} onOpenChange={setOpenDailog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <div className='flex flex-col justify-center items-center gap-2'>
                                <img className='w-12' src="/debian-svgrepo-com.svg" alt="logo" />
                                <h1 className="text-2xl font-bold text-neutral-950 hover:text-neutral-800 transition duration-300">
                                    Pack&Go
                                </h1>
                            </div>
                        </DialogTitle>
                        <DialogDescription>
                            <div className="text-center">
                                <h1 className="text-xl font-semibold text-neutral-600 transition duration-300">
                                    Sign Up With Google
                                </h1>
                                <p className="mt-2 text-neutral-500">
                                    Sign in to the app securely using Google Authentication.
                                </p>
                            </div>
                        </DialogDescription>
                        <Button
                            onClick={login}>
                            <FcGoogle className='size-10' /> Sign in with Google
                        </Button>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>

    );
};

export default Createtrip;
