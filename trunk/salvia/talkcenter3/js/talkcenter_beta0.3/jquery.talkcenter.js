!function($){

	var talkcenter = $.salvia.object.Class({
		setDOM:function($){
			this.dom = $;
			return this;
		},
		/*
		 * 初始化talkcenter
		 *
		 */
		init:function(){
			this.data = {};
			this.data.config = {};
			this.data.information = {
				messages:[],
				newMessagesContent:0,
				requests:{},
				newRequestContent:0,
				notice:[],
				newNoticeContent:0
			};
			this.controller = {};
			this.control = {};
		},

		ajax:function(options,operation){
			options._ajax = {data:options.data,operation:operation};
			$.ajax(options);
		},
		ajaxSuccess:function(data, textStatus){
			$.doc.trigger(this._ajax.operation,[this,this._ajax.data,data]);
		},
		ajaxComplete:function(XMLHttpRequest, textStatus){
			$.doc.trigger(this._ajax.operation+'-ajaxComplete',[this,this._ajax.data,textStatus]);
		},
		ajaxSend:function(XMLHttpRequest){
			$.doc.trigger(this._ajax.operation+'-ajaxBeforeSend',[this,this._ajax.data]);
		},
		ajaxError:function(XMLHttpRequest, textStatus, errorThrown){
			$.doc.trigger(this._ajax.operation+'-ajaxError',[this,this._ajax.data,textStatus]);
		}
		
	});

	$.talkcenter = new talkcenter();//实例化talkcenter
	//$.salvia.load($.getRootPath()+'js/talkcenter/jquery.talkcenter.polling.js');
	$.doc.data('polling-interval', setInterval('$.talkcenter.controller.polling.polling();', 3000)); //实现循环轮询

    //初始化 jquery.ajax 设置
	$.ajaxSetup({
		dataType:"xml",
		type:"POST",
		dataFilter:function(data,type){
			switch(type){
				case "xml":
					return $.xml2json(data);//xml转换成json
				default:
					return data;
			}
		},
		success:$.talkcenter.ajaxSuccess,
		complete:$.talkcenter.ajaxComplete,
		beforeSend:$.talkcenter.ajaxSend,
		error:$.talkcenter.ajaxError
	});

	$.fn.extend({
		talkcenter:function(){
			return $.talkcenter.setDOM(this);
		}
	});

	$(document).ready(function(){
		var test = new $.salvia.ui.base();
		test.dom($('#test'));
		test.serializeAttr();
		test.visible(false);
	});

}(jQuery);