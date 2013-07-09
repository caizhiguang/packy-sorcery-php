!function($,Backbone){
	var config = {
		user:{
			id:-1,
			name:'null',
			status:0,
			state:2,
			avatar:'./'
		},
		hotkeys:{
			'send':'ctrl+enter',
			set:function(key,val,inCookie){
				this[key] = val;
				if(inCookie) $.cookie('hotkeys-'+key,val);
			}
		}
	};

	$.lib('app.chat.config',config);
	config.hotkeys.set('send',$.cookie('hotkeys-send'));

}(jQuery,Backbone);