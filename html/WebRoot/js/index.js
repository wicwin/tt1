function initIndex() {
	initQQBar("qqlist");
}


/**
 *通过json初始化qq克服列表
 *json结构为
 *[{"qq":"123456789","name":"客服-沙沙"},{"qq":"123456789","name":"客服-晶晶"}，{"qq":"123456789","name":"客服-马马"}]
 **/
function initQQBar(url) {
	//	$("div.os_main").html("加载中...");
	$.getJSON(url, displayQQBar);
}

function displayQQBar(kefu, status, xhr) {
	function creatQQitem(kefuJSON) {
		QQitem = $("<a target=\"_blank\" href=\"http://wpa.qq.com/msgrd?v=3&uin=" +
			kefu.qq + "&site=qq&menu=yes\" title=\"点击这里发消息给我\">" +
			kefu.name + "</a>");
		return QQitem;
	}

	function addQQitem(index, item) {
		QQitem = creatQQitem(item);
		$("div.os_main").append(QQitem);

		if (index == 4) return false; //最多显示5个qq客服
	}
	$("div.os_main").html("");
	$.each(kefu, addQQitem)
}


/*
 *通过json初始化网站公告及公告栏
 *json结构为
 *({
 	"category":"notice",
 	"allNums":108,
	"page":1,
	"perpage":10,
	"items":[
	{
		"Title":"图腾贷收费标准",
		"Link":"/notice?id=987",
		"Time":"2015-07-24T12:03:09Z"
	},
	{
		"Title":"图腾贷收费标准",
		"Link":"/notice?id=987",
		"Time":"2015-07-24T12:03:09Z"
	},
	{
		"Title":"图腾贷收费标准",
		"Link":"/notice?id=987",
		"Time":"2015-07-24T12:03:09Z"
	}]
 })
 **/
function initNotices(url) {
	$.getJSON(url, ctNotices)
}

function ctNotices(Noticesdata, status, xhr) {
	Notices = SortByTimeDec(Noticesdata.items);
	dpNoticesbar(Notices);
	dpNoticesbar(Notices);
}

function dpNoticesbar(Notices) {
	function createNoticesBarItem(NoticeObject) {
		NoticesBarItem = $("<li><i class=\"icon_smile\"></i><a href=\"" +
			NoticeObject.Link + "\">" +
			NoticeObject.Title + "</a></li>");
		return NoticesBarItem;
	}

	function addNoticesBarItem(index, NoticeObject) {
		NoticesBarItem = creatQQitem(NoticeObject);
		$("#NoticesBar").append(NoticesBarItem);
		if (index == 6) return false; //最多显示7条公告
	}
	$("#NoticeBar").html("");
	$.each(Notices, addNoticesBarItem);
}

function dpNotices(Notices) {
	function createNoticesItem(NoticeObject) {
		NoticesBarItem = $("<li><a href=\"" +
			NoticeObject.Link + "\">" +
			NoticeObject.Title + "</a></li>");
		return NoticesBarItem;
	}

	function addNoticesItem(index, NoticeObject) {
		NoticesItem = creatQQitem(NoticeObject);
		$("#notice-tab").append(NoticesItem);
		if (index == 6) return false; //最多显示7条公告
	}
	$("#notice-tab").html("");
	$.each(Notices, addNoticesItem);
}