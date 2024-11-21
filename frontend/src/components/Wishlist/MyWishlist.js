import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchWishlists } from '../../store/wishlist';
import WishlistIndex from './WishlistIndex';

const MyWishlist = () => {
    const { userId } = useParams();
    const sessionUser = useSelector(state => state.session.user)
    const wishlists = useSelector(state => Object.values(state.wishlists))
    const dispatch = useDispatch()

    useEffect(() => {
        const targetUserId = userId || sessionUser.id
        dispatch(fetchWishlists(targetUserId))
    }, [dispatch, userId, sessionUser.id])

    return (
        <div>
            <div className='bg-indigo-400 h-[100vh] text-white'>
                <h1 className='flex justify-center pt-20 pb-10 text-4xl'>{userId === sessionUser.id || !userId ? 'Your Wishlists' : 'User\'s Wishlists'}</h1>
                <div>{wishlists.map((wishlist) => {
                    return <WishlistIndex key={wishlist.id} wishlist={wishlist} />
                })}
                </div>
            </div>
        </div>
    )
}

export default MyWishlist