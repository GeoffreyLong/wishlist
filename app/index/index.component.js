angular.module('index').component('index', {
  templateUrl: 'index/index.template.html',
  controller: function IndexController($scope) {
    var kids = [
      {'name': 'Geoff',
        'age': 7,
        'description': 'I like turtles',
        'address': '85 Lexington Rd, Lincoln, Ma 01773',
        'image': 'http://www.publicdomainpictures.net/pictures/70000/nahled/little-boy-1385390666DK5.jpg',
        'gift': {
          'amazonId': 'B00X5UNTO6',
          'title': 'DBPOWER 8x40 Waterproof Binocular',
          'price': '24.99',
          'gift image': 'https://images-na.ssl-images-amazon.com/images/I/91QgZ18IBUL._SL1500_.jpg',
        }
      },
      {
        'name': 'Thalia',
        'age': 6,
        'description': 'I like trains',
        'address': 'Albany, California',
        'image': 'https://c2.staticflickr.com/8/7639/16927926931_5265802373_b.jpg',
        'gift': {
          'amazonId': 'B0000BWGNJ',
          'title': 'Razor A2 Kick Scooter',
          'price': '38.83',
          'gift image': 'https://images-na.ssl-images-amazon.com/images/I/71oKl1q1IcL._SL1500_.jpg',
        }
      },
        {
        'name': 'Bob',
        'age': 8,
        'description': 'My favorite food is hamburgers.',
        'address': 'Bikini Bottom',
        'image': 'http://slimages.macysassets.com/is/image/MCY/products/8/optimized/3352628_fpx.tif?wid=1320&hei=1616&fit=fit,1&$filterlrg$',
        'gift': {
          'amazonId': 'B00ITX1K4K',
          'title': '4M Crystal Growing Experiment',
          'price': '15.40',
          'gift image': 'https://images-na.ssl-images-amazon.com/images/I/91ZWRgwjg-L._SL1500_.jpg',
        }
      },
        {
        'name': 'Patrick',
        'age': 9,
        'description': 'I really like geology and board games.',
        'address': 'Bikini Bottom',
        'image': 'http://albanykid.com/wp-content/uploads/2010/05/herkimer.jpg',
        'gift': {
          'amazonId': 'B00C0ULS3G',
          'title': 'Battleship Game',
          'price': '11.39',
          'gift image': 'https://images-na.ssl-images-amazon.com/images/I/81Et22AcyXL._SL1500_.jpg',
        }
      },
        {
        'name': 'Sandy',
        'age': 7,
        'description': 'I love going to the beach and swimming.',
        'address': 'Bikini Bottom',
        'image': 'https://lizcooper.files.wordpress.com/2010/09/dsc_0152.jpg',
        'gift': {
          'amazonId': 'B000MDT7KO',
          'title': 'All Surface Swingball with Tether',
          'price': '49.99',
          'gift image': 'https://images-na.ssl-images-amazon.com/images/I/61gTxmNaLSL._SL1000_.jpg',
        }
      },
        {
        'name': 'Keeley',
        'age': 11,
        'description': 'I love Lord of the Rings.',
        'address': 'Dimmock, Pennsylvania',
        'image': 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Little_Girl_With_a_Little_Crab_(7157108531).jpg',
        'gift': {
          'amazonId': '0062561480',
          'title': 'The Lord of the Rings Movie Trilogy Coloring Book',
          'price': '10.83',
          'gift image': 'https://images-na.ssl-images-amazon.com/images/I/61u22aufWQL.jpg',
        }
      },
        {
        'name': 'Lindsey',
        'age': 5,
        'description': 'I love to paint and read.',
        'address': 'Hingham, Ma',
        'image': 'https://upload.wikimedia.org/wikipedia/commons/4/47/Little_girl_on_swing.jpg',
        'gift': {
          'amazonId': 'B002KW3OQS',
          'title': 'Art 101 142-Piece Wood Art Set',
          'price': '28.41',
          'gift image': 'https://images-na.ssl-images-amazon.com/images/I/91J9%2B38KYkL._SL1500_.jpg',
        }
      },
        {
        'name': 'Mollie',
        'age': 6,
        'description': 'I like to draw and bake.',
        'address': 'West Orange, New Jersey',
        'image': 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Young_girl_in_Mauritania.jpg',
        'gift': {
          'amazonId': 'B00BMJNWE4',
          'title': 'Primula Teapot with Stainless Steel Infuser and Loose Green Tea Packet, 40-Ounce, Blue Floral',
          'price': '29.03',
          'gift image': 'https://images-na.ssl-images-amazon.com/images/I/71vQ-d8YzgL._SL1000_.jpg',
        }
      },
        {
        'name': 'Hillary',
        'age': 7,
        'description': 'I want to be president when I grow up!',
        'address': 'Washington D.C.',
        'image': 'https://c2.staticflickr.com/6/5264/5674816894_c4af735621_b.jpg',
        'gift': {
          'amazonId': '1426310897',
          'title': 'Our Countrys Presidents: All You Need to Know About the Presidents, From George Washington to Barack Obama',
          'price': '16.68',
          'gift image': 'https://images-na.ssl-images-amazon.com/images/I/511w%2B1AFXmL.jpg',
        }
      }
    ];

    $scope.children = chunk(kids);

    function chunk(arr) {
      var size = 3;
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
