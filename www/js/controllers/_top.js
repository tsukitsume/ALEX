/**
 * ====================
 * TopController
 * ====================
 */
app.controller('TopController', function($scope, $http, SharedData)
{
	$scope.loggedin = isLoggedIn();

	if ($scope.loggedin)
	{
		$scope.menuMain = MENUS_LOGGEDIN;
	}
	else
	{
		$scope.menuMain = MENUS;
	}
	var menu_sub = MENUS.slice(0);
	menu_sub.push( menu_sub.shift() );
	$scope.menuSub  = menu_sub;

	ons.ready(function()
	{
		const DELAY = 100;
		const STOP_DURATION = 300;
		var timer;
		const SCROLL_TIMEOUT = 50;
		const LI_HEIGHT = 40;
		const LI_HALF   = LI_HEIGHT/2;
		const LI_COUNT  = 7;
		const UL_HEIGHT = LI_HEIGHT * LI_COUNT;
		
		$('#main_image').height($('#main_content').height() - LI_HEIGHT*7);
		$('#main_image ul').height($('#main_image') * LI_COUNT);
		$('#main_image ul li').height($('#main_image').height());
		
		var IMAGE_HEIGHT = $('#main_image').height();
		var PER_FOR_IMAGE = IMAGE_HEIGHT/LI_HEIGHT;

		$scope.slideSubMenu = function(e)
		{
			slideY = $('#menu_sub').scrollTop() + $(e.target).offset().top - $('#menu_sub').offset().top + LI_HEIGHT;

			if (slideY > UL_HEIGHT*2 + LI_HEIGHT)
			{
				slideY = slideY - UL_HEIGHT;
			}
			else if (slideY < UL_HEIGHT - LI_HEIGHT)
			{
				slideY = slideY + UL_HEIGHT;
			}

			$('#menu_sub').scrollTop(slideY);
			$('#menu_main').scrollTop(slideY);
			$('#main_image').scrollTop(slideY*PER_FOR_IMAGE);

			$('#menu_sub').stop(false, true).animate({scrollTop: slideY},200);
			$('#menu_main').stop(false, true).animate({scrollTop: slideY},200);
			$('#main_image').stop(false, true).animate({scrollTop: slideY*PER_FOR_IMAGE},200);

		};
		var touchY = 0;
		var slideY = 0;

		$('#menu_sub').on(
		{
			/* フリック開始時 */
			'touchstart': function(e)
			{
				touchY = event.changedTouches[0].pageY;
				slideY = $('#menu_sub').scrollTop();
			},
			/* フリック中 */
			'touchmove': function(e)
			{
				e.preventDefault();
				slideY = slideY + (touchY - event.changedTouches[0].pageY );
				touchY = event.changedTouches[0].pageY;

				if (slideY > UL_HEIGHT*2 + LI_HEIGHT)
				{
					slideY = slideY - UL_HEIGHT;
				}
				else if (slideY < UL_HEIGHT - LI_HEIGHT)
				{
					slideY = slideY + UL_HEIGHT;
				}

				$('#menu_sub').scrollTop(slideY);

				$('#menu_main').scrollTop(slideY);
				$('#main_image').scrollTop(slideY*PER_FOR_IMAGE);

			},
			/* フリック終了 */
			'touchend': function(e)
			{
				setTimeout(function ()
				{
					// var sc_top = $('#menu_sub').scrollTop();
					var sc_top = slideY;
					var ssc = sc_top%LI_HEIGHT;
					var sc;
					if (ssc > LI_HALF)
					{
						sc = sc_top + (LI_HEIGHT - ssc);
					}
					else
					{
						sc = sc_top - ssc;
					}
					$('#menu_sub').stop(false, true).animate({scrollTop: sc}, STOP_DURATION);
					$('#menu_main').stop(false, true).animate({scrollTop: sc}, STOP_DURATION);
					$('#main_image').stop(false, true).animate({scrollTop: sc*PER_FOR_IMAGE}, STOP_DURATION);
				}, 50);
			},
			'scroll': function(e)
			{
				/*
				if ($('#menu_sub').scrollTop() > UL_HEIGHT*2)
				{
					var slideY = $('#menu_sub').scrollTop() - UL_HEIGHT;
					$('#menu_main').scrollTop(slideY);
					$('#menu_sub').scrollTop(slideY);
				}
				else if ($('#menu_sub').scrollTop() < UL_HEIGHT)
				{
					var slideY = $('#menu_sub').scrollTop() + UL_HEIGHT;
					$('#menu_main').scrollTop(slideY);
					$('#menu_sub').scrollTop(slideY);
				}
				*/
			}
		});

		// init
		$('#menu_main').scrollTop(UL_HEIGHT);
		$('#menu_sub').scrollTop(UL_HEIGHT);
	});
});


