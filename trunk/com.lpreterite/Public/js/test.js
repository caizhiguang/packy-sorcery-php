jQuery(document).ready(function($) {
	
	var User = Backbone.Model.extend({
		urlRoot:'/test/api'
	});

	var UserList = Backbone.Collection.extend({
		url:'/test/api',
		urlRoot:'/test/api',
		model:User,
		localStorage:new Store('user'),
		upload:function(){
			this.each(function(user){
				user.save({id:undefined},{localStorage:false});
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