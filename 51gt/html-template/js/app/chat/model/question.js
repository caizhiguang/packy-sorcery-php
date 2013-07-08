!function($,Backbone){

	$.lib('app.chat.model.question',Backbone.Model.extend({
		defaults:{
			content:'',//内容
			sender_id:-1,//寄件人id
			sender_name:'',//寄件人名称
			sender_type:-1,//寄件人身份
			time:'0000-0-0 00:00:00',//邮寄时间
			complete:0,//是否已回答
			number:0//序号
		},
		complete:function(){
			this.save({complete:Number(!Boolean(this.get('complete')))});
		}
	}));

}(jQuery,Backbone);