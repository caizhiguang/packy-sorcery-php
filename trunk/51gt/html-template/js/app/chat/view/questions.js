!function($,Backbone){

	var config = $.lib('app.chat.config');
	var Questions = $.lib('app.chat.model.question.list');
	var questions = new Questions;
	var completeQuestions = new Questions;
	var QuestionView = $.lib('app.chat.view.question');

	$.lib('app.chat.view.questions',Backbone.View.extend({
		el:$('.widget-question'),
		events:{
			'submit .input-append':'create'
		},
		initialize:function(){
			this.listenTo(questions,'change:complete',this.addComplete);
			this.listenTo(questions,'add',this.add);
			this.listenTo(questions,'all',this.onChanged);
			this.listenTo(completeQuestions,'add',this.add);
			this.input = this.$('.input-append>input[type="text"]');
		},
		render:function(){
			questions.fetch();
			return this;
		},
		add:function(question){
			var view = new QuestionView({model:question});
			var where = question.get('complete')?' #end ul':' #question ol';

			this.$('.widget-content'+where).append(view.render().el);
		},
		addComplete:function(model){
			questions.remove(model);
			completeQuestions.add(model);
		},
		create:function(){
			var data = {
				content:this.input.val(),//内容
				sender_id:config.user.id,//寄件人id
				sender_name:config.user.name,//寄件人名称
				sender_type:config.user.status,//寄件人身份
				time:_.dateToString(new Date()),//邮寄时间
				complete:0,//是否已回答
				number:questions.length+1//序号
			}

			questions.create(data,{wait:true});
			this.input.val('');
			return false;
		},
		onChanged:function(){

			var list = questions.where({complete:0});

			_.each(list,function(model,i){
				model.set('number',i+1);
			});
		}
	}));

}(jQuery,Backbone);