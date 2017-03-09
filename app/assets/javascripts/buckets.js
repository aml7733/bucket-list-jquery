class Bucket {
  constructor(name, description = false, items = []) {
    this.name = name
    this.description = description;
    this.items = items;
  }

  total_cost() {
    var moneyCost = 0;
    var timeCost = 0;
    this.items.forEach((item) => {
      var pr = parseFloat(item.price);
      var dc = parseInt(item.days_cost);
      moneyCost += pr;
      timeCost += dc;
    });
    return `$${moneyCost.toFixed(2)} and ${timeCost} days needed to kick this bucket.`
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

  $("button#buckets").on("click", function(event) {
    var userId = event.target.dataset["id"]
    $.getJSON(`${userId}/buckets.json`, function(data) {
      renderBuckets(data);
    });
  });

  $('form').submit(function(event) {
    event.preventDefault();
    var values = $(this).serialize();
    var posting = $.post()
  });

}

function renderBuckets(response) {
  response.buckets.forEach((jsonBucket) => {
    var items = [];
    jsonBucket.items.forEach((item) => {
      var itm = new Item(item.name, item.description, item.price, item.days_cost)
      items.push(itm);
    });
    var bucket = new Bucket(jsonBucket.name, jsonBucket.description, items)

    $("#bucketList").append(makeHtmlString(bucket));
  });
}

function makeHtmlString(bucket) {
  var bucketInfo = `<h3>${bucket.name}</h3><p>${bucket.description}</p>`
  var itemsInfo = "<ul>"
  bucket.items.forEach((item) => {
    itemsInfo += `<li>${item.name}: $${item.price}, ${item.days_cost} days</li>`
  });
  itemsInfo += "</ul><br>";
  var kickString = "<p>" + bucket.total_cost() + "</p>";

  return bucketInfo + itemsInfo + kickString;
}



$(document).ready(attachListeners)
