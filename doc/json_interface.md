# JSON接口规格
------
## QQ客服列表JSON
QQ客服列表用于“首页”－“在线客服”中的qq客服数据
### 接口示例
`[{
	"qq":"123456789",
	"name":"客服-沙沙"
},
{
	"qq":"123456789",
	"name":"客服-晶晶"
}，
{
	"qq":"123456789",
	"name":"客服-马马"
}]`
### 说明
此JSON为array，由若干object组成，object各字段解释如下：

* qq为客服的qq号码，string
* name为客服的名字，string

***

## 公告及新闻标题JSON
提供公告及标题的集合，用于“首页”及“最新公告”的公告列表
### 接口示例
`{
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
 }`
### 说明
此JSON为object，内含一些属性和一个名为items的array。此items由若干object组成。
* category为类别，string。取值“notice”或“news”。公告类别为“notice”，新闻类别为“news”
* allNums为该类别下所有文章数，number。取值“非负”。
* page为当前页数，number。取值“大于0”。
* perpage为每页条目数，number。取值“大于0”。

___

	* items为条目标题集合，array。
	* Title为标题，string
	* Link为此文章的URL地址，string
	* Time为此文章的发布时间，string

***