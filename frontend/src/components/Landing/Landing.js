import CustomButton from '../CustomButton/CustomButton'

const Landing = () => {
    return (
        <div>
            <div className='bg-indigo-400 h-[70vh] flex flex-col items-center text-white text-center px-7'>
                <h1 className='py-20 text-4xl'>The joy of easy gift giving</h1>
                <h3 className="text-2xl">Add items to your wishlists and share with friends!</h3>
                <div className='flex-grow' />
                <div className='mb-8'>
                    <CustomButton redirect={'/login'}>Get Started</CustomButton>
                </div>
            </div>
            <div className='bg-indigo-200 h-[70vh] flex flex-col items-center text-white text-center px-7'>
                <h1 className='py-20 text-4xl'>Perfect for any special occasion!</h1>
                <div className='flex'>
                    <div className='w-96'>
                        <h1 className='text-2xl'>Holiday Wishlist</h1>
                    </div>
                    <div className='w-96'>
                        <h1 className='text-2xl'>Wedding Registry</h1>
                    </div>
                    <div className='w-96'>
                        <h1 className='text-2xl'>Birthday List</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing;