jQuery(document).ready(function($) {
	
	var User = Backbone.Model.extend({
		urlRoot:'/test/api',
		save:function(attributes,options,localStorage){
			if(arguments.length=2){
				if(_.isBoolean(arguments[1])) var localStorage=arguments[1];
			}
			var options = _.extend({},options,{localStorage:localStorage});
			Backbone.Model.prototype.save.apply(this,[attributes,options]);
		}
	});

	var UserList = Backbone.Collection.extend({
		url:'/test/api',
		urlRoot:'/test/api',
		model:User,
		localStorage:new Store('user'),
		upload:function(){
			// var users = [];
			// this.each(function(user){
			// 	users.push(user.toJSON());
			// });

			// $.ajax({
			// 	url:'/test/upload',
			// 	data:{
			// 		users:users
			// 	},
			// 	type:'post',
			// 	success:function(data){
			// 		console.log(data);
			// 	}
			// });
			
			this.each(function(user){

				var data = _.extend({},user.toJSON(),{id:undefined,test:{a:1,b:2}});

				user.sync('create',user,{
					data:JSON.stringify(data),
					localStorage:false,
					success:function(data){
						console.log(data);
					}
				});
			});
		}
	});

	var users = new UserList;

	var UserView = Backbone.View.extend({
		tagName:'li',
		template:_.template($('#user-item').html()),
		initialize:function(){
			this.listenTo(this.model,'change',this.render);
		},
		render:function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	var App = Backbone.View.extend({
		el:$('body'),
		events:{
			'submit #testform':'submit',
			'click #btn_upload':'upload'
		},
		initialize:function(){
			this.listenTo(users,'change',this.usersChange)
			this.listenTo(users,'add',this.addOne);
			users.fetch();
		},
		usersChange:function(){
			var d = 0;
		},
		addOne:function(user){
			var view = new UserView({model:user});
			this.$('#users').append(view.render().el);
		},
		upload:function(){
			users.upload();
		},
		submit:function(e){
			var data = $(e.target).serializeArray();
			var result = {};

			for (var i = 0; i < data.length; i++) {
				result[data[i].name] = data[i].value;
			};

			users.create(result);

			return false;
		}
	})

	var app = new App;

});