(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    template: '<ol><li ng-repeat="item in found">{{ item.name }} - {{ item.short_name }} - {{ item.description }}<button ng-click="onRemove({itemIndex: $itemIndex});">"Don\'t want this one"</button></li></ol>',
    scope: {
      found: '<',
      onRemove: '&'
    }
  };

  return ddo;
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;
  var foundItems =[];

  service.getMatchedMenuItems = function(searchTerm) {
    return $http({
      method: "GET",
      url: "https://davids-restaurant.herokuapp.com/menu_items.json"
    }).then(function (result) {
      foundItems =[];
      for (var i=0; i< result.data.menu_items.length; i++) {
        var r = result.data.menu_items[i];
        if (r.description.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1) {
          foundItems.push(r);
        }
      }
    return foundItems;
    });
  };

  service.removeItem = function(itemIndex) {
    foundItems.splice(itemIndex, 1);
  };
}
})();


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrow = this;
  narrow.found = [];
  narrow.searchResult = "";

  narrow.getMatchedMenuItems = function() {
    if (narrow.searchTerm == undefined || narrow.searchTerm.length == 0) {
      narrow.searchResult = "Nothing found!";
    } else {
      MenuSearchService.getMatchedMenuItems(narrow.searchTerm)
        .then(function(result) {
          narrow.found = result;
          if (narrow.found.length == 0) {
            narrow.searchResult = "Nothing found!";
          } else {
            narrow.searchResult = "";
          }
        });
      }
    }

  narrow.removeItem = function(itemIndex) {
    MenuSearchService.removeItem(itemIndex);
  };
}