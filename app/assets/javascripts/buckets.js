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

  $(".js-next").on("click", function(e) {
    e.preventDefault();
    debugger
    var currentIndex = parseInt($(".js-next").data("currentindex"));
    var nextIndex;
    var userBucketIds = $(".js-next").data("currentuserbucketids");
    if (currentIndex >= userBucketIds.length - 1) {
      alert("That was the last bucket. Click 'My Buckets' to see the index view. Here's the first one again:");
      $(".js-next").data("currentindex", 0);
      nextIndex = 0;
    } else {
      nextIndex = currentIndex + 1
    }
    $(".js-next").data("currentindex", nextIndex);
    var nextBucketId = userBucketIds[nextIndex];
    debugger
    var url = nextBucketId + ".json"
    $.get(url, function(data) {
      var bucket = renderBucket(data.bucket);
      showBucket(bucket);
    })
  });

  // $('form').submit(function(event) {
  //   event.preventDefault();
  //   var values = $(this).serialize();
  //   var posting = $.post()
  // });

}

function renderBuckets(response) {
  response.buckets.forEach((jsonBucket) => {
    var bucket = renderBucket(jsonBucket);
    $("#bucketList").append(makeHtmlString(bucket));
  });
}

function renderBucket(bucket) {
  var items = [];
  bucket.items.forEach((item) => {
    var itm = new Item(item.name, item.description, item.price, item.days_cost)
    items.push(itm);
  });
  var newBucket = new Bucket(bucket.name, bucket.description, items)
  return newBucket;
}

function showBucket(bucket) {
  $("#bucketName").text(bucket.name);
  $("#bucketDescription").text(bucket.description);
  $("#bucketTotalCost").text(bucket.total_cost());
  $("#bucketItems").text("");
  bucket.items.forEach((item) => {
    var string = `<li>${item.name} - $${item.price} and ${item.days_cost} days</li>`
    $("#bucketItems").append(string)
  });
  //
  // var currentIndex = parseInt($(".js-next").data("currentindex")) + 1;
  // $(".js-next").data("currentindex", currentIndex);
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
