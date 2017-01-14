const MEMBERS_MENUS = [
];

/**
 * ====================
 * Members
 * 会員専用ページ
 * ====================
 */
app.controller('MembersController', function($scope, $http, SharedData)
{
	$scope.loggedin = isLoggedIn();

	$scope.call = call;
	$scope.mail = mail;
	$scope.line = line;

	$scope.staffs = STAFFS;
	/*
	if (!$scope.loggedin)
	{
		navi.popPage();
	}
	*/

	ons.ready(function()
	{
	});
});

/*
						<a ng-if="staff.line" class="button" href="http://line.me/ti/p/~{{staff.line}}">
							<img src="images/icon/line_s.png" alt="LINE" />
						</a>
 */ 


/**
 * ====================
 * Member
 * ====================
 */
app.controller('HotAccessController', function($scope, $http, SharedData)
{
	$scope.loggedin = isLoggedIn();

	$scope.call = call;
	$scope.mail = mail;

	if (!$scope.loggedin)
	{
		navi.popPage();
	}

	$scope.staffs = STAFFS;

	ons.ready(function()
	{
	});
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


/**
 * ====================
 * BlogList
 * ====================
 */
app.controller('BlogListController', function($scope, $sce, $http, SharedData)
{
	$scope.dataList = [];

	var loading = false;
	var all_data_loaded = false;

	var first_article = true;


	$scope.loggedin = isLoggedIn();

	$scope.call = call;
	$scope.mail = mail;

	if (!$scope.loggedin)
	{
		navi.popPage();
	}

	$scope.userData = JSON.parse(localStorage.getItem(STORAGE_USER_DATA_KEY));

	$scope.number    = localStorage.getItem(STORAGE_NUMBER);
	$scope.point     = localStorage.getItem(STORAGE_POINT);

	function readItems()
	{
		if (loading || all_data_loaded) return;
		
		$('#list_end .loading').show();
		$('#list_end .load_more').hide();
		var data = {
			number:       $scope.loggedin.number,
			onetime_key: $scope.loggedin.onetime_key,
		};
		if ($scope.dataList.length > 0)
		{
			var last_element = $scope.dataList[$scope.dataList.length -1];
			data.created_at = last_element.created_at;
			data.id = last_element.id;
		}

		loading = true;

		$.post(AJAX_BLOG, data)
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
			console.log('fail');
		})
		.always(function ()
		{
			console.log('always');
			loading = false;
			$('#list_end .loading').hide();
			$('#list_end .load_more').show();
		});
	}

	ons.ready(function()
	{
		$("#blogList").on("touchmove", function()
		{
			if ( ($("#blogList").height() - $("#list_end").offset().top) > 0)
			{
				readItems();
			}
		});
	});

	readItems();


	$scope.showDetailPage = function(data)
	{
		SharedData.set(data);
		navi.pushPage('views/members/blog.html');
	};
});


/**
 * ====================
 * Blog
 * ====================
 */
app.controller('BlogController', function($scope, $sce, SharedData)
{
	$scope.data = SharedData.get();

	$scope.article = $sce.trustAsHtml($scope.data.body);
});



