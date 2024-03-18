"use client"

import { useRouter,usePathname,useSearchParams,useParams } from 'next/navigation';
import axiosInstance from '@/axiosInstance';
import { useEffect } from 'react';
import Image from 'next/image';
import logo from '../../LIterary_Loans-removebg-preview.png';

const queryToObject = (query: string) => {
    const parameters = new URLSearchParams(query)
    return Object.fromEntries(parameters.entries())
  }
  
export default function Page(){
  const router = useRouter()
    const searchparams = useSearchParams();
    const code = searchparams.get('code')
    useEffect(() => {
        (async function getToken() {          
          try {
            console.log(code)
            const response = await axiosInstance.post(`/auth/google/token/`, { code:code });
            if (response.status === 200) {
              router.push('/');
            } else {
              alert('Login failed');
              router.push('/');
            }
          } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
            router.push('/');
          }
        })();
      }, [router]);

    return(
      <div className="mr-4">
        <Image src={logo} alt="Image" />
      </div>
    )
}