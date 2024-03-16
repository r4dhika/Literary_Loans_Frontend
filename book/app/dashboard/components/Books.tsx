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

interface Book {
    id: number;
    book_id: number;
    title: string;
    description: string;
    status: number;
    price: number;
    penalty: string;
    quantity: number;
    available: boolean;
    book_rating: string;
    total_book_rating: number;
    condition_rating: string;
    total_condition_rating: number;
    image: string;
    lender_id: number;
    borrower_id: number | null;
    author_id: number;
}

interface Props {
    token: string;
}


export default function BooksCard({ token }: Props) {
    const [books, setBooks] = useState<Book[]>([]);
    const authStore = useAuthStore();

    useEffect(() => {
        axiosInstance.get<Book[]>(`/books/`, {
            headers: {
                'Authorization': `${token}`
            }
        })
            .then(response => {
                const books_data = response.data;
                setBooks(books_data);
                console.log(response);
            })
            .catch(error => {
                console.error("Error fetching borrow requests:", error);
            });

        // Cleanup function to unsubscribe when the component unmounts
        return () => {
            // Cleanup code if needed
        };
    }, [token, authStore.user.token]); // Include current_user and token in the dependency array

    return (
        <div className="flex flex-col w-100 align-middle justify-center gap-4">
            {books.map((book, index) => (
                <BookCard key={index} bookName={book.title} bookDescription={book.description} price={book.price} lenderName={book.lender_id} lenderCity="Roorkee" image={book.image} />
            ))}
        </div>
    );
}
