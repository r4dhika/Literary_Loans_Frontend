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


export default function BookCard({ bookName, bookDescription, price, imageUrl, lenderName, lenderCity }: any) {//TYPESCRIPT

    return (
        <Card className="w-[100%] flex p-2 items-center dark">
            <img className='w-[100px]' src="https://cdn.britannica.com/16/187816-050-74B41B7B/Cover-edition-Adolf-Hitler-Mein-Kampf-1943.jpg" alt="book image" />
            <CardHeader className="flex h-[100%] justify-between">
                <div className="flex flex-col gap-2">
                    <CardTitle>{bookName}</CardTitle>
                    <CardDescription>{bookDescription}</CardDescription>
                </div>
                <Card className="flex mt-auto align-middle items-center gap-2 p-2">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <div>
                            {lenderName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            {lenderCity}
                        </div>
                    </div>
                </Card>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col align-middle justify-center items-center gap-5'>
                    <div className="flex flex-col align-middle justify-center items-center">
                        <span className='text-6xl font-bold'>₹{price}</span>
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
