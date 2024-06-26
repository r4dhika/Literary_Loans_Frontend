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
import { Button } from "@/components/ui/button";

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

interface Borrowed {
    id: number
    lender: number;
    borrower: number;
    book: Book;
    quantity: number;
    rent_date: Date;
    return_date: string;
}

interface YourComponentProps {
    token: string;
}

export default function BorrowedBooks({ token }: YourComponentProps) {
    const [borrowed, setBorrowed] = useState<Borrowed[]>([]);
    const authStore = useAuthStore();

    useEffect(() => {
        axiosInstance.get<Borrowed[]>(`/borrowedbooks/`, {
            headers: {
                'Authorization': `${token}`
            }
        })
            .then(response => {
                const borrowedData = response.data;
                setBorrowed(borrowedData);
                console.log(response);
            })
            .catch(error => {
                console.error("Error fetching borrow requests:", error);
            });

    }, [token, authStore.user.token]);

    const handleReturn = (request_id: any) => {

        const bookDetails = {
            rented_id: Number(request_id)
        };

        axiosInstance.post("/create_return_request/", { bookDetails }, {
            headers: {
                'Authorization': authStore.user.token
            }
        })
            .then((response: any) => {
                console.log(response)
                if (response.status === 201) {
                    alert('success');
                    window.location.reload();
                } else {
                    alert('Failed to accept request');
                }
            })
            .catch(() => {
                alert("Failed to accept request");
            });
    };

    return (
        <Card className="dark">
            <CardHeader>
                <CardTitle>Borrowed Books</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>A list of your borrowed books.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">Book</TableHead>
                            <TableHead className="text-right">Quantity</TableHead>
                            <TableHead className="text-right w-[150px]">Return Date</TableHead>
                            <TableHead className="text-right w-[150px]">Return</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {borrowed.map((request, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{request.book.title}</TableCell>
                                <TableCell className="font-medium text-right">{request.quantity}</TableCell>
                                <TableCell className="text-right">{request.return_date}</TableCell>
                                <TableCell className="text-right">
                                    <Button onClick={() => handleReturn(request.id)}>Return Book</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
