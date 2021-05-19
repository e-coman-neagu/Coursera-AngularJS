(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

  toBuy.buyItem = function (itemIndex,itemName,quantity) {
    ShoppingListCheckOffService.buyItem(itemIndex,itemName,quantity);
  }
  
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBought = this;
  alreadyBought.boughtItems= ShoppingListCheckOffService.getBoughtItems();

}

function ShoppingListCheckOffService() {
  var service = this;

  // List of to buy items
  var toBuyItems = [
                    { name: "cookies", quantity: 10 }, 
                    { name: "chips", quantity: 2 },
                    { name: "sodas", quantity: 3 },
                    { name: "cakes", quantity: 3 },
                    { name: "pizzas", quantity: 4 },
                    { name: "puddings", quantity: 5 },
                    { name: "waters", quantity: 6 }
                  ];

  // List of bought items
  var boughtItems = [];

  var addItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    boughtItems.push(item);
  };

  var removeItem = function (itemIndex) {
    toBuyItems.splice(itemIndex, 1);
  };

  service.buyItem = function(itemIndex,itemName,quatity) {
    removeItem(itemIndex);
    addItem(itemName,quatity);
  }

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}

})();
