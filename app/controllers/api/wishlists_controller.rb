class Api::WishlistsController < ApplicationController
  # wrap_parameters include: Wishlist.attribute_names + ['userId']
  before_action :require_logged_in

  def index
    @wishlists = User.find(params[:user_id]).wishlists
    render :index
  end

  def show
    @wishlist = Wishlist.find(params[:id])
    render :show
  end

  def create
    @wishlist = Wishlist.new(wishlist_params)

    if @wishlist.save
      render :show
    else
      render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @wishlist = Wishlist.find(params[:id])

    if current_user.id == @wishlist.user_id
      @wishlist.update(wishlist_params)
      render :show
    else
      render json: { errors: @wishlist.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @wishlist = Wishlist.find(params[:id])

    if current_user.id == @wishlist.user_id
      @wishlist.destroy
      render json: { message: 'successfully deleted' }
    else
      render json: { message: 'unable to delete review' }
    end
  end

  private

  def wishlist_params
    params.require(:wishlist).permit(:name, :user_id)
  end
end
