/*********************************************************
移交调用动作
*********************************************************/
	function referForm(formAction) {
		var msg = checkReferData();
		if (savesubmit(msg) != true) return;
		var form = window.document.forms[0];
		var ifdirectRefer = form.ifdirectRefer.value;		
		if (ifdirectRefer == "true")
		{	
			if (ContinueConfirm("确定移交？"))
			{
				form.action = formAction;
				form.submit();
			}
			else return;
		}
		else {
			var serialNumber = form.serialNumber.value;
			var flowId = form.flowId.value;
			var currTacheId = form.currTacheId.value;
			var referRouteId = form.referRouteId.value;
			var defaultReferRouteId = form.defaultReferRouteId.value;
			var URL = "/app/commons/forRefer.action?serialNumber=" + serialNumber;
			URL = URL + "&flowId=" + flowId;
			URL = URL + "&currTacheId=" + currTacheId;
			URL = URL + "&referRouteId=" + referRouteId;
			URL = URL + "&defaultReferRouteId=" + defaultReferRouteId;
			var windowhight = 200;
			var windowwidth = 400;
			var top = (window.screen.availHeight - windowhight)/2;
			var left = (window.screen.availWidth - windowwidth)/2;
			var x = window.showModalDialog(URL,form,"dialogWidth=400px;dialogHeight=300px;scroll:no;status:yes");
			if(x=="1"){
				var msg = "";
				msg = isnull_text("selectedRouteId","移交流向");
				//msg = msg + isnull_text("selectedUserId","移交办理人");
				if(savesubmit(msg) == true){
					form.action = formAction;
					form.submit();
				}
			}
		}
	}

/*********************************************************
退回调用动作
*********************************************************/
	function refuseForm(formAction) {
		var msg = checkReferData();
		if (savesubmit(msg) != true) return;
		var form = window.document.forms[0];
		var ifdirectRefuse = form.ifdirectRefuse.value;		
		if (ifdirectRefuse == "true")
		{	
			if (ContinueConfirm("确定退回？"))
			{
				form.action = formAction;
				form.submit();
			}
			else return;
		}
		else {
			var serialNumber = form.serialNumber.value;
			var flowId = form.flowId.value;
			var currTacheId = form.currTacheId.value;
			var refuseRouteId = form.refuseRouteId.value;
			var defaultRefuseRouteId = form.defaultRefuseRouteId.value;
			var URL = "/app/commons/forRefuse.action?serialNumber=" + serialNumber;
			URL = URL + "&flowId=" + flowId;
			URL = URL + "&currTacheId=" + currTacheId;
			URL = URL + "&refuseRouteId=" + refuseRouteId;
			URL = URL + "&defaultRefuseRouteId=" + defaultRefuseRouteId;
			var windowhight = 200;
			var windowwidth = 400;
			var top = (window.screen.availHeight - windowhight)/2;
			var left = (window.screen.availWidth - windowwidth)/2;
			var x = window.showModalDialog(URL,form,"dialogWidth=400px;dialogHeight=300px;scroll:no;status:yes");
			if(x=="1"){
				var msg = "";
				msg = isnull_text("selectedRouteId","退回流向");
				//msg = msg + isnull_text("selectedUserId","移交办理人");
				if(savesubmit(msg) == true){
					form.action = formAction;
					form.submit();
				}
			}
		}
	}