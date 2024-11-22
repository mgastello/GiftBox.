import present from '../../images/present.png'

export default function WishlistIndex({ wishlistItem }) {

    return (
        <div className="m-auto w-3/4 mb-10 bg-indigo-200 rounded-md shadow-xl">
            <div className="flex text-lg justify-between px-10 py-6 items-center">
                <div className='w-1/3 flex items-center gap-4'>
                    {wishlistItem.imageUrl ? <img src={wishlistItem.imageUrl} alt={wishlistItem.title} className="w-1/4" /> : <img src={present} alt={wishlistItem.title} className="w-1/4" />}
                    <h1 className='w-3/4'>{wishlistItem.title}</h1>
                </div>
                {wishlistItem.productUrl ? <a href={wishlistItem.productUrl} className="w-1/3 max-w-fit text-center">Link to product</a> : null}
                <h1 className="w-1/3 text-center">Status: {wishlistItem.status}</h1>
            </div>
        </div>
    )
}