import csrfFetch from "./csrf";

export const RECEIVE_WISHLIST_ITEMS = 'wishlist_items/RECEIVE_WISHLIST_ITEMS'
export const RECEIVE_WISHLIST_ITEM = 'wishlist_items/RECEIVE_WISHLIST_ITEM'
export const REMOVE_WISHLIST_ITEM = 'wishlist_items/REMOVE_WISHLIST_ITEM'

export const receiveWishlistItems = (wishlistItems) => ({
    type: RECEIVE_WISHLIST_ITEMS,
    wishlistItems
})

export const receiveWishlistItem = (wishlistItem) => ({
    type: RECEIVE_WISHLIST_ITEM,
    wishlistItem
})

export const removeWishlistItem = (wishlistItemId) => ({
    type: REMOVE_WISHLIST_ITEM,
    wishlistItemId
})

export const fetchWishlistItems = (userId, wishlistId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/wishlists/${wishlistId}/wishlist_items`)
    const data = await res.json()
    return dispatch(receiveWishlistItems(data.wishlistItems))
}

export const fetchWishlistItem = (userId, wishlistId, wishlistItemId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/wishlists/${wishlistId}/wishlist_items/${wishlistItemId}`)
    const data = await res.json()
    return dispatch(receiveWishlistItem(data))
}

export const createWishlistItem = (wishlistItem) => async dispatch => {
    const res = await csrfFetch('/api/wishlist_items', {
        method: 'POST',
        body: JSON.stringify(wishlistItem),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    return dispatch(receiveWishlistItem(data.wishlistItem));
}

export const deleteWishlistItem = (wishlistItemId) => async dispatch => {
    await csrfFetch(`/api/wishlist_items/${wishlistItemId}`, {
        method: 'DELETE'
    });
    return dispatch(removeWishlistItem(wishlistItemId));
}

export default function wishlistItemsReducer(state = {}, action) {
    switch (action.type) {
        case RECEIVE_WISHLIST_ITEMS:
            state = {};
            return { ...state, ...action.wishlistItems };
        case REMOVE_WISHLIST_ITEM:
            const newState = { ...state };
            delete newState[action.wishlistItemId];
            return newState;
        default:
            return state;
    }
}