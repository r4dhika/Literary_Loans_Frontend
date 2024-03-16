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

interface Borrowed {
    lender: number;
    borrower: number;
    book: number;
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

        // Cleanup function to unsubscribe when the component unmounts
        return () => {
            // Cleanup code if needed
        };
    }, [token, authStore.user.token]); // Include current_user and token in the dependency array

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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {borrowed.map((request, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{request.book}</TableCell>
                                <TableCell className="font-medium text-right">{request.quantity}</TableCell>
                                <TableCell className="text-right">{request.return_date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
