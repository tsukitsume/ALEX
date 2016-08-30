/**
 * ====================
 * TopController
 * ====================
 */
app.controller('TopController', function($scope, $http, SharedData, $timeout)
{
	$scope.loggedin = isLoggedIn();

	$scope.menuMain = MENUS;
	var LI_HEIGHT = 40;
	var LI_HALF   = LI_HEIGHT / 2;
	var LI_COUNT  = $scope.menuMain.length;

	ons.ready(function()
	{
		$timeout(function()
		{
			var touchY = 0;
			var slideY = LI_HEIGHT;

			$('#menu_sub').css({height: (LI_COUNT-1) * LI_HEIGHT});
			$('#menu_main').css({bottom: (LI_COUNT-1) * LI_HEIGHT});
			$('#menu_sub').scrollTop(LI_HEIGHT);
			var IMAGE_HEIGHT = $('#main_content').height() - $('#menu_sub').height();
			$('#main_image').height( IMAGE_HEIGHT );
			var PER_FOR_IMAGE = IMAGE_HEIGHT/LI_HEIGHT;

			$('#main_image li:first-child').before($('#main_image li:last-child'));
			$('#menu_main li:first-child').before($('#menu_main li:last-child'));
			$('#main_image').scrollTop(IMAGE_HEIGHT);
			$('#menu_main').scrollTop(LI_HEIGHT);

			var scrollTo = 0;
			var interval = null;

			$('#menu_sub li').off();
			$('#menu_sub li').on('click', function(e)
			{
				console.log('click');
				if (interval) clearInterval(interval);
				// scrollTo = $('#menu_sub').scrollTop() + $(e.target).offset().top - $('#menu_sub').offset().top + LI_HEIGHT;
				scrollTo = $(e.target).offset().top - $('#menu_sub').offset().top + LI_HEIGHT;

				console.log(scrollTo);

				interval = setInterval(function()
				{
					console.log(scrollTo);
					scrollTo-=10;
					slideY+=10;
					move();
					if (scrollTo <= 0)
					{
						clearInterval(interval);
					}
				}, 10);
				// $('#menu_sub').scrollTop(slideY);

			//	$('#menu_sub').stop(false, true).animate({scrollTop: slideY},1000);
			});

			$('#menu_sub').off();
			$('#menu_sub').on(
			{
				/* フリック開始時 */
				'touchstart': function(e)
				{
					console.log('touchstart');
					clearInterval(interval);
					touchY = event.changedTouches[0].pageY;
					slideY = $('#menu_sub').scrollTop();
				},
				/* フリック中 */
				'touchmove': function(e)
				{
					e.preventDefault();
					slideY = slideY + (touchY - event.changedTouches[0].pageY );
					touchY = event.changedTouches[0].pageY;

					move();
				},
				/* フリック終了 */
				'touchend': function(e)
				{
					setTimeout(function ()
					{
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
						$('#menu_sub').stop(false, true).animate({scrollTop: sc}, 50);
						$('#menu_main').stop(false, true).animate({scrollTop: sc}, 50);
						$('#main_image').stop(false, true).animate({scrollTop: sc*PER_FOR_IMAGE}, 50);
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

			function move()
			{
				console.log(slideY);
					if (slideY > LI_HEIGHT*2)
					{
						$('#menu_sub li:last-child').after($('#menu_sub li:first-child'));
						$('#menu_main li:last-child').after($('#menu_main li:first-child'));
						$('#main_image li:last-child').after($('#main_image li:first-child'));
						slideY -= LI_HEIGHT;
					}
					else if (slideY < 20)
					{
						$('#menu_sub li:first-child').before($('#menu_sub li:last-child'));
						$('#menu_main li:first-child').before($('#menu_main li:last-child'));
						$('#main_image li:first-child').before($('#main_image li:last-child'));
						slideY += LI_HEIGHT;
					}

					/*
					if (slideY > UL_HEIGHT*2 + LI_HEIGHT)
					{
						slideY = slideY - UL_HEIGHT;
					}
					else if (slideY < UL_HEIGHT - LI_HEIGHT)
					{
						slideY = slideY + UL_HEIGHT;
					}
					*/

					$('#menu_sub').scrollTop(slideY);
					$('#menu_main').scrollTop(slideY);
					$('#main_image').scrollTop(slideY * PER_FOR_IMAGE);
			}

		});
	});

		/*
	$('#menu_sub').on('scroll', function()
	{
		var sc_top = $('#menu_sub').scrollTop();
		if (sc_top > LI_HEIGHT)
		{
			$('#menu_sub').scrollTop( sc_top - LI_HEIGHT);
			$('#menu_sub li:last-child').after($('#menu_sub li:first-child'));
		}
	});
	*/
});

