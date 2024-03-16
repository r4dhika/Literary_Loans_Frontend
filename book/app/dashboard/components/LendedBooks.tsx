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

interface Lended {
    lender: number;
    borrower: number;
    book: number;
    quantity: number;
    rent_date: Date;
    return_date: string;
}

interface Props {
    token: string;
}

export default function LendedBooks({ token }: Props) {
    const [lended, setLended] = useState<Lended[]>([]);
    const authStore = useAuthStore();

    useEffect(() => {
        axiosInstance.get<Lended[]>(`/lendedbooks/`, {
            headers: {
                'Authorization': `${token}`
            }
        })
        .then(response => {
            const lendedData = response.data;
            setLended(lendedData);
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
                <CardTitle>Lended Books</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>A list of your lended books.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">Book</TableHead>
                            <TableHead className="text-right">Quantity</TableHead>
                            <TableHead className="text-right w-[150px]">Return Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {lended.map((request, index) => (
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