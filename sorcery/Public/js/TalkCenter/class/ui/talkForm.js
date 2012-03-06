;(function($){
	
	$.salvia.Class.namespace("$.TalkCenter.classes.ui");
	
	/**talkform(聊天窗体类)**/
	$.TalkCenter.classes.ui.talkForm = $.salvia.Class($.classes.ui.form,{
		init:function($super,dom,attr){
			$super(dom,attr);
			this.isGroup(false);
			this.TalkInforList = new $.TalkCenter.classes.ui.talkForm.talkInforList(this.dom.find(".content .info"));
			this.GroupUsers = new $.TalkCenter.classes.ui.list($(document.createElement("ul")).addClass("contacts").appendTo(dom.find(".contact_list")));
			
			this.dom.find("#btnClose").click($.proxy(function(){this.close()},this));
			this.dom.find(".input>form").submit($.proxy(function(){
				var content = this.dom.find(".input textarea").val();
				this.dom.find(".input textarea").val("");
				this._events.run("sent",this,content);
				return false;
			},this));
			this.dom.find("#btnHistory").bind("click",this,function(e){
                var href = "/History/ChatHistory.aspx";
                var dataSource = e.data._data;
                if(e.data.isGroup()){
                	href+="?groupId="+dataSource.Gid+"&groupType="+dataSource.GroupType1;
                }else{
                	href+="?uid="+dataSource.Fuid;
                }
                window.open(href);
            });
			
			this.config={
				facesPath:$.getRootPath()+$.browser.msie&&$.browser.version=="6.0"?$.TalkCenter.config.facesPathByIE6:$.TalkCenter.config.facesPath,
				faceHash:{
					'[闭嘴]':"闭嘴.png",
					'[不是吧]':"不是吧.png",
					'[擦汗]':"擦汗.png",
					'[大笑]':"大笑.png",
					'[发怒]':"发怒.png",
					'[反对]':"反对.png",
					'[鼓掌]':"鼓掌.png",
					'[汗]':"汗.png",
					'[惊吓]':"惊吓.png",
					'[惊讶]':"惊讶.png",
					'[可怜]':"可怜.png",
					'[哭]':"哭.png",
					'[衰]':"衰.png",
					'[无奈]':"无奈.png",
					'[无语]':"无语.png",
					'[鲜花]':"鲜花.png",
					'[疑惑]':"疑惑.png",
					'[晕]':"晕.png",
					'[支持]':"支持.png"
				}
			};
			this.initFacePlane();
			
			this.talking={
				binding:{
					id:function(id){
						this.dom.data("id",id);
						this.dom.find("dt").append($(document.createElement("a"))
							.addClass("left10")
							.attr("href","javascript:;")
							.text("引用")
							.click($.proxy(function(){
								var textObj = this.dom.find(".message").clone();
								textObj.find(".quote").remove();
								textObj.find("img").each(function(){
									$(this).after($(this).attr("data-key")).remove();
								});
								var text = textObj.html().toLowerCase().replace(/<br>/g,"\n");
								var result = "[q]引用于："+this.dom.find(".name").text()+" "+this.dom.find(".time").text()+"\n"+text+"[/q]";
								this._events.run("quote",text==""?text:result);
								textObj = null;
								delete textObj;
							},this))
						);
					},
					name:function(name){
						this.dom.find(".name").text(name);
					},
					time:function(time){
						this.dom.find(".time").text(time);
					},
					content:function(content){
						for(var pro in this.config.faceHash)
						{
							content=content.replace(new RegExp("(\\["+pro.substring(pro.indexOf("[")+1,pro.indexOf("]"))+"\\])","g"), "<img data-key='"+pro+"' src='"+this.config.facesPath+this.config.faceHash[pro]+"' />");
						}
						content = content.replace(/\n/g,"<br/>");
						content = content.replace(/\[q\](.*)\[\/q\]/g,"<div class='quote'>$1</div>");
						this.dom.find(".message").html(content);
					}
				}
			};
		},
		
		initFacePlane:function(){
			var btn = this.dom.find("#btnExpression");
			var isShow = false;
			var plane = $(document.createElement("div")).css({
				background:"#fff",
				border:"#ddd solid 1px",
				position:"absolute",
				height:200,
				width:320,
				overflow:"auto"
			}).appendTo(this.dom.find(".content")).hide()
			.mouseover(function(){isShow=false;})
			.mouseout(function(){isShow=true;});
			
			for(var pro in this.config.faceHash)
			{
				var img = $(document.createElement("img")).attr({src:this.config.facesPath+this.config.faceHash[pro]});
				var a = $(document.createElement("a")).attr({href:"javascript:;",title:pro}).bind("click",{
					key:pro,
					formDOM:this.dom,
					plane:plane
				},function(e){
					e.data.formDOM.find(".content .input textarea").val(e.data.formDOM.find(".content .input textarea").val()+e.data.key);
					e.data.plane.hide();
					e.data.formDOM.find(".content .input textarea").focus();
				}).append(img).appendTo(plane);
			}
			
			btn.click(function(){
				var position = btn.position();
				plane.css({
					left:position.left,
					top:position.top-202
				});
				isShow = true;
				plane.toggle();
			}).blur(function(){
				if(!isShow){return;}
				plane.hide();
				isShow = false;
			});
			
			isShow = null;
			delete isShow;
		},
		
		addTalking:function(id,name,time,content){
			var talkInfor = new $.classes.ui.base($.salvia.packet("TalkInfo.lbi"));
			talkInfor.config = $.extend({},{},this.config);
			talkInfor.addListener("quote",function(e,message){
				e.other.dom.find(".content textarea").val(message).focus();
			},this);
			talkInfor.datasource({id:id,name:name,time:time,content:content},this.talking.binding);
			this.TalkInforList.add(talkInfor);
			this._events.run("talked");
		},
		addMeTalking:function(id,name,time,content){
			var talkInfor = new $.classes.ui.base($.salvia.packet("TalkInfo.lbi"));
			talkInfor.config = $.extend({},{},this.config);
			talkInfor.dom.find("dt").addClass("me");
			talkInfor.addListener("quote",function(e,message){
				e.other.dom.find(".content textarea").val(message).focus();
			},this);
			talkInfor.datasource({id:id,name:name,time:time,content:content},this.talking.binding);
			this.TalkInforList.add(talkInfor);
			this._events.run("talked");
		},
		text:function(text){
			if(text==undefined){
				return this.dom.find(".name").text();
			}else{
				this.dom.find(".name").text(text);
			}
		},
		
		news:function(data){
			this._news = data;
			var isNew = this.dom.find("#news").length==0;
			if(isNew){
				this._newsDOM = $.c("div").attr({
					id:"news"
				}).append($.c("div").addClass("planes")).append($.c("i").addClass("news").addClass("i")).append($.c("span").text("专家发言："));
				this.dom.find(".tmain>.bar").after(this._newsDOM);
			}else{
				this._newsDOM.find(".planes").text("加载中...");
				this._newsDOM.data("scrollable").end();
			}
			for(var i in data){
				this._newsDOM.find(".planes").append($.c("div").text(data[i].Content))
				.click($.proxy(function(){this._events.run("newsItemClick");return false;},this));
			}
			if(isNew){
				this._newsDOM.scrollable({ items: ".planes",vertical:true,circular:true }).autoscroll({
					autoplay: true,
					autopause: true
				});
			}
			this._newsDOM.data("scrollable").begin();
		},
		
		isGroup:function(val){
			if(val==undefined){
				return this.dom.attr("data-isGroup");
			}else{
				if(!val){
					this.dom.find(".content .bar").hide();
					this.dom.find(".content .tside").hide();
					this.dom.css({height:366,width:407});
				}else{
					this.dom.find(".content .bar").show();
					this.dom.find(".content .tside").show();
					this.dom.css({height:392,width:608});
					this.dom.attr("data-isGroup",val);
				}
			}
		}
	});
	
})(jQuery);