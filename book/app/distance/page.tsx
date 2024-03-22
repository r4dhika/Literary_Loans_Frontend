"use client"
import BooksCard from "./components/Books";
import { Input } from "@/components/ui/input"
import useAuthStore from "../store/authStore";
import useBookStore from "../store/bookStore";
import Fuse from 'fuse.js'
import { Button } from "@/components/ui/button";

export default function Home() {
    const authStore = useAuthStore();
    const isLoggedIn = authStore.user.isAuthenticated
    const token_value = authStore.user.token

    const bookStore = useBookStore()
    const handleSearch = (e: any) => {
        if (e.target.value === "") {
            bookStore.setSearchedBooks([]);
        } else {
            const books = bookStore.books;
            const newBooks = []
            const options = {
                keys: ["title"],
                shouldSort: true,
                findAllMatches: true
            }

            const fuse = new Fuse(books, options)
            const result = fuse.search(e.target.value) as any

            result.map((book): any => {
                newBooks.push(book.item)
            })

            bookStore.setSearchedBooks(newBooks)
        }
    }
    
    return isLoggedIn ? (
        // <div className="flex justify-center">
            <div >
                <div className="flex flex-col gap-2 w-[80%] justify-self-center mx-auto">
                    <div className="flex  align-middle justify-between">
                        <span className=" text-white font-bold text-3xl">Books</span>
                        <Input className="dark w-[50%] text-white" placeholder="Search..." onChange={handleSearch} />
                    </div>
                    <BooksCard token={token_value} />
                </div>
            </div>
        // </div>
    ) : null;
}
