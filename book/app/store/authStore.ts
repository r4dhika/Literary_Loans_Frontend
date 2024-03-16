import { create } from 'zustand'
import { persist } from "zustand/middleware"

interface User {
    isAuthenticated:boolean
    userId: number
    emailAdd: string
    picture: string
    firstName: string
    lastName: string
    token: string
}

interface authStore {
    user: User
    setUser: (to: User) => void
}

const useAuthStore = create<authStore>()(
persist(
    (set) => ({
        user: {
            isAuthenticated:false,
            userId: 0,
            emailAdd: '',
            picture: '',
            firstName: '',
            lastName: '',
            token: '',
        },
        setUser: (to: User) => set({ user: to })
    }),
    {
        name:"auth"
    }
    )
)

export default useAuthStore
