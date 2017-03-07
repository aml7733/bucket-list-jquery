require 'pry'

class ItemsController < ApplicationController
  before_action :find_item, only: [:show, :edit, :update, :destroy]

  def index
    @items = Item.all
  end

  def new
    @item = Item.new
  end

  def create
    @item = Item.new(item_params)
    if @item.save
      redirect_to item_path(@item), message: "Successfully created item."
    else
      render :new
    end
  end

  def show
  end

  def edit
  end

  def update
    @item.update(item_params)
    if @item.save
      redirect_to item_path(@item), message: "Successfully updated item."
    else
      render :edit
    end
  end

  def destroy
    @item.destroy
    redirect_to user_path(current_user)
  end

  private

  def item_params
    params.require(:item).permit(:name, :description, :price, :days_cost, bucket_ids:[])
  end

  def find_item
    @item = Item.find_by(id: params[:id])
  end
end
