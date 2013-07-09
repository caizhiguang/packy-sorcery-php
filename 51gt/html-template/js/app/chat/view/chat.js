!function($,Backbone){

	var config = $.lib('app.chat.config'),
	Talk = $.lib('app.chat.view.talk'),
	TalkList = $.lib('app.chat.model.talk.list'),
	talks = new TalkList,
	canSlide = true;

	$.lib('app.chat.view.chat',Backbone.View.extend({
		el:$('.widget-chat'),
		events:{
			'submit .chat-input':'create',
			'mouseover .widget-content':'notSlide',
			'mouseout .widget-content':'canSlide',
			'keypress .editor':'editor_keypress',
			'click [data-hotkeys]':'setHotkeys',
			'paste .editor':'editor_paste'
		},
		initialize:function(){
			this.input = this.$('.editor');
			this.listenTo(talks,'add',this.add);
			this.listenTo(talks,'change',this.render);
		},
		render:function(){
			talks.fetch();
			return this;
		},
		add:function(talk){
			var view = new Talk({model:talk});
			this.listenTo(view,'quote',this.quote);
			this.$('.widget-content').append(view.render().el);
			this.contentScroll();
		},
		create:function(){
			var data = {
				addressee_id:1,//收件人id(1是专家课堂)
				addressee_name:'专家在线',//收件人名称
				content:this.input.html(),//内容
				sender_id:config.user.id,//寄件人id
				sender_name:config.user.name,//寄件人名称
				sender_type:config.user.status,//寄件人身份
				time:_.dateToString(new Date()),//邮寄时间
				grouptype:4,//派分所属
				type:'authority'//信件所属
			};

			if($.trim(data.content).length<=0) return false;
			talks.create(data,{wait:true});
			$('#editor').empty();

			return false;
		},
		quote:function(quoteHtml){
			this.input.html(quoteHtml+'<div>&nbsp</div>');
			this.input.focus();
			_.selectionTo(this.input[0],this.input[0].childNodes.length);
		},
		contentScroll:function(){
			if(canSlide){
				this.$('.widget-content').scrollTop(this.$('.widget-content')[0].scrollHeight);
			}
		},
		canSlide:function(){
			canSlide = true;
			// console.log(canSlide);
		},
		notSlide:function(){
			canSlide = false;
			// console.log(canSlide);
		},
		editor_keypress:function(e){
			if(!(e.which==10 || e.which==13)) return;

			var toSend = false;
			switch(config.hotkeys.send)
			{
				default:
				case "enter":
					toSend = true;
					break;
				case "ctrl+enter":
					toSend = e.ctrlKey;
					break;
			}
			
			if(!(toSend || (e.which==115 && e.altKey))) return;

			this.create();

			return false;
		},
		setHotkeys:function(e){
			var keyArr = $(e.target).data('hotkeys').split(' '),
				key = keyArr.shift(),
				args = keyArr.join(' ');
			config.hotkeys.set(key,args,true);
		},
		editor_paste:function(e){
			var that = this;
			this.$('.editor').css('opacity',.1);
			setTimeout(function(){
				var html = that.$('.editor').html().replace(/(<\/?(?!blockquote|small|p|div|img)[^>]*)\/?>/gi,'');
				that.$('.editor').html(html).find('div').wrapInner('<div />').children('div').unwrap();
				that.$('.editor').css('opacity',1);
				_.selectionTo(that.input[0],that.input[0].childNodes.length);
			},100);
		}
	}));

}(jQuery,Backbone);