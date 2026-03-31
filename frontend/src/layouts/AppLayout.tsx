import { Outlet } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"

export const AppLayout = () => {
    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ display: 'flex', flexGrow: 1 }}>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}