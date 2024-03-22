"use client"
import useAuthStore from "@/app/store/authStore"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "./card"
import { cookies } from 'next/headers'
import Image from 'next/image';
import logo from './logotext.png';
import { useRouter } from "next/navigation"
import axios from "axios"
import axiosInstance from "@/axiosInstance"


export default function Navbar() {
    const authStore = useAuthStore();
    const isAuthenticated = authStore.user.isAuthenticated;
    const router = useRouter()
    function getCsrfToken() {
        const cookieValue = document.cookie.match(/csrftoken=([^;]+)/);
        return cookieValue ? cookieValue[1] : null;
    }
    const handleLogout = async () => {
        console.log("handleLogout")
        // After logout, update isAuthenticated state and data is deleted from authstore
        authStore.logout();
        const csrfToken = getCsrfToken();
        try {
            const response = await axiosInstance.post('/logout/', {}, {
                headers: {
                    'X-CSRFToken': csrfToken
                }
            });
            console.log(response.data); // Assuming the response contains a message indicating success
        } catch (error) {
            console.error('Error deleting cookie:', error);
        }
        window.location.href = 'http://localhost:3000/';
    };
    return (
        <nav className="sticky top-0 z-10 bg-black backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200 mb-5">
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* <span className="text-2xl text-white font-semibold">Logo</span> */}
                    <Image src={logo} alt="logo" className="h-10" width={100} />
                    <div className="flex space-x-4 text-white">
                        {isAuthenticated && (
                            <Sheet >
                                <SheetTrigger>
                                    <Avatar>
                                        <AvatarImage src={authStore.user.picture} />
                                        <AvatarFallback>Profile</AvatarFallback>
                                    </Avatar>
                                </SheetTrigger>
                                <SheetContent className="dark">
                                    <SheetHeader>
                                        <SheetTitle>Profile</SheetTitle>
                                        <SheetDescription>
                                            <Card className="flex items-center justify-center flex-col p-2 gap-2">
                                                <Avatar>
                                                    <AvatarImage src={authStore.user.picture} />
                                                    <AvatarFallback>Pic</AvatarFallback>
                                                </Avatar>
                                                <p>{`${authStore.user.firstName} ${authStore.user.lastName}`}</p>
                                            </Card>
                                        </SheetDescription>
                                    </SheetHeader>
                                </SheetContent>
                            </Sheet>
                        )}
                        {isAuthenticated && (
                            <AlertDialog>
                                <AlertDialogTrigger className="text-red-500 dark">Logout</AlertDialogTrigger>
                                <AlertDialogContent className="dark">
                                    <AlertDialogHeader className="text-white">
                                        <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="text-white">Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleLogout}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </div>
                </div>
            </div>
        </nav >
    )
}