function enterToTab()//if key 'Enter' is down
{
   if(event.keyCode==13)
    event.keyCode = 9;
}
function processArrow(opt, index, column)
{
	//donothing
	//alert(event.keyCode);
	alert("tt");
	var newIndex=index;
	var newColumn=column;
	var needProcess=true;

	switch (event.keyCode)
	{
	case 38: //arrow up
		if (index>0)
		{
			if (columnType[column]=="select")
			{
				newIndex=index;
			}
			else
			{
				newIndex=index-1;
			}
		}
		break;
	case 37: //arrow left
		if (column>0) newColumn=column-1;
		if (column==0&&index!=0)
		{
			newColumn = columnName.length-1;
			newIndex = index-1;
		}
		break;
	case 39: //arrow right
		if (column==(columnName.length-1))
		{
			newIndex=index+1;
			newColumn=0;
		}
		else
		{
			newColumn++;
		}
		break;
	case 40: //arrow down
		if (columnType[column]=="select") //filter the select type drop down, because arrow down is making selection
		{
			newIndex=index;
		}
		else
		{
			newIndex=index+1;
		}
		break;
	default: needProcess=false; //do nothing
		break;

	}
	//alert(needProcess);
	if (needProcess)
	{
		//alert("cform." + columnName[newColumn] + newIndex);
		var temp = eval("document.cform."+columnName[newColumn] + newIndex);
		if (temp)
		{
			if (temp.readOnly==true)
			{
				//recursion if the object readonly is true, find next available item
				processArrow(opt, newIndex, newColumn);
			}
			else
			{
				temp.focus();
				if (columnType[newColumn]!="select") temp.select();
			}
			//alert("select");

		}
	}

}

function processPageShortcut()
{

	var obj;
	switch (event.keyCode)
	{
	case 113: //save shortcut F2
		if (null!=shortcut[2]&&shortcut[2]!="")
		{
			obj = shortcut[2];
			callObj(obj);
		}
		break;
	case 118: //add shortcut F7
		if (null!=shortcut[7]&&shortcut[7]!="")
		{
			obj = shortcut[7];
			callObj(obj);
		}
		break;
	case 119: //modify shortcut F8
		if (null!=shortcut[8]&&shortcut[8]!="")
		{
			obj = shortcut[8];
			callObj(obj);
		}
		break;
	case 120: //submit shortcut F9
		if (null!=shortcut[9]&&shortcut[9]!="")
		{
			obj = shortcut[9];
			callObj(obj);
		}
		break;
	default: //doing nothing
	}

}

function processPopup(obj)
{
	if (event.keyCode==114)
	{
		callObj(obj);
	}

}
function callObj(callit)
{

	if (window.isInProcess&&isInProcess=="ProcessStarted")
	{
		//already started, do nothing
		return false;
	}
	if (window.isInProcess&&isInProcess=="ProcessStoped")
	{
		//Process stopped can run
		isInProcess="ProcessStarted";
	}

	var obj = eval(callit);
	event.keyCode=0;
	event.returnValue = false;

	if (obj==false && window.isInProcess)
	{
		//alert("false1");
		isInProcess = "ProcessStoped";
	}



}