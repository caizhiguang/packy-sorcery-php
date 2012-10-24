<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TalkCenter.aspx.cs" Inherits="JstChat.web.TalkCenter.TalkCenter2" %>

<%@ Register src="../Other/sidebar.ascx" tagname="sidebar" tagprefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>聊天中心</title>
<link href="../css/talkCenter_v_0.2/libraries.css" rel="stylesheet" type="text/css" />
<link href="../css/talkCenter_v_0.2/content.css" rel="stylesheet" type="text/css" />
<link href="../css/talkCenter_v_0.2/grids.css" rel="stylesheet" type="text/css" />
<link href="../css/talkCenter_v_0.2/mod.css" rel="stylesheet" type="text/css" />
<link href="../css/talkCenter_v_0.2/modForm.css" rel="stylesheet" type="text/css" />
<link href="../css/talkCenter_v_0.2/modBox.css" rel="stylesheet" type="text/css" />
<link href="../css/talkCenter_v_0.2/talkcenter.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="../js/plug-in/jquery.tools.min.js"></script>
<script type="text/javascript" src="../js/plug-in/jquery.cookie.js"></script>

<script type="text/javascript" src="../js/salvia_beta0.3/jquery.salvia.js"></script>
<script type="text/javascript" src="../js/salvia_beta0.3/jquery.salvia.ui.base.js"></script>
<script type="text/javascript" src="../js/salvia_beta0.3/jquery.salvia.ui.contextmenu.js"></script>
<script type="text/javascript" src="../js/salvia_beta0.3/jquery.salvia.ui.form.js"></script>
<script type="text/javascript" src="../js/salvia_beta0.3/jquery.salvia.ui.list.item.js"></script>
<script type="text/javascript" src="../js/salvia_beta0.3/jquery.salvia.ui.list.js"></script>
<script type="text/javascript" src="../js/salvia_beta0.3/jquery.salvia.ui.scrollable.js"></script>

<script type="text/javascript" src="../js/talkcenter_beta0.3/jquery.talkcenter.js"></script>
<script type="text/javascript" src="../js/talkcenter_beta0.3/jquery.talkcenter.sign.js"></script>
<script type="text/javascript" src="../js/talkcenter_beta0.3/jquery.talkcenter.polling.js"></script>
<script type="text/javascript" src="../js/talkcenter_beta0.3/jquery.talkcenter.center.js"></script>

<script src="../js/xyz.js" type="text/javascript"></script>
<style type="text/css">
 .hide{ display: none; }
</style>
</head>

<body>
	<form id="form1" runat="server" style="display:none;">
    	<asp:Button ID="Button1" runat="server" Text="Button" onclick="Button1_Click" 
                Visible="True" />
    </form>
	<div class="wrap">
    	<div class="header"></div>
        <div class="context">
            <div class="main">
            	<div class="forms"></div>
            </div>
            <div class="side">
            	<div class="modBox modFunBox"><a href="javascript:;" class="btnBack"><i class="i iHome"></i>回到个人中心</a></div>
            	<div id="userInfo" class="modBox modUInforBox">
                	<div class="inner">
                        <div class="menu"><a href="javascript:;" class="btnMessage"><i class="i iMessage"></i>信息</a></div>
                        <div class="messages tip" style="display:none;">
                        	<div><a href="javascript:;" class="message hide">好友 (<span class="count"></span>)</a></div>
                        	<div><a href="javascript:;" class="gmessage hide">群组 (<span class="count"></span>)</a></div>
                        	<div><a href="javascript:;" class="notice hide">通知 (<span class="count"></span>)</a></div>
                        	<div><a href="javascript:;" class="request hide">好友请求 (<span class="count"></span>)</a></div>
                        	<div><a href="javascript:;" class="grequest hide">群信息 (<span class="count"></span>)</a></div>
                            <div class="tright size12 top5"><a href="javascript:;" class="btnClose"><i class="i iClose"></i>我知道了</a></div>
                        </div>
                        <div class="content">
                            <div class="avatar"><img src="../photo/avatar/3.png" /></div>
                            <div class="infor">
                                <div class="name"></div>
                                <div class="bar"><a href="javascript:;" class="btnSetting">设置</a>&nbsp;<a href="javascript:;" class="btnExit">退出</a></div>
                            </div>
                        </div>
                        <div class="ft radius_bottom3px">
                            <a href="javascript:;" class="current">好友</a><a href="javascript:;">群组</a><a href="javascript:;">在线专家</a>
                            <a href="javascript:;" class="fright btnSearch"><i class="i iSearch"></i>搜索</a>
                        </div>
                    </div>
                </div>
                <div class="modBox modPanelBox">
                	<div class="inner">
                    	<h5 class="hd">好友</h5>
                        <ul id="friends" class="content contacts radius_bottom3px"></ul>
                    </div>
                    <div class="inner">
                    	<h5 class="hd">群组</h5>
                        <ul id="groups" class="content contacts radius_bottom3px"></ul>
                    </div>
                    <div class="inner">
                    	<h5 class="hd">专家在线</h5>
                        <ul id="authority" class="content contacts radius_bottom3px"></ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="taskbar">
            <div class="items"></div>
            <a href="javascript:;" class="more" style="display:none;"><i class="i iDown"></i></a>
            <ul class="taskbarList" style="display:none;"></ul>
        </div>
        <div class="footer"><span class="spacing">在线聊天v0.2</span>&copy;2012 妇联家教通</div>
    </div>
    <div id="pack" style="display:none;">
    	<ul id="contacts"><li><input type="checkbox" name="" /><span class="avatar"><img src=""></span><span class="name"></span></li></ul>
        <ul id="question"><li><span class="speaker"></span><span class="time"></span><span class="content"></span></li></ul>
    	<div id="talking">
			<dl>
				<dt class="tip">
					<span class="name"></span>
                    <span class="designation"></span>
					<span class="time"></span>
					<span class="fun">
						<a href="javascript:;" class="btnQuote">引用</a>
                        <a href="javascript:;" class="btnSaveQuestion">记录问题</a>
						<a class="more" href="javascript:;"><i class="i iDown"></i></a>
					</span>
				</dt>
				<dd class="infor"></dd>
			</dl>
    	</div>
        <div id="fontPanel" class="fontPanel">
            <!--<a href="javascript:;" class="color_red"></a>
            <a href="javascript:;" class="color_blue"></a>
            <a href="javascript:;" class="color_black"></a>
            <a href="javascript:;" class="color_green"></a>
            <a href="javascript:;" class="font_size1em">标准</a>
            <a href="javascript:;" class="font_size1_25em">中</a>
            <a href="javascript:;" class="font_size1_5em">大</a>-->
            <label>字体大小：</label>
            <select class="fontsize right10" name="fontsize">
                <option value="2">标准</option>
                <option value="3">中</option>
                <option value="4">大</option>
            </select>
            <label>字体颜色：</label>
            <select class="color" name="color">
                <option value="black" style="color:Black;">黑</option>
                <option value="red" style="color:red;">红</option>
                <option value="blue" style="color:blue;">蓝</option>
                <option value="green" style="color:green;">绿</option>
            </select>
        </div>
        <form id="uploadPanel" class="uploadPanel" action="../PhotoLoad/PhotoLoad.aspx" method="post" enctype="multipart/form-data">
            <input type="file" name="FileUpload1" id="FileUpload1" />
            <input type="hidden" name="gid" id="gid" />
            <input type="submit" name="submit" value="发送" />
            <a href="javascript:;" class="btnClose"><i class="i iClose"></i></a>
        </form>
        <div id="news_box" class="news_box">
            <h5 class="news_box_hd"></h5>
            <div class="news_box_memu"><a href="javascript:;" class="i"><i class="i iClose"></i></a></div>
            <div class="news_box_content"></div>
        </div>
    	<div id="forms">
    		<div id="modMsgBox" class="modMsgBox">
		    	<form class="inner">
		    		<div class="hd"><span class="title"></span></div>
		    		<div class="menu"><a href="javascript:;" class="i iClose"><i class="i iClose"></i></a></div>
		    		<div class="content"></div>
		    		<div class="ft"></div>
		    	</form>
		    </div>
            <div id="modForm" class="modForm">
                <form class="inner">
                    <h5 class="hd"><span class="title"></span></h5>
                    <div class="menu"><a href="javascript:;" class="i iClose"><i class="i iClose"></i></a></div>
                    <div class="content"></div>
                    <div class="ft"></div>
                </form>
            </div>
    		<div id="talkform" class="modTalkForm">
			    <div class="inner">
			        <div class="hd">
			            <div class="avatar"><img src="" /></div>
			            <div class="title"></div>
			        </div>
			        <div class="menu"><a href="javascript:;" class="i iClose"><i class="i iClose"></i></a></div>
			        <div class="bar">当前状态：[ <span class="state">离线</span> ]</div>
			        <div class="content">
			        	<div class="talking">
                            <div class="news">
			                    <div class="news_box authority_box">
			                        <div class="authority_box_view"></div>
			                        <div class="authority_box_ft"><a href="javascript:;" class="more">进入专家课堂&gt;&gt;</a></div>
			                    </div>
			                </div>
			                <div class="talk_view">
			                    
			                </div>
			                <div class="talk_input">
			                    <div class="funbar">
			                        <a href="javascript:;" class="btnFace"><i class="i iFace"></i></a>
			                        <a href="javascript:;" class="btnFont"><i class="i iFont"></i></a>
			                        <a href="javascript:;" class="fright btnHistory"><i class="i"></i>历史记录</a>
			                    </div>
			                    <form class="input">
				                	<input type="hidden" name="sender_id" />
				                	<input type="hidden" name="sender_name" />				                	
				                	<input type="hidden" name="addressee_id" />
				                	<input type="hidden" name="addressee_name" />
				                	<input type="hidden" name="type" />
				                    <textarea name="content"></textarea>
				                    <div class="ftbar">
				                        <a href="javascript:;" class="btn btnClose">关闭</a><span class="count">还可以输入<span>400</span></span>
					                    <span class="fright"><span class="right10 prompt"></span><a href="javascript:;" class="btn btnSend hasMenu">发送</a><a href="javascript:;" class="btn btnMenu"><i class="i iDown"></i></a></span>
				                    </div>
			                    </form>
			                </div>
			            </div>                                
			        </div>
			        <div class="ft"></div>
			    </div>
			</div>
			<div id="grouptalkform" class="modTalkForm">
				<div class="inner">
				    <div class="hd">
				        <div class="avatar"><img src="" /></div>
				        <div class="title"></div>
				    </div>
				    <div class="menu"><a href="javascript:;" class="i iClose"><i class="i iClose"></i></a></div>
				    <div class="bar tabs"><a href="javascript:;" class="current btnTalking">群聊天</a><a href="javascript:;" class="btnInfor">群资料</a><a href="javascript:;" class="btnMember">群成员</a><a href="javascript:;" class="btnTopic">群话题</a><a href="javascript:;" class="btnNotice">群通知</a><a href="javascript:;" class="btnSpace">群共享</a><a href="javascript:;" class="btnProduct">群购</a></div>
				    <div class="content">
				    	<div class="talking">
                            <div class="news">
				                <div class="news_box authority_box">
				                    <div class="authority_box_view"></div>
				                    <div class="authority_box_ft"><a href="javascript:;" class="more">进入专家课堂&gt;&gt;</a></div>
				                </div>
				                <div class="news_box affiche">
				                    <h5 class="news_box_hd">群公告</h5>
				                    <div class="news_box_memu"><a href="javascript:;" class="i"><i class="i iClose"></i></a></div>
				                    <div class="news_box_content"></div>
				                </div>
				                <div class="news_box filter_box">
				                    <h5>屏蔽列表</h5>
				                    <ul class="contacts"></ul>
				                    <div class="fun clearfix"><input type="button" class="btnSelectAll" value="全选" /><input type="button" class="btnSelectInvert" value="反选" /><input type="button" class="btnToFilter fright" value="屏蔽" /></div>
				                </div>
				            </div>
				            <div class="talk_view">
				                
				            </div>
				            <div class="talk_input">
				                <div class="funbar">
				                    <a href="javascript:;" class="btnFace"><i class="i iFace"></i></a>
				                    <a href="javascript:;" class="btnFont"><i class="i iFont"></i></a>
                                    <a href="javascript:;" class="btnUploadPhoto"><i class="i iUploadPhoto"></i></a>
				                    <a href="javascript:;" class="fright btnFilter"><i class="i"></i>屏蔽列表</a>
				                    <a href="javascript:;" class="fright btnHistory"><i class="i"></i>历史记录</a>
				                </div>
				                <form class="input">
				                	<input type="hidden" name="sender_id" />
				                	<input type="hidden" name="sender_name" />	
				                	<input type="hidden" name="sender_type" />
				                	<input type="hidden" name="grouptype" />				                	
				                	<input type="hidden" name="addressee_id" />
				                	<input type="hidden" name="addressee_name" />
				                	<input type="hidden" name="type" />
				                    <textarea name="content"></textarea>
				                    <div class="ftbar">
					                    <a href="javascript:;" class="btn btnClose">关闭</a><span class="count">还可以输入<span>400</span></span>
					                    <span class="fright"><span class="right10 prompt"></span><a href="javascript:;" class="btn btnSend hasMenu">发送</a><a href="javascript:;" class="btn btnMenu"><i class="i iDown"></i></a></span>
					                </div>
				                </form>
				            </div>
				        </div>
				        <div class="infor">
				        	<dl>
				            	<dt>群名称：</dt>
				                <dd class="groupName"></dd>
				                <dt>群类型：</dt>
				                <dd class="groupType"></dd>
				                <dt>群成员：<span class="fright"><a href="javascript:;" class="toMember">查看群成员&gt;&gt;</a></span></dt>
				                <dd>共<span class="memberCount"></span>人，<span class="onlineMemberCount"></span>人在线</dd>
				                <dt>群公告：<span class="fright"><a href="javascript:;">修改&gt;&gt;</a></span></dt>
				                <dd class="affiche"></dd>
				            </dl>
				            <dl style="display:none;">
				            	<dt>你有 3 条群通知未读<span class="fright"><a href="javascript:;">查看&gt;&gt;</a></span></dt>
				            </dl>
				        </div>
				        <div class="member">
				        	<div class="panel">
				                <h5>成员列表</h5>
				                <ul class="contacts"></ul>
				                <div class="fun"><input name="all" class="all" type="button" value="全选" /><input name="invert" class="invert" type="button" value="反选" /><input class="fright" name="remove" type="button" value="移出本群" /></div>
				            </div>
				        </div>
				        <div class="topic tcenter">
				        	<div>——————群话题——————</div>
				        	<div>【暂未开放，敬请期待】</div>
				        </div>
				        <div class="notice">
				        	<div class="notices" style="">
								<div class="panel">
							        <h5>群通知</h5>
									<table class="notice w100p" cellpadding="0" cellspacing="0">
										<thead>
											<tr>
										    	<td class="fun" colspan="4">
										        	<input type="checkbox" class="right10" /><input class="right10 remove" type="button" value="删除" /><input class="createNotice" type="button" value="写通知" />
										            <span class="left10 bar">
										            	<span>显示：</span><a class="current week" href="javascript:;" data-val="week">近一星期</a><a href="javascript:;" class="month" data-val="month">近一个月</a><a href="javascript:;" class="thisMonth" data-val="thisMonth">当月</a><a href="javascript:;" class="all" data-val="all">全部</a>
										            </span>
										        </td>
											</tr>        
										</thead>
										<tbody>
										    <tr><td class="tcenter" colspan="4">暂无通知</td></tr>
										    <tr><td class="checkbox"><input type="checkbox" /></td><td class="sender"></td><td><a href="javascript:;" class="notice_title"></a></td><td class="time"></td></tr>
										</tbody>
										<tfoot>
											<tr>
											   	<td class="fun" colspan="4"><input type="checkbox" class="right10" /><input class="right10 remove" type="button" value="删除" /><input class="createNotice" type="button" value="写通知" /><input class="fright totop" type="button" value="返回顶" /></td>
											</tr>
										</tfoot>
									</table>
								</div>
							</div>
							<div class="noticeView panel" style="display:none;">
								<h5><span class="notice_title right10"></span> <span class="sender"></span> <span class="time"></span></h5>
								<div class="notice_content bottom10"></div>
                                <table class="receipts" width="100%"></table>
								<form class="receipt bottom10">
									<span>回执内容：</span>
									<input type="text" class="text right10" name="receipt" style="width:250px;" /><input type="submit" value="发送" />
								</form>
								<div class="fun clearfix tcenter"><a href="javascript:;" class="fleft prev">&lt;&lt;上一封</a><a href="javascript:;" class="beack">返回</a><a href="javascript:;" class="fright next">下一封&gt;&gt;</a></div>
							</div>
							<div class="noticeCreate" style="display:none;">
								<form class="panel">
									<h5 class="bottom10">写通知 <span class="fright"><a href="javascript:;" class="beack">返回&gt;&gt;</a></span></h5>
									<div class="sub">
										<div class="p10">
											<label class="sender">寄件人：</label><span class="sender">班主任(10002)</span><input type="hidden" class="text" name="sender" style="width:600px;" />
											<label class="address">收件人：</label><input type="text" class="text right10" name="addressee" style="width:550px;" /><input type="button" value="选择" class="btnChooseAddressee" />
											<label class="notice_title">通知标题：</label><input type="text" class="text right10" name="notice_title" style="width:500px;" /><input type="checkbox" class="right10" name="receipt" /><label class="receipt">需要回执</label>
											<label class="notice_content">通知内容：</label>
											<textarea style="width:100%; height:155px;" class="text" name="notice_content"></textarea>
											<div class="tcenter"><input type="submit" value="发送" /></div>
										</div>
									</div>
								</form>
							</div>
						</div>
                        <div class="space">
                            <div class="panel">
                                <h5>群共享</h5>
                                <div class="top10" style="position: relative;">
                                    <iframe class="uploadFile" frameborder="0" src="" style="width: 300px; height: 30px; display: block;"></iframe>
                                    <div class="bar" style="position: absolute; right:0; top:0;">
                                        <a class="current refresh" href="javascript:;">刷新</a>    
                                    </div>
                                </div>
                                <table class="space w100p table" cellpadding="0" cellspacing="1">
                                    <thead>
                                        <tr>
                                            <th>文件名</th>
                                            <th style="width:80px">上传者</th>
                                            <th style="width:60px">大小</th>
                                            <th style="width:120px">上传日期</th>
                                            <th style="width:60px">操作</th>
                                        </tr>        
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>文件名</th>
                                            <th style="width:80px">上传者</th>
                                            <th style="width:60px">大小</th>
                                            <th style="width:120px">上传日期</th>
                                            <th style="width:60px">操作</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        <tr><td class="tcenter" colspan="5">还没有共享文件</td></tr>
                                        <tr>
                                            <td class="filename"><a href="" class="filename" target="_blank"></a></td>
                                            <td class="uploaduser"></td>
                                            <td class="filesize"></td>
                                            <td class="uploadtime"></td>                                            
                                            <td class="fun"><a href="javascript:;" class="btnDelete">删除</a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="product">
                            <div class="orderList">
                                <div class="panel">
                                    <h5 class="bottom10">群购</h5>
                                    <div class="top10 bar bottom10">
                                        <a class="btnOrder" href="javascript:;">下订单</a>
                                        <a class="btnRefresh" href="javascript:;">刷新</a>
                                    </div>
                                    <table class="orderList table w100p" cellpadding="0" cellspacing="1">
                                        <thead>
                                            <tr>
                                                <th style="width:80px">订单编号</th>
                                                <th>收货地址</th>
                                                <th style="width:80px">下单日期</th>
                                                <th style="width:60px">状态</th>
                                                <th style="width:60px">操作</th>
                                            </tr>        
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th style="width:80px">订单编号</th>
                                                <th>收货地址</th>
                                                <th style="width:80px">下单日期</th>
                                                <th style="width:60px">状态</th>
                                                <th style="width:60px">操作</th>
                                            </tr> 
                                        </tfoot>
                                        <tbody>
                                            <tr><td class="tcenter" colspan="5">还没有订单内容</td></tr>
                                            <tr>
                                                <td class="no"><a href="javascript:;"></a></td>
                                                <td class="address"></td>
                                                <td class="orderTime"></td>
                                                <td class="state"></td>
                                                <td class="fun"><a href="javascript:;" class="btnDelete">删除</a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="orderDetail hide">
                                <div class="panel">
                                    <h5 class="bottom10"><span class="right10">订单明细</span><span class="order_no"></span><span class="fright"><a class="beack" href="javascript:;">返回&gt;&gt;</a></span></h5>
                                    <form action="" class="bottom10">
                                        <label for="productName">书名称</label>
                                        <input type="text" class="text right10" name="productName" id="productName" />
                                        <label for="publisher">出版社</label>
                                        <input type="text" class="text" name="publisher" id="publisher" />
                                        <input type="submit" value="确定" />
                                    </form>
                                    <table class="w100p">
                                        <thead>
                                            <tr>
                                                <th>书名称</th>
                                                <th>出版社</th>
                                                <th>操作</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="line">
                                        <div class="unit size1of2">
                                            <dl class="product">
                                                <dt><img src="" alt="" /></dt>
                                                <dd>
                                                    <span class="productName">111</span>
                                                    <span class="publisher">11111</span>
                                                    <span class="number">1</span>
                                                </dd>
                                            </dl>
                                        </div>
                                        <div class="unit size1of2 lastUnit">
                                            <dl class="product">
                                                <dt><img src="" alt="" /></dt>
                                                <dd>
                                                    <span class="productName">111</span>
                                                    <span class="publisher">11111</span>
                                                    <span class="number">1</span>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="addressList hide">
                                <div class="panel">
                                    <h5 class="bottom10"><span>选择地址</span><span class="fright"><a class="beack" href="javascript:;">返回&gt;&gt;</a></span></h5>
                                    <dl class="p5">
                                        <dt style="display:inline-block;*display:inline;zoom:1;">
                                            <input type="checkbox" id="1" />
                                        </dt>
                                        <dd style="display:inline-block;*display:inline;zoom:1;">
                                            <label for="1">
                                                <span class="addressee right10">123</span>
                                                <span class="address">123 123 123 123123123</span>
                                            </label>
                                            <a href="javascript:;" class="btnEditAddress">编辑</a>
                                            <a href="javascript:;" class="btnSetDefaultAddress">设为默认地址</a>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                            <div class="addressItem hide">
                                <div class="panel">
                                    <h5 class="bottom10">
                                        <span class="action">添加</span>地址
                                        <span class="fright"><a class="beack" href="javascript:;">返回&gt;&gt;</a></span>
                                    </h5>
                                    <form action="" class="sub">
                                        <div class="p10">
                                            <label for="">联系人</label><br />
                                            <input type="text" class="text w100p bottom10" />
                                            <label for="">收货地址</label><br />
                                            <input type="text" class="text bottom10 right10" style="width:500px" /><input type="checkbox" class="right5" name="isDefault" id="isDefault" /><label for="isDefault">默认收货地址</label>
                                            <label for="">联系电话</label>
                                            <input type="text" class="text w100p bottom10" />
                                            <div class="tcenter">
                                                <input type="submit" value="完成" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
				    </div>
				    <div class="ft"></div>
				</div>
           </div>
    	</div>
    </div>
</body>
</html>
