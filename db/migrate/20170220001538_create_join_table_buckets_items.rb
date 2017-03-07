class CreateJoinTableBucketsItems < ActiveRecord::Migration[5.0]
  def change
    create_join_table :buckets, :items do |t|
      # t.index [:bucket_id, :item_id]
      # t.index [:item_id, :bucket_id]
    end
  end
end
