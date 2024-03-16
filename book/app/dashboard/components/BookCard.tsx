import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useAuthStore from "@/app/store/authStore";


export default function BookCard({ bookName, bookDescription, price, lenderName, lenderCity, image}: any) {//TYPESCRIPT
    const authStore = useAuthStore()
    console.log(authStore.user)
    console.log(image)
    const user_profile = authStore.user.picture
    lenderName = authStore.user.firstName + " " + authStore.user.lastName
    return (
        <Card className="w-[100%] flex p-2 items-center dark">
            <img className='w-[100px]' src={image} alt="book image" />
            <CardHeader className="flex h-[100%] justify-between">
                <div className="flex flex-col gap-2">
                    <CardTitle>{bookName}</CardTitle>
                    <CardDescription>{bookDescription}</CardDescription>
                </div>
                <Card className="flex mt-auto align-middle items-center gap-2 p-2">
                    <Avatar>
                        <AvatarImage src={user_profile}/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <div>
                            {lenderName}
                        </div>
                    </div>
                </Card>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col align-middle justify-center items-center gap-5'>
                    <div className="flex flex-col align-middle justify-center items-center">
                        <span className='text-3xl font-bold'>₹{price}</span>
                        <span className='text-xs'>per day</span>
                    </div>
                    <Button className='w-[100%]'>Rent</Button>
                </div>
            </CardContent>
            <CardFooter>

            </CardFooter>
        </Card>

    );
}
