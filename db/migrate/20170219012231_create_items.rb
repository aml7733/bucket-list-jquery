class CreateItems < ActiveRecord::Migration[5.0]
  def change
    create_table :items do |t|
      t.string :name
      t.text :description
      t.decimal :price, default: 0
      t.integer :days_cost, default: 0

      t.timestamps
    end
  end
end
