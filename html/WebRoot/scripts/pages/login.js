
var lastuser = getCookie("LastVisitUserName");
var idcode = getCookie("IdCode");

var NN4 = (document.layers) ? true : false;

// required for NN4 to reliably capture key events
if (NN4) document.captureEvents(Event.KEYPRESS)
document.onkeypress = function (event) {
  checkEnter(event)
  return true
}
function setFormFocus() {
	document.forms[0].j_username.focus();
	document.forms[0].j_username.select();
	if (lastuser!="" && lastuser.toLowerCase()!="undefined"){
	   document.forms[0].j_username.value = lastuser;
	   document.forms[0].j_password.focus();
	}
}

//submit the form if the user presses the ENTER key
function checkEnter(event)
{
	var code = 0

	if (NN4) {
		code = event.which
	} else {
		code = window.event.keyCode
	}

	if (code==13)
	   document.forms[0].submit();
}

function getCookie(name) {
  var search;
  search = name + "="
  offset = document.cookie.indexOf(search)
  if (offset != -1) {
    offset += search.length ;
    end = document.cookie.indexOf(";", offset) ;
    if (end == -1)
      end = document.cookie.length;
    return unescape(document.cookie.substring(offset, end));
  }
  else
    return "";
}
function dosubmit(){

   	     var thisFrm = document.forms[0];

		var Curname=document.forms[0].Username.value;
		var Password=document.forms[0].Password.value;
 		document.cookie = "A=" + Curname;
 		document.cookie = "B=" + Password;

 		//设置最后访问人
 		var cookieExpires
 		var expdate = new Date();
 		expdate.setTime(expdate.getTime() + 30 * (24 * 60 * 60 * 1000));
 		cookieExpires = expdate.toGMTString();
		document.cookie = "LastVisitUserName=" + Curname + ";expires=" + cookieExpires;
 		window.document.forms[0].submit();

 	}
function reg(){
 		window.document.forms[0].action="clientManage!redictReg.action?cflag=1";
	window.document.forms[0].submit();;
	
	// modify by xujiakun GA
	_gaq.push(['_trackEvent', 'Home', 'Register']);
	
 	}
 	
 	
// modify by xujiakun 2009-12-08
function setCookie() {
	$.cookie("LastVisitUserId", null, {path: '/app/'});
	
	var j_username = document.forms[0].j_username.value;
	
	//设置最后访问人
	$.cookie("LastVisitUserId", j_username, {path: '/app/'});
	
	// modify by xujiakun GA
	_gaq.push(['_trackEvent', 'Home', 'Login', j_username]);
}

// modify by xujiakun 2009-12-09
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
