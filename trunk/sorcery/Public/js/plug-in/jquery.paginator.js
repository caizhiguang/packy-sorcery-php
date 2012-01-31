;(function($){
	/*html结构
	<div class="pages">
        <span class="countExplain">共有<span class="count">15</span>条<span class="name">通知</span></span>
        <span class="pageCount">
            <a href="javascript:;" class="current">1</a>
            <a href="javascript:;">2</a>
            <a href="javascript:;">3</a>
        </span>
        <span class="pageExplain"><span class="currentPage">1</span>/<span class="pageCount">3</span>页</span>
    </div>
	*/
	
	$.fn.extend({
		paginator:function(options){
			var paginator=$.extend(
				{}/* new object */,
				$.fn.paginator.options || {},
				options || {} /* just-in-time options */
			);
			var page = this;
			paginator.init=function(){
				var pages = $(document.createElement("div")).addClass("pages");
				pages.append('<span class="countExplain">共有<span class="count"></span>条<span class="name">'+this.itemName+'</span></span>');
				pages.append('<span class="pagesLink"></span>');
				pages.append('<span class="pageExplain"><span class="currentPage"></span>/<span class="pageCount"></span>页</span>');
				this.dom = pages;
			};
			paginator.prev=function(){
				this.pageChange(this._current-1);
			};
			paginator.next=function(){
				this.pageChange(this._current+1);
			};
			paginator.pageChange=function(current){
				var that = this;
				this._current = Number(current);
				this._start=this._current*this._pageSize-this._pageSize;
				this._end=this._current*this._pageSize-1;
				
				var data=$.extend(
					{}/* new object */,
					{
						start:that._start,
						end:that._end,
						pageIndex:that._current,
						pageSize:that._pageSize
					} || {},
					paginator.data || {} /* just-in-time options */
				);
				
				$.ajax({
					url:that.url,
					data:data,
					dataType:that.dataType,
					type:that.type,
					//complete:that.complete,
					//error:that.error,
					success:function(data){
						that.binding.count.apply(this,[data,that]);
						that.binding.items.apply(this,[data,that]);
						that.loaded(page,that._items);
						that.updatePageNav();
					}
				});
			};
			paginator.updatePageNav=function(){
				this._current = (this._end+1)/this._pageSize;
				this._pageCount = Math.ceil(this._count/this._pageSize);
				
				if(this._count<=0){this.dom.remove();return;}
				
				this.dom.find(".pagesLink").html("");
				var showLinkSize = this.linkSize<this._pageCount?this.linkSize-this.lastLinkSize:this._pageCount;
				for(var i=0;i<showLinkSize;++i)
				{
					var a = $(document.createElement("a")).attr("href","javascript:;").text(Number(i+1)).bind("click",this,function(event){
						event.data.pageChange($(this).text());
					});
					if(i==this._current-1){a.addClass("current");}
					this.dom.find(".pagesLink").append(a);
				}
				if(this.linkSize<this._pageCount){
					this.dom.find(".pagesLink").append("<span class='pright10'>……</span>");
					for(var i=(this._pageCount-this.lastLinkSize);i<this._pageCount;++i)
					{
						var a = $(document.createElement("a")).attr("href","javascript:;").text(Number(i+1)).bind("click",this,function(event){
							event.data.pageChange($(this).text());
						});
						if(i==this._current-1){a.addClass("current");}
						this.dom.find(".pagesLink").append(a);
					}
				}
				
				this.dom.find(".count").text(this._count);
				this.dom.find(".currentPage").text(this._current);
				this.dom.find(".pageCount").text(this._pageCount);
			};
			
			paginator.init();
			paginator.pageChange(1);
			this.append("<div class='ppages'></div>").append(paginator.dom);
		}
	});
	
	$.fn.paginator.options={
		_start:0,
		_end:0,
		_count:0,
		_current:0,
		_pageCount:0,
		_pageSize:5,
		data:{},
		usableLinkSize:5,
		lastLinkSize:2,
		url:"",
		type:"post",
		dataType:"xml",
		itemName:"",//条目称为
		binding:{
			count:function(){},
			items:function(){}
		},
		loaded:function(data){}
	};
})(jQuery);