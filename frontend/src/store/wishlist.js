import csrfFetch from "./csrf";

export const RECEIVE_WISHLISTS = "wishlists/RECEIVE_WISHLISTS";
export const RECEIVE_WISHLIST = "wishlists/RECEIVE_WISHLIST";
export const REMOVE_WISHLIST = "wishlists/REMOVE_WISHLIST";

export const receiveWishlists = (wishlists) => ({
    type: RECEIVE_WISHLISTS,
    wishlists
})

export const receiveWishlist = (wishlist) => ({
    type: RECEIVE_WISHLIST,
    wishlist
})

export const removeWishlist = (wishlistId) => ({
    type: REMOVE_WISHLIST,
    wishlistId
})

export const fetchWishlists = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/wishlists`);
    const data = await res.json();
    return dispatch(receiveWishlists(data));
}

export const fetchWishlist = (userId, wishlistId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/wishlists/${wishlistId}`);
    const data = await res.json();
    return dispatch(receiveWishlist(data.wishlist));
}

export const createWishlist = (wishlist) => async dispatch => {
    const res = await csrfFetch('/api/wishlists', {
        method: 'POST',
        body: JSON.stringify(wishlist),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    return dispatch(receiveWishlist(data.wishlist));
}

export const updateWishlist = (wishlist) => async dispatch => {
    const res = await csrfFetch(`/api/wishlists/${wishlist.id}`, {
        method: 'PATCH',
        body: JSON.stringify(wishlist),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    return dispatch(receiveWishlist(data.wishlist));
}

export const deleteWishlist = (wishlistId) => async dispatch => {
    await csrfFetch(`/api/wishlists/${wishlistId}`, {
        method: 'DELETE'
    });
    return dispatch(removeWishlist(wishlistId));
}

export default function wishlistsReducer(state = {}, action) {
    switch (action.type) {
        case RECEIVE_WISHLISTS:
            return { ...state, ...action.wishlists };
        case RECEIVE_WISHLIST:
            return { ...state, [action.wishlist.id]: action.wishlist };
        case REMOVE_WISHLIST:
            const newState = { ...state };
            delete newState[action.wishlistId];
            return newState;
        default:
            return state;
    }
}