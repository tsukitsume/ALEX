var app = ons.bootstrap('myApp', [ 'ngSanitize' ]);

const BASE_URL      = "http://ik1-324-22351.vs.sakura.ne.jp/alex/";
const AJAX_BASE_URL = BASE_URL + "rest/app/";

const AJAX_SIGNUP    = AJAX_BASE_URL + "signup.json";    // サインアップ
const AJAX_LOGIN     = AJAX_BASE_URL + "login.json";     // ログイン
const AJAX_LOGGEDIN  = AJAX_BASE_URL + "loggedin.json";   // ログインのチェック
const AJAX_CHANGE_PW = AJAX_BASE_URL + "change_pw.json"; // パスワード変更
const AJAX_MARKET    = AJAX_BASE_URL + "market.json";    // 貴金属相場
const AJAX_NEWS      = AJAX_BASE_URL + "news.json";      // 新着情報
const AJAX_PRODUCT   = AJAX_BASE_URL + "product.json";   // 商品情報
const AJAX_LIKE      = AJAX_BASE_URL + "like.json";      // 「いいね」ボタン
const AJAX_QR        = AJAX_BASE_URL + "qr.json";      // QRコード

const IMG_DIR        = BASE_URL + "images";

const STORAGE_USER_DATA_KEY = "user_data";
const STORAGE_ID            = "user_id";
const STORAGE_ONETIME_KEY   = "onetime_key";
const STORAGE_POINT         = "point";
const STORAGE_CREATED_AT    = "created_at";

const MENUS = [
	{ page: 'views/shop.html',              name: 'Shop Information',      jpname: '会社概要',   background: 'Unknown-1.jpeg', },
	{ page: 'views/list/market_list.html',  name: 'Precious Metal Market', jpname: '貴金属相場', background: 'IMG_2012.JPG',   },
	{ page: 'views/list/news_list.html',    name: 'Good News',             jpname: '行事予定',   background: 'IMG_0606.JPG',   },
	{ page: 'views/list/product_list.html', name: 'New Arrival',           jpname: '商品',       background: 'Unknown.jpeg',   },
	{ page: 'views/auth/auth.html',         name: 'Be A Member',           jpname: '会員登録',           background: 'w-102.jpg',      },
	{ page: 'views/members/members.html',   name: 'Members Page',          jpname: '会員専用コンテンツ', background: 'images.jpeg',    },
];

const SHOP_INFO = {
	e_name       : 'ALEX CO. Ltd',
	name         : '株式会社アレックス ',
	zip          : '〒604-8062',
	address      : '京都府京都市中京区蛸薬師通麩屋町東入ル蛸屋町153',
	e_zip        : '〒604-8062',
	e_address    : 'TAKOYACHO153&nbsp;&nbsp;NAKAGYO-KU<br>KYOTO&nbsp;&nbsp;&nbsp;&nbsp;JAPAN',
	web          : 'http://www.j-alex.com/',
	tel          : '075-221-7777',
	telnum       : '0752217777',
	telmarket    : '075-221-1059',
	telmarketnum : '0752211059',
	fax          : '075-211-0889',
	lat          : '35.006096',
	lng          : '135.7636673',
	img          : 'images/shop.jpg',
	mail         : 'alex@j-alex.com',
	open         : '10:00 〜 18:00',
	close        : '<p>日曜・祝日<br>(ご予約により時間外も対応させていただきます)</p>',
};

const STAFFS = [
	{ name: 'JUNJI WADA', line: 'example', telnum: '0000000000', },
	{ name: 'JUNJI WADA', line: 'example', telnum: '0000000000', },
	{ name: 'JUNJI WADA', line: 'example', telnum: '0000000000', },
	// { name: '', id: '', tel: '', telnum: '', }
];


app.factory('SharedData', function()
{
	var sharedData = {};
	sharedData.data = {};
	sharedData.userData = {};
	
	var userData = {};
	
	// データを設定
	sharedData.set = function(data)
	{
		sharedData.data = data;
	};
	
	sharedData.get = function()
	{
		return sharedData.data;
	};
	
	return sharedData;
});

app.filter('mysql_date', ['$filter', function($filter)
{
	return function (value, fraction)
	{
		value = new Date(value.replace(/-/g, '/'));
		return $filter('date')(value, fraction);
	}
}]);

/**
 * ====================
 * ShopController
 * ====================
 */
app.controller('ShopController', function($scope, $http)
{
	$scope.shop_info = SHOP_INFO;
	$scope.desc      = SHOP_INFO.description;
	$scope.staffs    = STAFFS;
});


/**
 * ====================
 * History
 * ====================
 */
app.controller('HistoryController', function($scope, SharedData)
{
});


var isJson = function(arg){
    arg = (typeof(arg) == "function") ? arg() : arg;
    if(typeof(arg) != "string"){return false;}
    try{arg = (!JSON) ? eval("(" + arg + ")") : JSON.parse(arg);return true;}catch(e){return false;}
}

var getUserData = function()
{
	console.log('getUserData');
	var store = localStorage.getItem(STORAGE_USER_DATA_KEY);
	if (store && isJson(store))
	{
		var userData = JSON.parse(store);
		if (userData)
		{
			return userData;
		}
	}
	
	return false;
}

var isLoggedIn = function ()
{
	var id          = localStorage.getItem(STORAGE_ID);
	var onetime_key = localStorage.getItem(STORAGE_ONETIME_KEY);
	if (onetime_key) {
		return {
			id         : id,
			onetime_key: onetime_key
		};
	} else {
		return false;
	}
}

var logOut = function ()
{
	localStorage.setItem(STORAGE_ONETIME_KEY, '');
}
