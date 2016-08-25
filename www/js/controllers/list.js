/**
 * ====================
 * NewsList
 * ====================
 */
app.controller('NewsListController', function($scope, $http, SharedData)
{
	$scope.dataList = [];
	$scope.shop_info = SHOP_INFO;
	var loading = false;
	var all_data_loaded = false;

	$scope.showDetailPage = function(data)
	{
		SharedData.set(data);
		navi.pushPage('news.html');
	};

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
});

/**
 * ====================
 * News
 * ====================
 */
app.controller('NewsController', function($scope, SharedData)
{
	$scope.shop_info = SHOP_INFO;
	$scope.data = SharedData.get();
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

	$scope.showDetailPage = function(data)
	{
		SharedData.set(data);
		navi.pushPage('product.html');
	};

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
});

/**
 * ====================
 * Product
 * ====================
 */
app.controller('ProductController', function($scope, SharedData) {
	$scope.data = SharedData.get();
	$scope.BASE_URL = BASE_URL;
	$scope.shop_info = SHOP_INFO;
	
	$scope.loggedin = isLoggedIn();
	
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
			id         : $scope.loggedin.id,
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
	
	var loading = false;
	var all_data_loaded = false;


	$scope.showDetailPage = function(data)
	{
		SharedData.set(data);
		navi.pushPage('market.html');
	};

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
		$("#marketList").on("touchmove", function()
		{
			if ( ($("#marketList").height() - $("#list_end").offset().top) > 0)
			{
				readItems();
			}
		});
	});
	

	readItems();
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

