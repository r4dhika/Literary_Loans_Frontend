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
import { useToast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react";
import { BorrowRequestCard } from "./RightComponents";

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
    title: string;
    description: string;
    status: string;
    price: string;
    penalty: string;
    quantity: number;
    author: string;
    available: boolean;
    book_rating: string;
    total_book_rating: number;
    condition_rating: string;
    total_condition_rating: number;
    image: string;
    lender_id: number;
    borrower_id: number | null;
}

interface Requested {
    lender: User;
    borrower: User;
    book: Book;
    status: string;
    quantity: number;
    request_date: string;
    return_date: string;
}

interface Props {
    token: string;
}

export default function BorrowRequests({ token }: Props) {
    const { toast } = useToast()
    const [requested, setRequested] = useState<Requested[]>([]);
    const authStore = useAuthStore();

    useEffect(() => {
        axiosInstance.get<Requested[]>(`/borrowRequestStatus/`, {
            headers: {
                'Authorization': `${token}`
            }
        })
            .then(response => {
                const lendedData: Requested[] = response.data.map(item => ({
                    lender: item.lender,
                    borrower: item.borrower,
                    book: item.book,
                    status: item.status,
                    quantity: item.quantity,
                    request_date: item.request_date,
                    return_date: item.return_date
                }));
                const sortedData: Requested[] = response.data.sort((a, b) => {
                    return new Date(a.request_date).getTime() - new Date(b.request_date).getTime();
                });
                const reversedData: Requested[] = sortedData.reverse();
                setRequested(sortedData);
                console.log(response);
            })
            .catch(error => {
                console.error("Error fetching borrow requests:", error);
            });

        // Cleanup function to unsubscribe when the component unmounts
        return () => {
            //Cleanup code
        };
    }, [token, authStore.user.token]); // Include current_user and token in the dependency array

    return (
        // <Card className="dark ">
        //     <CardHeader>
        //         <CardTitle>Borrow Requests</CardTitle>
        //     </CardHeader>
        //     <CardContent>
        //         <div className="flex flex-col w-100 gap-4">
        //             {reqeusted.map((request, index) => (
        //                 <BorrowRequestCard bookName={request.book.title} bookDescription={request.book.description} price={request.book.price} borrower_name={request.borrower.username} borrower_city={request.borrower.city} date={request.return_date} />
        //             ))}
        //         </div>
        //     </CardContent>
        // </Card>
        <Card className="dark ">
            <CardHeader>
                <CardTitle>Requested Books</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[250px]">Book</TableHead>
                            <TableHead className="text-right">Request Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {requested.map((request, index) => (
                            <TableRow>
                                <TableCell className="font-medium">{request.book.title}</TableCell>
                                <TableCell className="text-right">{request.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
