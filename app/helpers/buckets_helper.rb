module BucketsHelper
  def current_user_bucket_ids
    bucket_arr = []
    current_user.buckets.each { |bucket| bucket_arr << bucket.id }
    bucket_arr
  end
end
