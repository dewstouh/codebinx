import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

export default function layout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <div className="min-h-screen bg-white font-inter">
            <Navbar />
            {children}
            <Footer />
        </div>
    );  
}
