//字符过长
function checkLong(obj,num)
{
	if(obj.value.length>num)
	{
		alert('输入字符过长');
		return false;
	}	
}
//限制整数
function limitNum(obj) 
{
	if(obj.value.replace(/[\d+]/ig,"").length>0) 
	{
    	alert('输入有误，请重新输入！');
    	return obj.value;
	}
	else
		return obj.value;
}
//限制浮点数
function limitFloat(obj)
{
	if(isNaN(obj.value))
	{
		alert('输入有误，请重新输入！');
		return obj.value;
	}
	else
		return obj.value;	
}