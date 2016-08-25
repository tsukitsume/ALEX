var app = ons.bootstrap('myApp', [ 'ngSanitize' ]);

const MENUS = [
	{ page: 'shop.html',         name: 'Shop Information',      jpname: '会社情報',   background: 'Unknown-1.jpeg', },
	// { page: 'history.html',      name: 'History',               jpname: '歴史',       background: 'A-1006.jpg',     },
	{ page: 'market_list.html',  name: 'Precious Metal Market', jpname: '貴金属相場', background: 'IMG_2012.JPG',   },
	{ page: 'news_list.html',    name: 'Good News',             jpname: '行事予定',   background: 'IMG_0606.JPG',   },
	{ page: 'product_list.html', name: 'New Arrival',           jpname: '商品',       background: 'Unknown.jpeg',   },
	{ page: 'signup.html',       name: 'Be A Member',           jpname: '会員登録',           background: 'w-102.jpg',      },
];
const MENUS_LOGGEDIN = [
	{ page: 'shop.html',         name: 'Shop Information',      jpname: '会社情報',   background: 'Unknown-1.jpeg', },
	// { page: 'history.html',      name: 'History',               jpname: '歴史',       background: 'A-1006.jpg',     },
	{ page: 'market_list.html',  name: 'Precious Metal Market', jpname: '貴金属相場', background: 'IMG_2012.JPG',   },
	{ page: 'news_list.html',    name: 'Good News',             jpname: '行事予定',   background: 'IMG_0606.JPG',   },
	{ page: 'product_list.html', name: 'New Arrival',           jpname: '商品',       background: 'Unknown.jpeg',   },
	{ page: 'members.html',      name: 'Members Page',          jpname: '会員専用コンテンツ', background: 'images.jpeg',    },
	{ page: 'qr.html',           name: 'QR Code Reader',        jpname: 'QRコードリーダー', background: 'images.jpeg',    },
];

const MORE_MENUS = [
	{ member_only: 0, page: 'shop.html', name: 'Shop Information', jpname: '会社情報' },
];

const PRIVILEGE = '<h3>ポイント</h3>' +
'<p>'+
'自動集計により、お買い上・お修理、又、行事にご参加の場合、ポイントを付加し、種々のプレゼントを差し上げます。' +
'</p>' +
'<h3>ディスカウント</h3>' +
'<p>' +
'製品お買い上げ・お修理等に対し、10%ディスカウント致します。' +
'</p>'+
'<h3>バースデープレゼント</h3>' +
'<p>' +
'お誕生日に持ち込まれたジュエリーリングのサイズ直し又は新仕上げ又はパールネックレス等の糸かえは、一点につき、無料にてさせていただきます。' +
'</p>';

const POINT_DESCRIPTION = '<ul>'+
'	<li>お買い上げ又はお修理代金 1万円につき1ポイント</li>'+
'	<li>ALEX主催の行事にご参加いただくと(原則¥5,000の会費に対し)1ポイント</li>'+
'	<li>ご友人のご紹介(会員登録)をいただければ2ポイント<br>(お買い上げ又はお修理いただいた場合に限ります)</li>'+
'</ul>'+
'<p>'+
'※ポイントは3年間有効です。<br>'+
'ポイント交換はお客様よりお申し出下さい。'+
'</p>'+
'<dl>'+
'	<dt>15ポイント</dt><dd>金券5,000円、又は ALEX商品券 10,000円分</dd>'+
'	<dt>25ポイント</dt><dd>1人様お食事券プレゼント(ディナータイム)</dd>'+
'	<dt>40ポイント</dt><dd>ペアお食事券プレゼント(ディナータイム)</dd>'+
'</dl>';

const SHOP_INFO = {
	e_name       : 'ALEX CO. Ltd',
	name         : '株式会社アレックス ',
	zip          : '〒604-8062',
	address      : '京都府京都市中京区蛸薬師通麩屋町東入ル蛸屋町153',
	e_zip        : '〒604-8062',
	e_address    : 'TAKOYACHO153 NAKAGYO-KU KYOTO JAPAN',
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
	description  : '宝石、貴金属製品&nbsp;輸入・製造・小売業<br>創業 1990年2月22日(平成元年2月22日)',
};

const STAFFS = [
	{ name: 'JUNJI WADA', line: 'example', telnum: '0000000000', },
	{ name: 'JUNJI WADA', line: 'example', telnum: '0000000000', },
	{ name: 'JUNJI WADA', line: 'example', telnum: '0000000000', },
	// { name: '', id: '', tel: '', telnum: '', }
];

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

app.factory('SharedData', function() {
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
	
	sharedData.setUser = function(data)
	{
		sharedData.userData.name = data.name;
		sharedData.userData.email = data.email;
	};
	sharedData.getUser = function()
	{
		return sharedData.userData;
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

/* ====================
 * 会員専用コンテンツ
 * ==================== */
app.controller('QrController', function($scope, $http, SharedData)
{
	$scope.loggedin = isLoggedIn();
	
	$scope.scan = function ()
	{
		plugins.barcodeScanner.scan(function(result)
		{
			
			var parameter = {
				id      : $scope.loggedin.id,
				onetime_key: $scope.loggedin.onetime_key,
				text    : result.text,
			};
			$.post(AJAX_QR, parameter)
			.done(function (response)
			{
				if (typeof response == 'undefined')
				{
					ons.notification.alert({
						title: 'QRコード',
						message: 'ネットワークエラー(もう一度お願いします)',
					});
					return;
				}
				else
				{
					ons.notification.alert({
						title: 'QRコード',
						message: '情報の送信を完了しました',
					});
					return;
				}
			})
			.fail(function (qxhr, status, error)
			{
				ons.notification.alert({
					title: 'QRコード',
						messageHTML: "送信出来ませんでした。<br>ネットワーク環境のいい場所でもう一度やり直してください。",
				});	
			})
			.always(function ()
			{
				// $scope.modal.hide();
			});
		});
	}
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
