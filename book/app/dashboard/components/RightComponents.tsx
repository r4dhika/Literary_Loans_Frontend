import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"

export function BorrowRequestCard({ bookName, bookDescription, price, imageUrl, borrower_name, borrower_city, date }: any) {
    const { toast } = useToast()
    return (
        <Dialog>
            <DialogTrigger className="text-white font-bold">
                <div className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 p-2 w-[100%]">
                    {bookName}
                </div>
            </DialogTrigger>
            <DialogContent className="dark text-white">
                <DialogHeader>
                    <DialogTitle>{bookName}</DialogTitle>
                    <DialogDescription>
                        {bookDescription}
                    </DialogDescription>
                    <DialogDescription className="font-bold text-white">
                        ${price} per day
                    </DialogDescription>
                    <DialogDescription className="font-bold">
                        Request Date: {date}
                    </DialogDescription>
                </DialogHeader>
                <Card className="flex mt-auto align-middle items-center gap-2 p-2">
                    <Avatar>
                        <AvatarImage src={imageUrl} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <div>
                            {borrower_name}
                        </div>
                        <div>
                            {borrower_city}
                        </div>
                    </div>
                </Card>
                <DialogFooter>
                    <Button
                        onClick={() => {
                            toast({
                                title: "Request Accepted",
                                description: "Friday, February 10, 2023 at 5:57 PM",
                            })
                        }}
                    >
                        Accept
                    </Button>
                    <Button
                        onClick={() => {
                            toast({
                                title: "Request Rejected",
                                description: "Friday, February 10, 2023 at 5:57 PM",
                                variant: 'destructive'
                            })
                        }}
                        variant="destructive"
                    >
                        Reject
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}