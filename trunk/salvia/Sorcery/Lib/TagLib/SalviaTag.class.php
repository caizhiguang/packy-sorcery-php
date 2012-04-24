<?php
class SalviaTag extends TagLib{
	public function _initialize(){
		$this->xml = dirname(__FILE__).'/Tags/SalviaTag.xml';
	}
	
	public function _search($attr,$content){
		$tag = $this->parseXmlAttr($attr,'search');
		$action = $tag['action'];
		$content = $content==''?($tag['default']==''?'在此输入你想搜索的内容':$tag['default']):$content;
		$html = "<form class='search' action='$action'>
                	<input type='text' class='search_txt' id='search_content' name='search' value='$content' />
                    <input type='submit' class='search_btn' id='search_btn' value='搜索' />
                </form>";
		return $html;
	}
}