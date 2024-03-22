import useAuthStore from "@/app/store/authStore";
import axiosInstance from "@/axiosInstance";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";

interface Props {
    book_id: number;
}

export default function RentBook({book_id} : Props) {
    const [quantity, setQuantity] = useState("");
    const [return_date, setReturnDate] = useState("");

    const authStore = useAuthStore()
    const handleRentBook = () => {

        const bookDetails = {
            book_id: book_id,
            quantity: Number(quantity),
            return_date: return_date
        };
        
        axiosInstance.post("/create_borrow_request/",{bookDetails},{
            headers: {
                'Authorization': authStore.user.token
              }
        })
        .then((response:any)=>{
            if(response.status==200){
                alert("Request Sent")
                window.location.reload()
            }else{
                alert('failed to send request')
            }
        })
        .catch(()=>{
            alert("failed to send request")
        })
       
    };
    
    return (
        <Dialog>
            <DialogTrigger className="text-white font-bold">
                <div className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 p-2 w-[100%]">
                    Rent Book
                </div>
            </DialogTrigger>
            <DialogContent className="dark text-white">
                <DialogHeader>
                    <DialogTitle>Rent Book</DialogTitle>
                    <DialogDescription>
                        Enter Rent Details for Borrowing
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="quantity" className="text-right">
                            Quantity
                        </Label>
                        <Input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">
                            Return Date
                        </Label>
                        <Input id="image" type="date" value={return_date} onChange={(e) => setReturnDate(e.target.value)} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleRentBook}>Rent Book</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}