import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from './components/ui/button'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Createtrip from './create-trip/Createtrip'
import Header from './custom/Header'
import Hero from './custom/Hero'
import { Toaster } from 'sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './custom/ViewTrip'
import MyTrip from './custom/MyTrip'

const Main = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Hero />
      },
      {
        path: '/create-trip',
        element: <Createtrip />
      },
      {
        path: '/view-trip/:tripId',
        element: <ViewTrip />
      },
      {
        path: '/my-trip',
        element: <MyTrip />
      },

    ]
  }
]
)

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>

        <Toaster />
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </>
  )
}

export default App
