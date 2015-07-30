var flag = true;
var timeout;

function showNavigation() {
	$("#show")[0].style.display = 'none';
	$("#navigation").show('slow', function() {$("#hidden")[0].style.display = 'block';});
	clearTimeout(timeout);
}

function hiddenNavigation() {
	$("#hidden")[0].style.display = 'none';
	$("#navigation").hide('slow', function() {$("#show")[0].style.display = 'block';});
	clearTimeout(timeout);
}

function bodyOnLoad() {
	setNavigationWidth();
	setNavigationByCookie();
}

function setNavigationWidth() {
	navigation.getElementsByTagName("div")[0].style.width = (window.screen.width - 223) + "px";
}

function setNavigationByCookie() {
	// 清除记录上一次点击tab
	$.cookie("lastClickTab", null);
	
	var LastVisitUserId = $.cookie("LastVisitUserId");
	
	var num = $.cookie(LastVisitUserId + "tabsCount");
	if (num == null) {
		num = 0;
		$.cookie(LastVisitUserId + "tabsCount", 0);
	}
	for (var i = num; i > 0; i--) {
		var navigationName = $.cookie(LastVisitUserId + "navigationName" + i);
		var navigationUrl = $.cookie(LastVisitUserId + "navigationUrl" + i);
		addTabs(navigationName, navigationUrl, 'flase');
	}
} 

function setCookie(name, url) {
	var LastVisitUserId = $.cookie("LastVisitUserId");
	
	var num = $.cookie(LastVisitUserId + "tabsCount");
	if (num == null) {
		num = 0;
		return;
	}
	var n = getCookie(name);
	if (n != 0) {
		return;
	}
	num++;
	$.cookie(LastVisitUserId + "tabsCount", num);
	$.cookie(LastVisitUserId + "navigationName" + num, name);
	$.cookie(LastVisitUserId + "navigationUrl" + num, url);

}

function rmCookie(name) {
	var LastVisitUserId = $.cookie("LastVisitUserId");
	
	var num = $.cookie(LastVisitUserId + "tabsCount");
	var n = getCookie(name);
	if (n != 0) {
		for (var i = n; i < num; i++) {
			$.cookie(LastVisitUserId + "navigationName" + i, $.cookie(LastVisitUserId + "navigationName" + (i+1)) );
			$.cookie(LastVisitUserId + "navigationUrl" + i, $.cookie(LastVisitUserId + "navigationUrl" + (i+1)) );
		}
		$.cookie(LastVisitUserId + "navigationName" + i, null);
		$.cookie(LastVisitUserId + "navigationUrl" + i, null);
		$.cookie(LastVisitUserId + "tabsCount", --num);
	}
	
	// 如果flag == false 即删除已经存在tab并添加新tab，因而不用隐藏导航条
	if(num == 0 && flag == true) {
		hiddenNavigation();
	}
}

function getCookie(name) {
	var LastVisitUserId = $.cookie("LastVisitUserId");
	
	var num = $.cookie(LastVisitUserId + "tabsCount");
	for (var i = 1; i <= num; i++) {
		var navigationName = $.cookie(LastVisitUserId + "navigationName" + i);
		if (navigationName == name) {
			break;
		}
	}
	if (i > num) {
		return 0;
	}
	return i;
}

// type 是否需要判断是否已经存在Tab
function addTabs(name, url, type) {
	$("#show")[0].style.display = 'none';
	$("#navigation").show('slow', function(){
		var LastVisitUserId = $.cookie("LastVisitUserId");

		// 当导航条中只剩一个tab，并且该tab再次选中
		if (type != 'flase' && $.cookie(LastVisitUserId + "tabsCount") == 1 && name == $.cookie(LastVisitUserId + "navigationName1")) {
			showNavigation();
			autoHiddenNavigation();
			return;
		}
		
		if (type != 'flase') {
			// 判断是否已经存在Tab
			var n = getCookie(name);
			if (n != 0) {
				flag = false;
				$('#navigation').tabs('close',{
					title: name,
					type: 'flase'
				});
			}
			
			// 记录add的tab
			setLastClickTab(name);
			
			autoHiddenNavigation();
		}
		
		flag = true;
		
		$('#navigation').tabs('add',{
			title: name,
			navigation: url,
			closable: true
		});
		
		if ($.cookie(LastVisitUserId + "tabsCount") > 5) {
			$('#navigation').tabs('close',{
				title: $.cookie(LastVisitUserId + "navigationName1")
			});
		}
		
		$("#hidden")[0].style.display = 'block';
	});
	
}

function autoHiddenNavigation() {
	clearTimeout(timeout);
	timeout = setTimeout(hiddenNavigation,6000);
}

function selectNextTab(title) {
	if (title != $.cookie("lastClickTab")) {
		return;
	} else {
		var i = getCookie(title);
		var LastVisitUserId = $.cookie("LastVisitUserId");
		var num = $.cookie(LastVisitUserId + "tabsCount");
		if (i == num && i == 1) {
			// 初始页面
			document.getElementById("mainRight").src = "/app/pages/innerIndex.jsp";
			return;
		}
		if (i == num && i != 1) {
			var name = $.cookie(LastVisitUserId + "navigationName" + (--i));
			$('#navigation').tabs('select',{
				title: name
			});
			return;
		}
		if (i != num) {
			var name = $.cookie(LastVisitUserId + "navigationName" + num);
			$('#navigation').tabs('select',{
				title: name
			});
			return;
		}
	}
}

// 记录上一次点击tab
function setLastClickTab(title) {
	$.cookie("lastClickTab", title);
}

jQuery.cookie = function(name, value, options) {
	if (typeof value != 'undefined') {
		options = options || {};
		
		if (value === null) {
    		value = '';
    		options = $.extend({}, options);
    		options.expires = -1;
    	}
    	
    	var expires = '';
    	if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
    		var date;
    		if (typeof options.expires == 'number') {
     			date = new Date();
     			date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
    		} else {
     			date = options.expires;
    		}
   			 expires = '; expires=' + date.toUTCString();
   		} else {
   			// modify by xujiakun 2009-12-07
   			date = new Date();
     		date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
     		expires = '; expires=' + date.toUTCString();
   		}
   		
   		var path = options.path ? '; path=' + (options.path) : '';
   		var domain = options.domain ? '; domain=' + (options.domain) : '';
   		var secure = options.secure ? '; secure' : '';
   		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
		
	} else {
		var cookieValue = null;
   		if (document.cookie && document.cookie != '') {
    		var cookies = document.cookie.split(';');
    		for (var i = 0; i < cookies.length; i++) {
     			var cookie = jQuery.trim(cookies[i]);
     			if (cookie.substring(0, name.length + 1) == (name + '=')) {
      				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
      				break;
     			}
    		}
   		}
   		return cookieValue;
	}
};
