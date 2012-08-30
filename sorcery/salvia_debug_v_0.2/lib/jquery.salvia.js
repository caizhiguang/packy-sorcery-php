;(function($){
	
	/**==jQuery.extend===================================================================**/
	$.extend({
		unique: function( array ) {
			var ret = [], done = {};
			try{
				for(var i=0,length=array.length;i<length;i++) {
					var id = array[i];
					if (!done[id]){
						done[id] = true;
						ret.push(array[i]);
					}
				}
			}catch(e){
			ret = array;
			}
			return ret;
		},
        getRootPath:function(){
			var strFullPath=window.document.location.href;
			var strPath=window.document.location.pathname;
			var pos=strFullPath.indexOf(strPath);
			var prePath=strFullPath.substring(0,pos);
			var postPath="";
			return(prePath+postPath);
		},
		dateToString:function(date,format){
			var result = format==undefined?"Y-M-D h:m:s":format;
			result = result.replace(/Y/,date.getFullYear());
			result = result.replace(/M/,date.getMonth()+1);
			result = result.replace(/D/,date.getDate());
			result = result.replace(/h/,date.getHours());
			result = result.replace(/m/,date.getMinutes());
			result = result.replace(/s/,date.getSeconds());
			result = result.replace(/z/,date.getMilliseconds());
			return result;
		},
		stringToDate:function(str){
			var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})(.(\d{1,3}))*$/;
			var r = str.match(reg);
			if(r==null) return false;
			var d = new Date(r[1], r[3]-1,r[4],r[5],r[6],r[7],r[9]==undefined?"0":r[9]);
			return d;
		},
		list:{
			add:function(list,item){
				list.push(item);
			},
			remove:function(list,item){
				return list.splice(this.indexOf(list, item),1)[0];
			},
			count:function(list){
				return list.length;
			},
			contains:function(list,item){
				return this.indexOf(list,item)!=-1;
			},
			clear:function(list){
				for(var i in list){list[i]==null;delete list[i];}
				return list;
			},
			indexOf:function(list,item){
				for(var i in list)
	    		{
	    			if(item==list[i]){return i;}
	    		}
	    		return -1;
			}
		},
		hash:{
			add:function(hash,key,item){
				hash[key]=item;
				return item;
			},
			remove:function(hash,key){
				if(hash[key]==undefined){return false;}
				var _remove_item = hash[key];
				hash[key]=null;
				delete hash[key];
				return _remove_item;
			},
			count:function(hash){
				var count=0;
				for(var pro in hash){count++;}
				return count;
			},
			contains:function(hash,key){
				if(key in hash){return true};
				return false;
			},
			clear:function(hash){
				for(var pro in hash){hash[pro]=null;delete hash[pro];}
				return hash;
			}
		},
		sort:function (arr,compare) { //交换排序->冒泡排序
			//var st = new Date();
			var temp;
			var exchange;
			for(var i=0; i<arr.length; i++) {
				exchange = false;
				for(var j=arr.length-2; j>=i; j--) {
					if(compare(arr[j+1],arr[j])>0){
						temp = $(arr[j+1]).clone(true);
						temp.insertBefore(arr[j]);
						$(arr[j+1]).remove();
						arr[j+1] = arr[j];
						arr[j] = temp;
						exchange = true;
					}
				}
				if(!exchange) break;
			}
			//status = (new Date() - st) + ' ms';
			return arr;
		}
	});
	/**==salvia.extend===================================================================**/
	$.extend({
		//salvia扩展类
		salvia:{
			//DOM
			dom:{
				create:function(options){
					var result = new Array();
					if(typeof options=="string"){
						return $(document.createElement(options));
					}else if($.isArray(options))
					{
						for(var i in options)
						{
							result.push($(document.createElement(options[i]["element"])));
						}
					}
					else if(options["element"]!=undefined){
						result.push($(document.createElement(options["element"])));
					}else{
						for(var id in options)
						{
							result.push($(document.createElement(id)));
						}
					}
					return result.length==1?result[0]:result;
				}
			},
			//Data
			data:{
				binding:function(scope,data,binding){
					/**
					 * mode 为数据和绑定处理的不同以做的处理的方法：
					 * 
					 * 0 数据是数组，绑定处理必需是方法（因：不做复杂处理）
					 * 1 数据是类，绑定处理是方法（整个类传入方法进行处理）
					 * 2 数据是类，绑定处理是类（绑定处理中的方法名与类的属性名相同时调用方法进行处理）
					 * 
					 * **/
					var mode = -1;
					//判断数据类型
					if($.isArray(data)){mode = 0;}
					if(typeof binding=="function"){mode += 1;}
					else if(binding==undefined){mode = -1;}
					else{mode += 3;}
					
					switch(mode){
						case -1:
							for(var attr in data){
								scope.find('.'+attr).text(data[attr]);
							}
							break;
						case 0:
						case 1:
							binding.call(scope,data);
							break;
						case 2:
							for(var pro in binding){
								if(typeof binding[pro]!="function"){continue;}
								if(data[pro]==undefined){continue;}
								binding[pro].call(scope,data[pro]);
							}
							break;
					}
					return mode>=0;
				},
				//数据转换
				convert:function(data,rule){
					var result = {};
					if(typeof rule!="object"){$.error("rule is not a object");}
					for(var pro in rule)
					{
						if(data[pro]==undefined){continue;}
						result[rule[pro]] = data[pro];
					}
					result.original = data;
					return result;
				}
			},
			//Util
			load:function(path){
				var result = false;
				
				var ajax_load_list = $(document).data("ajax_load_list")==undefined?[]:$(document).data("ajax_load_list");
				ajax_load_list.push(path);
				$(document).data("ajax_load_list",ajax_load_list);
				
				$.ajax({
					url:path,
					async:false,//关闭异步，使用同步
					type:"get",
					dataType:"script",
					success:function(data, textStatus){
						result = true;
					}
				});
				return result;
			},
			//ubb
			ubb:{
				regular:{
					image:/\{\^img=(.[^\{]*)\/\}/ig,
					face:/\{\^\:(.[^\{]*)\/\}/ig,
					fontsize:/\{\^fs=([+|-]?[0-7])\}(.*?)\{\/fs\}/ig,
					color:/\{\^c=(.[^\{]*)\}(.*?)\{\/c\}/ig,
					quote:/\{\^q\}(.*?)\{\/q\}/ig
				},
				convert:function(content){
					facePath = $.getRootPath()+$.browser.msie&&$.browser.version=="6.0"?"/photo/faces_ie6/":"/photo/faces/";
					content = content.replace($.salvia.ubb.regular.face,"<img src=\""+facePath+"$1.png\" />");
					content = content.replace($.salvia.ubb.regular.image,"<img src=\""+$.getRootPath()+"$1\" />");
					content = content.replace($.salvia.ubb.regular.fontsize,"<font size=$1>$2</font>");
					content = content.replace($.salvia.ubb.regular.color,"<font color=$1>$2</font>");
					content = content.replace($.salvia.ubb.regular.quote,"<div class='quote'>$1</div>");
					return content;
				}
			}
		}
	});
	
	$.extend({
		c:function(options){
			return $.salvia.dom.create(options);
		},
		convert:function(data,rule){
			return $.salvia.data.convert(data,rule);
		},
		_show_debug_message:function(message){
			if($("#_debug").length>0){
				$._debug_panel = $("#_debug");
			}else{
				$._debug_panel = $.c("div").appendTo(document.body).attr({id:"_debug"}).css({border:"#ddd solid 1px",background:"#fff",padding:10,position:"absolute",bottom:5,right:5,width:400,height:300,overflow:"auto"});
				$.c("a").attr({href:"javascript:;",id:"_debug_close"}).appendTo($._debug_panel).text("关闭").css({float:"right"}).click(function(){
					$(this).parent().hide();
				});
				$.c("code").css({width:400}).attr({id:"message"}).appendTo($._debug_panel);
			}
			
			$._debug_panel.find("#message").html($._debug_panel.find("#message").html()+message+"<br/>");
		}
	});
	
	$.fn.extend({
		binding:function(data,binding,scope){
			if(scope==undefined){scope=this;}
			$.salvia.data.binding(scope,data,binding);
		},
		serializeObject:function(){
			var result = {};
			$(this).find("input[type='hidden'],input[type='text'],input[type='password'],input[type='radio'],input[type='checkbox'],textarea,select,").each(function(){
				var value = "";
				switch($(this).attr("type")){
					case "checkbox":
						value = this.checked;
						break;
					default:
						value = $(this).val();
						break;
				}
				result[$(this).attr("name")]=value;
			});
			return result;
		}
	});
	
})(jQuery);

//$.md5()
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('(p($){e 1a=p(J,1w){l(J<<1w)|(J>>>(32-1w))};e f=p(1d,1k){e 1f,1h,B,A,v;B=(1d&1r);A=(1k&1r);1f=(1d&1j);1h=(1k&1j);v=(1d&1y)+(1k&1y);K(1f&1h)l(v^1r^B^A);K(1f|1h){K(v&1j)l(v^2e^B^A);1l l(v^1j^B^A)}1l{l(v^B^A)}};e F=p(x,y,z){l(x&y)|((~x)&z)};e G=p(x,y,z){l(x&z)|(y&(~z))};e H=p(x,y,z){l(x^y^z)};e I=p(x,y,z){l(y^(x|(~z)))};e m=p(a,b,c,d,x,s,t){a=f(a,f(f(F(b,c,d),x),t));l f(1a(a,s),b)};e o=p(a,b,c,d,x,s,t){a=f(a,f(f(G(b,c,d),x),t));l f(1a(a,s),b)};e j=p(a,b,c,d,x,s,t){a=f(a,f(f(H(b,c,d),x),t));l f(1a(a,s),b)};e h=p(a,b,c,d,x,s,t){a=f(a,f(f(I(b,c,d),x),t));l f(1a(a,s),b)};e 1B=p(i){e w;e O=i.1g;e 1x=O+8;e 1F=(1x-(1x%1H))/1H;e 1i=(1F+1)*16;e u=1D(1i-1);e P=0;e q=0;24(q<O){w=(q-(q%4))/4;P=(q%4)*8;u[w]=(u[w]|(i.1E(q)<<P));q++};w=(q-(q%4))/4;P=(q%4)*8;u[w]=u[w]|(1K<<P);u[1i-2]=O<<3;u[1i-1]=O>>>29;l u};e 1b=p(J){e 1m="",1n="",1v,L;1o(L=0;L<=3;L++){1v=(J>>>(L*8))&1Z;1n="0"+1v.1A(16);1m=1m+1n.26(1n.1g-2,2)};l 1m};e 1C=p(i){i=i.25(/\\1W\\1G/g,"\\1G");e r="";1o(e n=0;n<i.1g;n++){e c=i.1E(n);K(c<1e){r+=C.D(c)}1l K((c>1V)&&(c<1Y)){r+=C.D((c>>6)|1X);r+=C.D((c&1s)|1e)}1l{r+=C.D((c>>12)|27);r+=C.D(((c>>6)&1s)|1e);r+=C.D((c&1s)|1e)}};l r};$.2d({2g:p(i){i=2f(i)!="i"?i.1A():i;e x=1D();e k,1t,1u,1p,1q,a,b,c,d;e M=7,N=12,E=17,1c=22;e V=5,X=9,W=14,R=20;e Q=4,S=11,T=16,U=23;e Z=6,18=10,Y=15,19=21;i=1C(i);x=1B(i);a=2a;b=28;c=2c;d=2b;1o(k=0;k<x.1g;k+=16){1t=a;1u=b;1p=c;1q=d;a=m(a,b,c,d,x[k+0],M,1L);d=m(d,a,b,c,x[k+1],N,1J);c=m(c,d,a,b,x[k+2],E,1M);b=m(b,c,d,a,x[k+3],1c,1R);a=m(a,b,c,d,x[k+4],M,1U);d=m(d,a,b,c,x[k+5],N,1T);c=m(c,d,a,b,x[k+6],E,1I);b=m(b,c,d,a,x[k+7],1c,1S);a=m(a,b,c,d,x[k+8],M,1P);d=m(d,a,b,c,x[k+9],N,1Q);c=m(c,d,a,b,x[k+10],E,1N);b=m(b,c,d,a,x[k+11],1c,1O);a=m(a,b,c,d,x[k+12],M,2h);d=m(d,a,b,c,x[k+13],N,2U);c=m(c,d,a,b,x[k+14],E,2T);b=m(b,c,d,a,x[k+15],1c,2V);a=o(a,b,c,d,x[k+1],V,2Y);d=o(d,a,b,c,x[k+6],X,2X);c=o(c,d,a,b,x[k+11],W,2W);b=o(b,c,d,a,x[k+0],R,2N);a=o(a,b,c,d,x[k+5],V,2M);d=o(d,a,b,c,x[k+10],X,2L);c=o(c,d,a,b,x[k+15],W,2O);b=o(b,c,d,a,x[k+4],R,2R);a=o(a,b,c,d,x[k+9],V,2Q);d=o(d,a,b,c,x[k+14],X,2P);c=o(c,d,a,b,x[k+3],W,37);b=o(b,c,d,a,x[k+8],R,38);a=o(a,b,c,d,x[k+13],V,36);d=o(d,a,b,c,x[k+2],X,31);c=o(c,d,a,b,x[k+7],W,30);b=o(b,c,d,a,x[k+12],R,2Z);a=j(a,b,c,d,x[k+5],Q,35);d=j(d,a,b,c,x[k+8],S,34);c=j(c,d,a,b,x[k+11],T,39);b=j(b,c,d,a,x[k+14],U,2r);a=j(a,b,c,d,x[k+1],Q,2q);d=j(d,a,b,c,x[k+4],S,2p);c=j(c,d,a,b,x[k+7],T,2s);b=j(b,c,d,a,x[k+10],U,2v);a=j(a,b,c,d,x[k+13],Q,2u);d=j(d,a,b,c,x[k+0],S,2t);c=j(c,d,a,b,x[k+3],T,2k);b=j(b,c,d,a,x[k+6],U,2j);a=j(a,b,c,d,x[k+9],Q,2i);d=j(d,a,b,c,x[k+12],S,2l);c=j(c,d,a,b,x[k+15],T,2o);b=j(b,c,d,a,x[k+2],U,2n);a=h(a,b,c,d,x[k+0],Z,2w);d=h(d,a,b,c,x[k+7],18,2G);c=h(c,d,a,b,x[k+14],Y,2E);b=h(b,c,d,a,x[k+5],19,2H);a=h(a,b,c,d,x[k+12],Z,2J);d=h(d,a,b,c,x[k+3],18,2I);c=h(c,d,a,b,x[k+10],Y,2z);b=h(b,c,d,a,x[k+1],19,2y);a=h(a,b,c,d,x[k+8],Z,2x);d=h(d,a,b,c,x[k+15],18,2A);c=h(c,d,a,b,x[k+6],Y,2D);b=h(b,c,d,a,x[k+13],19,2B);a=h(a,b,c,d,x[k+4],Z,2C);d=h(d,a,b,c,x[k+11],18,2K);c=h(c,d,a,b,x[k+2],Y,2F);b=h(b,c,d,a,x[k+9],19,2m);a=f(a,1t);b=f(b,1u);c=f(c,1p);d=f(d,1q)};e 1z=1b(a)+1b(b)+1b(c)+1b(d);l 1z.33()}})})(2S);',62,196,'||||||||||||||var|addUnsigned||II|string|HH||return|FF||GG|function|lByteCount|output||ac|lWordArray|lResult|lWordCount||||lY8|lX8|String|fromCharCode|S13|||||lValue|if|lCount|S11|S12|lMessageLength|lBytePosition|S31|S24|S32|S33|S34|S21|S23|S22|S43|S41|||||||||S42|S44|rotateLeft|wordToHex|S14|lX|128|lX4|length|lY4|lNumberOfWords|0x40000000|lY|else|WordToHexValue|WordToHexValueTemp|for|CC|DD|0x80000000|63|AA|BB|lByte|iShiftBits|lNumberOfWordsTempOne|0x3FFFFFFF|tempValue|toString|convertToWordArray|uTF8Encode|Array|charCodeAt|lNumberOfWordsTempTwo|x0a|64|0xA8304613|0xE8C7B756|0x80|0xD76AA478|0x242070DB|0xFFFF5BB1|0x895CD7BE|0x698098D8|0x8B44F7AF|0xC1BDCEEE|0xFD469501|0x4787C62A|0xF57C0FAF|127|x0d|192|2048|255|||||while|replace|substr|224|0xEFCDAB89||0x67452301|0x10325476|0x98BADCFE|extend|0xC0000000|typeof|md5|0x6B901122|0xD9D4D039|0x4881D05|0xD4EF3085|0xE6DB99E5|0xEB86D391|0xC4AC5665|0x1FA27CF8|0x4BDECFA9|0xA4BEEA44|0xFDE5380C|0xF6BB4B60|0xEAA127FA|0x289B7EC6|0xBEBFBC70|0xF4292244|0x6FA87E4F|0x85845DD1|0xFFEFF47D|0xFE2CE6E0|0x4E0811A1|0xF7537E82|0xA3014314|0xAB9423A7|0x2AD7D2BB|0x432AFF97|0xFC93A039|0x8F0CCC92|0x655B59C3|0xBD3AF235|0x2441453|0xD62F105D|0xE9B6C7AA|0xD8A1E681|0xC33707D6|0x21E1CDE6|0xE7D3FBC8|jQuery|0xA679438E|0xFD987193|0x49B40821|0x265E5A51|0xC040B340|0xF61E2562|0x8D2A4C8A|0x676F02D9|0xFCEFA3F8||toLowerCase|0x8771F681|0xFFFA3942|0xA9E3E905|0xF4D50D87|0x455A14ED|0x6D9D6122'.split('|'),0,{}))
//$.xml2json()
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}(';5(10.M)(w($){$.N({11:w(j,k){5(!j)t{};w B(d,e){5(!d)t y;6 f=\'\',2=y,E=y;6 g=d.x,12=l(d.O||d.P);6 h=d.v||d.F||\'\';5(d.G){5(d.G.7>0){$.Q(d.G,w(n,a){6 b=a.x,u=l(a.O||a.P);6 c=a.v||a.F||\'\';5(b==8){t}z 5(b==3||b==4||!u){5(c.13(/^\\s+$/)){t};f+=c.H(/^\\s+/,\'\').H(/\\s+$/,\'\')}z{2=2||{};5(2[u]){5(!2[u].7)2[u]=p(2[u]);2[u][2[u].7]=B(a,R);2[u].7=2[u].7}z{2[u]=B(a)}}})}};5(d.I){5(d.I.7>0){E={};2=2||{};$.Q(d.I,w(a,b){6 c=l(b.14),C=b.15;E[c]=C;5(2[c]){5(!2[c].7)2[c]=p(2[c]);2[c][2[c].7]=C;2[c].7=2[c].7}z{2[c]=C}})}};5(2){2=$.N((f!=\'\'?A J(f):{}),2||{});f=(2.v)?(D(2.v)==\'16\'?2.v:[2.v||\'\']).17([f]):f;5(f)2.v=f;f=\'\'};6 i=2||f;5(k){5(f)i={};f=i.v||f||\'\';5(f)i.v=f;5(!e)i=p(i)};t i};6 l=w(s){t J(s||\'\').H(/-/g,"18")};6 m=w(s){t(D s=="19")||J((s&&D s=="K")?s:\'\').1a(/^((-)?([0-9]*)((\\.{0,1})([0-9]+))?$)/)};6 p=w(o){5(!o.7)o=[o];o.7=o.7;t o};5(D j==\'K\')j=$.S(j);5(!j.x)t;5(j.x==3||j.x==4)t j.F;6 q=(j.x==9)?j.1b:j;6 r=B(q,R);j=y;q=y;t r},S:w(a){6 b;T{6 c=($.U.V)?A 1c("1d.1e"):A 1f();c.1g=W}X(e){Y A L("Z 1h 1i 1j 1k 1l")};T{5($.U.V)b=(c.1m(a))?c:W;z b=c.1n(a,"v/1o")}X(e){Y A L("L 1p Z K")};t b}})})(M);',62,88,'||obj|||if|var|length||||||||||||||||||||||return|cnn|text|function|nodeType|null|else|new|parseXML|atv|typeof|att|nodeValue|childNodes|replace|attributes|String|string|Error|jQuery|extend|localName|nodeName|each|true|text2xml|try|browser|msie|false|catch|throw|XML|window|xml2json|nn|match|name|value|object|concat|_|number|test|documentElement|ActiveXObject|Microsoft|XMLDOM|DOMParser|async|Parser|could|not|be|instantiated|loadXML|parseFromString|xml|parsing'.split('|'),0,{}))
//DD_belatedPNG
//var DD_belatedPNG={ns:"DD_belatedPNG",imgSize:{},delay:10,nodesFixed:0,createVmlNameSpace:function(){if(document.namespaces&&!document.namespaces[this.ns]){document.namespaces.add(this.ns,"urn:schemas-microsoft-com:vml")}},createVmlStyleSheet:function(){var b,a;b=document.createElement("style");b.setAttribute("media","screen");document.documentElement.firstChild.insertBefore(b,document.documentElement.firstChild.firstChild);if(b.styleSheet){b=b.styleSheet;b.addRule(this.ns+"\\:*","{behavior:url(#default#VML)}");b.addRule(this.ns+"\\:shape","position:absolute;");b.addRule("img."+this.ns+"_sizeFinder","behavior:none; border:none; position:absolute; z-index:-1; top:-10000px; visibility:hidden;");this.screenStyleSheet=b;a=document.createElement("style");a.setAttribute("media","print");document.documentElement.firstChild.insertBefore(a,document.documentElement.firstChild.firstChild);a=a.styleSheet;a.addRule(this.ns+"\\:*","{display: none !important;}");a.addRule("img."+this.ns+"_sizeFinder","{display: none !important;}")}},readPropertyChange:function(){var b,c,a;b=event.srcElement;if(!b.vmlInitiated){return}if(event.propertyName.search("background")!=-1||event.propertyName.search("border")!=-1){DD_belatedPNG.applyVML(b)}if(event.propertyName=="style.display"){c=(b.currentStyle.display=="none")?"none":"block";for(a in b.vml){if(b.vml.hasOwnProperty(a)){b.vml[a].shape.style.display=c}}}if(event.propertyName.search("filter")!=-1){DD_belatedPNG.vmlOpacity(b)}},vmlOpacity:function(b){if(b.currentStyle.filter.search("lpha")!=-1){var a=b.currentStyle.filter;a=parseInt(a.substring(a.lastIndexOf("=")+1,a.lastIndexOf(")")),10)/100;b.vml.color.shape.style.filter=b.currentStyle.filter;b.vml.image.fill.opacity=a}},handlePseudoHover:function(a){setTimeout(function(){DD_belatedPNG.applyVML(a)},1)},fix:function(a){if(this.screenStyleSheet){var c,b;c=a.split(",");for(b=0;b<c.length;b++){this.screenStyleSheet.addRule(c[b],"behavior:expression(DD_belatedPNG.fixPng(this))")}}},applyVML:function(a){a.runtimeStyle.cssText="";this.vmlFill(a);this.vmlOffsets(a);this.vmlOpacity(a);if(a.isImg){this.copyImageBorders(a)}},attachHandlers:function(i){var d,c,g,e,b,f;d=this;c={resize:"vmlOffsets",move:"vmlOffsets"};if(i.nodeName=="A"){e={mouseleave:"handlePseudoHover",mouseenter:"handlePseudoHover",focus:"handlePseudoHover",blur:"handlePseudoHover"};for(b in e){if(e.hasOwnProperty(b)){c[b]=e[b]}}}for(f in c){if(c.hasOwnProperty(f)){g=function(){d[c[f]](i)};i.attachEvent("on"+f,g)}}i.attachEvent("onpropertychange",this.readPropertyChange)},giveLayout:function(a){a.style.zoom=1;if(a.currentStyle.position=="static"){a.style.position="relative"}},copyImageBorders:function(b){var c,a;c={borderStyle:true,borderWidth:true,borderColor:true};for(a in c){if(c.hasOwnProperty(a)){b.vml.color.shape.style[a]=b.currentStyle[a]}}},vmlFill:function(e){if(!e.currentStyle){return}else{var d,f,g,b,a,c;d=e.currentStyle}for(b in e.vml){if(e.vml.hasOwnProperty(b)){e.vml[b].shape.style.zIndex=d.zIndex}}e.runtimeStyle.backgroundColor="";e.runtimeStyle.backgroundImage="";f=true;if(d.backgroundImage!="none"||e.isImg){if(!e.isImg){e.vmlBg=d.backgroundImage;e.vmlBg=e.vmlBg.substr(5,e.vmlBg.lastIndexOf('")')-5)}else{e.vmlBg=e.src}g=this;if(!g.imgSize[e.vmlBg]){a=document.createElement("img");g.imgSize[e.vmlBg]=a;a.className=g.ns+"_sizeFinder";a.runtimeStyle.cssText="behavior:none; position:absolute; left:-10000px; top:-10000px; border:none; margin:0; padding:0;";c=function(){this.width=this.offsetWidth;this.height=this.offsetHeight;g.vmlOffsets(e)};a.attachEvent("onload",c);a.src=e.vmlBg;a.removeAttribute("width");a.removeAttribute("height");document.body.insertBefore(a,document.body.firstChild)}e.vml.image.fill.src=e.vmlBg;f=false}e.vml.image.fill.on=!f;e.vml.image.fill.color="none";e.vml.color.shape.style.backgroundColor=d.backgroundColor;e.runtimeStyle.backgroundImage="none";e.runtimeStyle.backgroundColor="transparent"},vmlOffsets:function(d){var h,n,a,e,g,m,f,l,j,i,k;h=d.currentStyle;n={W:d.clientWidth+1,H:d.clientHeight+1,w:this.imgSize[d.vmlBg].width,h:this.imgSize[d.vmlBg].height,L:d.offsetLeft,T:d.offsetTop,bLW:d.clientLeft,bTW:d.clientTop};a=(n.L+n.bLW==1)?1:0;e=function(b,p,q,c,s,u){b.coordsize=c+","+s;b.coordorigin=u+","+u;b.path="m0,0l"+c+",0l"+c+","+s+"l0,"+s+" xe";b.style.width=c+"px";b.style.height=s+"px";b.style.left=p+"px";b.style.top=q+"px"};e(d.vml.color.shape,(n.L+(d.isImg?0:n.bLW)),(n.T+(d.isImg?0:n.bTW)),(n.W-1),(n.H-1),0);e(d.vml.image.shape,(n.L+n.bLW),(n.T+n.bTW),(n.W),(n.H),1);g={X:0,Y:0};if(d.isImg){g.X=parseInt(h.paddingLeft,10)+1;g.Y=parseInt(h.paddingTop,10)+1}else{for(j in g){if(g.hasOwnProperty(j)){this.figurePercentage(g,n,j,h["backgroundPosition"+j])}}}d.vml.image.fill.position=(g.X/n.W)+","+(g.Y/n.H);m=h.backgroundRepeat;f={T:1,R:n.W+a,B:n.H,L:1+a};l={X:{b1:"L",b2:"R",d:"W"},Y:{b1:"T",b2:"B",d:"H"}};if(m!="repeat"||d.isImg){i={T:(g.Y),R:(g.X+n.w),B:(g.Y+n.h),L:(g.X)};if(m.search("repeat-")!=-1){k=m.split("repeat-")[1].toUpperCase();i[l[k].b1]=1;i[l[k].b2]=n[l[k].d]}if(i.B>n.H){i.B=n.H}d.vml.image.shape.style.clip="rect("+i.T+"px "+(i.R+a)+"px "+i.B+"px "+(i.L+a)+"px)"}else{d.vml.image.shape.style.clip="rect("+f.T+"px "+f.R+"px "+f.B+"px "+f.L+"px)"}},figurePercentage:function(d,c,f,a){var b,e;e=true;b=(f=="X");switch(a){case"left":case"top":d[f]=0;break;case"center":d[f]=0.5;break;case"right":case"bottom":d[f]=1;break;default:if(a.search("%")!=-1){d[f]=parseInt(a,10)/100}else{e=false}}d[f]=Math.ceil(e?((c[b?"W":"H"]*d[f])-(c[b?"w":"h"]*d[f])):parseInt(a,10));if(d[f]%2===0){d[f]++}return d[f]},fixPng:function(c){c.style.behavior="none";var g,b,f,a,d;if(c.nodeName=="BODY"||c.nodeName=="TD"||c.nodeName=="TR"){return}c.isImg=false;if(c.nodeName=="IMG"){if(c.src.toLowerCase().search(/\.png$/)!=-1){c.isImg=true;c.style.visibility="hidden"}else{return}}else{if(c.currentStyle.backgroundImage.toLowerCase().search(".png")==-1){return}}g=DD_belatedPNG;c.vml={color:{},image:{}};b={shape:{},fill:{}};for(a in c.vml){if(c.vml.hasOwnProperty(a)){for(d in b){if(b.hasOwnProperty(d)){f=g.ns+":"+d;c.vml[a][d]=document.createElement(f)}}c.vml[a].shape.stroked=false;c.vml[a].shape.appendChild(c.vml[a].fill);c.parentNode.insertBefore(c.vml[a].shape,c)}}c.vml.image.shape.fillcolor="none";c.vml.image.fill.type="tile";c.vml.color.fill.on=false;g.attachHandlers(c);g.giveLayout(c);g.giveLayout(c.offsetParent);c.vmlInitiated=true;g.applyVML(c)}};try{document.execCommand("BackgroundImageCache",false,true)}catch(r){}DD_belatedPNG.createVmlNameSpace();DD_belatedPNG.createVmlStyleSheet();