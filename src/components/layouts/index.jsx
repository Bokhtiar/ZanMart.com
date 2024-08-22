import { Navbar } from "./navbar"
import { Footer } from "./footer"

export const LayoutPageWrapper = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    )
}