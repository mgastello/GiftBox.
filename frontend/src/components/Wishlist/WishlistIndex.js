import { useDispatch } from "react-redux";
import { deleteWishlist } from "../../store/wishlist";
import { Link } from "react-router-dom";

export default function WishlistIndex({ wishlist }) {
    const dispatch = useDispatch();

    const deleteList = (e) => {
        e.preventDefault()
        dispatch(deleteWishlist(wishlist.id))
    }

    return (
        <div className="m-auto w-3/4 mb-10 bg-indigo-200 rounded-md shadow-xl">
            <Link to={`/wishlists/${wishlist.id}`}>
                <div className="flex text-lg justify-between px-10 py-6">
                    <h1 className="w-1/3">{wishlist.name}</h1>
                    <h1 className="w-1/3 text-center">Total Items: {wishlist.wishlistItems.length}</h1>
                    <button onClick={deleteList} className="w-1/3 text-end">&times;</button>
                </div>
            </Link>
        </div>
    )
}