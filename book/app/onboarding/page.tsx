"use client"
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuthStore from "../store/authStore";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axiosInstance from "@/axiosInstance";
import { useRouter } from "next/navigation";

export default function Onboarding() {
    const authStore = useAuthStore();
    const [areaName, setAreaName] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const router = useRouter()

    function getCsrfToken() {
        const cookieValue = document.cookie.match(/csrftoken=([^;]+)/);
        return cookieValue ? cookieValue[1] : null;
    }

    const handleSubmit = () => {
        console.log("Form submitted!");
        console.log("Area Name:", areaName);
        console.log("District:", district);
        console.log("City:", city);
        console.log("State:", state);
        console.log("Country:", country);
        console.log("Phone Number:", phoneNumber);

        const csrfToken = getCsrfToken();
        const details = {
            email:authStore.user.emailAdd,
            addressline1:areaName,
            addressline2:district,
            city:city,
            state:state,
            country:country,
            phoneNumber:phoneNumber
        }

        console.log(details)

        axiosInstance.post("/onboard/",{details}, {
            headers: {
                'X-CSRFToken': csrfToken
            }
        })
        .then(response=>{
            if(response.status==200){
                router.push("/dashboard")
            }else{
                alert("onboarding failed retry")
            }
        })
        .catch((error)=>{
            console.error("Onboarding failed:", error);
            console.log("Error:", error.message)
            alert("onboarding failed try again")
        })
    };

    return (
        <div className="dark p-2 flex flex-col justify-center align-middle items-center">
            <div className="text-white font-bold text-3xl mb-10">Welcome to Our Community!</div>
            <Card className="dark w-[40%] p-2 flex flex-col justify-center align-middle items-center">
                <CardContent className="flex flex-col gap-3 mt-5 w-[70%]">
                    <div>
                        <Label htmlFor="email">Your Email</Label>
                        <Input type="email" id="email" placeholder={authStore.user.emailAdd} readOnly />
                    </div>
                    <div>
                        <Label htmlFor="name">Your Full Name</Label>
                        <Input type="text" id="name" placeholder={`${authStore.user.firstName} ${authStore.user.lastName}`} readOnly />
                    </div>
                    <div>
                        <Label htmlFor="area">Address line 1</Label>
                        <Input type="text" id="area" value={areaName} onChange={(e) => setAreaName(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="district">Address line 2</Label>
                        <Input type="text" id="district" value={district} onChange={(e) => setDistrict(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="city">City</Label>
                        <Input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="state">State</Label>
                        <Input type="text" id="state" value={state} onChange={(e) => setState(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="country">Country</Label>
                        <Input type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input type="tel" id="phone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSubmit}>Submit</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
