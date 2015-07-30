function SortByTimeDec(jsonArray) {
	jsonArray.sort(function(a, b) {
		return parseDate(b.time).getTime() - parseDate(a.time).getTime()
	});
	return jsonArray;
}