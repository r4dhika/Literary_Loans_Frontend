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
import { useEffect, useState } from "react";

interface Genre {
    id: number;
    title: string;
    description: string;
}

export default function LendBook() {
    const [bookName, setBookName] = useState("");
    const [bookDescription, setBookDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [coverImageUrl, setCoverImageUrl] = useState("");
    const [price, setPrice] = useState("");
    const [bookGenre, setBookGenre] = useState("");
    const [genres, setGenres] = useState<Genre[]>([]);
    const authStore = useAuthStore()

    useEffect(() => {
        axiosInstance.get("/genre/", {
            headers: {
                'Authorization': authStore.user.token
            }
        })
            .then((response) => {
                console.log("RESPONSEEEE", response)
                setGenres(response.data as Genre[]);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const handleLendBook = () => {
        const bookDetails = {
            bookName,
            bookDescription,
            quantity,
            authorName,
            coverImageUrl,
            price,
            bookGenre
        };

        axiosInstance.post("/book/create/", { bookDetails }, {
            headers: {
                'Authorization': authStore.user.token
            }
        })
            .then((response: any) => {
                if (response.status == 200) {
                    window.location.reload()
                } else {
                    alert('failed to add book')
                }
            })
            .catch(() => {
                alert("failed to add book")
            })

    };

    return (
        <Dialog>
            <DialogTrigger className="text-white font-bold">
                <div className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 p-2 w-[100%]">
                    Lend a book
                </div>
            </DialogTrigger>
            <DialogContent className="dark text-white">
                <DialogHeader>
                    <DialogTitle>Lend Book</DialogTitle>
                    <DialogDescription>
                        Enter Book Details for Lending
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Book Name
                        </Label>
                        <Input id="name" value={bookName} onChange={(e) => setBookName(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Book Description
                        </Label>
                        <Input id="description" value={bookDescription} onChange={(e) => setBookDescription(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="quantity" className="text-right">
                            Quantity
                        </Label>
                        <Input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="author" className="text-right">
                            Author Name
                        </Label>
                        <Input id="author" value={authorName} onChange={(e) => setAuthorName(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">
                            Cover Image url
                        </Label>
                        <Input id="image" type="text" value={coverImageUrl} onChange={(e) => setCoverImageUrl(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                            Price
                        </Label>
                        <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="genre" className="text-right">
                            Genre
                        </label>
                        <select id="genre" value={bookGenre} onChange={(e) => setBookGenre(e.target.value)} multiple className="col-span-3">
                            {genres.map(genre => (
                                <option key={genre.id} value={genre.id} className="dark text-white">{genre.title}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleLendBook}>Lend Book</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}