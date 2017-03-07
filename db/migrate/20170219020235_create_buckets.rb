class CreateBuckets < ActiveRecord::Migration[5.0]
  def change
    create_table :buckets do |t|
      t.string :name
      t.integer :user_id
      t.text :description

      t.timestamps
    end
  end
end
