import CustomButton from '../CustomButton/CustomButton'
import { useSelector } from 'react-redux';
import { loggedInRedirect } from '../../utils/loggedInRedirect';

const Landing = () => {
    const sessionUser = useSelector(state => state.session.user) 

    return (
        <div>
            <div className='bg-indigo-400 h-[70vh] flex flex-col items-center text-white text-center px-7'>
                <h1 className='py-20 text-4xl'>The joy of easy gift giving</h1>
                <h3 className="text-2xl">Add items to your wishlists and share with friends!</h3>
                <div className='flex-grow' />
                <div className='mb-8'>
                    <CustomButton redirect={loggedInRedirect('wishlists', sessionUser)}>Get Started</CustomButton>
                </div>
            </div>
            <div className='bg-indigo-200 h-[70vh] flex flex-col items-center text-white text-center px-7'>
                <h1 className='py-20 text-4xl'>Perfect for any special occasion!</h1>
                <div className='flex min-w-[75%] text-2xl'>
                    <div className='w-1/3'>
                        <h1>Holiday Wishlist</h1>
                    </div>
                    <div className='w-1/3'>
                        <h1>Wedding Registry</h1>
                    </div>
                    <div className='w-1/3'>
                        <h1>Birthday List</h1>
                    </div>
                </div>
                <div className='flex-grow' />
                <div className='mb-8'>
                    <CustomButton redirect={loggedInRedirect('wishlists', sessionUser)}>Create a wishlist now!</CustomButton>
                </div>
            </div>
        </div>
    )
}

export default Landing;