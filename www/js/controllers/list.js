/**
 * ====================
 * NewsList
 * ====================
 */
app.controller('NewsListController', function($scope, $sce, $http, SharedData)
{
	$scope.dataList = [];
	$scope.shop_info = SHOP_INFO;

	$scope.call = call;
	$scope.mail = mail;

	var loading = false;
	var all_data_loaded = false;

	var first_article = true;

	function readItems()
	{
		if (loading || all_data_loaded) return;
		
		$('#list_end .loading').show();
		$('#list_end .load_more').hide();
		var data = {};
		if ($scope.dataList.length > 0)
		{
			var last_element = $scope.dataList[$scope.dataList.length -1];
			data = {
				created_at: last_element.created_at,
				id:         last_element.id,
			};
		}

		loading = true;
		$.post(AJAX_NEWS, data)
		.done(function (response)
		{
			console.log(response);
			if (response == 'nomore')
			{
				all_data_loaded = true;
				$('#list_end').empty();
				$('#list_end').text('これ以上データはありません');
				return;
				
			}
			for (key in response)
			{
				if (first_article)
				{
					$scope.article = $sce.trustAsHtml(response[key].body);
					first_article = false;
				}
				$scope.dataList.push(response[key]);
			}
			$scope.$apply();
		})
		.fail(function (qxhr, status, error)
		{
		})
		.always(function ()
		{
			loading = false;
			$('#list_end .loading').hide();
			$('#list_end .load_more').show();
		});
	}

	ons.ready(function()
	{
		$("#newsList").on("touchmove", function()
		{
			if ( ($("#newsList").height() - $("#list_end").offset().top) > 0)
			{
				readItems();
			}
		});
	});

	readItems();


	$scope.showDetailPage = function(data)
	{
		SharedData.set(data);
		navi.pushPage('views/list/news.html');
	};
});

/**
 * ====================
 * News
 * ====================
 */
app.controller('NewsController', function($scope, $sce, SharedData)
{
	$scope.shop_info = SHOP_INFO;
	$scope.data = SharedData.get();

	$scope.call = call;
	$scope.mail = mail;

	$scope.article = $sce.trustAsHtml($scope.data.body);
});

/**
 * ====================
 * ProductList
 * ====================
 */
app.controller('ProductListController', function($scope, $http, SharedData)
{
	$scope.dataList = [];
	$scope.BASE_URL = BASE_URL;
	var loading = false;
	var all_data_loaded = false;

	function readItems()
	{
		if (loading || all_data_loaded) return;
		
		$('#list_end .loading').show();
		$('#list_end .load_more').hide();
		var data = {};
		if ($scope.dataList.length > 0)
		{
			var last_element = $scope.dataList[$scope.dataList.length -1];
			data = {
				created_at: last_element.created_at,
				id:         last_element.id,
			};
		}

		loading = true;
		$.post(AJAX_PRODUCT, data)
		.done(function (response)
		{
			if (response == 'nomore')
			{
				all_data_loaded = true;
				$('#list_end').empty();
				$('#list_end').text('これ以上データはありません');
				return;
				
			}
			for (key in response)
			{
				$scope.dataList.push(response[key]);
			}
			$scope.$apply();
		})
		.fail(function (qxhr, status, error)
		{
		})
		.always(function ()
		{
			loading = false;
			$('#list_end .loading').hide();
			$('#list_end .load_more').show();
		});
	}


	ons.ready(function()
	{
		$("#productList").on("touchmove", function()
		{
			if ( ($("#productList").height() - $("#list_end").offset().top) > 0)
			{
				readItems();
			}
		});
	});
	readItems();

	$scope.showDetailPage = function(data)
	{
		SharedData.set(data);
		navi.pushPage('views/list/product.html');
	};
});

/**
 * ====================
 * Product
 * ====================
 */
app.controller('ProductController', function($scope, SharedData)
{
	$scope.data = SharedData.get();
	$scope.BASE_URL = BASE_URL;
	$scope.shop_info = SHOP_INFO;

	$scope.loggedin = isLoggedIn();

	$scope.call = call;
	$scope.mail = mail;

	$scope.like = function(id)
	{
		$scope.modal.show();
		if (!$scope.loggedin)
		{
			ons.notification.alert({
				title: 'いいね',
				message: 'いいねをするにはログインが必要です',
			});
			return;
		}
		
		console.log($scope.loggedin.onetime_key);
		$.post(AJAX_LIKE, {
			product_id : id,
			number     : $scope.loggedin.number,
			onetime_key: $scope.loggedin.onetime_key,
		})
		.done(function (response)
		{
			console.log(response);
			if (typeof response == 'undefined')
			{
				ons.notification.alert({
					title: 'いいね',
					message: 'ネットワークエラー(もう一度お願いします)',
				});
				return;
			}
			else if (response == 'liked')
			{
				// TODO modal
				ons.notification.alert({
					title: 'いいね',
					message: '既にいいねしている商品です',
				});
				return;
				
			}
			else
			{
				$scope.data.like = parseInt(response);
					ons.notification.alert({
					title: 'いいね',
					message: 'いいねしました。ありがとうございます。',
				});
			}
			$scope.$apply();
		})
		.fail(function (qxhr, status, error)
		{
			console.log('like fail');
		})
		.always(function ()
		{
			$scope.modal.hide();
		});
	};
});


/**
 * ====================
 * MarketList
 * ====================
 */
app.controller('MarketListController', function($scope, $http, SharedData)
{
	$scope.shop_info = SHOP_INFO;
	$scope.dataList = [];

	$scope.call = call;
	$scope.mail = mail;


	var first_element = true;
	
	var loading = false;
	var all_data_loaded = false;

	function readItems()
	{
		if (loading || all_data_loaded) return;
		
		$('#list_end .loading').show();
		$('#list_end .load_more').hide();
		var data = {};
		if ($scope.dataList.length > 0)
		{
			var last_element = $scope.dataList[$scope.dataList.length -1];
			data = {
				created_at: last_element.created_at,
				id:         last_element.id,
			};
		}

		loading = true;
		$.post(AJAX_MARKET, data)
		.done(function (response)
		{
			if (response == 'nomore')
			{
				all_data_loaded = true;
				$('#list_end').empty();
				$('#list_end').text('これ以上データはありません');
				return;
				
			}
			for (key in response)
			{
				// 符号を設定
				if (response[key].ratio_gold == 0) {
					response[key].ratio_gold_sign = '±';
				} else if (response[key].ratio_gold < 0) {
					response[key].ratio_gold_sign = '－';
				} else {
					response[key].ratio_gold_sign = '＋';
				}
				if (response[key].ratio_platinum == 0) {
					response[key].ratio_platinum_sign = '±';
				} else if (response[key].ratio_platinum < 0) {
					response[key].ratio_platinum_sign = '－';
				} else {
					response[key].ratio_platinum_sign = '＋';
				}
				if (response[key].ratio_silver == 0) {
					response[key].ratio_silver_sign = '±';
				} else if (response[key].ratio_silver < 0) {
					response[key].ratio_silver_sign = '－';
				} else {
					response[key].ratio_silver_sign = '＋';
				}
				//　符号は設定したので、絶対値化する
				response[key].ratio_gold     = Math.abs(response[key].ratio_gold);
				response[key].ratio_platinum = Math.abs(response[key].ratio_platinum);
				// 銀は小数を取るため符号の反転
				if (response[key].ratio_silver < 0) response[key].ratio_silver = (response[key].ratio_silver) * -1.0;

				$scope.dataList.push(response[key]);
			}
			$scope.$apply();
			$scope.getChart();
		})
		.fail(function (qxhr, status, error)
		{
		})
		.always(function ()
		{
			loading = false;
			$('#list_end .loading').hide();
			$('#list_end .load_more').show();
		});
	}


	var myLineChart = null;
	var myLineChartBottom = null;
	var chartDatas;
	var chartConfigs;
	var chartConfigsBottom;

	$scope.getChart = function()
	{
		if (chartDatas)
		{
			return;
		}

		$.post(AJAX_CHART)
		.done(function (response)
		{
			console.log('chart');
			console.log(response);
			var labels     = [];
			var golds      = [];
			var platinums  = [];
			var silvers    = [];
			var exchanges  = [];
			for (key in response)
			{
				labels.push(response[key].date);
				golds.push(response[key].gold);
				platinums.push(response[key].platinum);
				silvers.push(response[key].silver);
				exchanges.push(response[key].exchange);
			}

			chartDatas = {
				gold: {
					label: '金',
					backgroundColor: "rgba(255, 215,  0, 0.2)",
					borderColor:     "rgba(255, 215,  0, 1)",
					data: golds,
					pointRadius: 0,
					lineTension: 0,
					borderWidth: 1,
				},
				platinum: {
					label: 'プラチナ',
					backgroundColor:   "rgba(229, 228, 226, 0.2)",
					borderColor:       "rgba(209, 208, 226, 1)",
					pointRadius: 0,
					lineTension: 0,
					data: platinums,
					borderWidth: 1,
				},
				silver: {
					label: '銀',
					backgroundColor:   "rgba(192, 192, 192, 0.2)",
					borderColor:       "rgba(152, 152, 152, 1)",
					data: silvers,
					pointRadius: 0,
					lineTension: 0,
					borderWidth: 1,
				},
				exchange: {
					label: '為替',
					backgroundColor:   "rgba(0, 192, 192, 0.2)",
					borderColor:       "rgba(0, 152, 152, 1)",
					data: exchanges,
					pointRadius: 0,
					lineTension: 0,
					borderWidth: 1,
				},
			};

			chartConfigs = {
				data: {
					labels: labels,
					datasets: [
						chartDatas.gold,
						chartDatas.platinum,
						chartDatas.silver,
						chartDatas.exchange,
					]
				},
				options: {
				},
			};
			chartConfigsBottom = {
				data: {
					labels: labels,
					datasets: [
						chartDatas.silver,
						chartDatas.exchange,
					]
				},
				options: {
				},
			};

			$scope.drawChart();
		})
		.fail(function (qxhr, status, error)
		{
		})
		.always(function ()
		{
		});
	}

	$scope.drawChart = function(type)
	{
		if (
			! chartDatas ||
			! chartConfigs
		)
		{
			return;
		}

		switch (type)
		{
			case 'gold':
				$('#myChartBottom').slideUp();
				chartConfigs.data.datasets = [
					chartDatas.gold,
				];
				break;
			case 'platinum':
				$('#myChartBottom').slideUp();
				chartConfigs.data.datasets = [
					chartDatas.platinum,
				];
				break;
			case 'shilver':
				$('#myChartBottom').slideUp();
				chartConfigs.data.datasets = [
					chartDatas.silver,
				];
				break;
			case 'exchange':
				$('#myChartBottom').slideUp();
				chartConfigs.data.datasets = [
					chartDatas.exchange,
				];
				break;
			default:
				$('#myChartBottom').slideDown();
				chartConfigs.data.datasets = [
					chartDatas.gold,
					chartDatas.platinum,
					// chartDatas.silver,
				];
				break;
		}

		if (myLineChart)
		{
			myLineChart.update();
		}
		else
		{
			myLineChart = Chart.Line(document.getElementById("myChart").getContext("2d"), chartConfigs);
			myLineChartBottom = Chart.Line(document.getElementById("myChartBottom").getContext("2d"), chartConfigsBottom);
		}
	}


	ons.ready(function()
	{
		$("#marketList").on("touchmove", function()
		{
			if ( ($("#marketList").height() - $("#list_end").offset().top) > 0)
			{
				readItems();
			}
		});
	});



	readItems();

	$scope.showDetailPage = function(data)
	{
		SharedData.set(data);
		navi.pushPage('views/list/market.html');
	};
});

/**
 * ====================
 * Market
 * ====================
 */
app.controller('MarketController', function($scope, SharedData)
{
	$scope.data = SharedData.get();
});

