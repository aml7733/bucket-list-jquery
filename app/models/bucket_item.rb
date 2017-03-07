class BucketItem < ApplicationRecord
  belongs_to :bucket
  belongs_to :item

  validates_uniqueness_of :item_id, scope: :bucket_id
end
