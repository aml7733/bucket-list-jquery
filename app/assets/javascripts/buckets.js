class Bucket {
  constructor(name, description = false, items = []) {
    this.name = name
    this.description = description;
    this.items = items;
  }

  total_cost {
    var moneyCost = 0;
    var timeCost = 0;
    this.items.forEach((item) => {
      moneyCost += item.price;
      timeCost += item.days_cost;
    });
    return `$${moneyCost} and ${timeCost} days needed to kick this bucket.`
  }
}

class Item {
  constructor(name, description = false, price = 0, days_cost = 0) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.days_cost = days_cost;
  }
}

function attachListeners() {

  $("#buckets").on("click", getBuckets);

  $("#newBucket").on("click", createBucket);

}

$(document).ready(attachListeners)
