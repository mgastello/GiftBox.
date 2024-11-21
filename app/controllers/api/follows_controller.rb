class Api::FollowsController < ApplicationController
  before_action :require_logged_in, only: [:create, :destroy]

  def index
    user = User.find(params[:user_id])
    @followers = user.follower_relationships
    @followees = user.followee_relationships
    render :index
  end
  
  def create
    @follow = Follow.new(follow_params)
    if @follow.save
      render :show
    else
      render json: { errors: @follow.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @follow = current_user.follower_relationships.find_by(followee_id: params[:id])
    @follow.destroy
  end

  private

  def follow_params
    params.require(:follow).permit(:follower_id, :followee_id)
  end
end
