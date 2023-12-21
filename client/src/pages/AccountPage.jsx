import { useContext } from "react"
import { UserContext } from "../UserContext"
import { Link, Navigate, useParams } from "react-router-dom";

export default function AccountPage() {
    const { ready, user } = useContext(UserContext);

    if (!ready) {
        return 'Loading...';
    }

    if (ready && !user) {
        return <Navigate to={'/login'} />
    }

    const { subpage } = useParams();

    function linkClasses() {
        return 'p-2 px-6';
    }

    return (
        <div>
            <nav className="w-full flex justify-center mt-8 gap-4">
                <Link className="p-2 px-6 bg-primary text-white rounded-full" to={'/account'}>My profile</Link>
                <Link className="p-2 px-6" to={'/account/bookings'}>My Bookings</Link>
                <Link className="p-2 px-6" to={'/account/places'}>My Accommodations</Link>
            </nav>
        </div>
    )
}