json.follow do
  json.extract! @follow, :id, :follower_id, :followee_id, :created_at, :updated_at
end