import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchWishlistItems } from "../../store/wishlistItem"
import { fetchWishlist } from "../../store/wishlist"
import WishlistItemsIndexItem from "./WishlistItemsIndexItem"

const WishlistItemsIndex = () => {
    const sessionUser = useSelector(state => state?.session.user)
    const { userId } = useParams()
    const { wishlistId } = useParams()
    const wishlistItems = useSelector(state => Object.values(state?.wishlistItems))
    const wishlist = useSelector(state => state?.wishlists[wishlistId])
    const dispatch = useDispatch()

    useEffect(() => {
        const targetUserId = userId || sessionUser.id
        // dispatch(clearWishlistItems())
        dispatch(fetchWishlist(targetUserId, wishlistId))
        dispatch(fetchWishlistItems(targetUserId, wishlistId))
    }, [dispatch, userId, sessionUser.id, wishlistId])

    if (wishlist) {
        return (
            <div>
                <div className='bg-indigo-400 h-[100vh] text-white'>
                    <h1 className='flex justify-center pt-20 pb-10 text-4xl'>{wishlist.name}</h1>
                    <div>{wishlistItems.map((wishlistItem) => {
                        return <WishlistItemsIndexItem key={wishlistItem.id} wishlistItem={wishlistItem} />
                    })}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <h1>Loading...</h1>
        )
    }
}

export default WishlistItemsIndex

