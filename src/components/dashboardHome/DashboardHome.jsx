import Lottie from 'lottie-react';
import welcome from '../../assets/welcome.json'
import { use } from 'react';
import { FirebaseAuthContext } from '../../provider/FirebaseAuthContext';

const DashboardHome = () => {
    const { user } = use(FirebaseAuthContext)
    return (
        <div className="mb-6 flex justify-center items-center flex-col gap-2">
            <title>Dashboard | Traditional Recipe</title>
            <p>Hi, {user?.displayName}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-orange-600">Welcome to your Dashboard</h1>
            <p className="text-base-content/70 mt-1">Manage your recipes, wishlist, and profile all in one place.</p>
            <Lottie
                animationData={welcome}
                className="w-full h-[200px] md:h-[300px] rounded-2xl"
            >
            </Lottie>
        </div>
    );
};

export default DashboardHome;