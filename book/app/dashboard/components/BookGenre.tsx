"use client"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import axiosInstance from "@/axiosInstance";
import useAuthStore from "../../store/authStore";
import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import useBookStore from "@/app/store/bookStore";

interface User {
    id: number;
    password: string;
    last_login: string | null;
    is_superuser: boolean;
    username: string;
    first_name: string;
    last_name: string;
    is_staff: boolean;
    is_active: boolean;
    date_joined: string;
    email: string;
    phone_no: string | null;
    isOnboarded: boolean;
    rating_asLender: number | null;
    rating_asBorrower: number | null;
    total_rating_asLender: number | null;
    total_rating_asBorrower: number | null;
    addressLine1: string | null;
    addressLine2: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    picture: string | null;
    groups: any[]; // You might want to define a proper type for groups
    user_permissions: any[]; // You might want to define a proper type for user_permissions
}

interface Book {
    id: number;
    book_id: number;
    title: string;
    description: string;
    status: number;
    price: number;
    quantity: number;
    available: boolean;
    book_rating: string;
    total_book_rating: number;
    condition_rating: string;
    total_condition_rating: number;
    image: string;
    lender_id: User;
    borrower_id: User | null;
    author_id: number;
}

interface Props {
    token: string;
    genre_id: string;
}


export default function BookGenre({ token, genre_id }: Props) {
    console.log("reached hereee with ", genre_id)
    const [books, setBooks] = useState<Book[]>([]);
    const authStore = useAuthStore();
    const bookStore = useBookStore()

    useEffect(() => {
        console.log("Request")
        axiosInstance.get<Book[]>(`/books/genre/${genre_id}/`, {
            headers: {
                'Authorization': `${token}`
            }
        })
            .then(response => {
                const books_data = response.data;
                setBooks(books_data);
                bookStore.setBooks(books_data)
                console.log("RESPONSE",response);
            })
            .catch(error => {
                console.error("Error fetching borrow requests:", error);
            });
    }, [token, genre_id]); 

    return (
        <div className="flex flex-col w-100 align-middle justify-center gap-4">
            {bookStore.searchedBooks.length === 0 ? (
                bookStore.books.map((book, index) => (
                    <BookCard
                        key={index}
                        bookName={book.title}
                        bookDescription={book.description}
                        price={book.price}
                        lenderName={book.lender_id.first_name}
                        lender_profile_pic={book.lender_id.picture}
                        image={book.image}
                        book_id={book.id}
                    />
                ))
            ) : (
                bookStore.searchedBooks.map((book,index)=>(
                    <BookCard
                    key={index}
                    bookName={book.title}
                    bookDescription={book.description}
                    price={book.price}
                    lenderName={book.lender_id.first_name}
                    lender_profile_pic={book.lender_id.picture}
                    image={book.image}
                    book_id={book.id}
                    />
                ))
            )}
        </div>
    );
}
