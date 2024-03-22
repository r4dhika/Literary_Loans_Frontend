import { create } from "zustand";

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

interface BookStore {
    books: Book[];
    setBooks: (to: Book[]) => void;
    searchedBooks:Book[],
    setSearchedBooks:(to:Book[])=>void
}

const useBookStore = create<BookStore>((set) => ({
    books: [],
    setBooks: (to: Book[]) => set({ books: to }),
    searchedBooks:[],
    setSearchedBooks:(to:Book[])=>set({searchedBooks:to})
}));

export default useBookStore;
