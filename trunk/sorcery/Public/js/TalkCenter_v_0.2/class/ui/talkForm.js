;(function($){
	
	$.salvia.object.namespace("$.TalkCenter.classes.ui");
	
	/**talkForm.talkInforList**/
	$.TalkCenter.classes.ui.talkForm = $.salvia.object.Class($.classes.ui.form,{
		
		init:function($super,dom,attr){
			$super(dom,attr);
			
			this.control={
				talkPanel:new $.TalkCenter.classes.ui.talkPanel(this.dom.find(".talk_view")),
				facePanel:"",
				btnFace:this.dom.find(".btnFace").attr("data-onShow",false)
			};
			this.initFacePanel();
			
			this.dom.find(".tabs").tabs(">.content>div",{history:false});
			this.dom.find("form").bind("submit",this,function(e){ 
				e.data.onSend(this);
				e.data._events.run("send",e.data,this);
				$(this).find("textarea").focus();
				return false;
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