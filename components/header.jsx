import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { Button } from "./ui/button"
import Image from "next/image"
import Link from "next/link"
import { LayoutDashboard, PenBox } from "lucide-react"
import { checkUser } from "@/lib/checkUser"

const Header = async() => {
    
    await checkUser();
    return (
        <div
            className="transition-transform duration-300 ease-in-out w-full bg-white/80 backdrop-blur-md z-50 border-b translate-y-0 fixed top-0"
        >

            <nav className="h-25 object-contain container mx-auto px-4 py-2 flex items-center justify-between">
                <Link href="/" className="h-24">
                    <Image src={"/Logo.png"}
                        alt="Your Net Worth Logo"
                        height={60}
                        width={200}
                        className="h-full w-auto object-contain" />
                </Link>
                <div className="flex  items-center space-x-4">
                    <SignedIn>
                        <Link href={"/dashboard"} className=" flex items-center gap-2">
                            <Button className={"btn-gold-outline hover:text-white"} variant={"outline"}>
                                <LayoutDashboard size={18} />
                                <span className="hidden md:inline">Dashboard</span>
                            </Button>
                        </Link>

                        <Link href={"/transaction/create"} className={"flex items-center gap-2"}>
                            <Button className={"btn-gold"}>
                                <PenBox size={18} />
                                <span className="hidden md:inline">Add Transaction</span>
                            </Button>
                        </Link>

                    </SignedIn>
                    <SignedOut>
                        <SignInButton forceRedirectUrl="/dashboard">
                            <Button className={"btn-gold-outline hover:text-white"} variant={"outline"}>
                                Login
                            </Button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton appearance={{
                            elements: {
                                avatarBox: "h-10 w-10",
                            },
                        }} />
                    </SignedIn>

                </div>
            </nav>
        </div >
    )
}

export default Header