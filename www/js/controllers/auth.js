/**
 * ====================
 * Auth top
 * ====================
 */
app.controller('AuthController', function($scope, $http, SharedData)
{
		$scope.loggedin = isLoggedIn();
});


/**
 * ====================
 * Signup
 * ====================
 */
app.controller('SignupController', function($scope, $http, SharedData)
{
	$scope.call = call;
	$scope.mail = mail;


	var userData = getUserData();
	if (userData)
	{
		if (userData.birthday) userData.birthday = new Date(userData.birthday);
		if (userData.birthday) userData.wedding_anniversary = new Date(userData.wedding_anniversary);
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

		navi.pushPage('views/auth/signup_confirm.html');
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

	$scope.call = call;
	$scope.mail = mail;

	$scope.doSignUp = function()
	{
		modal.show();
		$.post(AJAX_SIGNUP, $scope.data)
		.done(function (response)
		{
			localStorage.setItem(STORAGE_NUMBER,      response.number);
			localStorage.setItem(STORAGE_ONETIME_KEY, response.onetime_key);
			localStorage.setItem(STORAGE_POINT,       response.point);
			localStorage.setItem(STORAGE_CREATED_AT,  response.created_at);
			ons.notification.alert({
				title: 'サインアップ',
				messageHTML: "サインアップしました<br>あなたの会員番号は  " + response.number + "番です<br>詳細・ポイントは右上の「MyCard」よりご確認いただけます",
			});
			navi.resetToPage('views/top.html');
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
 * @ajax res 'differ_old_password' => 現在のパスワードが異なる(ログイン出来ない)
 * @ajax res 'differ_new_password' => 新しいパスワードと確認用が異なる(原則起きない)
 * ====================
 */
app.controller('PasswordChangeController', function($scope, $http, SharedData)
{
	$scope.number = localStorage.getItem(STORAGE_NUMBER);
	$scope.doPasswordChange = function(data)
	{
		modal.show();
		data.number = $scope.number;

		console.log(data);
		$.post(AJAX_CHANGE_PW, data)
		.done(function (response)
		{
			console.log(response);

			if (response == 'differ_old_password')
			{
				ons.notification.alert({
					title: 'エラー',
					messageHTML: "現在のパスワードが違います",
				});
			}
			else if (response == 'differ_new_password')
			{
				ons.notification.alert({
					title: 'エラー',
					messageHTML: "新しいパスワードが、確認用のパスワードと異なります",
				});
			}
			else
			{
				localStorage.setItem(STORAGE_NUMBER,      response.number);
				localStorage.setItem(STORAGE_ONETIME_KEY, response.onetime_key);
				localStorage.setItem(STORAGE_POINT,       response.point);
				localStorage.setItem(STORAGE_CREATED_AT,  response.created_at);

				ons.notification.alert({
					title: 'パスワードを変更',
					messageHTML: "パスワードを変更しました",
				});
				navi.resetToPage('views/top.html');
			}
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

	$scope.call = call;
	$scope.mail = mail;

	if (!$scope.loggedin)
	{
		navi.popPage();
	}

	$scope.userData = JSON.parse(localStorage.getItem(STORAGE_USER_DATA_KEY));

	$scope.number    = localStorage.getItem(STORAGE_NUMBER);
	$scope.point     = localStorage.getItem(STORAGE_POINT);

	console.log($scope.loggedin.number);
	console.log($scope.loggedin.onetime_key);

	ons.ready(function()
	{
		$("#bcTarget").barcode(
				localStorage.getItem(STORAGE_NUMBER),
				BARCODE_TYPE,
				{
					barWidth:  2,
					barHeight: 80,
					fontSize:  15,
					output: 'css',
				});


		$.post(AJAX_LOGGEDIN, {
			number     : $scope.loggedin.number,
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
				localStorage.setItem(STORAGE_NUMBER,      response.number);
				localStorage.setItem(STORAGE_ONETIME_KEY, response.onetime_key);
				localStorage.setItem(STORAGE_POINT,       response.point);
				localStorage.setItem(STORAGE_CREATED_AT,  response.created_at);
				
				// ポイント等を更新する
				$scope.number = localStorage.getItem(STORAGE_NUMBER);
				$scope.point  = localStorage.getItem(STORAGE_POINT);
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
		ons.notification.confirm({
			title: 'ログアウト',
			message: 'ログアウトしてもよろしいですか?',
			buttonLabels: ['キャンセル', 'ログアウトする'],
			callback: function(answer)
			{
				if (answer)
				{
					logOut();
					navi.resetToPage('views/top.html');
				}
			},
		});
	}
}]);


/**
 * ====================
 * LoginController
 * ====================
 */
app.controller('LoginController', function($scope, $http, SharedData)
{
	$scope.shop_info = SHOP_INFO;

	$scope.call = call;
	$scope.mail = mail;

	var userNumber = localStorage.getItem(STORAGE_NUMBER);
	if (userNumber)
	{
		this.number = userNumber;
	}

	$scope.doLogin = function (data)
	{
		var parameter = {
			number  : data.number,
			password: data.password,
		};

		$scope.modal.show();
		$.post(AJAX_LOGIN, parameter)
		.done(function (response)
		{
			if (response)
			{
				localStorage.setItem(STORAGE_NUMBER,      response.number);
				localStorage.setItem(STORAGE_ONETIME_KEY, response.onetime_key);
				localStorage.setItem(STORAGE_POINT,       response.point);
				localStorage.setItem(STORAGE_CREATED_AT,  response.created_at);
				navi.resetToPage('views/top.html');
				ons.notification.alert({
					title: 'ログイン',
					message: "ログインしました",
				});
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



