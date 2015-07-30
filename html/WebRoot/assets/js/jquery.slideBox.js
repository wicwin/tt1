/**
* $.slideBox
* @extends jquery.1.7.2
* @fileOverview tt1骞荤伅鐗�
* @author glen.luo
* @site wwww.tt1.com.cn
* @version 0.1
* @date 2014-08-21
* @example
* $("div.focus").slideBox();
*/
;(function($) {
	$.fn.slideBox = function(options) {
		//榛樿鍙傛暟
		var defaults = {
			direction   : 'left',//left,top
			duration    : 0.6,//unit             : seconds
			easing      : 'swing',//swing,linear
			delay       : 10,//unit               : seconds
			startIndex  : 0,
			bottomBar   : 'ul.focus_index',
			itemSelecter: 'ul.focus_main',
            activeClass : 'on',
			width       : null,
			height      : null,
            position    : 'relative'
		};

		var settings = $.extend(defaults, options || {});
		//璁＄畻鐩稿叧鏁版嵁
		var wrapper = $(this),
            ul = wrapper.children(settings.itemSelecter),
            lis = ul.find('li');

        var numsBar = null;
        if (settings.bottomBar.length > 0) {
            numsBar = $(settings.bottomBar, wrapper);
        }

		var li_num = lis.size(),
            li_height = 0,
            li_width = 0,
		    order_by = 'ASC';
		//鍒濆鍖�
		var init = function(){
			if(!wrapper.size()) return false;
            /*璁＄畻婊氬姩椤圭殑楂樺害锛屽搴�*/
			li_height = settings.height ? settings.height : lis.first().height();
			li_width = settings.width ? settings.width : lis.first().width();

			li_outerHeight = lis.first().outerHeight();
			li_outerWidth = lis.first().outerWidth();

			ul.css('position', settings.position);
            /*ul.css('position', 'absolute');*/
			if (settings.direction == 'left') {
    			wrapper.css({width: li_outerWidth+'px', overflow: 'hidden'});
				ul.css('width', li_num * li_outerWidth + 'px')
			    lis.css('float', 'left');
                lis.css({width: li_width+'px'});
			} else {
    			wrapper.css({height: li_outerHeight+'px', overflow: 'hidden'});
				ul.css('height', li_num * li_outerHeight + 'px');
                lis.css({height:li_height+'px'});
			}
			ul.find('li:eq('+settings.startIndex+')').addClass('active');

            if (numsBar !== null && numsBar.length > 0) {
                lis.each(function(i, n) {
                    var css = '';

                    i == settings.startIndex && (css = settings.activeClass);

                    $('<li>')
                        .addClass(css)
                        .mouseover(function(){
                            $(this)
                                .addClass(settings.activeClass)
                                .siblings()
                                .removeClass(settings.activeClass);

                            ul
                                .find('li:eq('+$(this).index()+')')
                                .addClass(settings.activeClass)
                                .siblings()
                                .removeClass(settings.activeClass);
                            start();
                            stop();
                    }).appendTo(numsBar);
                });
            }

            lis.size()>1 && start();
		}
		//寮€濮嬭疆鎾�
		var start = function() {
			var active = ul.find('li.active');
			var index = active.index();
			if(settings.direction == 'left'){
				offset = index * li_width * -1;
				param = {'left':offset + 'px' };
			}else{
				offset = index * li_height * -1;
				param = {'top':offset + 'px' };
			}

            if (numsBar !== null && numsBar.length > 0) {
                numsBar.find('li:eq('+index+')')
                    .addClass(settings.activeClass)
                    .siblings()
                    .removeClass(settings.activeClass);
            }

			ul.stop().animate(param, settings.duration*1000, settings.easing, function() {
				active.removeClass('active');
				if(order_by=='ASC'){
					if (active.next().size()){
						active.next().addClass('active');
					}else{
						order_by = 'DESC';
						active.prev().addClass('active');
					}
				}else if(order_by=='DESC'){
					if (active.prev().size()){
						active.prev().addClass('active');
					}else{
						order_by = 'ASC';
						active.next().addClass('active');
					}
				}
			});
			wrapper.data('timeid', window.setTimeout(start, settings.delay*1000));
		};
		//鍋滄杞挱
		var stop = function() {
            /*console.log(wrapper.data('timeid'));*/
			window.clearTimeout(wrapper.data('timeid'));
		};
		//榧犳爣缁忚繃浜嬩欢
		wrapper.hover(function(){
            /*console.log('stop wrapper锛�', wrapper);*/
			stop();
		}, function(){
            /*console.log('start wrapper锛�', wrapper);*/
			wrapper.data('timeid', window.setTimeout(start, settings.delay*1000));
			/*window.setTimeout(start, settings.delay*1000);//ADD.JENA.201303141309*/
		});

		init();
	};
})(jQuery);