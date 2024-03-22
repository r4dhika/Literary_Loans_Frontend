"use client"
import BooksCard from "./components/Books";
import { Input } from "@/components/ui/input"
import useAuthStore from "../store/authStore";
import LendBook from "./components/LendBook";
import BorrowedBooks from "./components/BorrowedBooks";
import LendedBooks from "./components/LentBooks";
import BorrowRequests from "./components/BorrowRequests";
import BorrowRequestStatus from "./components/BorrowRequestsStatus";
import ReturnRequests from "./components/ReturnRequests";
import useBookStore from "../store/bookStore";
import Fuse from 'fuse.js'

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
        <div>
            <div className="flex gap-10">
                <div className="flex flex-col gap-3 w-[30%]">
                    <LendBook />
                    <BorrowedBooks token={token_value} />
                    <LendedBooks token={token_value} />
                </div>
                <div className="flex flex-col gap-2 w-[50%]">
                    <div className="flex align-middle justify-between items-center">
                        <span className="text-white font-bold text-3xl">Books</span>
                        <Input className="dark w-[50%] text-white" placeholder="Search..." onChange={handleSearch} />
                    </div>
                    <BooksCard token={token_value} />
                </div>
                <div className="w-[30%] flex flex-col gap-3">
                    <BorrowRequests token={token_value} />
                    <BorrowRequestStatus token={token_value} />
                    <ReturnRequests token={token_value} />
                </div>
            </div>
        </div>
    ) : null;
}
