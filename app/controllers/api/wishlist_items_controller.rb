class Api::WishlistItemsController < ApplicationController
  # wrap_parameters include: WishlistItem.attribute_names + ['wishlistId']

  def index
    @wishlist_items = User.find(params[:user_id]).wishlists.find(params[:wishlist_id]).wishlist_items
    render :index
  end

  def show
    @wishlist_item = WishlistItem.find(params[:id])
    render :show
  end

  def create
    if params[:wishlist_item][:product_url].present?
      # Fetch product details from URL
      @wishlist_item = WishlistItem.fetch_product_details(params[:wishlist_item][:product_url])
      # Set the wishlist_id from params
      @wishlist_item.wishlist_id = params[:wishlist_item][:wishlist_id]
      
      if @wishlist_item.save
        render :show
      else
        render json: { errors: @wishlist_item.errors.full_messages }, status: :unprocessable_entity
      end
    else
      # Fallback to manual creation if no product URL is provided
      @wishlist_item = WishlistItem.new(wishlist_item_params)
      
      if @wishlist_item.save
        render :show
      else
        render json: { errors: @wishlist_item.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

  def update
    @wishlist_item = WishlistItem.find(params[:id])

    if current_user.id == @wishlist_item.wishlist.user_id
      @wishlist_item.update(wishlist_item_params)
      render :show
    else
      render json: { errors: @wishlist_item.errors.full_messages }, status: :unauthorized
    end
  end

  def destroy
    @wishlist_item = WishlistItem.find(params[:id])

    if current_user.id == @wishlist_item.wishlist.user_id
      @wishlist_item.destroy
      render json: { message: 'successfully deleted' }
    else
      render json: { errors: @wishlist_item.errors.full_messages }, status: :unauthorized
    end
  end

  private

  def wishlist_item_params
    params.require(:wishlist_item).permit(:description, :image_url, :product_url, :title, :status, :wishlist_id)
  end
end
