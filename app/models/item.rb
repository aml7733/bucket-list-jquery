class Item < ApplicationRecord
  has_and_belongs_to_many :buckets
  has_many :users, through: :buckets
  accepts_nested_attributes_for :buckets,
    reject_if: proc { |attributes| attributes["name"].blank? },
    allow_destroy: true

  validates :name, presence: true
  validates :price, :days_cost, numericality: { greater_than_or_equal_to: 0, allow_nil: true }

  # def bucket_ids=(array)
  #   array.reject { |val| val.empty? }
  #   array.each { |bucket_id| self.buckets << Bucket.find(bucket_id) }
  # end

  def self.free_items
    where(price: 0)
  end
end
