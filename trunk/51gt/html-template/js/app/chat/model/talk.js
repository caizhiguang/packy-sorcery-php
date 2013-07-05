!function($,Backbone){

	$.lib('app.chat.model.talk',Backbone.Model.extend({
		defaults:{
			addressee_id:-1,//收件人id
			addressee_name:'',//收件人名称
			content:'',//内容
			sender_id:-1,//寄件人id
			sender_name:'',//寄件人名称
			sender_type:-1,//寄件人身份
			time:'0000-0-0 00:00:00',//邮寄时间
			grouptype:-1,//派分所属
			type:''//信件所属
		}
	}));

}(jQuery,Backbone);