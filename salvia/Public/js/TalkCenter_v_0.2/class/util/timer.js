;(function($){
	
	$.salvia.object.namespace("$.TalkCenter.classes.util");
	/**
	 * 主要功能：
	 * --计时器，可设置特定时间间隔去做指定操作
	 * **/
	$.TalkCenter.classes.util.timer = new $.salvia.object.Class($.classes.base,{
		init:function($super,space,actionHash){
			this.space = space==undefined?100:space;
			this.actionHash = $.extend({},{},actionHash);
			$(document).data("Timer",this);
		},
		//增加计时器
		addAction:function(name,setting){//name,space,fun,validity(none:无指定, one:只运行一次, died:已过期  ,[数值]:指定限期(暂不可用))
			if(arguments.length==1){
				for(var pro in arguments[0]){
					this.addAction(pro, arguments[0][pro]);
				}
				return;
			}
			if(this.actionHash[name]==undefined){this.actionHash[name]=setting;}
			this.actionHash[name]["timer"]=0;
			this.actionHash[name]["count"]=0;
		},
		//打开某个计时器
		start:function(name,validity){
			if(this.actionHash[name]==undefined){return;}
			this.actionHash[name].validity=validity==undefined?"none":validity;
		},
		//停止某个计时器
		stop:function(name){
			if(this.actionHash[name]==undefined){return;}
			this.actionHash[name].validity="died";
		},
		//移除某个计时器
		removeAction:function(name){
			if(this.actionHash[name]==undefined){return false;}
			this.actionHash[name]=null;
			return delete this.actionHash[name];
		},
		runAction:function(name,data){
			if(this.actionHash[name].scope==undefined){
				this.actionHash[name].fun(this,$.extend({},{},this.actionHash[i]));
			}else{
				this.actionHash[name].fun.apply(this.actionHash[name].scope,[this,$.extend({},{},this.actionHash[name]),data]);
			}
		},
		//运行计时模块
		runTimer:function(){
			var timer = $(document).data("Timer");
			for(var i in timer.actionHash){
				if(timer.actionHash[i].validity=="died"){continue;}
				timer.actionHash[i].timer+=timer.space;
				timer.actionHash[i].count+=timer.space;
				if(timer.actionHash[i].timer == timer.actionHash[i].space)
				{
					switch(timer.actionHash[i].validity){
						default:
						case "none":
							timer.runAction.apply(timer,[i]);
							break;
						case "one":
							timer.runAction.apply(timer,[i]);
							timer.actionHash[i].validity="died";
						case "died":
							continue;
							break;
					}
					timer.actionHash[i].timer=0;
				}
			}
			timer.timer = setTimeout(timer.runTimer,timer.space);
		},
		destruct:function($super){
			$(document).data("Timer",null);
			for(var pro in this.actionHash){
				this.removeAction(pro);
			}
			clearTimeout(this.timer);
			$super();
		}
	});
	
})(jQuery);