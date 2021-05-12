(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.items = "";
  var nrOfItems = 0;
  $scope.IsDisplay = false;

  $scope.calculateNumberOfItems = function (clicked) {
    $scope.IsDisplay = clicked == true ? false : true;
    var nr = 0;
    var foods = $scope.items.split(',');
    for (var i=0; i<foods.length; i++) {
      var elem = foods[i].trim();
      if (elem.length !== 0) {
        nr++;
      }
    }
    nrOfItems = nr;
  };

  $scope.showMessage = function () {
    if (nrOfItems == 0) {
      return "Please enter data first!";
    } else if (nrOfItems <= 3) {
      return "Enjoy!";
    } else if (nrOfItems > 3) {
      return "Too mutch!";
    }
  };
}

})();
