function cTZListItem_index(TZObjiec) {
	htmlstr = " < li > < div class = \"message\"> < h5 > ";
	if (TZObjiec.xian) {
		htmlstr = htmlstr + "<i class=\"icon_xian\" title=\"限额： " +
			TZObjiec.limite + "\"></i>";
	}
	if (TZObjiec.xu) {
		htmlstr = htmlstr + "<i class=\"icon_xu\" title=\"续借\"></i>"
	}
	if (TZObjiec.zhi) {
		htmlstr = htmlstr + "<i class=\"icon_zhi\" title=\"质押\"></i>"
	}
	htmlstr = htmlstr + " < a href = \"" +
		TZObjiec.Link + "\">" +
		TZObjiec.Title + "</a></h5> < h6 > < b > ￥" +
		TZObjiec.amount + " < /b> < p > 投资总额 < /p> < /h6> < h6 > < b class = \"red\">" +
		TZObjiec.percent + "%</b> < p > 年化收益 < /p> < /h6> < h6 > < b > " +
		TZObjiec.dur + " < /b> < p > 贷款期限 < /p> < /h6> < h6 > < b > " +
		TZObjiec.publishTime + " < /b> < p > 发标时间 < /p> < /h6> < /div> < div class = \"operating\"><!--进度--> < div class = \"progress_red\"> < p > 融资进度： < b > " +
		((TZObjiec.amount - TZObjiec.residue) / TZObjiec.amount) * 100 + " % < /b></p > < h3 > < i style = \"width:" +
		((TZObjiec.amount - TZObjiec.residue) / TZObjiec.amount) * 100 + "%;\"></i></h3> < /div> < div class = \"invested\"><!--立即投标--> < p > 可投金额： < b > ￥" +
		TZObjiec.residue + "元 < /b> </p > < a href = \"" +
		TZObjiec.Link + "\"";
	switch TZObjiec.status {
		case "finish":
			htmlstr = htmlstr + " class=\"greenbutton3\">还款中...</a>";
			break;
		case "prepost":
			htmlstr = htmlstr + " class=\"bluebutton\">审核中...</a>";
			break;
		case "post":
			htmlstr = htmlstr + " class=\"redbutton3\">立即投资</a>";
			break;
	}
	htmlstr = htmlstr + " < /div> < /div> < /li>";
	return $(htmlstr);
}


function aTZListItem_index(index, TZObjiec) {
	TZItem = cTZListItem_index(TZObjiec);
	$("#TZList").append(TZItem);
	if (index == 4) {
		return false;
	}
}

function displayTZList_index(url) {
	$.getJSON(url, function(TZJson){
		$.each(TZJson.items,aTZListItem_index);
	})
}