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
import axiosInstance from "@/axiosInstance";
import useAuthStore from "@/app/store/authStore";

export function BorrowRequestCard({ bookName, bookDescription, price, imageUrl, borrower_name, borrower_city, request_date, return_date, book_id, request_id }: any) {
    const { toast } = useToast()
    const authStore = useAuthStore()

    const handleAccept = () => {

        const bookDetails = {
            request_id: Number(request_id)
        };

        axiosInstance.post("/accept_borrow_request/", { bookDetails }, {
            headers: {
                'Authorization': authStore.user.token
            }
        })
            .then((response: any) => {
                if (response.status === 200) {
                    toast({
                        title: "Request Accepted",
                        description: `Accepted on ${new Date().toLocaleString()}`,
                    });
                    window.location.reload();
                } else {
                    alert('Failed to accept request');
                }
            })
            .catch(() => {
                alert("Failed to accept request");
            });
    };

    const handleReject = () => {

        const bookDetails = {
            request_id: Number(request_id)
        };

        axiosInstance.post("/reject_borrow_request/", { bookDetails }, {
            headers: {
                'Authorization': authStore.user.token
            }
        })
            .then((response: any) => {
                if (response.status === 200) {
                    toast({
                        title: "Request Rejected",
                        description: `Rejected on ${new Date().toLocaleString()}`,
                        variant: 'destructive'
                    });
                    window.location.reload();
                } else {
                    alert('Failed to reject request');
                }
            })
            .catch(() => {
                alert("Failed to reject request");
            });
    };
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
                        Request Date: {request_date}
                    </DialogDescription>
                    <DialogDescription className="font-bold">
                        Return Date: {return_date}
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
                    <Button onClick={handleAccept}>
                        Accept
                    </Button>
                    <Button
                        onClick={handleReject}
                        variant="destructive"
                    >
                        Reject
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}