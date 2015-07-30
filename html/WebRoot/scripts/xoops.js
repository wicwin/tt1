/* 
 * 导出指定的表格到EXCEL
 * Create by wsy 2005-08-29
 */
function AutomateExcel(atblData){ 
	// 取得EXCEL对像. 
	var oXL = new ActiveXObject("Excel.Application"); 
	// 取得工作表对像. 
	var oWB = oXL.Workbooks.Add(); 
	var oSheet = oWB.ActiveSheet; 
	var table = atblData; 
	var hang = table.rows.length; 
	var lie = table.rows(0).cells.length; 

	// 导出内容. 
	for (i=0;i<hang;i++){ 
		for (j=0;j<lie;j++){ 
			tmpstr = table.rows(i).cells(j).innerText; 
			if(isNaN(tmpstr)){
				oSheet.Cells(i+1,j+1).value = tmpstr
			}else{
				oSheet.Cells(i+1,j+1).value = "'" + tmpstr
			} 
		} 
	} 
	oXL.Visible = true; 
	oXL.UserControl = true; 
} 

/* 
 * 比较两个日期的大小,dateA和dateB为时间域名
 * 日期格式如：2004-05-04
 * 如果dateA等于dateB返回0,dateA大于dateB返回1,dateA小于dateB返回2,出错返回-1
 * Create by wsy 2005-08-19
 */
function CheckDateSize(dateA,dateB){

	var Itemx_dateA = MM_findObj(dateA);
	var Itemx_dateB = MM_findObj(dateB);
	
	if (Itemx_dateA == null){
		alert( "表单项:" + dateA + "未定义,无法判断用户选择的数据!");
		return -1;
	}
	if (Itemx_dateB == null){
		alert( "表单项:" + dateB + "未定义,无法判断用户选择的数据!");
		return -1;
	}
		
	var s,t,yy,mm,dd;
	//dateA时间
	var d = Itemx_dateA.value;
	var s = d.indexOf("-");	
	var yy = d.substring(0,s);
	
	t = s+1;
	s = d.indexOf("-",t);	
	mm = d.substring(t,s)-1;

	dd = d.substring(s+1,d.length);
	
	var dA = new Date(yy,mm,dd);

	//dateB时间
	d = Itemx_dateB.value;
	var s = d.indexOf("-");	
	var yy = d.substring(0,s);
	
	t=s+1;
	s = d.indexOf("-",t);	
	mm = d.substring(t,s)-1;
	dd = d.substring(s+1,d.length);
	
	var dB = new Date(yy,mm,dd);
	

	if(dA-dB==0)return 0;	//时间相等
	if(dA-dB>0)return 1;	//dateA大于dagdB
	if(dA-dB<0)return 2;	//dateA小于dagdB
}

/* 
 * 检测日期中的月和日的正确性
 * 日期格式如：2004-05-04
 * Create by wsy
 */
function datecheck(val){
	var mydate = val.split("-");
	var year;	//取得是否为润年
	if((mydate[0]%4 == 0 && mydate[0]%100 != 0) || mydate[0]%400 == 0){
		year = 0;
	}else{
		year = 1;
	}
	var month = mydate[1];	//取得日期中的月份
	var day = mydate[2];	//取得日期中的日
	if(month>12 || month == 0 || day == 0){return  false;}
	if(month==4||month==6||month==9||month==11){
		if(day>30)return  false;
		else return  true;
	}else if(month==2){
			if(year==0&&day>29)  //润月天数
				return  false;  
			else if(year!=0&&day>28)return  false;
			else	return  true;  
           }else{
			if(day>31)return  false;
			else	return  true;  
           }
}


//*******************************************************
//
//取得文本输入框中的值
//*******************************************************
function GetTextValue(itemname){

	var itemx = MM_findObj(itemname);
	if (itemx != null){
		if (itemx.value == ""){
			return "";
		}else{
			return itemx.value;
		}
	}else{
		return "表单项:" + itemname + "未定义,无法判断用户输入的数据!";
	}

}


/* 
 * 把身份证字段里包括的生日取出并赋到生日字段里
 * IDCard为身份证号码字段名，Birthday为生日字段名
 * Create by wsy
 */
function GetBirthdayFormIDCard(IDCard,Birthday){
	
	var Itemx_IDCard = MM_findObj(IDCard);
	if(Itemx_IDCard != null){
		if(Itemx_IDCard.value.length!=15 && Itemx_IDCard.value.length!=18){
			alert("身份证位数不正确,请重新输入");
			Itemx_IDCard.focus();
		}else{
			//从身份证计算生日
			var strdate;
			if(Itemx_IDCard.value.length==15){
				tmpstr = Itemx_IDCard.value.substr(6,6);
				strdate = "19" + tmpstr.substr(0,2) + "-" + tmpstr.substr(2,2) + "-" + tmpstr.substr(4,2)
			}
			else if(Itemx_IDCard.value.length==18){
				tmpstr = Itemx_IDCard.value.substr(6,8);
				strdate = tmpstr.substr(0,4) + "-" + tmpstr.substr(4,2) + "-" + tmpstr.substr(6,2)
			}
			
			if(datecheck(strdate)==false){
				alert("身份证号码不正确,请重新输入");
				Itemx_IDCard.focus();
			}else{
				//把值赋到生日字段里面
				var itemx_Birthday = MM_findObj("Birthday");
				if (itemx_Birthday != null){
					itemx_Birthday.value = strdate
				}
			}
		}
	
	}

}

//------------------------------------
//检测用户输入的资料是否为字符或数字
//------------------------------------
function check_onlyAtoZand0to9(str,promptmsg){
	var re=/\W/g;  //匹配任何非字字符。与 "[^A-Za-z0-9_]" 等效。 
	if(re.test(str)){
		return promptmsg + "内容必须是字母或数字，请重新输入\n";
	}else{
		return "";
	}
}

//*******************************************************
//
//显示发布信息
//*******************************************************
function showme(e){
   if (e.style.display == "none") {
	   e.style.display = "";
	 } else {
	   e.style.display = "none";
	 }
}


//******************************************************
//add by cjy 2006-6-13
//调用log资料函数(使用一个表单打开办理文档)
//******************************************************
function openlog_withform(address,widthx,hightx){

			var d,t;
			d = new Date();
			t = d.getTime();
			var URL = Sys_PATH + "\\" + address + "&t=" + t;
	
			var windowhight = hightx;
			var windowwidth = widthx;
			var top = (window.screen.availHeight - windowhight)/2;
			var left = (window.screen.availWidth - windowwidth)/2;

			openWindow(URL,'openviewerlog','Height=' + windowhight + ',Left=' + left + ',Top='+ top +',Width=' + windowwidth + ',scrollbars=1,status=no,toolbar=no,menubar=no,location=no');
}


//*******************************************************
//
//显示发布信息
//*******************************************************
function showme_withaction(e,action){
   if (action == "show") {
	   e.style.display = "";
	 } else {
	   e.style.display = "none";
	 }
}
//------------------------------------
//进行半角的输入检测
//------------------------------------
function checkIsChinese(str)
{
    //如果值为空，通过校验
    if (str == "")
        return false;

    var pattern = /^([\u4E00-\u9FA5]|[\uFE30-\uFFA0])*$/gi;
    if (pattern.test(str))
        return true;
    else
        return false;
}
//------------------------------------
//替换传入参数中的全角字符转换为相应的半角字符
//------------------------------------
function meizz(str){
    var tmp = "";
    for(var i=0;i<str.length;i++)
    {
        if(str.charCodeAt(i)>65248)
        {
            tmp+=String.fromCharCode(str.charCodeAt(i)-65248);
        }
        else
        {
            tmp+=str.charAt(i);
        }
    }
    return tmp;
}

//*******************************************************
//
//判断填写的内容是否正确的手机号码(11位)
//*******************************************************
function istelenumberpass(itemname,promptmsg){

	var itemx = MM_findObj(itemname);
	if (itemx != null){
		//手机号码为11位
		if (itemx.value.length == 11 || itemx.value.length == 0){
			return "";
		}else{
			itemx.focus();
			return promptmsg + "\n";
		}

	}else{
		return "表单项:" + itemname + "未定义,无法判断用户输入的数据!";
	}
}


//*******************************************************
//
//取得选中的单选框的值
//*******************************************************
function getselectedvalue_radiobutton(itemname){
	var itemx = MM_findObj(itemname);
	if (itemx != null){
		for (var i=0;i<itemx.length;i++){
			if (itemx[i].checked == true){
				return itemx[i].value;
			}
		}

		return "";
	}else{
		return "表单项:" + itemname + "未定义,无法判断用户输入的数据!";
	}
}


//*******************************************************
//
//取得选中的复选框的值
//*******************************************************
function getselectedvalue_checkbox(itemname){
	var itemx = MM_findObj(itemname);
	if (itemx != null){
		var tmpstr = "";
		for (var i=0;i<itemx.length;i++){
			if (itemx[i].checked == true){
				if(tmpstr == ""){
					tmpstr = itemx[i].value;
				}else{
					tmpstr += ";" + itemx[i].value;
				}
			}
		}

		return tmpstr;
	}else{
		return "表单项:" + itemname + "未定义,无法判断用户输入的数据!";
	}
}

//*******************************************************
//
//取得选中的下拉框的值
//*******************************************************
function getselectedvalue_select(itemname){
	var itemx = MM_findObj(itemname);
	if (itemx != null){
		return itemx[itemx.selectedIndex].value;
	}else{
		return "表单项:" + itemname + "未定义,无法判断用户输入的数据!";
	}
}

//*******************************************************
//
//判断填写的内容是否正确的身份证号码
//*******************************************************
function issfzidpass(itemname,promptmsg){

	var itemx = MM_findObj(itemname);
	if (itemx != null){
		if (itemx.value.length == 15 || itemx.value.length == 18){
			return "";
		}else{
			itemx.focus();
			return promptmsg + "\n";
		}
	}else{
		return "表单项:" + itemname + "未定义,无法判断用户输入的数据!";
	}
}


//******************************************************
//add by lanhua 2005.01.31
//调用打开发送短消息的窗口函数
//******************************************************
function SendSMS(name)//发送短信息

{
  var judge = window.confirm("要给"+name+"发短信息？");
  if(judge)
  {
    window.open("/oadata/SMS.nsf/Document?OpenForm&Sendto="+name,"_blank");
  }
}

//******************************************************
//add by cjy 2005.04.29 ,Zn_name:表示中文名称，name:表示全部名称
//调用打开发送短消息的窗口函数
//******************************************************
function SendSMS_New(Zn_name,name)//发送短信息

{
  var judge = window.confirm("要给"+Zn_name+"发短信息？");
  if(judge)
  {
    window.open("\\" + Sys_PATH + "/SMS.nsf/Document?OpenForm&Sendto="+name + "&Zn_name=" + Zn_name,"_blank");
  }
}


//******************************************************
//add by ysq 2005.4.21
//调用打开发送短消息的窗口函数(demo用)
//******************************************************
function SendSMS_demo(name)//发送短信息

{
  var judge = window.confirm("要给"+name+"发短信息？");
  if(judge)
  {
    window.open("/demo/SMS.nsf/Document?OpenForm&Sendto="+name,"_blank");
  }
}

//******************************************************
//add by xiefeng 2003.09.01
//调用打开模式窗口函数
//******************************************************
function ModalDialog(address){

			var d,t;
			d = new Date();
			t = d.getTime();
			var URL = "\\" + address + "&t=" + t;
	
			var windowhight = 400;
			var windowwidth = 450;
			var top = (window.screen.availHeight - windowhight)/2;
			var left = (window.screen.availWidth - windowwidth)/2;
			var rtv = window.showModalDialog(URL,"",'dialogHeight:' + windowhight + 'px;dialogLeft:' + left + 'px;dialogTop:'+ top +'px;dialogWidth:' + windowwidth + 'px;center:yes;resizable:no;status:no;');
			
			
			if(typeof(rtv)!='undefined'){
			
				for(var i=0;i < rtv.length;i++){
				
				}
			
			}
	
}

//******************************************************
//add by xiefeng 2004.09.10
//打开指定用户的操作历史记录文档
//******************************************************
function getUserActionHistory(UserName){
	var URL = "";
	//返回当前用户所在部门的成员
	URL = 'f_public_openattach?OpenForm';
	URL += '&Title=用户操作历史记录';
	URL += '&AttachFormName=f_useractionhistory';
	URL += '&ParentUNID=' + UserName;
	URL += '&APPDB=e_userlogin_log.nsf';
	URL += '&EditMode=0';
	URL += '&AllowCreate=1';
     openSelectAttach(URL,550,400);
}


//******************************************************
//add by xiefeng 2003.09.01
//调用打开窗口函数
//******************************************************
function openWindow(address,winName,features){

			var d,t;
			d = new Date();
			t = d.getTime();
			var URL = "\\" + address + "&t=" + t;
			window.MM_openBrWindow(URL,winName,features);
	
}


//******************************************************
//add by cjy 2005.03.07
//调用多选框资料函数(应用于流程配置库，弹出流向对话框)
//******************************************************
function openmultiSelect_withFlow(itemname,address){

	var item = MM_findObj(itemname);
	var item_show = MM_findObj(itemname + "_Show");
	if (item != null && item_show!=null){

			var d,t;
			d = new Date();
			t = d.getTime();
			address += "&ItemName=" + itemname;
			var URL = "\\" + Sys_PATH + "\\FlowConfig.nsf\\" + address + "&t=" + t;

		       
			var windowhight = 450;
			var windowwidth = 520;
			var top = (window.screen.availHeight - windowhight)/2;
			var left = (window.screen.availWidth - windowwidth)/2;
		   
			window.open(URL,'openmultiSelect_withFlow','Height=' + windowhight + ',Left=' + left + ',Top='+ top +',Width=' + windowwidth + ',scrollbars=no,status=no,toolbar=no,menubar=no,location=no');
		}else{
			alert("表单项:" + itemname + "或" + itemname + "_Show" +"未定义,无法取值!");
		}
	
}



function openmultiSelect_withclient(itemname,address){

	var item = MM_findObj(itemname);
	var item_show = MM_findObj(itemname + "_Show");
	if (item != null && item_show!=null){

			var d,t;
			d = new Date();
			t = d.getTime();
			address += "&ItemName=" + itemname;
			var URL = "\\" + Sys_PATH + "\\e_SalesWorkDaily.nsf\\" + address + "&t=" + t;

		       
			var windowhight = 450;
			var windowwidth = 520;
			var top = (window.screen.availHeight - windowhight)/2;
			var left = (window.screen.availWidth - windowwidth)/2;
		   
			window.open(URL,'openmultiSelect_withclient','Height=' + windowhight + ',Left=' + left + ',Top='+ top +',Width=' + windowwidth + ',scrollbars=no,status=no,toolbar=no,menubar=no,location=no');
		}else{
			alert("表单项:" + itemname + "或" + itemname + "_Show" +"未定义,无法取值!");
		}
	
}




//******************************************************
//add by cjy 2005.03.07
//调用B2B，弹出流向对话框)
//******************************************************
function openprovideb2bdetail(address){

			var d,t;
			d = new Date();
			t = d.getTime();		
			var URL = "\\" + Sys_PATH + "\\provide_protal.nsf\\" + address + "&t=" + t;
     
			var windowhight = 250;
			var windowwidth = 780;
			var top = (window.screen.availHeight - windowhight)/2;
			var left = (window.screen.availWidth - windowwidth)/2;
		   
			window.open(URL,'openmultiSelect_withFlow','Height=' + windowhight + ',Left=' + left + ',Top='+ top +',Width=' + windowwidth + ',scrollbars=1,status=no,toolbar=no,menubar=no,location=no,resizable=yes');
	
}


//******************************************************
//add by xiefeng 2004.09.10
//调用打开窗口函数
//******************************************************
function openWindow_new(address,winName,features){

			var d,t;
			d = new Date();
			t = d.getTime();
			var URL = address + "&t=" + t;
			var windowhight = 650;
			var windowwidth = 320;
			var top = (window.screen.availHeight - windowhight)/2;
			var left = (window.screen.availWidth - windowwidth)/2;
		   
			openWindow(URL,'openviewerlog','Height=' + windowhight + ',Left=' + left + ',Top='+ top +',Width=' + windowwidth + ',scrollbars=1,status=no,toolbar=no,menubar=no,location=no');
			//window.MM_openBrWindow(URL,winName,features);
	
}


//******************************************************
//add by cjy 2004.10.17
//调用打开窗口函数
//******************************************************
function openWindow_produce(address,winName,features){

			var d,t;
			d = new Date();
			t = d.getTime();
			var URL = address + "&t=" + t;
			var windowhight = 450;
			var windowwidth = 800;
			var top = (window.screen.availHeight - windowhight)/2;
			var left = (window.screen.availWidth - windowwidth)/2;
		   
			openWindow(URL,'openviewerlog','Height=' + windowhight + ',Left=' + left + ',Top='+ top +',Width=' + windowwidth + ',scrollbars=1,status=no,toolbar=no,menubar=no,location=no');
			//window.MM_openBrWindow(URL,winName,features);
	
}

//******************************************************
//add by xiefeng 2003.09.01
//调用log资料函数
//******************************************************
function openSelectAttach(address,widthx,hightx){

			var d,t;
			d = new Date();
			t = d.getTime();
			var URL = Sys_PATH + "\\Sys_Datacenter.nsf\\" + address + "&t=" + t;
	
			var windowhight = hightx;
			var windowwidth = widthx;
			var top = (window.screen.availHeight - windowhight)/2;
			var left = (window.screen.availWidth - windowwidth)/2;

			openWindow(URL,'openviewerlog','Height=' + windowhight + ',Left=' + left + ',Top='+ top +',Width=' + windowwidth + ',scrollbars=1,status=no,toolbar=no,menubar=no,location=no');
}

//******************************************************
//add by houlf 2005.04.15
//调用个人收藏夹类别选项窗
//******************************************************
function openFavorableSelect(address){
	var d,t;
	d = new Date();
	t = d.getTime();
	var URL = "\\" + Sys_PATH + "\\Sys_Datacenter.nsf\\" + address + "&t=" + t;
	      
	var windowhight = 450;
	var windowwidth = 520;
	var top = (window.screen.availHeight - windowhight)/2;
	var left = (window.screen.availWidth - windowwidth)/2;
		   
	var rtv = window.open(URL,'openviewerlog','Height=' + windowhight + ',Left=' + left + ',Top='+ top +',Width=' + windowwidth + ',scrollbars=1,status=no,toolbar=no,menubar=no,location=no');
}

//******************************************************
//add by xiefeng 2003.09.01
//调用多选框资料函数
//******************************************************
function openmultiSelect(itemname,address){

	//新版本的弹出对话框不需要再传入URL的值
	address = address.replace("&URL", "&ToForm");

	var item = MM_findObj(itemname);
	var item_show = MM_findObj(itemname + "_Show");
	if (item != null && item_show!=null){
			var d,t;
			d = new Date();
			t = d.getTime();
			var URL = "\\" + Sys_PATH + "\\Sys_Datacenter.nsf\\" + address + "&t=" + t;
	       
			var windowhight = 450;
			var windowwidth = 520;
			var top = (window.screen.availHeight - windowhight)/2;
			var left = (window.screen.availWidth - windowwidth)/2;
		   
			var rtv = window.showModalDialog(URL,item.value,'dialogHeight:' + windowhight + 'px;dialogLeft:' + left + 'px;dialogTop:'+ top +'px;dialogWidth:' + windowwidth + 'px;center:yes;resizable:no;status:no;');

			if(typeof(rtv)!='undefined'){
				var v = "";
				var v_show="";
			
				for(var i=0;i < rtv.length;i++){
					var itemreturn = rtv[i];
					v_show += itemreturn[1] + ";";			//显示的值
					v += itemreturn[0] + ";";				//实际保存的值
				}
			
				v = v.substr(0,v.length-1);
				v_show = v_show.substr(0,v_show.length-1);
				
				item.value = v;
				item_show.value = v_show;

				return rtv.length;
			}
		}else{
			alert("表单项:" + itemname + "或" + itemname + "_Show" +"未定义,无法取值!");
		}
	
}


//******************************************************
//add by xiefeng 2003.09.01
//调用多选框资料函数_OpenWindow版本
//******************************************************
function openmultiSelect_Openwindow(itemname,address){
	var item = MM_findObj(itemname);
	var item_show = MM_findObj(itemname + "_Show");
	if (item != null && item_show!=null){

			var d,t;
			d = new Date();
			t = d.getTime();
			address += "&ItemName=" + itemname;
			var URL = "\\" + Sys_PATH + "\\Sys_Datacenter.nsf\\" + address + "&t=" + t;
	       
			var windowhight = 450;
			var windowwidth = 520;
			var top = (window.screen.availHeight - windowhight)/2;
			var left = (window.screen.availWidth - windowwidth)/2;
		   
			window.open(URL,'openmultiSelect_Openwindow','Height=' + windowhight + ',Left=' + left + ',Top='+ top +',Width=' + windowwidth + ',scrollbars=no,status=no,toolbar=no,menubar=no,location=no');
		}else{
			alert("表单项:" + itemname + "或" + itemname + "_Show" +"未定义,无法取值!");
		}
}

//******************************************************
//add by xiefeng 2003.09.01
//将用OPENWINDOW方式打开的对话框返回的值推到打开窗口的父窗口的指定域中
//******************************************************
function PushmultiSelectreturn(rtv,itemname){


		var item = window.opener.document.all.item(itemname);
		var item_show = window.opener.document.all.item(itemname + "_Show");
		if (item != null && item_show!=null){
			if(typeof(rtv)!='undefined'){
				var v = "";
				var v_show="";
			
				for(var i=0;i < rtv.length;i++){
					var itemreturn = rtv[i];
					v_show += itemreturn[1] + ";";			//显示的值
					v += itemreturn[0] + ";";				//实际保存的值
				}
			
				v = v.substr(0,v.length-1);
				v_show = v_show.substr(0,v_show.length-1);
				
				item.value = v;
				item_show.value = v_show;
			}
		}

}


//******************************************************
//add by xiefeng 2005.07.14
//调用数据库名称和表单名，打开加入收藏夹对话框函数
//******************************************************
function openadd2favorite(database,form,UNID){

			var d,t;
			d = new Date();
			t = d.getTime();
			var address;
			address = "f_favorite?openform&database=" + database;
			address += "&form=" + form;
			address += "&unid=" + UNID;

			var URL = "" + Sys_PATH + "\\personalresource.nsf\\" + address	+ "&t=" + t;
			
			var windowhight = 300;
			var windowwidth = 400;
			var top = (window.screen.availHeight - windowhight)/2;
			var left = (window.screen.availWidth - windowwidth)/2;

            openWindow(URL,'openhelper','Height=' + windowhight + ',Left=' + left + ',Top='+ top +',Width=' + windowwidth + ',scrollbars=1,status=no,toolbar=no,menubar=no,location=no');
			//window.showModalDialog(URL,item.value,'dialogHeight:' + windowhight + 'px;dialogLeft:' + left + 'px;dialogTop:'+ top +'px;dialogWidth:' + windowwidth + 'px;center:yes;resizable:no;status:no;');
	
}


//******************************************************
//add by cjy 2004.05.20
//调用数据库名称和表单名，打开帮助窗口对话框函数
//******************************************************
function openhelp(database,form){

			var d,t;
			d = new Date();
			t = d.getTime();
			var address;
			address = "f_public_openattach?openform&database=" + database + "&form=" +form
			var URL = "" + Sys_PATH + "\\System_help.nsf\\" + address + "&t=" + t;
			
			var windowhight = 500;
			var windowwidth = 750;
			var top = (window.screen.availHeight - windowhight)/2;
			var left = (window.screen.availWidth - windowwidth)/2;

            openWindow(URL,'openhelper','Height=' + windowhight + ',Left=' + left + ',Top='+ top +',Width=' + windowwidth + ',scrollbars=1,status=no,toolbar=no,menubar=no,location=no');
			//window.showModalDialog(URL,item.value,'dialogHeight:' + windowhight + 'px;dialogLeft:' + left + 'px;dialogTop:'+ top +'px;dialogWidth:' + windowwidth + 'px;center:yes;resizable:no;status:no;');
	
}

function opennotice(documentid){

			var address;
			address = "Fwrite\\" + documentid + "?Opendocument";
			var URL = Sys_PATH + "\\e_notice.nsf\\" + address;
			
			var windowhight = 500;
			var windowwidth = 700;
			var top = (window.screen.availHeight - windowhight)/2;
			var left = (window.screen.availWidth - windowwidth)/2;
            openWindow(URL,'openhelper','Height=' + windowhight + ',Left=' + left + ',Top='+ top +',Width=' + windowwidth + ',scrollbars=1,status=no,toolbar=no,menubar=no,location=no');
			
}

//******************************************************
//add by xiefeng 2003.09.01
//调用个人资料对话框函数
//******************************************************
function openuserinfo(username){

			var d,t;
			d = new Date();
			t = d.getTime();
			var address;
			address = "f_personal?openform&username=" + username
			var URL = Sys_PATH + "\\Ais_org.nsf\\" + address + "&t=" + t;
	      	var windowhight = 250;
			var windowwidth = 400;
			var top = (window.screen.availHeight - windowhight)/2;
			var left = (window.screen.availWidth - windowwidth)/2;
			
			//window.showModalDialog(URL,item.value,'dialogHeight:' + windowhight + 'px;dialogLeft:' + left + 'px;dialogTop:'+ top +'px;dialogWidth:' + windowwidth + 'px;center:yes;resizable:no;status:no;');
			openWindow(URL,'openhelper','Height=' + windowhight + ',Left=' + left + ',Top='+ top +',Width=' + windowwidth + ',scrollbars=1,status=no,toolbar=no,menubar=no,location=no');	
}


//******************************************************
//add by xiefeng 2003.09.01
//在屏幕中间打开指定页面函数,可指定窗口大小
//******************************************************
function openCenterWindow(address,widthx,hightx){

			var d,t;
			d = new Date();
			t = d.getTime();
			var URL = Sys_PATH + "\\" + address + "&t=" + t;
	
			var windowhight = hightx;
			var windowwidth = widthx;
			var top = (window.screen.availHeight - windowhight)/2;
			var left = (window.screen.availWidth - windowwidth)/2;

			openWindow(URL,'openviewerlog','Height=' + windowhight + ',Left=' + left + ',Top='+ top +',Width=' + windowwidth + ',scrollbars=1,status=no,toolbar=no,menubar=no,location=no');
}


//列出个人全部信息（IFRAME中人名的链接）
function openuserinfo_all(username){
	        var d,t;
			d = new Date();
			t = d.getTime();
			var address;
			address = "f_personalallinfo?openform&username=" + username
			var URL = Sys_PATH + "\\Ais_org.nsf\\" + address + "&t=" + t;
	      	var windowhight = 500;
			var windowwidth = 400;
			var top = (window.screen.availHeight - windowhight)/2;
			var left = (window.screen.availWidth - windowwidth)/2;

			//window.showModalDialog(URL,item.value,'dialogHeight:' + windowhight + 'px;dialogLeft:' + left + 'px;dialogTop:'+ top +'px;dialogWidth:' + windowwidth + 'px;center:yes;resizable:no;status:no;');
			openWindow(URL,'openhelper','Height=' + windowhight + ',Left=' + left + ',Top='+ top +',Width=' + windowwidth + ',scrollbars=1,status=no,toolbar=no,menubar=no,location=no');	
	
}


//******************************************************
//add by xiefeng 2003.09.01
//在IFRAME中调用个人资料函数，通讯录用
//******************************************************
function openuserinfo_iniframe(username){

			var d,t;
			d = new Date();
			t = d.getTime();
			var address;
			address = "f_personalallinfo?openform&username=" + username
			var URL = "\\" + Sys_PATH + "\\Ais_org.nsf\\" + address + "&t=" + t;
			window.SysBody.location=URL;
}

//add by ysq for test 2005.3.28
function openuserinfo_plan(username){

			var d,t;
			d = new Date();
			t = d.getTime();
			var address;
			address = "f_plan?openform&username=" + username
			var URL = "\\" + Sys_PATH + "\\e_testflow.nsf\\" + address + "&t=" + t;
			window.SysBody.location=URL;
}


//******************************************************
//add by ysq 2004.07.20
//调用菜式资料对话框函数
//******************************************************
function opencaiinfo(username){

			var d,t;
			d = new Date();
			t = d.getTime();
			var address;
			address = "f_caiinfo?openform&username=" + username
			var URL = Sys_PATH + "\\e_caipu.nsf\\" + address + "&t=" + t;
	      	var windowhight = 250;
			var windowwidth = 400;
			var top = (window.screen.availHeight - windowhight)/2;
			var left = (window.screen.availWidth - windowwidth)/2;
			
			//window.showModalDialog(URL,item.value,'dialogHeight:' + windowhight + 'px;dialogLeft:' + left + 'px;dialogTop:'+ top +'px;dialogWidth:' + windowwidth + 'px;center:yes;resizable:no;status:no;');
			openWindow(URL,'openhelper','Height=' + windowhight + ',Left=' + left + ',Top='+ top +',Width=' + windowwidth + ',scrollbars=1,status=no,toolbar=no,menubar=no,location=no');	
}


//******************************************************
//add by ysq 2004.07.20
//在IFRAME中调用菜式资料函数，菜谱用
//******************************************************
function opencaiinfo_iniframe(username){
                       
			var d,t;
			d = new Date();
			t = d.getTime();
			var address;
			address = "f_caiinfo?openform&username=" + username
			var URL = "\\" + Sys_PATH + "\\e_caipu.nsf\\" + address + "&t=" + t;
			window.SysBody.location=URL;
}


//******************************************************
//add by xiefeng 2003.09.01
//在IFRAME中打开指定的页面
//******************************************************
function openiniframe(address){

			var d,t;
			d = new Date();
			t = d.getTime();
			var URL = address + "&t=" + t;
			window.SysBody.location=URL;
}


//******************************************************
//add by xiefeng 2003.09.01
//返回选择的资料，公用对话框用
//******************************************************
function GetmultiSelectreturn(SelectDoc){

		var id = new Array();
		var j = 0;

		for (var i=0;i<SelectDoc.length;i++){
			if (SelectDoc[i].checked == true){
				var itemreturn = new Array();
				itemreturn[0] = SelectDoc[i].value;
				itemreturn[1] = SelectDoc[i].id;
				id[j] =	itemreturn; 
				j++;
			}
		}
		return id;
}


//*******************************************************
//
//打开新窗口函数
//*******************************************************
function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}


//*******************************************************
//
//找到表单项函数
//*******************************************************
function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}


//*******************************************************
//
//复选框全选函数
//*******************************************************
function SelectAll_Checkbox(checkbox){

	var i;
	for (i=0;i<checkbox.length;i++){
		if (checkbox[i].checked == false){
			checkbox[i].checked = true;
		}
	}
}


//*******************************************************
//
//多选框全选函数
//*******************************************************
function SelectAll_Select(Selection){

	var i;
	for (i=0;i<Selection.length;i++){
		if (Selection.options(i).selected == false){
			Selection.options(i).selected = true;
		}
	}
}


//*******************************************************
//
//多选框删除选择函数
//*******************************************************
function removeSelect(Selection){
	var itemx = MM_findObj(Selection);
		if (itemx != null){
			if (itemx.selectedIndex != -1){
				if (itemx.options(itemx.selectedIndex).value !=""){
					itemx.options.remove(itemx.selectedIndex);
				}
			}
		}
}


//*******************************************************
//
//多选框增加选择函数
//*******************************************************
function addSelect(Selection,svalue,hvalue){
	var itemx = MM_findObj(Selection);
		if (itemx != null){



			itemx.options.add(new Option(svalue));
			itemx.selectedIndex = itemx.length-1;
			itemx.options(itemx.selectedIndex).value = hvalue;
			itemx.options(itemx.selectedIndex).selected = false;
		}
}



//*******************************************************
//
//复选框取消全选函数
//*******************************************************
function DeSelectAll_Checkbox(checkbox){

	var i;
	for (i=0;i<checkbox.length;i++){
		if (checkbox[i].checked == true){
			checkbox[i].checked = false;
		}
	}
}

//*******************************************************
//
//清除文本框中的资料
//*******************************************************
function clearinput(itemname){
	var item = MM_findObj(itemname);
	var item_show = MM_findObj(itemname + "_Show");
	if (item != null && item_show!=null){
		item_show.value = "";
		item.value = "";
	}else{
		alert("表单项:" + itemname + "或" + itemname + "_Show" +"未定义,无法清空!");
	}
}

//*******************************************************
//
//显示帮助资料
//*******************************************************
function openhelpbox(helpkey){
	alert(helpkey);
	window.showHelp(helpkey);
}

//*******************************************************
//
//显示流程图资料
//*******************************************************
function openworkflowbox(helpkey){
	alert(helpkey);
	window.showHelp(helpkey);
}


//*******************************************************
//
//填写内容表单返回按钮调用的函数
//*******************************************************
function returntolist(returnURL){
	if (returnURL != ""){
		var d,t;
		d = new Date();
		t = d.getTime();
	
		var i;
		i = returnURL.indexOf(".nsf");
		var URL;
				
		if ( i == -1){
			URL = "\\" + Sys_CURDB + "\\" + returnURL + "&t=" + t;
		}else{
			URL = "\\" + Sys_PATH + "\\" + returnURL + "&t=" + t;
		}
		window.location = URL;	
	}else{
		alert("返回的地址不能为空!");
	}
}

//*******************************************************
//
//填写内容表单返回按钮调用的函数   update cjy 2004.09.19 由于左边的菜单的原因，使用新的操作按钮
//*******************************************************
function returntolist_new(returnURL){
	if (returnURL != ""){
		var d,t;
		d = new Date();
		t = d.getTime();
	
		var i;
		i = returnURL.indexOf(".nsf");
		var URL;
		
		if ( i == -1){
			//URL = "\\" + Sys_CURDB + "\\" + returnURL;
			URL = "\\" + Sys_PATH + "\\" + returnURL;
		}else{
			URL = "\\" + Sys_PATH + "\\" + returnURL;
		}
		
		window.location = URL;	
	}else{
		alert("返回的地址不能为空!");
	}
}

//*******************************************************
//
//检查表单内容文本型是否为空
//*******************************************************
function isnull_text(itemname,promptmsg){
	var itemx = MM_findObj(itemname);
	if (itemx != null){
		if (itemx.value != undefined && lTrim(itemx.value) == ""){
		    // itemx.value="";
			//itemx.focus();
			return "请填写" + promptmsg + "\n";
		}else{
			return "";
		}
	}else{
		return "表单项:" + itemname + "未定义,无法判断用户输入的数据!";
	}
}


function lTrim(str)
{
  if (str.charAt(0) == " ")
  {
    //如果字串左边第一个字符为空格
    str = str.slice(1);//将空格从字串中去掉
    //这一句也可改成 str = str.substring(1, str.length);
    str = lTrim(str);    //递归调用
  }
  return str;
}








//*******************************************************
//
//检查表单内容单选框复选框是否为空
//*******************************************************
function isnull_radiobutton(itemname,promptmsg){
	var itemx = MM_findObj(itemname);
	if (itemx != null){
		for (var i=0;i<itemx.length;i++){
			if (itemx[i].checked == true){
				return "";
			}
		}

		return "\n" + promptmsg;
	}else{
		return "表单项:" + itemname + "未定义,无法判断用户输入的数据!";
	}
}

//*******************************************************
//
//检查表单内容文本型是否为空
//*******************************************************
function isnull_text_new(itemname,promptmsg){
	var itemx = MM_findObj(itemname);
	if (itemx != null){
		if (itemx.value == ""){
			itemx.focus();
			return "请填写" + promptmsg + ",";
		}else{
			return "";
		}
	}else{
		return "表单项:" + itemname + "未定义,无法判断用户输入的数据!";
	}
}

//*******************************************************
//
//检查表单内容文本型是否为空(从选择对话框内得到)
//*******************************************************
function isnull_text_pickup(itemname,promptmsg){
	var itemx = MM_findObj(itemname);
	if (itemx != null){
		if (itemx.value == ""){
			itemx.focus();
			return "请选择" + promptmsg + "\n";
		}else{
			return "";
		}
	}else{
		return "表单项:" + itemname + "未定义,无法判断用户输入的数据!";
	}
}

//******************************************************
//add by xiefeng 2006.04.14
//在屏幕中间打开指定页面函数,可指定窗口大小和窗口属性
//******************************************************
function openCenterWindow2(address,windowname,widthx,hightx,features){

			var windowhight = hightx;
			var windowwidth = widthx;
			var top = (window.screen.availHeight - windowhight)/2;
			var left = (window.screen.availWidth - windowwidth)/2;

			openWindow(address,windowname,'Height=' + windowhight + ',Left=' + left + ',Top='+ top +',Width=' + windowwidth + ',' + features);
}


//*******************************************************
//
//检查表单内容单选框是否为空
//*******************************************************
function isnull_select_single(itemname,promptmsg){


	var itemx = MM_findObj(itemname);
	if (itemx != null){
		var i = itemx.selectedIndex;
		var value = itemx(i).value;
		
		if (itemx.value == ""){
			itemx.focus();
			return "请选择" + promptmsg + "\n";
		}else{
			return "";
		}
	}else{
		return "表单项:" + itemname + "未定义,无法判断用户选择的数据!";
	}
}


//*******************************************************
//
//检查表单内容下拉框是否已选择
//*******************************************************
function isnull_comboboxbytext(itemname,promptmsg,emptystyle){

	var itemx = MM_findObj(itemname);
	if (itemx != null){
		var i = itemx.selectedIndex;
		var valuex = itemx.options[i].text;
		
		if (valuex == emptystyle){
			itemx.focus();
			return "请选择" + promptmsg + "\n";
		}else{
			return "";
		}
		
	}else{
		return "表单项:" + itemname + "未定义,无法判断用户选择的数据!";
	}
}



//*******************************************************
//
//检查表单内容单选框是否为空
//*******************************************************
function isnull_select_singlebytext(itemname,promptmsg){


	var itemx = MM_findObj(itemname);
	if (itemx != null){
		var i = itemx.selectedIndex;
		alert(i);
		var valuex = itemx.options[i].text;
		if (valuex == ""){
			return "请选择" + promptmsg + "\n";
		}else{
			return "";
		}
	}else{
		return "表单项:" + itemname + "未定义,无法判断用户选择的数据!";
	}
}



//*******************************************************
//
//取得查询关键字后提交列表中的查询函数
//*******************************************************
function getsearchkey(SearchType){
	var SearchKey = window.prompt("请输入查询关键字!","")
	if (SearchKey != "" && SearchKey != null){
		window.document.forms[0].SearchType.value = SearchType;
		window.document.forms[0].SearchKey.value = SearchKey;
		window.document.forms[0].runagent_tonextpage.click();
	}
}

//*******************************************************
//
//显示列表中的全部资料的查询函数
//*******************************************************
function getalldoc(){
	window.document.forms[0].SearchKey.value = "";
	window.document.forms[0].runagent_tonextpage.click();
}


//*******************************************************
//
//保存表单前调用的提交函数
//*******************************************************
function savesubmit(msg){
	if (msg != ""){
		alert(msg);
		return false;
	}else{
		return true;
	}	
}
//函数名：fucCheckNUM
//功能介绍：检查是否为数字
//参数说明：要检查的数字
//返回值：1为是数字，0为不是数字
function fucCheckNUM(NUM)
{
 var i,j,strTemp;
 strTemp="0123456789";
 if ( NUM.length== 0)
  return 0
 for (i=0;i<NUM.length;i++)
 {
  j=strTemp.indexOf(NUM.charAt(i)); 
  if (j==-1)
  {
  //说明有字符不是数字
   return 0;
  }
 }
 //说明是数字
 return 1;
}

//*******************************************************
//
//提交到下一页函数
//*******************************************************
function pagesubmit(pageno){
	window.document.forms[0].pageno.value = pageno;
	window.document.forms[0].runagent_tonextpage.click();
}


//*******************************************************
//
//提交到下一页函数(sap分页用）
//*******************************************************
function pagesubmit_sap(pageno){
	window.document.forms[0].pageno.value = pageno;
	window.document.forms[0].getreport.click();
}


//*******************************************************
//
//跳转到第N页函数(sap分页用）
//*******************************************************
function pagejump_sap(item){
	
	var selectindex;
	selectindex = item.selectedIndex;
	
	var valuex;
	valuex = item.options[item.selectedIndex].value;

	pagesubmit_sap(valuex);
}


//*******************************************************
//
//跳转到第N页函数
//*******************************************************
function pagejump(item){
	
	var selectindex;
	selectindex = item.selectedIndex;
	
	var valuex;
	valuex = item.options[item.selectedIndex].value;

	pagesubmit(valuex);
}


//*******************************************************
//
//删除确认函数
//*******************************************************
function DeleteConfirm(alerttext){

	//判断用户是否有选择
	var item = MM_findObj("SelectDoc");
	if (item != null){
		
		var str_selected;
		str_selected = "";

		for (i=0;i<item.length;i++){
			if (item[i].checked == true){
				str_selected = "1";
				break;
			}
		}

		//如果有选择
		if (str_selected != ""){
			var continuex = window.confirm(alerttext,"系统提示");
			if (continuex) {
				document.forms[0].Operation.value = "delete";
				document.forms[0].runagent_tonextpage.click();
			}
		}else{
			alert("请先选择要处理的资料!");
		}
	}	
}

//*******************************************************
//
//还原确认函数
//*******************************************************
function ResumeConfirm(alerttext){

	//判断用户是否有选择
	var item = MM_findObj("SelectDoc");
	if (item != null){
		
		var str_selected;
		str_selected = "";

		for (i=0;i<item.length;i++){
			if (item[i].checked == true){
				str_selected = "1";
				break;
			}
		}

		//如果有选择
		if (str_selected != ""){
			var continuex = window.confirm(alerttext,"系统提示");
			if (continuex) {
				document.forms[0].Operation.value = "resume";
				document.forms[0].runagent_tonextpage.click();
			}
		}else{
			alert("请先选择要处理的资料!");
		}
	}
}


//*******************************************************
//
//执行操作确认函数_无需选择版本
//*******************************************************
function OperationConfirm2(alerttext,operation){

	var continuex = window.confirm(alerttext,"系统提示");
	if (continuex) {
		document.forms[0].Operation.value = operation;
		document.forms[0].runagent_tonextpage.click();
	}
}


//*******************************************************
//
//执行操作确认函数
//*******************************************************
function OperationConfirm(alerttext,operation){

	
	//判断用户是否有选择
	var item = MM_findObj("SelectDoc");
	if (item != null){
		
		var str_selected;
		str_selected = "";

		for (i=0;i<item.length;i++){
			if (item[i].checked == true){
				str_selected = "1";
				break;
			}
		}
        
		//如果有选择
		if (str_selected != ""){
			var continuex = window.confirm(alerttext,"系统提示");
			if (continuex) {
				document.forms[0].Operation.value = operation;
				document.forms[0].runagent_tonextpage.click();
			}
		}else{
			alert("请先选择要处理的资料!");
		}
	}
}



//*******************************************************
//
//是否继续执行操作确认函数
//*******************************************************
function ContinueConfirm(alerttext){
	var continuex = window.confirm(alerttext,"系统提示");
	if (continuex) {
		return true;
	}else{
		return false;
	}  
}


//*******************************************************
//
//意外处理确认函数
//*******************************************************
function PushTOSuperUserConfirm(itemname,address){

	var continuex = window.confirm("是否将选择的资料提交管理员意外处理?","系统提示");
	if (continuex) {

		var item = MM_findObj(itemname);
		if (item != null){
			var d,t;
			d = new Date();
			t = d.getTime();
			var URL = "\\" + Sys_PATH + "\\Sys_Datacenter.nsf\\" + address + "&t=" + t;
	
	
			var windowhight = 300;
			var windowwidth = 450;
			var top = (window.screen.availHeight - windowhight)/2;
			var left = (window.screen.availWidth - windowwidth)/2;

			var rtv = window.showModalDialog(URL,item.value,'dialogHeight:' + windowhight + 'px;dialogLeft:' + left + 'px;dialogTop:'+ top +'px;dialogWidth:' + windowwidth + 'px;center:yes;resizable:no;status:no;');

				if(typeof(rtv)!='undefined'){
					item.value = rtv;
					document.forms[0].pushtosuperuser.click();
				}
			}else{
				alert("表单项:" + itemname + "或" + itemname + "_Show" +"未定义,无法取值!");
			}
	}
}



//*******************************************************
//
//取得选择的值
//*******************************************************
function GetSelectedValue(Selectitem){
	var v = "";
	for (var i=0;i<Selectitem.length;i++){
		if (Selectitem[i].checked == true){
	
			var valuex = Selectitem[i].value;
			//取传过来的值格式为显示的值x保存的值
			v += valuex + ";";
		}
	}
	//去掉最后的“；”号
	v = v.substr(0,v.length-1);
	return v;
}



//*******************************************************
//
//取得选择的值的SELECTINDEX
//*******************************************************
function GetSelectedIndex(Selectitem){
	var v = "";
	for (var i=0;i<Selectitem.length;i++){
		if (Selectitem[i].checked == true){
			return i;	
		}
	}
}



//*******************************************************
//
//提交到下一节点处理函数
//*******************************************************
function Submit2NextAction(maindocUNID){

	var d,t;
	d = new Date();
	t = d.getTime();
	var URL = Sys_PATH + "\\Sys_Datacenter.nsf\\f_Submit2NextAction?openform&UNID=" + maindocUNID
	URL += "&appdbname=" + Sys_CURDB2
	URL += "&Title=" + "请选择下一处理节点及下一处理人";
	URL += "&t=" + t;
	
	var windowhight = 300;
	var windowwidth = 500;
	var top = (window.screen.availHeight - windowhight)/2;
	var left = (window.screen.availWidth - windowwidth)/2;
	
	//var rtv = window.showModalDialog(URL,'','dialogHeight:' + windowhight + 'px;dialogLeft:' + left + 'px;dialogTop:'+ top +'px;dialogWidth:' + windowwidth + 'px;center:yes;resizable:no;status:no;');
	openWindow(URL,'Submit2NextAction','Height=' + windowhight + ',Left=' + left + ',Top='+ top +',Width=' + windowwidth + ',scrollbars=0,status=yes,toolbar=no,menubar=no,location=no');

}

//*******************************************************
//
//转本部门其他人处理函数
//*******************************************************
function Submit2DepartmentMember(){


}


//*******************************************************
//
//显示发布信息
//*******************************************************
function showme(e){
   if (e.style.display == "none") {
	   e.style.display = "";
	 } else {
	   e.style.display = "none";
	 }
}

























/*
 * ---------------------------------------------------------------------------
 *
 * 各应用库左边的OUTLOOK样式菜单需要调用的脚本
 *
*/
 function addItem(itemTitle,itemContent){
	itemHTML='<div id=item'+itemNo+' itemIndex='+itemNo+' style="position:relative;left:0;top:'+(-contentHeight*itemNo)+';width:'+layerWidth+';"><table width=100% cellspacing="0" cellpadding="0">'+
       '<tr><td height='+titleHeight+' onclick=changeItem('+itemNo+') class="titleStyle">' + "&nbsp;&nbsp;&nbsp;&nbsp;" + itemTitle+'</td></tr>'+
       '<tr><td valign="top" height='+contentHeight+' class="contentStyle">'+itemContent+'</td></tr></table></div>';
	document.write(itemHTML);
   itemNo++;
 }

 function getmenucontent(menuitem){
	var tablehead = "<table width='100%' border='0' align='left' cellpadding='3' cellspacing='2'>";
	var tableend = "</table>";
	var tablecentent = "";
	
	for (var i=0;i< itemx.length;i++){
	var itemvalue = itemx[i];
		tablecentent += "<tr>";
		tablecentent += "<td width='1' height='20'>";
		tablecentent += "<img src='/leftmenuicon.gif'>";
		tablecentent += "</td>";
		tablecentent += "<td>";
		tablecentent += "<a";

		//如果没有设定链接的HOTTIPS文字则取链接显示的文字
		if (itemvalue[1] == ""){
			tablecentent += " title='" + itemvalue[0] + "'";
		}else{
			tablecentent += " title='" + itemvalue[2] + "'";
		}

		//如果有目标数据库名称则打开指定的数据库
		if (itemvalue[3] == ""){
			tablecentent += " href='\\" + Sys_CURDB3 + "\\" + itemvalue[2] + "'>";
		}else{
			tablecentent += " href='\\" + Sys_PATH + "\\" + itemvalue[3] + "\\" + itemvalue[2] + "'>";
		}
		
		tablecentent += itemvalue[0]
		tablecentent += "</a>";
		tablecentent += "</td>"
		tablecentent += "</tr>"
	}
	return tablehead + tablecentent + tableend;
} 

/*
 *增加链接其它参数据功能,比如新窗口打开链接参数target='_blank'
 *create by wsy 2005-07-20
 */
 function getmenucontent_new(menuitem){
	var tablehead = "<table width='100%' border='0' align='left' cellpadding='3' cellspacing='2'>";
	var tableend = "</table>";
	var tablecentent = "";
	
	for (var i=0;i< itemx.length;i++){
	var itemvalue = itemx[i];
		tablecentent += "<tr>";
		tablecentent += "<td width='1' height='20'>";
		tablecentent += "<img src='/leftmenuicon.gif'>";
		tablecentent += "</td>";
		tablecentent += "<td>";
		tablecentent += "<a";

		//如果没有设定链接的HOTTIPS文字则取链接显示的文字
		if (itemvalue[1] == ""){
			tablecentent += " title='" + itemvalue[0] + "'";
		}else{
			tablecentent += " title='" + itemvalue[2] + "'";
		}

		//其它参数增加
		if (itemvalue[4] != ""){
			tablecentent += " " + itemvalue[4]
		}

		//如果有目标数据库名称则打开指定的数据库
		if (itemvalue[3] == ""){
			tablecentent += " href='\\" + Sys_CURDB3 + "\\" + itemvalue[2] + "'>";
		}else{
			tablecentent += " href='\\" + Sys_PATH + "\\" + itemvalue[3] + "\\" + itemvalue[2] + "'>";
		}
		
		tablecentent += itemvalue[0]
		tablecentent += "</a>";
		tablecentent += "</td>"
		tablecentent += "</tr>"
	}
	return tablehead + tablecentent + tableend;
} 

function changeItem(clickItemIndex){
   toItemIndex=clickItemIndex;
   if(toItemIndex-onItemIndex>0) moveUp(); else moveDown();
   runtimes++;
   if(runtimes>=stepNo){
     onItemIndex=toItemIndex;
     runtimes=0;}
   else
     setTimeout("changeItem(toItemIndex)",10);
 }

function moveUp(){
   for(i=onItemIndex+1;i<=toItemIndex;i++)
     eval('document.all.item'+i+'.style.top=parseInt(document.all.item'+i+'.style.top)-contentHeight/stepNo;');
 }

function moveDown(){
   for(i=onItemIndex;i>toItemIndex;i--)
     eval('document.all.item'+i+'.style.top=parseInt(document.all.item'+i+'.style.top)+contentHeight/stepNo;');
 }

function getmenu_layerTop(){
	return 124;
}

function getmenu_layerLeft(){
	return 120;
}

function getmenu_layerWidth(){
	return 120;
}

function getmenu_titleHeight(){
	return 20;
}


function getmenu_stepNo(){
	return 10;
}






























































/*  Copyright Mihai Bazon, 2002, 2003  |  http://students.infoiasi.ro/~mishoo
 * ---------------------------------------------------------------------------
 *
 * The DHTML Calendar, version 0.9.3 "It's still alive & keeps rocking"
 *
 * Details and latest version at:
 * http://students.infoiasi.ro/~mishoo/site/calendar.epl
 *
 * Feel free to use this script under the terms of the GNU Lesser General
 * Public License, as long as you do not remove or alter this notice.
 */

// $Id: calendar.js,v 1.11 2003/07/08 18:51:41 mishoo Exp $

/** The Calendar object constructor. */
Calendar = function (mondayFirst, dateStr, onSelected, onClose) {
	// member variables
	this.activeDiv = null;
	this.currentDateEl = null;
	this.checkDisabled = null;
	this.timeout = null;
	this.onSelected = onSelected || null;
	this.onClose = onClose || null;
	this.dragging = false;
	this.hidden = false;
	this.minYear = 1970;
	this.maxYear = 2050;
	this.dateFormat = Calendar._TT["DEF_DATE_FORMAT"];
	this.ttDateFormat = Calendar._TT["TT_DATE_FORMAT"];
	this.isPopup = true;
	this.weekNumbers = true;
	this.mondayFirst = mondayFirst;
	this.dateStr = dateStr;
	this.ar_days = null;
	// HTML elements
	this.table = null;
	this.element = null;
	this.tbody = null;
	this.firstdayname = null;
	// Combo boxes
	this.monthsCombo = null;
	this.yearsCombo = null;
	this.hilitedMonth = null;
	this.activeMonth = null;
	this.hilitedYear = null;
	this.activeYear = null;
	// Information
	this.dateClicked = false;

	// one-time initializations
	if (!Calendar._DN3) {
		// table of short day names
		var ar = new Array();
		for (var i = 8; i > 0;) {
			ar[--i] = Calendar._DN[i].substr(0, 3);
		}
		Calendar._DN3 = ar;
		// table of short month names
		ar = new Array();
		for (var i = 12; i > 0;) {
			ar[--i] = Calendar._MN[i].substr(0, 3);
		}
		Calendar._MN3 = ar;
	}
};

// ** constants

/// "static", needed for event handlers.
Calendar._C = null;

/// detect a special case of "web browser"
Calendar.is_ie = ( /msie/i.test(navigator.userAgent) &&
		   !/opera/i.test(navigator.userAgent) );

// short day names array (initialized at first constructor call)
Calendar._DN3 = null;

// short month names array (initialized at first constructor call)
Calendar._MN3 = null;

// BEGIN: UTILITY FUNCTIONS; beware that these might be moved into a separate
//        library, at some point.

Calendar.getAbsolutePos = function(el) {
	var r = { x: el.offsetLeft, y: el.offsetTop };
	if (el.offsetParent) {
		var tmp = Calendar.getAbsolutePos(el.offsetParent);
		r.x += tmp.x;
		r.y += tmp.y;
	}
	return r;
};

Calendar.isRelated = function (el, evt) {
	var related = evt.relatedTarget;
	if (!related) {
		var type = evt.type;
		if (type == "mouseover") {
			related = evt.fromElement;
		} else if (type == "mouseout") {
			related = evt.toElement;
		}
	}
	while (related) {
		if (related == el) {
			return true;
		}
		related = related.parentNode;
	}
	return false;
};

Calendar.removeClass = function(el, className) {
	if (!(el && el.className)) {
		return;
	}
	var cls = el.className.split(" ");
	var ar = new Array();
	for (var i = cls.length; i > 0;) {
		if (cls[--i] != className) {
			ar[ar.length] = cls[i];
		}
	}
	el.className = ar.join(" ");
};

Calendar.addClass = function(el, className) {
	Calendar.removeClass(el, className);
	el.className += " " + className;
};

Calendar.getElement = function(ev) {
	if (Calendar.is_ie) {
		return window.event.srcElement;
	} else {
		return ev.currentTarget;
	}
};

Calendar.getTargetElement = function(ev) {
	if (Calendar.is_ie) {
		return window.event.srcElement;
	} else {
		return ev.target;
	}
};

Calendar.stopEvent = function(ev) {
	if (Calendar.is_ie) {
		window.event.cancelBubble = true;
		window.event.returnValue = false;
	} else {
		ev.preventDefault();
		ev.stopPropagation();
	}
	return false;
};

Calendar.addEvent = function(el, evname, func) {
	if (el.attachEvent) { // IE
		el.attachEvent("on" + evname, func);
	} else if (el.addEventListener) { // Gecko / W3C
		el.addEventListener(evname, func, true);
	} else { // Opera (or old browsers)
		el["on" + evname] = func;
	}
};

Calendar.removeEvent = function(el, evname, func) {
	if (el.detachEvent) { // IE
		el.detachEvent("on" + evname, func);
	} else if (el.removeEventListener) { // Gecko / W3C
		el.removeEventListener(evname, func, true);
	} else { // Opera (or old browsers)
		el["on" + evname] = null;
	}
};

Calendar.createElement = function(type, parent) {
	var el = null;
	if (document.createElementNS) {
		// use the XHTML namespace; IE won't normally get here unless
		// _they_ "fix" the DOM2 implementation.
		el = document.createElementNS("http://www.w3.org/1999/xhtml", type);
	} else {
		el = document.createElement(type);
	}
	if (typeof parent != "undefined") {
		parent.appendChild(el);
	}
	return el;
};

// END: UTILITY FUNCTIONS

// BEGIN: CALENDAR STATIC FUNCTIONS

/** Internal -- adds a set of events to make some element behave like a button. */
Calendar._add_evs = function(el) {
	with (Calendar) {
		addEvent(el, "mouseover", dayMouseOver);
		addEvent(el, "mousedown", dayMouseDown);
		addEvent(el, "mouseout", dayMouseOut);
		if (is_ie) {
			addEvent(el, "dblclick", dayMouseDblClick);
			el.setAttribute("unselectable", true);
		}
	}
};

Calendar.findMonth = function(el) {
	if (typeof el.month != "undefined") {
		return el;
	} else if (typeof el.parentNode.month != "undefined") {
		return el.parentNode;
	}
	return null;
};

Calendar.findYear = function(el) {
	if (typeof el.year != "undefined") {
		return el;
	} else if (typeof el.parentNode.year != "undefined") {
		return el.parentNode;
	}
	return null;
};

Calendar.showMonthsCombo = function () {
	var cal = Calendar._C;
	if (!cal) {
		return false;
	}
	var cal = cal;
	var cd = cal.activeDiv;
	var mc = cal.monthsCombo;
	if (cal.hilitedMonth) {
		Calendar.removeClass(cal.hilitedMonth, "hilite");
	}
	if (cal.activeMonth) {
		Calendar.removeClass(cal.activeMonth, "active");
	}
	var mon = cal.monthsCombo.getElementsByTagName("div")[cal.date.getMonth()];
	Calendar.addClass(mon, "active");
	cal.activeMonth = mon;
	mc.style.left = cd.offsetLeft + "px";
	mc.style.top = (cd.offsetTop + cd.offsetHeight) + "px";
	mc.style.display = "block";
};

Calendar.showYearsCombo = function (fwd) {
	var cal = Calendar._C;
	if (!cal) {
		return false;
	}
	var cal = cal;
	var cd = cal.activeDiv;
	var yc = cal.yearsCombo;
	if (cal.hilitedYear) {
		Calendar.removeClass(cal.hilitedYear, "hilite");
	}
	if (cal.activeYear) {
		Calendar.removeClass(cal.activeYear, "active");
	}
	cal.activeYear = null;
	var Y = cal.date.getFullYear() + (fwd ? 1 : -1);
	var yr = yc.firstChild;
	var show = false;
	for (var i = 12; i > 0; --i) {
		if (Y >= cal.minYear && Y <= cal.maxYear) {
			yr.firstChild.data = Y;
			yr.year = Y;
			yr.style.display = "block";
			show = true;
		} else {
			yr.style.display = "none";
		}
		yr = yr.nextSibling;
		Y += fwd ? 2 : -2;
	}
	if (show) {
		yc.style.left = cd.offsetLeft + "px";
		yc.style.top = (cd.offsetTop + cd.offsetHeight) + "px";
		yc.style.display = "block";
	}
};

// event handlers

Calendar.tableMouseUp = function(ev) {
	var cal = Calendar._C;
	if (!cal) {
		return false;
	}
	if (cal.timeout) {
		clearTimeout(cal.timeout);
	}
	var el = cal.activeDiv;
	if (!el) {
		return false;
	}
	var target = Calendar.getTargetElement(ev);
	Calendar.removeClass(el, "active");
	if (target == el || target.parentNode == el) {
		Calendar.cellClick(el);
	}
	var mon = Calendar.findMonth(target);
	var date = null;
	if (mon) {
		date = new Date(cal.date);
		if (mon.month != date.getMonth()) {
			date.setMonth(mon.month);
			cal.setDate(date);
			cal.dateClicked = false;
			cal.callHandler();
		}
	} else {
		var year = Calendar.findYear(target);
		if (year) {
			date = new Date(cal.date);
			if (year.year != date.getFullYear()) {
				date.setFullYear(year.year);
				cal.setDate(date);
				cal.dateClicked = false;
				cal.callHandler();
			}
		}
	}
	with (Calendar) {
		removeEvent(document, "mouseup", tableMouseUp);
		removeEvent(document, "mouseover", tableMouseOver);
		removeEvent(document, "mousemove", tableMouseOver);
		cal._hideCombos();
		_C = null;
		return stopEvent(ev);
	}
};

Calendar.tableMouseOver = function (ev) {

	var cal = Calendar._C;
	if (!cal) {
		return;
	}
	var el = cal.activeDiv;
	var target = Calendar.getTargetElement(ev);
	if (target == el || target.parentNode == el) {
		Calendar.addClass(el, "hilite active");
		Calendar.addClass(el.parentNode, "rowhilite");
	} else {
		Calendar.removeClass(el, "active");
		Calendar.removeClass(el, "hilite");
		Calendar.removeClass(el.parentNode, "rowhilite");
	}
	var mon = Calendar.findMonth(target);
	if (mon) {
		if (mon.month != cal.date.getMonth()) {
			if (cal.hilitedMonth) {
				Calendar.removeClass(cal.hilitedMonth, "hilite");
			}
			Calendar.addClass(mon, "hilite");
			cal.hilitedMonth = mon;
		} else if (cal.hilitedMonth) {
			Calendar.removeClass(cal.hilitedMonth, "hilite");
		}
	} else {
		var year = Calendar.findYear(target);
		if (year) {
			if (year.year != cal.date.getFullYear()) {
				if (cal.hilitedYear) {
					Calendar.removeClass(cal.hilitedYear, "hilite");
				}
				Calendar.addClass(year, "hilite");
				cal.hilitedYear = year;
			} else if (cal.hilitedYear) {
				Calendar.removeClass(cal.hilitedYear, "hilite");
			}
		}
	}
	return Calendar.stopEvent(ev);
};

Calendar.tableMouseDown = function (ev) {
	if (Calendar.getTargetElement(ev) == Calendar.getElement(ev)) {
		return Calendar.stopEvent(ev);
	}
};

Calendar.calDragIt = function (ev) {
	var cal = Calendar._C;
	if (!(cal && cal.dragging)) {
		return false;
	}
	var posX;
	var posY;
	if (Calendar.is_ie) {
		posY = window.event.clientY + document.body.scrollTop;
		posX = window.event.clientX + document.body.scrollLeft;
	} else {
		posX = ev.pageX;
		posY = ev.pageY;
	}
	cal.hideShowCovered();
	var st = cal.element.style;
	st.left = (posX - cal.xOffs) + "px";
	st.top = (posY - cal.yOffs) + "px";
	return Calendar.stopEvent(ev);
};

Calendar.calDragEnd = function (ev) {
	var cal = Calendar._C;
	if (!cal) {
		return false;
	}
	cal.dragging = false;
	with (Calendar) {
		removeEvent(document, "mousemove", calDragIt);
		removeEvent(document, "mouseover", stopEvent);
		removeEvent(document, "mouseup", calDragEnd);
		tableMouseUp(ev);
	}
	cal.hideShowCovered();
};

Calendar.dayMouseDown = function(ev) {
	var el = Calendar.getElement(ev);
	if (el.disabled) {
		return false;
	}
	var cal = el.calendar;
	cal.activeDiv = el;
	Calendar._C = cal;
	if (el.navtype != 300) with (Calendar) {
		addClass(el, "hilite active");
		addEvent(document, "mouseover", tableMouseOver);
		addEvent(document, "mousemove", tableMouseOver);
		addEvent(document, "mouseup", tableMouseUp);
	} else if (cal.isPopup) {
		cal._dragStart(ev);
	}
	if (el.navtype == -1 || el.navtype == 1) {
		cal.timeout = setTimeout("Calendar.showMonthsCombo()", 250);
	} else if (el.navtype == -2 || el.navtype == 2) {
		cal.timeout = setTimeout((el.navtype > 0) ? "Calendar.showYearsCombo(true)" : "Calendar.showYearsCombo(false)", 250);
	} else {
		cal.timeout = null;
	}
	return Calendar.stopEvent(ev);
};

Calendar.dayMouseDblClick = function(ev) {
	Calendar.cellClick(Calendar.getElement(ev));
	if (Calendar.is_ie) {
		document.selection.empty();
	}
};

Calendar.dayMouseOver = function(ev) {
	var el = Calendar.getElement(ev);
	if (Calendar.isRelated(el, ev) || Calendar._C || el.disabled) {
		return false;
	}
	if (el.ttip) {
		if (el.ttip.substr(0, 1) == "_") {
			var date = null;
			with (el.calendar.date) {
				date = new Date(getFullYear(), getMonth(), el.caldate);
			}
			el.ttip = date.print(el.calendar.ttDateFormat) + el.ttip.substr(1);
		}
		el.calendar.tooltips.firstChild.data = el.ttip;
	}
	if (el.navtype != 300) {
		Calendar.addClass(el, "hilite");
		if (el.caldate) {
			Calendar.addClass(el.parentNode, "rowhilite");
		}
	}
	return Calendar.stopEvent(ev);
};

Calendar.dayMouseOut = function(ev) {
	with (Calendar) {
		var el = getElement(ev);
		if (isRelated(el, ev) || _C || el.disabled) {
			return false;
		}
		removeClass(el, "hilite");
		if (el.caldate) {
			removeClass(el.parentNode, "rowhilite");
		}
		el.calendar.tooltips.firstChild.data = _TT["SEL_DATE"];
		return stopEvent(ev);
	}
};

/**
 *  A generic "click" handler :) handles all types of buttons defined in this
 *  calendar.
 */
Calendar.cellClick = function(el) {
	var cal = el.calendar;
	var closing = false;
	var newdate = false;
	var date = null;
	if (typeof el.navtype == "undefined") {
		Calendar.removeClass(cal.currentDateEl, "selected");
		Calendar.addClass(el, "selected");
		closing = (cal.currentDateEl == el);
		if (!closing) {
			cal.currentDateEl = el;
		}
		cal.date.setDate(el.caldate);
		date = cal.date;
		newdate = true;
		// a date was clicked
		cal.dateClicked = true;
	} else {
		if (el.navtype == 200) {
			Calendar.removeClass(el, "hilite");
			cal.callCloseHandler();
			return;
		}
		date = (el.navtype == 0) ? new Date() : new Date(cal.date);
		// unless "today" was clicked, we assume no date was clicked so
		// the selected handler will know not to close the calenar when
		// in single-click mode.
		cal.dateClicked = (el.navtype == 0);
		var year = date.getFullYear();
		var mon = date.getMonth();
		function setMonth(m) {
			var day = date.getDate();
			var max = date.getMonthDays(m);
			if (day > max) {
				date.setDate(max);
			}
			date.setMonth(m);
		};
		switch (el.navtype) {
		    case -2:
			if (year > cal.minYear) {
				date.setFullYear(year - 1);
			}
			break;
		    case -1:
			if (mon > 0) {
				setMonth(mon - 1);
			} else if (year-- > cal.minYear) {
				date.setFullYear(year);
				setMonth(11);
			}
			break;
		    case 1:
			if (mon < 11) {
				setMonth(mon + 1);
			} else if (year < cal.maxYear) {
				date.setFullYear(year + 1);
				setMonth(0);
			}
			break;
		    case 2:
			if (year < cal.maxYear) {
				date.setFullYear(year + 1);
			}
			break;
		    case 100:
			cal.setMondayFirst(!cal.mondayFirst);
			return;
		    case 0:
			// TODAY will bring us here
			if ((typeof cal.checkDisabled == "function") && cal.checkDisabled(date)) {
				// remember, "date" was previously set to new
				// Date() if TODAY was clicked; thus, it
				// contains today date.
				return false;
			}
			break;
		}
		if (!date.equalsTo(cal.date)) {
			cal.setDate(date);
			newdate = true;
		}
	}
	if (newdate) {
		cal.callHandler();
	}
	if (closing) {
		Calendar.removeClass(el, "hilite");
		cal.callCloseHandler();
	}
};

// END: CALENDAR STATIC FUNCTIONS

// BEGIN: CALENDAR OBJECT FUNCTIONS

/**
 *  This function creates the calendar inside the given parent.  If _par is
 *  null than it creates a popup calendar inside the BODY element.  If _par is
 *  an element, be it BODY, then it creates a non-popup calendar (still
 *  hidden).  Some properties need to be set before calling this function.
 */
Calendar.prototype.create = function (_par) {
	var parent = null;
	if (! _par) {
		// default parent is the document body, in which case we create
		// a popup calendar.
		parent = document.getElementsByTagName("body")[0];
		this.isPopup = true;
	} else {
		parent = _par;
		this.isPopup = false;
	}
	this.date = this.dateStr ? new Date(this.dateStr) : new Date();

	var table = Calendar.createElement("table");
	this.table = table;
	table.cellSpacing = 0;
	table.cellPadding = 0;
	table.calendar = this;
	Calendar.addEvent(table, "mousedown", Calendar.tableMouseDown);

	var div = Calendar.createElement("div");
	this.element = div;
	div.className = "calendar";
	if (this.isPopup) {
		div.style.position = "absolute";
		div.style.display = "none";
	}
	div.appendChild(table);

	var thead = Calendar.createElement("thead", table);
	var cell = null;
	var row = null;

	var cal = this;
	var hh = function (text, cs, navtype) {
		cell = Calendar.createElement("td", row);
		cell.colSpan = cs;
		cell.className = "button";
		Calendar._add_evs(cell);
		cell.calendar = cal;
		cell.navtype = navtype;
		if (text.substr(0, 1) != "&") {
			cell.appendChild(document.createTextNode(text));
		}
		else {
			// FIXME: dirty hack for entities
			cell.innerHTML = text;
		}
		return cell;
	};

	row = Calendar.createElement("tr", thead);
	var title_length = 6;
	(this.isPopup) && --title_length;
	(this.weekNumbers) && ++title_length;

	hh("-", 1, 100).ttip = Calendar._TT["TOGGLE"];
	this.title = hh("", title_length, 300);
	this.title.className = "title";
	if (this.isPopup) {
		this.title.ttip = Calendar._TT["DRAG_TO_MOVE"];
		this.title.style.cursor = "move";
		hh("&#x00d7;", 1, 200).ttip = Calendar._TT["CLOSE"];
	}

	row = Calendar.createElement("tr", thead);
	row.className = "headrow";

	this._nav_py = hh("&#x00ab;", 1, -2);
	this._nav_py.ttip = Calendar._TT["PREV_YEAR"];

	this._nav_pm = hh("&#x2039;", 1, -1);
	this._nav_pm.ttip = Calendar._TT["PREV_MONTH"];

	this._nav_now = hh(Calendar._TT["TODAY"], this.weekNumbers ? 4 : 3, 0);
	this._nav_now.ttip = Calendar._TT["GO_TODAY"];

	this._nav_nm = hh("&#x203a;", 1, 1);
	this._nav_nm.ttip = Calendar._TT["NEXT_MONTH"];

	this._nav_ny = hh("&#x00bb;", 1, 2);
	this._nav_ny.ttip = Calendar._TT["NEXT_YEAR"];

	// day names
	row = Calendar.createElement("tr", thead);
	row.className = "daynames";
	if (this.weekNumbers) {
		cell = Calendar.createElement("td", row);
		cell.className = "name wn";
		cell.appendChild(document.createTextNode(Calendar._TT["WK"]));
	}
	for (var i = 7; i > 0; --i) {
		cell = Calendar.createElement("td", row);
		cell.appendChild(document.createTextNode(""));
		if (!i) {
			cell.navtype = 100;
			cell.calendar = this;
			Calendar._add_evs(cell);
		}
	}
	this.firstdayname = (this.weekNumbers) ? row.firstChild.nextSibling : row.firstChild;
	this._displayWeekdays();

	var tbody = Calendar.createElement("tbody", table);
	this.tbody = tbody;
	

	for (i = 6; i > 0; --i) {
		row = Calendar.createElement("tr", tbody);
		if (this.weekNumbers) {
			cell = Calendar.createElement("td", row);
			cell.appendChild(document.createTextNode(""));
		}
		for (var j = 7; j > 0; --j) {
			cell = Calendar.createElement("td", row);
			cell.appendChild(document.createTextNode(""));
			cell.calendar = this;
			Calendar._add_evs(cell);
		}
	}

	var tfoot = Calendar.createElement("tfoot", table);

	row = Calendar.createElement("tr", tfoot);
	row.className = "footrow";

	cell = hh(Calendar._TT["SEL_DATE"], this.weekNumbers ? 8 : 7, 300);
	cell.className = "ttip";
	if (this.isPopup) {
		cell.ttip = Calendar._TT["DRAG_TO_MOVE"];
		cell.style.cursor = "move";
	}
	this.tooltips = cell;

	div = Calendar.createElement("div", this.element);
	this.monthsCombo = div;
	div.className = "combo";
	for (i = 0; i < Calendar._MN.length; ++i) {
		var mn = Calendar.createElement("div");
		mn.className = "label";
		mn.month = i;
		mn.appendChild(document.createTextNode(Calendar._MN3[i]));
		div.appendChild(mn);
	}

	div = Calendar.createElement("div", this.element);
	this.yearsCombo = div;
	div.className = "combo";
	for (i = 12; i > 0; --i) {
		var yr = Calendar.createElement("div");
		yr.className = "label";
		yr.appendChild(document.createTextNode(""));
		div.appendChild(yr);
	}

	this._init(this.mondayFirst, this.date);
	parent.appendChild(this.element);
};

/** keyboard navigation, only for popup calendars */
Calendar._keyEvent = function(ev) {
	if (!window.calendar) {
		return false;
	}
	(Calendar.is_ie) && (ev = window.event);
	var cal = window.calendar;
	var act = (Calendar.is_ie || ev.type == "keypress");
	if (ev.ctrlKey) {
		switch (ev.keyCode) {
		    case 37: // KEY left
			act && Calendar.cellClick(cal._nav_pm);
			break;
		    case 38: // KEY up
			act && Calendar.cellClick(cal._nav_py);
			break;
		    case 39: // KEY right
			act && Calendar.cellClick(cal._nav_nm);
			break;
		    case 40: // KEY down
			act && Calendar.cellClick(cal._nav_ny);
			break;
		    default:
			return false;
		}
	} else switch (ev.keyCode) {
	    case 32: // KEY space (now)
		Calendar.cellClick(cal._nav_now);
		break;
	    case 27: // KEY esc
		act && cal.hide();
		break;
	    case 37: // KEY left
	    case 38: // KEY up
	    case 39: // KEY right
	    case 40: // KEY down
		if (act) {
			var date = cal.date.getDate() - 1;
			var el = cal.currentDateEl;
			var ne = null;
			var prev = (ev.keyCode == 37) || (ev.keyCode == 38);
			switch (ev.keyCode) {
			    case 37: // KEY left
				(--date >= 0) && (ne = cal.ar_days[date]);
				break;
			    case 38: // KEY up
				date -= 7;
				(date >= 0) && (ne = cal.ar_days[date]);
				break;
			    case 39: // KEY right
				(++date < cal.ar_days.length) && (ne = cal.ar_days[date]);
				break;
			    case 40: // KEY down
				date += 7;
				(date < cal.ar_days.length) && (ne = cal.ar_days[date]);
				break;
			}
			if (!ne) {
				if (prev) {
					Calendar.cellClick(cal._nav_pm);
				} else {
					Calendar.cellClick(cal._nav_nm);
				}
				date = (prev) ? cal.date.getMonthDays() : 1;
				el = cal.currentDateEl;
				ne = cal.ar_days[date - 1];
			}
			Calendar.removeClass(el, "selected");
			Calendar.addClass(ne, "selected");
			cal.date.setDate(ne.caldate);
			cal.callHandler();
			cal.currentDateEl = ne;
		}
		break;
	    case 13: // KEY enter
		if (act) {
			cal.callHandler();
			cal.hide();
		}
		break;
	    default:
		return false;
	}
	return Calendar.stopEvent(ev);
};

/**
 *  (RE)Initializes the calendar to the given date and style (if mondayFirst is
 *  true it makes Monday the first day of week, otherwise the weeks start on
 *  Sunday.
 */
Calendar.prototype._init = function (mondayFirst, date) {
	var today = new Date();
	var year = date.getFullYear();
	if (year < this.minYear) {
		year = this.minYear;
		date.setFullYear(year);
	} else if (year > this.maxYear) {
		year = this.maxYear;
		date.setFullYear(year);
	}
	this.mondayFirst = mondayFirst;
	this.date = new Date(date);
	var month = date.getMonth();
	var mday = date.getDate();
	var no_days = date.getMonthDays();
	date.setDate(1);
	var wday = date.getDay();
	var MON = mondayFirst ? 1 : 0;
	var SAT = mondayFirst ? 5 : 6;
	var SUN = mondayFirst ? 6 : 0;
	if (mondayFirst) {
		wday = (wday > 0) ? (wday - 1) : 6;
	}
	var iday = 1;
	var row = this.tbody.firstChild;
	var MN = Calendar._MN3[month];
	var hasToday = ((today.getFullYear() == year) && (today.getMonth() == month));
	var todayDate = today.getDate();
	var week_number = date.getWeekNumber();
	var ar_days = new Array();
	for (var i = 0; i < 6; ++i) {
		if (iday > no_days) {
			row.className = "emptyrow";
			row = row.nextSibling;
			continue;
		}
		var cell = row.firstChild;
		if (this.weekNumbers) {
			cell.className = "day wn";
			cell.firstChild.data = week_number;
			cell = cell.nextSibling;
		}
		++week_number;
		row.className = "daysrow";
		for (var j = 0; j < 7; ++j) {
			cell.className = "day";
			if ((!i && j < wday) || iday > no_days) {
				// cell.className = "emptycell";
				cell.innerHTML = "&nbsp;";
				cell.disabled = true;
				cell = cell.nextSibling;
				continue;
			}
			cell.disabled = false;
			cell.firstChild.data = iday;
			if (typeof this.checkDisabled == "function") {
				date.setDate(iday);
				if (this.checkDisabled(date)) {
					cell.className += " disabled";
					cell.disabled = true;
				}
			}
			if (!cell.disabled) {
				ar_days[ar_days.length] = cell;
				cell.caldate = iday;
				cell.ttip = "_";
				if (iday == mday) {
					cell.className += " selected";
					this.currentDateEl = cell;
				}
				if (hasToday && (iday == todayDate)) {
					cell.className += " today";
					cell.ttip += Calendar._TT["PART_TODAY"];
				}
				if (wday == SAT || wday == SUN) {
					cell.className += " weekend";
				}
			}
			++iday;
			((++wday) ^ 7) || (wday = 0);
			cell = cell.nextSibling;
		}
		row = row.nextSibling;
	}
	this.ar_days = ar_days;
	this.title.firstChild.data = Calendar._MN[month] + ", " + year;
	// PROFILE
	// this.tooltips.firstChild.data = "Generated in " + ((new Date()) - today) + " ms";
};

/**
 *  Calls _init function above for going to a certain date (but only if the
 *  date is different than the currently selected one).
 */
Calendar.prototype.setDate = function (date) {
	if (!date.equalsTo(this.date)) {
		this._init(this.mondayFirst, date);
	}
};

/**
 *  Refreshes the calendar.  Useful if the "disabledHandler" function is
 *  dynamic, meaning that the list of disabled date can change at runtime.
 *  Just * call this function if you think that the list of disabled dates
 *  should * change.
 */
Calendar.prototype.refresh = function () {
	this._init(this.mondayFirst, this.date);
};

/** Modifies the "mondayFirst" parameter (EU/US style). */
Calendar.prototype.setMondayFirst = function (mondayFirst) {
	this._init(mondayFirst, this.date);
	this._displayWeekdays();
};

/**
 *  Allows customization of what dates are enabled.  The "unaryFunction"
 *  parameter must be a function object that receives the date (as a JS Date
 *  object) and returns a boolean value.  If the returned value is true then
 *  the passed date will be marked as disabled.
 */
Calendar.prototype.setDisabledHandler = function (unaryFunction) {
	this.checkDisabled = unaryFunction;
};

/** Customization of allowed year range for the calendar. */
Calendar.prototype.setRange = function (a, z) {
	this.minYear = a;
	this.maxYear = z;
};

/** Calls the first user handler (selectedHandler). */
Calendar.prototype.callHandler = function () {
	if (this.onSelected) {
		this.onSelected(this, this.date.print(this.dateFormat));
	}
};

/** Calls the second user handler (closeHandler). */
Calendar.prototype.callCloseHandler = function () {
	if (this.onClose) {
		this.onClose(this);
	}
	this.hideShowCovered();
};

/** Removes the calendar object from the DOM tree and destroys it. */
Calendar.prototype.destroy = function () {
	var el = this.element.parentNode;
	el.removeChild(this.element);
	Calendar._C = null;
};

/**
 *  Moves the calendar element to a different section in the DOM tree (changes
 *  its parent).
 */
Calendar.prototype.reparent = function (new_parent) {
	var el = this.element;
	el.parentNode.removeChild(el);
	new_parent.appendChild(el);
};

// This gets called when the user presses a mouse button anywhere in the
// document, if the calendar is shown.  If the click was outside the open
// calendar this function closes it.
Calendar._checkCalendar = function(ev) {
	if (!window.calendar) {
		return false;
	}
	var el = Calendar.is_ie ? Calendar.getElement(ev) : Calendar.getTargetElement(ev);
	for (; el != null && el != calendar.element; el = el.parentNode);
	if (el == null) {
		// calls closeHandler which should hide the calendar.
		window.calendar.callCloseHandler();
		return Calendar.stopEvent(ev);
	}
};

/** Shows the calendar. */
Calendar.prototype.show = function () {
	var rows = this.table.getElementsByTagName("tr");
	for (var i = rows.length; i > 0;) {
		var row = rows[--i];
		Calendar.removeClass(row, "rowhilite");
		var cells = row.getElementsByTagName("td");
		for (var j = cells.length; j > 0;) {
			var cell = cells[--j];
			Calendar.removeClass(cell, "hilite");
			Calendar.removeClass(cell, "active");
		}
	}
	this.element.style.display = "block";
	this.hidden = false;
	if (this.isPopup) {
		window.calendar = this;
		Calendar.addEvent(document, "keydown", Calendar._keyEvent);
		Calendar.addEvent(document, "keypress", Calendar._keyEvent);
		Calendar.addEvent(document, "mousedown", Calendar._checkCalendar);
	}
	this.hideShowCovered();
};

/**
 *  Hides the calendar.  Also removes any "hilite" from the class of any TD
 *  element.
 */
Calendar.prototype.hide = function () {
	if (this.isPopup) {
		Calendar.removeEvent(document, "keydown", Calendar._keyEvent);
		Calendar.removeEvent(document, "keypress", Calendar._keyEvent);
		Calendar.removeEvent(document, "mousedown", Calendar._checkCalendar);
	}
	this.element.style.display = "none";
	this.hidden = true;
	this.hideShowCovered();
};

/**
 *  Shows the calendar at a given absolute position (beware that, depending on
 *  the calendar element style -- position property -- this might be relative
 *  to the parent's containing rectangle).
 */
Calendar.prototype.showAt = function (x, y) {
	var s = this.element.style;
	s.left = x + "px";
	s.top = y + "px";
	this.show();
};

/** Shows the calendar near a given element. */
Calendar.prototype.showAtElement = function (el, opts) {

	var p = Calendar.getAbsolutePos(el);
	if (!opts || typeof opts != "string") {
		this.showAt(p.x, p.y + el.offsetHeight);
		return true;
	}
	this.show();
	var w = this.element.offsetWidth;
	var h = this.element.offsetHeight;
	this.hide();
	var valign = opts.substr(0, 1);
	var halign = "l";
	if (opts.length > 1) {
		halign = opts.substr(1, 1);
	}
	// vertical alignment
        switch (valign) {
	    case "T": p.y -= h; break;
	    case "B": p.y += el.offsetHeight; break;
	    case "C": p.y += (el.offsetHeight - h) / 2; break;
	    case "t": p.y += el.offsetHeight - h; break;
	    case "b": break; // already there
        }
	// horizontal alignment
	switch (halign) {
	    case "L": p.x -= w; break;
	    case "R": p.x += el.offsetWidth; break;
	    case "C": p.x += (el.offsetWidth - w) / 2; break;
	    case "r": p.x += el.offsetWidth - w; break;
	    case "l": break; // already there
	}
	this.showAt(p.x, p.y);
};

/** Customizes the date format. */
Calendar.prototype.setDateFormat = function (str) {
	this.dateFormat = str;
};

/** Customizes the tooltip date format. */
Calendar.prototype.setTtDateFormat = function (str) {
	this.ttDateFormat = str;
};

/**
 *  Tries to identify the date represented in a string.  If successful it also
 *  calls this.setDate which moves the calendar to the given date.
 */
Calendar.prototype.parseDate = function (str, fmt) {
	var y = 0;
	var m = -1;
	var d = 0;
	var a = str.split(/\W+/);
	if (!fmt) {
		fmt = this.dateFormat;
	}
	var b = fmt.split(/\W+/);
	var i = 0, j = 0;
	for (i = 0; i < a.length; ++i) {
		if (b[i] == "D" || b[i] == "DD") {
			continue;
		}
		if (b[i] == "d" || b[i] == "dd") {
			d = parseInt(a[i], 10);
		}
		if (b[i] == "m" || b[i] == "mm") {
			m = parseInt(a[i], 10) - 1;
		}
		if ((b[i] == "y") || (b[i] == "yy")) {
			y = parseInt(a[i], 10);
			(y < 100) && (y += (y > 29) ? 1900 : 2000);
		}
		if (b[i] == "M" || b[i] == "MM") {
			for (j = 0; j < 12; ++j) {
				if (Calendar._MN[j].substr(0, a[i].length).toLowerCase() == a[i].toLowerCase()) { m = j; break; }
			}
		}
	}
	if (y != 0 && m != -1 && d != 0) {
		this.setDate(new Date(y, m, d));
		return;
	}
	y = 0; m = -1; d = 0;
	for (i = 0; i < a.length; ++i) {
		if (a[i].search(/[a-zA-Z]+/) != -1) {
			var t = -1;
			for (j = 0; j < 12; ++j) {
				if (Calendar._MN[j].substr(0, a[i].length).toLowerCase() == a[i].toLowerCase()) { t = j; break; }
			}
			if (t != -1) {
				if (m != -1) {
					d = m+1;
				}
				m = t;
			}
		} else if (parseInt(a[i], 10) <= 12 && m == -1) {
			m = a[i]-1;
		} else if (parseInt(a[i], 10) > 31 && y == 0) {
			y = parseInt(a[i], 10);
			(y < 100) && (y += (y > 29) ? 1900 : 2000);
		} else if (d == 0) {
			d = a[i];
		}
	}
	if (y == 0) {
		var today = new Date();
		y = today.getFullYear();
	}
	if (m != -1 && d != 0) {
		this.setDate(new Date(y, m, d));
	}
};

Calendar.prototype.hideShowCovered = function () {
	function getStyleProp(obj, style){
		var value = obj.style[style];
		if (!value) {
			if (document.defaultView && typeof (document.defaultView.getComputedStyle) == "function") { // Gecko, W3C
				value = document.defaultView.
					getComputedStyle(obj, "").getPropertyValue(style);
			} else if (obj.currentStyle) { // IE
				value = obj.currentStyle[style];
			} else {
				value = obj.style[style];
			}
		}
		return value;
	};

	var tags = new Array("applet", "iframe", "select");
	var el = this.element;

	var p = Calendar.getAbsolutePos(el);
	var EX1 = p.x;
	var EX2 = el.offsetWidth + EX1;
	var EY1 = p.y;
	var EY2 = el.offsetHeight + EY1;

	for (var k = tags.length; k > 0; ) {
		var ar = document.getElementsByTagName(tags[--k]);
		var cc = null;

		for (var i = ar.length; i > 0;) {
			cc = ar[--i];

			p = Calendar.getAbsolutePos(cc);
			var CX1 = p.x;
			var CX2 = cc.offsetWidth + CX1;
			var CY1 = p.y;
			var CY2 = cc.offsetHeight + CY1;

			if (this.hidden || (CX1 > EX2) || (CX2 < EX1) || (CY1 > EY2) || (CY2 < EY1)) {
				if (!cc.__msh_save_visibility) {
					cc.__msh_save_visibility = getStyleProp(cc, "visibility");
				}
				cc.style.visibility = cc.__msh_save_visibility;
			} else {
				if (!cc.__msh_save_visibility) {
					cc.__msh_save_visibility = getStyleProp(cc, "visibility");
				}
				cc.style.visibility = "hidden";
			}
		}
	}
};

/** Internal function; it displays the bar with the names of the weekday. */
Calendar.prototype._displayWeekdays = function () {
	var MON = this.mondayFirst ? 0 : 1;
	var SUN = this.mondayFirst ? 6 : 0;
	var SAT = this.mondayFirst ? 5 : 6;
	var cell = this.firstdayname;
	for (var i = 0; i < 7; ++i) {
		cell.className = "day name";
		if (!i) {
			cell.ttip = this.mondayFirst ? Calendar._TT["SUN_FIRST"] : Calendar._TT["MON_FIRST"];
			cell.navtype = 100;
			cell.calendar = this;
			Calendar._add_evs(cell);
		}
		if (i == SUN || i == SAT) {
			Calendar.addClass(cell, "weekend");
		}
		cell.firstChild.data = Calendar._DN3[i + 1 - MON];
		cell = cell.nextSibling;
	}
};

/** Internal function.  Hides all combo boxes that might be displayed. */
Calendar.prototype._hideCombos = function () {
	this.monthsCombo.style.display = "none";
	this.yearsCombo.style.display = "none";
};

/** Internal function.  Starts dragging the element. */
Calendar.prototype._dragStart = function (ev) {
	if (this.dragging) {
		return;
	}
	this.dragging = true;
	var posX;
	var posY;
	if (Calendar.is_ie) {
		posY = window.event.clientY + document.body.scrollTop;
		posX = window.event.clientX + document.body.scrollLeft;
	} else {
		posY = ev.clientY + window.scrollY;
		posX = ev.clientX + window.scrollX;
	}
	var st = this.element.style;
	this.xOffs = posX - parseInt(st.left);
	this.yOffs = posY - parseInt(st.top);
	with (Calendar) {
		addEvent(document, "mousemove", calDragIt);
		addEvent(document, "mouseover", stopEvent);
		addEvent(document, "mouseup", calDragEnd);
	}
};

// BEGIN: DATE OBJECT PATCHES

/** Adds the number of days array to the Date object. */
Date._MD = new Array(31,28,31,30,31,30,31,31,30,31,30,31);

/** Constants used for time computations */
Date.SECOND = 1000 /* milliseconds */;
Date.MINUTE = 60 * Date.SECOND;
Date.HOUR   = 60 * Date.MINUTE;
Date.DAY    = 24 * Date.HOUR;
Date.WEEK   =  7 * Date.DAY;

/** Returns the number of days in the current month */
Date.prototype.getMonthDays = function(month) {
	var year = this.getFullYear();
	if (typeof month == "undefined") {
		month = this.getMonth();
	}
	if (((0 == (year%4)) && ( (0 != (year%100)) || (0 == (year%400)))) && month == 1) {
		return 29;
	} else {
		return Date._MD[month];
	}
};

/** Returns the number of the week.  The algorithm was "stolen" from PPK's
 * website, hope it's correct :) http://www.xs4all.nl/~ppk/js/week.html */
Date.prototype.getWeekNumber = function() {
	var now = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0);
	var then = new Date(this.getFullYear(), 0, 1, 0, 0, 0);
	var time = now - then;
	var day = then.getDay();
	(day > 3) && (day -= 4) || (day += 3);
	return Math.round(((time / Date.DAY) + day) / 7);
};

/** Checks dates equality (ignores time) */
Date.prototype.equalsTo = function(date) {
	return ((this.getFullYear() == date.getFullYear()) &&
		(this.getMonth() == date.getMonth()) &&
		(this.getDate() == date.getDate()));
};

/** Prints the date in a string according to the given format. */
Date.prototype.print = function (frm) {
	var str = new String(frm);
	var m = this.getMonth();
	var d = this.getDate();
	var y = this.getFullYear();
	var wn = this.getWeekNumber();
	var w = this.getDay();
	var s = new Array();
	s["d"] = d;
	s["dd"] = (d < 10) ? ("0" + d) : d;
	s["m"] = 1+m;
	s["mm"] = (m < 9) ? ("0" + (1+m)) : (1+m);
	s["y"] = y;
	s["yy"] = new String(y).substr(2, 2);
	s["w"] = wn;
	s["ww"] = (wn < 10) ? ("0" + wn) : wn;
	with (Calendar) {
		s["D"] = _DN3[w];
		s["DD"] = _DN[w];
		s["M"] = _MN3[m];
		s["MM"] = _MN[m];
	}
	var re = /(.*)(\W|^)(d|dd|m|mm|y|yy|MM|M|DD|D|w|ww)(\W|$)(.*)/;
	while (re.exec(str) != null) {
		str = RegExp.$1 + RegExp.$2 + s[RegExp.$3] + RegExp.$4 + RegExp.$5;
	}
	return str;
};

// END: DATE OBJECT PATCHES

// global object that remembers the calendar
window.calendar = null;




//-------------------------------------------------------------------------------------------


var oldLink = null;
// code to change the active stylesheet
function setActiveStyleSheet(link, title) {
  var i, a, main;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
      a.disabled = true;
      if(a.getAttribute("title") == title) a.disabled = false;
    }
  }
  if (oldLink) oldLink.style.fontWeight = 'normal';
  oldLink = link;
  link.style.fontWeight = 'bold';
  return false;
}

// This function gets called when the end-user clicks on some date.
function selected(cal, date) {
  cal.sel.value = date; // just update the date in the input field.
  if (cal.dateClicked && (cal.sel.id == "sel1" || cal.sel.id == "sel3"))
    // if we add this call we close the calendar on single-click.
    // just to exemplify both cases, we are using this only for the 1st
    // and the 3rd field, while 2nd and 4th will still require double-click.
    cal.callCloseHandler();
}

// And this gets called when the end-user clicks on the _selected_ date,
// or clicks on the "Close" button.  It just hides the calendar without
// destroying it.
function closeHandler(cal) {
  cal.hide();                        // hide the calendar
}

// This function shows the calendar under the element having the given id.
// It takes care of catching "mousedown" signals on document and hiding the
// calendar if the click was outside.
function showCalendar(id,format) {
  var el = document.getElementById(id);
  if (calendar != null) {
    // we already have some calendar created
    calendar.hide();                 // so we hide it first.
  } else {
    // first-time call, create the calendar.
    var cal = new Calendar(false, null, selected, closeHandler);
    // uncomment the following line to hide the week numbers
    // cal.weekNumbers = false;
    calendar = cal;                  // remember it in the global var
    cal.setRange(1900, 2070);        // min/max year allowed.
    cal.create();
  }
  calendar.setDateFormat(format);    // set the specified date format
  calendar.parseDate(el.value);      // try to parse the text in field
  calendar.sel = el;                 // inform it what input field we use

  // the reference element that we pass to showAtElement is the button that
  // triggers the calendar.  In this example we align the calendar bottom-right
  // to the button.

  //calendar.showAtElement(el.nextSibling, "Br");        // show the calendar
  calendar.showAtElement(el, "Br");
  return false;
}

function calCtrlPopup(inputField) {
	showCalendar(inputField.name, 'y-m-d');
}

var MINUTE = 60 * 1000;
var HOUR = 60 * MINUTE;
var DAY = 24 * HOUR;
var WEEK = 7 * DAY;

// If this handler returns true then the "date" given as
// parameter will be disabled.  In this example we enable
// only days within a range of 10 days from the current
// date.
// You can use the functions date.getFullYear() -- returns the year
// as 4 digit number, date.getMonth() -- returns the month as 0..11,
// and date.getDate() -- returns the date of the month as 1..31, to
// make heavy calculations here.  However, beware that this function
// should be very fast, as it is called for each day in a month when
// the calendar is (re)constructed.
function isDisabled(date) {
  var today = new Date();
  return (Math.abs(date.getTime() - today.getTime()) / DAY) > 10;
}

function flatSelected(cal, date) {
  var el = document.getElementById("preview");
  el.innerHTML = date;
}

function showFlatCalendar() {
  var parent = document.getElementById("display");

  // construct a calendar giving only the "selected" handler.
  var cal = new Calendar(false, null, flatSelected);

  // hide week numbers
  cal.weekNumbers = false;

  // We want some dates to be disabled; see function isDisabled above
  cal.setDisabledHandler(isDisabled);
  cal.setDateFormat("DD, M d");

  // this call must be the last as it might use data initialized above; if
  // we specify a parent, as opposite to the "showCalendar" function above,
  // then we create a flat calendar -- not popup.  Hidden, though, but...
  cal.create(parent);

  // ... we can show it here.
  cal.show();
}


//---------------------------------------------------------------------------




// ** Translated by ATang ** I18N
Calendar._DN = new Array
("日",
 "一",
 "二",
 "三",
 "四",
 "五",
 "六",
 "日");
Calendar._MN = new Array
("一月",
 "二月",
 "三月",
 "四月",
 "五月",
 "六月",
 "七月",
 "八月",
 "九月",
 "十月",
 "十一月",
 "十二月");

// tooltips
Calendar._TT = {};
Calendar._TT["TOGGLE"] = "切换周开始的一天";
Calendar._TT["PREV_YEAR"] = "上一年 (按住出菜单)";
Calendar._TT["PREV_MONTH"] = "上一月 (按住出菜单)";
Calendar._TT["GO_TODAY"] = "到今日";
Calendar._TT["NEXT_MONTH"] = "下一月 (按住出菜单)";
Calendar._TT["NEXT_YEAR"] = "下一年 (按住出菜单)";
Calendar._TT["SEL_DATE"] = "选择日期";
Calendar._TT["DRAG_TO_MOVE"] = "拖动";
Calendar._TT["PART_TODAY"] = " (今日)";
Calendar._TT["MON_FIRST"] = "首先显示星期一";
Calendar._TT["SUN_FIRST"] = "首先显示星期日";
Calendar._TT["CLOSE"] = "关闭";
Calendar._TT["TODAY"] = "今日";

// date formats
Calendar._TT["DEF_DATE_FORMAT"] = "y-mm-dd";
Calendar._TT["TT_DATE_FORMAT"] = "D, M d";

Calendar._TT["WK"] = "周";










//展开菜单教本
scores = new Array(20);
var numTotal=0;
NS4 = (document.layers) ? 1 : 0;
IE4 = (document.all) ? 1 : 0;
ver4 = (NS4 || IE4) ? 1 : 0;
if (ver4) {   
  with (document) 
  {  write("<STYLE TYPE='text/css'>");
     if (NS4) {  write(".parent {position:absolute; visibility:visible}");
	            write(".child {position:absolute; visibility:visible}");  
				write(".regular {position:absolute; visibility:visible}")   }   
     else {     write(".child {display:none}")        }  
	       write("</STYLE>");    }}
function getIndex(el) {   
 ind = null;   
  for (i=0; i<document.layers.length; i++) {  
       whichEl = document.layers[i];    
	       if (whichEl.id == el) {    
		           ind = i;  
				     break; 
				       }  
			  } 
			  return ind;
			  }
function arrange()  { 
   nextY = document.layers[firstInd].pageY +document.layers[firstInd].document.height; 
      for (i=firstInd+1; i<document.layers.length; i++) {    
	      whichEl = document.layers[i];    
		      if (whichEl.visibility != "hide") { 
			            whichEl.pageY = nextY;
						nextY += whichEl.document.height;
						        }
						    }
						}
function initIt(){ 
  
  if (!ver4) return;    
   if (NS4) {     
     
      for (i=0; i<document.layers.length; i++) { 
	          whichEl = document.layers[i];  
			       if (whichEl.id.indexOf("Child") != -1) 
				   whichEl.visibility = "hide";   
				       }    
					     arrange();
						     }   
				  else {   
				       divColl = document.all.tags("DIV"); 
					    for (i=0; i<divColl.length; i++) {    
						        whichEl = divColl(i);   
			         if (whichEl.className == "child") 
						
				  			whichEl.style.display = "inline";   
						
					      } 
					   }
					 }
function expandIt(el) {	
     if (!ver4) return;  
	   if (IE4) { 
	     whichEl1 = eval(el + "Child");	
		 	for(i=1;i<=numTotal;i++){	
			  whichEl = eval(scores[i] + "Child");	
			  	if(whichEl!=whichEl1) {		
				 whichEl.style.display = "none";	
				 	}
						}  
		         whichEl1 = eval(el + "Child");
		        if (whichEl1.style.display == "none") { 
				     whichEl1.style.display = "block"; 
					       }   
			     else {  
				   whichEl1.style.display = "none";  
				         }  
				  }
		     else {  
			      whichEl = eval("document." + el + "Child");	
				  	for(i=1;i<=numTotal;i++){		
					whichEl = eval("document." + scores[i] + "Child");	
						if(whichEl!=whichEl1) {		
							whichEl.visibility = "hide";	
									}
								}
				         if (whichEl.visibility == "hide") {  
						     whichEl.visibility = "show";  
							      }
				        else { 
						       whichEl.visibility = "hide";    
							       } 
				        arrange();
						    }
						}
onload = initIt;

//END OF 展开菜单教本



//显示菜单格式
//2004-8-4
function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_showHideLayers() { //v6.0
  
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) 
		if ((obj=MM_findObj(args[i]))!=null){
			//var top = (window.screen.availHeight - windowhight)/2;
			//var left = (window.screen.availWidth - windowwidth)/2;
			//obj.style.top = top;
			//obj.style.left = left;

			v=args[i+2];
			if (obj.style) {
				obj=obj.style;
				v=(v=='show')?'visible':(v=='hide')?'hidden':v; 
				

			}
		obj.visibility=v; 
		}
}

function MM_reloadPage(init) {  //reloads the window if Nav4 resized
  if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
    document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
  else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
MM_reloadPage(true);
function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}


     
 function secBoard(n)
  {
   for(i=0;i<secTable.cells.length;i++)
   secTable.cells[i].className="sec1";
   secTable.cells[n].className="sec2";
   for(i=0;i<mainTable.tBodies.length;i++)
   mainTable.tBodies[i].style.display="none";
   mainTable.tBodies[n].style.display="block";
	
  }


//end 菜单显示格式



//导航条显示日期时间函数//
var timerID = null;
var timerRunning = false;

function stopclock (){
	if(timerRunning){
		clearTimeout(timerID);
		timerRunning = false;
	}
}

function showtime() {
var isnMonth = new Array("1","2","3","4","5","6","7","8","9","10","11","12");
var isnDay = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六","星期日");

var now = new Date();
var hours = now.getHours();
var minutes = now.getMinutes();
var seconds = now.getSeconds()
var timeValue = "" +hours
timeValue += ((minutes < 10) ? ":0" : ":") + minutes



var todayx = now.getYear() + "-" + isnMonth[now.getMonth()]+"-"+now.getDate() +" "+ isnDay[now.getDay()];

window.TIME1.innerHTML=todayx + timeValue;
timerID = setTimeout("showtime()",1000*60);
timerRunning = true;

}

function startclock () {
	stopclock();
	showtime();
    
}
//END OF 导航条显示日期时间函数//






//Content表单内容显示
//cjy 2004-8-6
//可以打包为js文件;
var x0=0,y0=0,x1=0,y1=0;
var offx=6,offy=6;
var moveable=false;
var hover='orange',normal='slategray';//color;
var index=10000;//z-index;
//开始拖动;
function startDrag(obj)
{
//锁定标题栏;
obj.setCapture();
//定义对象;
var win = obj.parentNode;
var sha = win.nextSibling;
//记录鼠标和层位置;
x0 = event.clientX;
y0 = event.clientY;
x1 = parseInt(win.style.left);
y1 = parseInt(win.style.top);
//记录颜色;
normal = obj.style.backgroundColor;
//改变风格;
obj.style.backgroundColor = hover;
win.style.borderColor = hover;
obj.nextSibling.style.color = hover;
sha.style.left = x1 + offx;
sha.style.top = y1 + offy;
moveable = true;
}
//拖动;
function drag(obj)
{
var win = obj.parentNode;
var sha = win.nextSibling;
if(moveable)
{
win.style.left = x1 + event.clientX - x0;
win.style.top = y1 + event.clientY - y0;
sha.style.left = parseInt(win.style.left) + offx;
sha.style.top = parseInt(win.style.top) + offy;
}
}
//停止拖动;
function stopDrag(obj)
{
var win = obj.parentNode;
var sha = win.nextSibling;
win.style.borderColor = normal;
obj.style.backgroundColor = normal;
obj.nextSibling.style.color = normal;
sha.style.left = obj.parentNode.style.left;
sha.style.top = obj.parentNode.style.top;
//放开标题栏;
obj.releaseCapture();
moveable = false;
}
//获得焦点;
function getFocus(obj)
{
index = index + 2;
var idx = index;
obj.style.zIndex=idx;
obj.nextSibling.style.zIndex=idx-1;
}
function min(obj)
{
var win = obj.parentNode.parentNode;
var sha = win.nextSibling;
var tit = obj.parentNode;
var msg = tit.nextSibling;
var flg = msg.style.display=="none";
if(flg)
{
win.style.height = parseInt(msg.style.height) + parseInt(tit.style.height) + 2*2;
sha.style.height = win.style.height;
msg.style.display = "block";
obj.innerHTML = "0";
}
else
{
win.style.height = parseInt(tit.style.height) + 2*2;
sha.style.height = win.style.height;
obj.innerHTML = "2";
msg.style.display = "none";
}
}
function cls(obj)
{
var win = obj.parentNode.parentNode;
var sha = win.nextSibling;
win.style.visibility = "hidden";
sha.style.visibility = "hidden";
}
//创建一个对象;
function xWin(id,w,h,l,t,tit,msg)
{
index = index+2;
this.id = id;
this.width = w;
this.height = h;
this.left = l;
this.top = t;
this.zIndex = index;
this.title = tit;
this.message = msg;
this.obj = null;
this.bulid = bulid;
this.bulid();
}
//初始化;
function bulid()
{
var str = ""
+ "<div id=xMsg" + this.id + " "
+ "style='"
+ "z-index:" + this.zIndex + ";"
+ "width:" + this.width + ";"
+ "height:" + this.height + ";"
+ "left:" + this.left + ";"
+ "top:" + this.top + ";"
+ "background-color:" + normal + ";"
+ "color:" + normal + ";"
+ "font-size:10px;"
+ "font-family:Verdana;"
+ "position:absolute;"
+ "cursor:default;"
+ "border:2px solid " + normal + ";"
+ "' "
+ "onmousedown='getFocus(this)'>"
+ "<div "
+ "style='"
+ "background-color:" + normal + ";"
+ "width:" + (this.width-2*2) + ";"
+ "height:20;"
+ "color:white;"
+ "' "
+ "onmousedown='startDrag(this)' "
+ "onmouseup='stopDrag(this)' "
+ "onmousemove='drag(this)' "
+ ">"
+ "<span style='width:" + (this.width-2*12-4) + ";padding-left:3px;'>" + this.title + "</span>"
+ "<span style='width:12;border-width:0px;color:white;font-family:webdings;' onclick='min(this)'>0</span>"
+ "<span style='width:12;border-width:0px;color:white;font-family:webdings;' onclick='cls(this)'>r</span>"
+ "</div>"
+ "<div style='"
+ "width:100%;"
+ "height:" + (this.height-20-4) + ";"
+ "background-color:white;"
+ "line-height:14px;"
+ "word-break:break-all;"
+ "padding:3px;"
+ "'>" + this.message + "</div>"
+ "</div>"
+ "<div style='"
+ "width:" + this.width + ";"
+ "height:" + this.height + ";"
+ "top:" + this.top + ";"
+ "left:" + this.left + ";"
+ "z-index:" + (this.zIndex-1) + ";"
+ "position:absolute;"
+ "background-color:black;"
+ "filter:alpha(opacity=40);"
+ "'>?</div>";
document.body.insertAdjacentHTML("beforeEnd",str);
}

//end content内容





function MM_reloadPagebak(init) {  //reloads the window if Nav4 resized
  if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
    document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
  else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}

MM_reloadPagebak(true);

function navbarOver(src,clrOver,clrOverBorder) { if (!src.contains(event.fromElement)){ src.style.cursor = 'hand'; src.bgColor = clrOver; src.borderColor = clrOverBorder; src.children.tags('a')[0].style.color='#FFFF33'; }}

function navbarOut(src,clrIn,clrInBorder) { if (!src.contains(event.toElement)) { src.style.cursor = 'default'; src.bgColor = clrIn; src.borderColor = clrInBorder; src.children.tags('a')[0].style.color='#FFFFFF';}}


function MM_findObjbak(n, d) { //v4.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && document.getElementById) x=document.getElementById(n); return x;
}

function MM_showHideLayersbak() 
{ 
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) 
  if ((obj=MM_findObj(args[i]))!=null) 
   { 
  v=args[i+2];
  if (obj.style) 
  {
  obj=obj.style;
  v=(v=='show')?'visible':(v=='hide')?'hidden':v;
  }
  obj.visibility=v;
  }
}
