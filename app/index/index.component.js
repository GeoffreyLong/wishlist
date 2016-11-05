angular.module('index').component('index', {
  templateUrl: 'index/index.template.html',
  controller: function IndexController($scope) {
    var kids = [
      {'name': 'Geoff',
        'age': 7,
        'description': 'I like turtles',
        'address': '85 Lexington Rd, Lincoln, Ma 01773',
        'image': 'url',
        'gift': {
          'amazonId': '1235454'
        }
      }
    ];

    $scope.children = chunk(kids);

    function chunk(arr) {
      var size = 2;
      console.log(window.innerWidth);
      if (window.innerWidth > 1500) {
        size = 3;
      }

      var newArr = [];
      for (var i = 0; i < size; i ++) {
        var tempArr = [];
        for (var j = i; j < arr.length; j += size) {
          tempArr.push(arr[j]);
        }
        newArr.push(tempArr);
      }
      return newArr;
    }
  }
});
