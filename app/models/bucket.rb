require 'pry'

class Bucket < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :items
  accepts_nested_attributes_for :items,
    reject_if: proc { |attributes| attributes["name"].blank? },
    allow_destroy: true

  validates :name, presence: true, uniqueness: true
  validates :user_id, presence: true

  def items_attributes=(items_attributes)
    items_attributes.values.each do |item_attributes|
      item = Item.find_or_create_by(item_attributes)
      self.items << item unless item.name == ""
    end
  end

  def total_cost
    price_prime = 0
    days = 0
    items.each do |item|
      price_prime += item.price
      days += item.days_cost
    end
    "$#{price_prime} and #{days} days needed to kick this bucket."
  end

  def self.by_user(user_id)
    where(user_id: user_id)
  end
end
