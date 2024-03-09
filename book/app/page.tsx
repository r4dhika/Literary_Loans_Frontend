import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function Home() {

  return (
    <main className=" flex flex-col items-center justify-center w-100 h-100">
      <Button><Link href="/dashboard">Sign in</Link></Button>
    </main>
  );
}
