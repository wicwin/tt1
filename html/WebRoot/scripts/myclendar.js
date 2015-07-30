
function mynextday(val)
{
	var days=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
	var days2=new Array(31,29,31,30,31,30,31,31,30,31,30,31);
	var iyears=val.substring(0,4);
	var imonths=val.substring(5,7);
	var idays=val.substring(8,10);
	var iyear=new Number(iyears);
	var imonth=new Number(imonths);
	var iday=new Number(idays);
	
	var  r=0;	
	var rday="-";
	var rmonth="-";
	var ryear="";
	var ch="";	
	var ia=iyear%4;
	
	if(ia==0)                                   
		r=1;
	if(r==1)//run
	{
		if(iday<days2[imonth-1])
		{
			var idap=iday+1;
			if(idap<10)
				rday+="0"+idap;
			else
			rday+=idap;
			if(imonth<10)
				rmonth+="0"+imonth;
			else
			rmonth+=imonth;
			ryear=iyears;
		}
		if(iday==days2[imonth-1]&&imonth!=12)
		{
			
			rday+=1;
			if(imonth+1<10)
				rmonth+="0"+(imonth+1);
			else
			rmonth+=(imonth+1);
			ryear=iyears;
		}
		if(iday==days2[imonth-1]&&imonth==12)
		{
			
			rday+="01";
			rmonth+="01";
			ryear=(iyear+1).toString();
		}
		ch=ryear+rmonth+rday;
		//alert(ch);
	}
	if(r==0)//ping
	{
		
		
		if(iday<days[imonth-1])
		{
			
			var idap=iday+1;
			
			if(idap<10)
				rday+="0"+idap;
			 
			else
			rday+=idap;
			if(imonth<10)
				rmonth+="0"+imonth;
			else
			rmonth+=imonth;
			ryear=iyear.toString();
		//	var dsid=iday+1;
			
		}
		if(iday==days[imonth-1]&&imonth!=12)
		{
			
			rday+="01";
			if(imonth+1<10)
				rmonth+="0"+(imonth+1);
			else
			rmonth+=(imonth+1);
			ryear=iyear.toString();
		}
		if(iday==days[imonth-1]&&imonth==12)
		{
			
			rday+="01";
			rmonth+="01";
			ryear=(iyear+1).toString();
		}
		
		ch=ryear+rmonth+rday;
		
	}

	return ch;
	
}




function mybeforday(val)
{
	var days=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
	var days2=new Array(31,29,31,30,31,30,31,31,30,31,30,31);
	var iyears=val.substring(0,4);
	var imonths=val.substring(5,7);
	var idays=val.substring(8,10);
	var iyear=new Number(iyears);
	var imonth=new Number(imonths);
	var iday=new Number(idays);
	var  r=0;	
	var rday="-";
	var rmonth="-";
	var ryear="";
	var ch="";	
	var ia=iyear%4;
	
	if(ia==0)                                   
		r=1;
	if(r==1)//run
	{
		if(iday==1&&imonth!=1)
		{
			rday+=days2[imonth-1].toString();
			if(imonth-1<10)
				rmonth+="0"+(imonth-1).toString();
			else
			rmonth+=(imonth-1).toString();
			ryear+=iyear.toString();
		}
		if(iday==1&&imonth==1)
		{
			rday+="31";
			rmonth+="12";
			ryear=(iyear-1).toString();
		}
		if(iday!=1)
		{
			if(iday-1<10)
				rday+="0"+(iday-1).toString();
			else
			rday+=(iday-1).toString();
			if(imonth<10)
				rmonth+=+"0"+imonth.toString();
			else
			rmonth+=imonth.toString();
			ryear+=iyear.toString();
		}
		
		ch=ryear+rmonth+rday;
	}
	if(r==0)//ping
	{
		
		
		if(iday==1&&imonth!=1)
		{
			//alert("d"+days[imonth-2].toString());
			rday+=days[imonth-2].toString();
			if(imonth-1<10)
				rmonth+="0"+(imonth-1).toString();
			else
			rmonth+=(imonth-1).toString();
			
			ryear+=iyear.toString();
		}
		if(iday==1&&imonth==1)
		{
			rday+="31";
			rmonth+="12";
			ryear=(iyear-1).toString();
		}
		if(iday!=1)
		{
			if(iday-1<10)
				rday+="0"+(iday-1).toString();
			else
			rday+=(iday-1).toString();
			if(imonth<10)
				rmonth+="0"+imonth.toString();
			else
			rmonth+=imonth.toString();
			ryear+=iyear.toString();
		}
		ch=ryear+rmonth+rday;
		
	}

	return ch;
	
}









