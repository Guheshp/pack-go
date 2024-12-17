import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { FcGoogle } from 'react-icons/fc'

const Header = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const navigate = useNavigate()
    const [openDailog, setOpenDailog] = useState(false)
    const user = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        console.log("user", user)
    }, [])

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

    const login = useGoogleLogin({
        onSuccess: (response) => GetUSerProfile(response),
        onError: (error) => console.log(error),
        redirect_uri: "http://localhost:5173",
    });

    return (
        <div className='flex p-2 shadow-sm justify-between items-center flex-wrap'>
            <div className='flex items-center gap-3 px-3'>
                <img className='w-12' src="/debian-svgrepo-com.svg" alt="" />
                <h1 className="text-2xl font-bold text-neutral-950 hover:text-neutral-800 transition duration-300">
                    <Link to={`/`}>
                        Pack&Go
                    </Link>
                </h1>
            </div>
            <div className="flex items-center gap-3">
                {user ?
                    <div className="flex gap-5 mx-4 items-center hidden sm:flex">
                        <Button variant="outline" className="rounded-full text-sm">
                            <Link to={`/create-trip`}> + Create Trips</Link>
                        </Button>
                        <Button variant="outline" className="rounded-full text-sm">
                            <Link to={`/my-trip`}> My Trips</Link>
                        </Button>

                        <Popover>
                            <PopoverTrigger>
                                <img className='h-[35px] w-[35px] rounded-full' src={user.picture ? user.picture : "/default.png"} alt="ureimg" />
                            </PopoverTrigger>
                            <PopoverContent>
                                <h2 onClick={() => {
                                    googleLogout();
                                    localStorage.clear();
                                    navigate("/")
                                }}>LogOut</h2>
                            </PopoverContent>
                        </Popover>
                    </div>
                    :
                    <Button onClick={() => setOpenDailog(true)} className="text-sm">Sign In</Button>
                }

                {/* Mobile Dropdown */}
                <div className="sm:hidden">
                    <Button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="text-sm flex items-center gap-2"
                    >
                        <span>Menu</span>
                        <svg className={`w-5 h-5 transform ${isDropdownOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </Button>
                    {isDropdownOpen && (
                        <div className="absolute bg-white  rounded-lg mt-2 py-2 w-40 right-3">
                            <Button variant="outline" className="rounded-full text-sm block w-full text-left mb-2">
                                <Link to={`/create-trip`}> + Create Trips</Link>
                            </Button>
                            <Button variant="outline" className="rounded-full text-sm block w-full text-left">
                                <Link to={`/my-trip`}> My Trips</Link>
                            </Button>
                        </div>
                    )}
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
                                <div className="py-3">
                                    <h1 className="text-xl font-semibold text-neutral-600 transition duration-300">
                                        Sign Up With Google
                                    </h1>
                                    <p className="mt-2 text-neutral-500">
                                        Sign in to the app securely using Google Authentication.
                                    </p>
                                </div>
                            </DialogDescription>
                            <Button onClick={login}>
                                <FcGoogle className='size-10' /> Sign in with Google
                            </Button>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>

    )
}

export default Header
