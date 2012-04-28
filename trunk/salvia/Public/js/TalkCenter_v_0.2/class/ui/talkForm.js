;(function($){
	
	$.salvia.object.namespace("$.TalkCenter.classes.ui");
	
	/**talkForm.talkInforList**/
	$.TalkCenter.classes.ui.talkForm = $.salvia.object.Class($.classes.ui.form,{
		
		init:function($super,dom,attr){
			$super(dom,attr);
			
			this.control={
				talkPanel:new $.TalkCenter.classes.ui.talkPanel(this.dom.find(".talk_view")),
				facePanel:"",
				btnFace:this.dom.find(".btnFace").attr("data-onShow",false),
				groupMember:new $.TalkCenter.classes.ui.list(this.dom.find(".member .contacts")),
				groupNotice:new $.TalkCenter.classes.ui.list(this.dom.find(".notice table.notice"))
			};
			this.initFacePanel();
			
			this.dom.find(".tabs").tabs(">.content>div",{history:false});
			this.dom.find("form").bind("submit",this,function(e){ 
				e.data.onSend(this);
				e.data._events.run("send",e.data,this);
				$(this).find("textarea").focus();
				return false;
			});
			
			this.dom.find(".notices .fun .createNotice").bind("click",this,function(e){e.data.createGroupNotice();});
			this.dom.find(".noticeView .beack ,.noticeCreate .beack").bind("click",this,function(e){
				e.data.dom.find(".notice>div").hide();
				e.data.dom.find(".notices").show();
			});
			this.dom.find(".noticeView .prev,.noticeView .next").bind("click",this,function(e){
				var item = e.data.control.groupNotice.list[$(this).attr("data-index")];
				e.data.viewGroupNotice(item._data.id);
			});
			/*this.dom.find(".notice .week,.notice .month,.notice .thisMont,.notice .all").bind("click",this,function(e){
				e.data.showNoticeByTime($(this).attr("data-val"));
			});*/
			this.dom.find(".notice .totop").bind("click",this,function(e){
				e.data.dom.find(".notice").animate({scrollTop:0},"fast");
			});
		},
		initFacePanel:function(){
			this.control.facePanel = new $.TalkCenter.classes.ui.facePanel(
				$(document.createElement("div")).css({
					background:"#fff",
					border:"#ddd solid 1px",
					position:"absolute",
					height:200,
					width:320,
					overflow:"auto"
				}).appendTo(this.dom.find(".content .talking")).hide().click(function(){return false;})
			);
			this.control.facePanel.addListener("click",function(e,key,src){
				e.data.dom.find("form.input textarea").val(e.data.dom.find("form.input textarea").val()+key);
				e.data.control.facePanel.hide();
				e.data.dom.find("form.input textarea").focus();
			},this);
			
			this.control.btnFace.bind("click",this.control.facePanel,function(e){
				var position = $(this).position();
				e.data.dom.css({left:position.left,bottom:165});
				e.data.toggle();
				$(this).attr("data-onShow",true);
				return false;
			});
			this._windowClickEvent = function(e){
				e.data.hide();
			};
			$(document).bind("click",this.control.facePanel,this._windowClickEvent);
		},
		addGroupMember:function(itemDom,data,setting){
			var item = this.control.groupMember.add(itemDom.clone());
			item.datasource(data,setting);
			return item;
		},
		removeGroupMember:function(item){
			this.control.groupMember.remove(item);
		},
		addGroupNotice:function(itemDom,data,setting){
			var item = this.control.groupNotice.add(itemDom.clone());
			item.datasource(data,setting);
			return item;
		},
		removeGroupNotice:function(item){
			this.control.groupNotice.remove(item);
		},
		viewGroupNotice:function(noticeId){
			var notice,index = -1;
			for(var i in this.control.groupNotice.list)
			{
				if(this.control.groupNotice.list[i]._data.id != noticeId){continue;}
				notice = this.control.groupNotice.list[i]._data;
				index = Number(i);
			}
			this.dom.find(".notice>div").hide();
			this.dom.find(".noticeView").attr("data-index",index).show();
			this.dom.find(".noticeView .prev").attr("data-index",index-1)[index>0?"show":"hide"]();
			this.dom.find(".noticeView .next").attr("data-index",index+1)[index+1<this.control.groupNotice.count()?"show":"hide"]();
			this.dom.find(".notice .noticeView .sender").text(notice.sender_name);
			this.dom.find(".notice .noticeView .notice_title").text(notice.title);
			this.dom.find(".notice .noticeView .time").text(notice.time);
			this.dom.find(".notice .noticeView .notice_content").text(notice.content);
			this.dom.find(".notice .noticeView .receipt").append($.c("input").attr({type:"hidden",name:"id"}).val(notice.id));
			this.dom.find(".notice .noticeView .receipt").append($.c("input").attr({type:"hidden",name:"sender_id"}).val(notice.address_id));
			this.dom.find(".notice .noticeView .receipt").append($.c("input").attr({type:"hidden",name:"gid"}).val(notice.gid));
			this.dom.find(".notice .noticeView .receipt")[notice.receipt=="1"?"show":"hide"]();
			this.dom.find(".notice .noticeView .receipt input[name='receipt']").val("");
		},
		createGroupNotice:function(){
			this.dom.find(".notice>div").hide();
			this.dom.find(".noticeCreate").show();
		},
		faceDatasource:function(data){
			this.control.facePanel.datasource(data);
		},
		talkingWithMe:function(dom,data,setting){
			var item = new $.classes.ui.base(dom);
			item.datasource(data,setting);
			this.control.talkPanel.add(item);
		},
		talkingTo:function(dom,data,setting){
			this.talkingWithMe(dom,data,setting);
			dom.find(".tip").addClass("me");
		},
		onSend:function(form){
			
		},
		online:function(val){
			if(val==undefined){
				return this._online;
			}else{
				this._online = val;
				this.dom.find(".hd").toggleClass("off",!this._online);
				this.dom.find(".state").text(this._online?"在线":"离线");
			}
		},
		type:function(val){
			if(val==undefined){
				return this._type;
			}else{
				this._type = val;
				switch(val)
				{
					case "":
						break;
					case "":
						break;
				}
			}
		},
		destruct:function($super){
			$super();
			$(document).unbind("click",this._windowClickEvent);
		}
	});
	
})(jQuery);