json.followers do
  @followers.each do |follower|
    json.set! follower.id do
      json.extract! follower, :id, :follower_id, :followee_id, :created_at, :updated_at
    end
  end
end

json.followees do
  @followees.each do |followee|
    json.set! followee.id do
      json.extract! followee, :id, :follower_id, :followee_id, :created_at, :updated_at
    end
  end
end