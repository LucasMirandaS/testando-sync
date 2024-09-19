import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function App() {
  return (
    <div className='h-[100dvh] w-[100dvw] flex flex-col justify-center items-center'>
      <Button asChild className="w-fit">
        <Link href={'/datagrid'}>
          Datagrid
        </Link>
      </Button>
    </div>
  )
}
