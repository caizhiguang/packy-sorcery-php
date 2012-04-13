;(function($){
	
	$.salvia.object.namespace("$.classes.ui.util");
	
	/**formManager(窗体管理类)**/
	$.classes.util.formManager = $.salvia.object.Class({
		init:function(){
			this.forms= new $.classes.base.hash();
			this._forms = [];
			this._events = new $.classes.util.events();
		},
		add:function(form){
			if(this.forms.contains(form.id)){return;}
			this.onAddAfter(form);
			this.forms.add(form.id,form);
			this._forms.push(form);
			this.onActived(form);
			this._events.run("added",this,form);
		},
		remove:function(form){
			if(!this.forms.contains(form.id)){return false;}
			this.forms.remove(form.id);
			this._forms.splice($.list.indexOf(this._forms,form),1);
			this.onActived(this._forms[this._forms.length-1]);
			this._events.run("removed",this,form);
			return true;
		},
		contains:function(form){
			return this.forms.contains(form.id);
		},
		addListener:function(key,fun,data){
			this._events.add(key,fun,this,data);
		},
		onAddAfter:function(form){
			form.dom.css({zIndex:this._forms.length});
			var css = {};
			switch(form.dom.attr("data-disposition"))
			{
				default:
				case "Default":
				case "FollowLast":
					var lastForm = "";
					for(var i=this._forms.length-1;i>=0;--i)
					{
						if(this._forms[i].dom.attr("data-disposition")=="FollowLast"||this._forms[i].dom.attr("data-disposition")=="Default"||this._forms[i].dom.attr("data-disposition")==undefined){
							lastForm=this._forms[i];
							break;
						}
					}
					var lastOffset = lastForm==""?{}:lastForm.dom.offset();
					css={
						top:lastForm==""?55:lastOffset.top+15,
						left:lastForm==""?120:lastOffset.left+15
					};
					break;
				case "Customer":
					break;
			}
			form.dom.css(css);
			form.addListener("actived",function(e){
				e.data.onActived(this);
				e.data._events.run("formActived",this);
			},this);
			form.addListener("closed",function(e){
				e.data.onClosed(this);
				e.data._events.run("formClosed",this);
			},this);
		},
		onClosed:function(form){
			this.remove(form);
		},
		onActived:function(form){
			var index = $.list.indexOf(this._forms,form);
			if(index!=-1){
				this._forms.splice(index,1);
				this._forms.push(form);
				$.each(this._forms,function(i,n){
					n.dom.css({zIndex:i});
					if(n!=form){
						n.actived(false);
					}
				});
			}
		}
	});
	
})(jQuery);