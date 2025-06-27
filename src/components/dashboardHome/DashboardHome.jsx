import Lottie from 'lottie-react';
import welcome from '../../assets/welcome.json'
import { use } from 'react';
import { FirebaseAuthContext } from '../../provider/FirebaseAuthContext';
import { useLoaderData, useNavigate } from 'react-router';
import CountUp from 'react-countup';
import { FaRegHeart } from 'react-icons/fa';
import { MdOutlineFastfood } from 'react-icons/md';

const DashboardHome = () => {
    const { user } = use(FirebaseAuthContext)
    const data = useLoaderData()
    const navigate = useNavigate()
    const myRecipes = data?.filter(item => item?.userEmail === user?.email) || [];

    return (
        <div className="mb-6 flex justify-center items-center flex-col gap-2">
            <title>Dashboard | Traditional Recipe</title>
            <p>Hi, {user?.displayName}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-orange-600">Welcome to your Dashboard</h1>
            <p className="text-base-content/70 mt-1">Manage your recipes, Watch Statistics, wishlist, and profile all in one place.</p>
            <div className="md:stats bg-base-100 mt-4">
                <div className="stat">
                    <div className="stat-figure text-primary">
                        <FaRegHeart className='text-2xl text-base-content' />

                    </div>
                    <div className="stat-title">Total Likes</div>
                    <div className="stat-value">  <CountUp enableScrollSpy end={100} duration={30} />+</div>
                    <div className="stat-desc">21% more than last month</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <MdOutlineFastfood className='text-2xl text-orange-600' />
                    </div>
                    <div className="stat-title">Total Recipe</div>
                    <div className="stat-value text-orange-600">  <CountUp enableScrollSpy end={data?.length || 0} duration={10} />+</div>
                    <div className="stat-desc">Total Recipe in Website</div>
                </div>

                <div className="stat">
                    <div onClick={() => navigate('/dashboard/my-profile')} className="stat-figure text-secondary cursor-pointer">
                        <div className="avatar avatar-online">
                            <div className="w-16 rounded-full">
                                <img src={user?.photoURL} title={user?.displayName} />
                            </div>
                        </div>
                    </div>
                    <div className="stat-value"><CountUp enableScrollSpy end={myRecipes?.length || 0} duration={30} />+</div>
                    <div className="stat-title">My Recipe</div>
                    <div className="stat-desc text-orange-600">My Own Recipe</div>
                </div>
            </div>

            <Lottie
                animationData={welcome}
                className="w-full h-[250px] md:h-[350px] rounded-2xl"
            >
            </Lottie>
        </div>
    );
};

export default DashboardHome;