;(function(){
	
	if($.classes==undefined){ $.classes={}; }
	if($.classes.util==undefined){ $.classes.util={}; }
	
	/**formManager(窗体管理类)**/
	$.classes.util.formManager = $.salvia.Class({
		init:function(){
			this.forms= new HashTable();
			this._forms = [];
			this._events = new $.classes.util.events();
		},
		add:function(form){
			if(this.forms.Contains(form.id)){return;}
			this.onAddAfter(form);
			this.forms.Add(form.id,form);
			this._forms.push(form);
			this._events.run("added",form);
		},
		remove:function(form){
			if(!this.forms.Contains(form.id)){return false;}
			this.forms.Remove(form.id);
			this._forms.splice(this._forms.indexOf(form),1);
			this._events.run("removed",form);
			return true;
		},
		addListener:function(key,fun,other){
			if(this._events.contains(key)){return "This has "+key+" listener!";}
			this._events.add(key,fun,this,other);
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
						top:lastForm==""?45:lastOffset.top+15,
						left:lastForm==""?85:lastOffset.left+15
					};
					break;
				case "Customer":
					break;
			}
			form.dom.css(css);
			form.addListener("actived",function(e){
				e.other.onActived(this);
				e.other._events.run("formActived",this);
			},this);
			form.addListener("closed",function(e){
				e.other.onClosed(this);
			},this);
		},
		onClosed:function(form){
			this.remove(form);
		},
		onActived:function(form){
			if(this._forms.indexOf(form)!=-1){
				this._forms.splice(this._forms.indexOf(form),1);
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