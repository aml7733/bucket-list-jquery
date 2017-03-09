class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :price, :days_cost
end
