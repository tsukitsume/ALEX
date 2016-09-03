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
		$scope.userData        = userData;
		$scope.userData.number = localStorage.getItem(STORAGE_NUMBER);
		$scope.userData.point  = localStorage.getItem(STORAGE_POINT);
	}

	ons.ready(function()
	{

		$scope.getChart = function()
		{
			if (chartDatas)
			{
				return;
			}

			$.post(AJAX_CHART)
			.done(function (response)
			{
				var labels     = [];
				var golds      = [];
				var platinums  = [];
				var silvers    = [];
				for (key in response)
				{
					labels.push(response[key].date);
					golds.push(response[key].gold);
					platinums.push(response[key].platinum);
					silvers.push(response[key].silver);
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
				};

				chartConfigs = {
					data: {
						labels: labels,
						datasets: [
							chartDatas.gold,
							chartDatas.platinum,
							chartDatas.silver,
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


		var myLineChart = null;
		var chartDatas;
		var chartConfigs;
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
					chartConfigs.data.datasets = [
						chartDatas.gold,
					];
					break;
				case 'platinum':
					chartConfigs.data.datasets = [
						chartDatas.platinum,
					];
					break;
				case 'shilver':
					chartConfigs.data.datasets = [
						chartDatas.silver,
					];
					break;
				default:
					chartConfigs.data.datasets = [
						chartDatas.gold,
						chartDatas.platinum,
						chartDatas.silver,
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
			}

		}


		$("#bcTarget").barcode(
				"200012",
				"code128",
				{
					barWidth:  2,
					barHeight: 80,
					fontSize:  15,
					output: 'svg',
				});
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

