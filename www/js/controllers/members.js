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
	var userData = JSON.parse(localStorage.getItem(STORAGE_USER_DATA_KEY));
	if (userData)
	{
		$scope.userData       = userData;
		$scope.userData.id    = localStorage.getItem(STORAGE_ID);
		$scope.userData.point = localStorage.getItem(STORAGE_POINT);
	}

	ons.ready(function()
	{
		$("#bcTarget").barcode("1234567890128", "code128", {output: 'svg'});
		console.log('code');
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

