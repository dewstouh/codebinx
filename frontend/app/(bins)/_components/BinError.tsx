import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function BinError({ message }: { message: string }) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-red-500" viewBox="0 0 24 24" fill="none"><path d="M12 2v20M2 12h20" /></svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Bin Not Found</h2>
                <p className="text-gray-600 mb-8 max-w-md">{message}</p>
                <Link href="/">
                    <Button className="bg-black hover:bg-gray-800 text-white rounded-xl px-6">Go Home</Button>
                </Link>
            </div>
        </div>
    )
}
