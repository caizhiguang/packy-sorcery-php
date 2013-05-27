/**
 * ExpBuilder Float Dialog
 * @version 1.0
 * @example Visit http://www.expbuilder.com/testpages/floatdialog/
 * @v 1.1 by smyx(http://www.smyx.net/) [2010.1.22]
 */
$.fn.floatdialog=function(id,options){var Config={backgroundcolor:"#000000",speed:'slow',event:'click',effect:false,closeClass:'.close'};if(options){jQuery.extend(Config,options)};function pagesize(mask){$("#"+mask).css({height:$(document).height(),width:$(window).width()});$(window).resize(function(){$("#"+mask).css({'width':$(window).width()})})}function display_mask(id){if(Config.effect){$("#mask_"+id).show().fadeTo(Config.speed,0.33)}else{$("#mask_"+id).css({opacity:'0.33'}).show()}}function center_form(id){var w=($(window).width()-$("#"+id).width())/2;var h=($(window).height()-$("#"+id).height())/2;$("#"+id).css({position:"fixed",top:h,left:w});if($.browser.msie&&$.browser.version<='6.0'){$("#"+id).css('top',document.documentElement.scrollTop+h);$("#"+id).css('position','absolute');$(window).scroll(function(){$("#"+id).css('top',document.documentElement.scrollTop+h)})}}function display_form(id){display_mask(id);center_form(id);$(window).resize(function(){center_form(id)});if(!Config.effect){$("#"+id).show()}else{$("#"+id).slideDown(Config.speed)}}function disable_mask(id){$(".masking").hide();if(Config.effect){$("#mask_"+id).fadeOut(Config.speed).fadeTo("",100)}else{$("#mask_"+id).hide()}}$(document).ready(function(){if(!$("#mask_"+id).html()){$("body").append('<div id="mask_'+id+'" style="display: none;left: 0px;top: 0px;z-index: 6000;position: absolute;background-color:'+Config.backgroundcolor+'">&nbsp;</div>');$("#mask_"+id).bind('click',function(){$("#footer").css('position','absolute');$("#wpwrap").css('position','relative');disable_mask(id)});pagesize('mask_'+id);if(Config.closeClass){$(Config.closeClass).bind('click',function(){$("#footer").css('position','absolute');$("#wpwrap").css('position','relative');disable_mask(id)})}}});$("#"+id).hide().addClass('masking');$(window).scroll(function(){pagesize('mask_'+id)});$(this).bind(Config.event,function(){$("#wpwrap,#footer").css('position','static');display_form(id)})}