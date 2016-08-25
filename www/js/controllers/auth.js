/**
 * ====================
 * Signup
 * ====================
 */
app.controller('SignupController', function($scope, $http, SharedData)
{
	var userData = getUserData();
	console.log(userData);
	if (userData)
	{
		this.userData = userData;
	}

	$scope.doSignUp = function (data)
	{
		// local storage に
		localStorage.setItem(STORAGE_USER_DATA_KEY, JSON.stringify(data.userData));

		SharedData.set({
			password: data.password,
			userData: data.userData,
		});
		// password

		navi.pushPage('signup_confirm.html');
	};
});

/**
 * ====================
 * SignupConfirm
 * ====================
 */
app.controller('SignupConfirmController', function($scope, $http, SharedData)
{
	$scope.data = SharedData.get();
	
	$scope.doSignUp = function()
	{
		modal.show();
		$.post(AJAX_SIGNUP, $scope.data)
		.done(function (response)
		{
			localStorage.setItem(STORAGE_ID,          response.id);
			localStorage.setItem(STORAGE_ONETIME_KEY, response.onetime_key);
			localStorage.setItem(STORAGE_POINT,       response.point);
			localStorage.setItem(STORAGE_CREATED_AT,  response.created_at);
			ons.notification.alert({
				title: 'サインアップ',
				messageHTML: "サインアップしました<br>あなたの会員番号は  " + response.id + "番です<br>詳細・ポイントは右上の「MyCard」よりご確認いただけます",
			});
			navi.resetToPage('top.html');
		})
		.fail(function (qxhr, status, error)
		{
			console.log(qxhr);
			console.log(error);	
		})
		.always(function ()
		{
			modal.hide();
		});
	};
});

/**
 * ====================
 * MyPage
 * ====================
 */
app.controller('MypageController', ['$scope', '$http', 'SharedData' , function($scope, $http, SharedData)
{
	$scope.loggedin = isLoggedIn();
	
	if (!$scope.loggedin)
	{
		navi.popPage();
	}

	var userData = JSON.parse(localStorage.getItem(STORAGE_USER_DATA_KEY));
	if (userData)
	{
		$scope.userData  = userData;
		$scope.id        = localStorage.getItem(STORAGE_ID);
		$scope.point     = localStorage.getItem(STORAGE_POINT);
		// $scope.qrcode         = true;
	}

	ons.ready(function()
	{
		$.post(AJAX_LOGGEDIN, {
			id         : $scope.loggedin.id,
			onetime_key: $scope.loggedin.onetime_key,
		})
		.done(function (response)
		{
			if (typeof response == 'undefined')
			{
				logOut();
				navi.popPage();
				return;
			}
			else
			{
				localStorage.setItem(STORAGE_ID,          response.id);
				localStorage.setItem(STORAGE_ONETIME_KEY, response.onetime_key);
				localStorage.setItem(STORAGE_POINT,       response.point);
				localStorage.setItem(STORAGE_CREATED_AT,  response.created_at);
				
				// ポイント等を更新する
				$scope.id    = localStorage.getItem(STORAGE_ID);
				$scope.point = localStorage.getItem(STORAGE_POINT);
				$scope.$apply();
			}
		})
		.fail(function (qxhr, status, error)
		{
			// fail は何もしない
			// 明示的に undefined が帰って来た時のみ logOut する
		})
		.always(function ()
		{
			// $scope.modal.hide();
		});
	});
	
	$scope.logout = function()
	{
		logOut();
		navi.resetToPage('top.html');
	}
}]);

/**
 * ====================
 * MyCard
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
});


/**
 * ====================
 * LoginController
 * ====================
 */
app.controller('LoginController', function($scope, $http, SharedData)
{
	$scope.privilege = PRIVILEGE;
	$scope.point_description = POINT_DESCRIPTION;
	
	var userId = localStorage.getItem(STORAGE_ID);
	if (userId)
	{
		this.id = userId;
	}

	$scope.doLogin = function (data)
	{
		var parameter = {
			id      : data.id,
			password: data.password,
		};

		$scope.modal.show();
		$.post(AJAX_LOGIN, parameter)
		.done(function (response)
		{
			if (response)
			{
				localStorage.setItem(STORAGE_ID,          response.id);
				localStorage.setItem(STORAGE_ONETIME_KEY, response.onetime_key);
				localStorage.setItem(STORAGE_POINT,       response.point);
				localStorage.setItem(STORAGE_CREATED_AT,  response.created_at);
				navi.resetToPage('top.html');
			}
			else
			{
				ons.notification.alert({
					title: 'ログイン失敗',
					message: "ログインできませんでした\n会員番号もしくはパスワードが違います",
				});
			}
		})
		.fail(function (qxhr, status, error)
		{
			ons.notification.alert({
				title: 'ログイン失敗',
				message: "ログインできませんでした\nネットワーク環境のいい場所でもう一度やり直してください。",
			});
			console.log(qxhr);
			console.log(error);	
		})
		.always(function ()
		{
			$scope.modal.hide();
		});
	};
});



