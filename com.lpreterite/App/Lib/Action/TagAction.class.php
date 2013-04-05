<?php
class TagAction extends Action {

    var $tag;

    /**
     * 初始化
     * @return [type]
     */
    function _initialize(){
        $this->tag = D('tags');
    }

    /**
     * 取得所有标签
     * @param  boolean $ajaxReturn
     * @return array
     */
    public function getAll($ajaxReturn=true){
        $result = $this->tag->order($_GET['order'])->select();
        if(!$ajaxReturn):
            return $result;
        else:
            $this->ajaxReturn($result);
        endif;
    }

    /**
     * 以ID取得标签内容
     * @param  boolean $ajaxReturn
     * @return [type]
     */
    public function getById($ajaxReturn=true){
        $result = $this->tag->where(array('id'=>$_GET['id']))->select();
        if(!$ajaxReturn):
            return $result;
        else:
            $this->ajaxReturn($result);
        endif;
    }

    /**
     * 默认显示页面，也是ajax默认AIP接口
     * @return [type]
     */
    public function _empty(){
        switch ($_SERVER['REQUEST_METHOD']) {
            case 'PUT':
            case 'POST':
                $_PUT = json_decode(file_get_contents('php://input'),true);//取得Put内容
                $this->save($_PUT);
                break;
            case 'GET':
                $result = $this->getAll(true);
                break;
            case 'DELETE':
                $this->delete($_GET['_URL_'][count($_GET['_URL_'])-1]);
                break;
            default:
                # code...
                break;
        }
    }

    /**
     * 保存标签（当参数没有ID为创建，有ID为储存）
     * @param  array $data
     * @return [type]
     */
    public function save($data){

        $data = !$_POST?$data:$_POST;

        $verification = $this->tag->create($data);//检验数据有效性
        if(!$verification){$this->error($this->tag->getError());return;}
        if(!$data['id']):
                $verification = $this->tag->add($verification);//能否于数据库中添加(修改、删除)数据
                $message = '添加';
            else:
                $verification = $this->tag->save($verification);//能否于数据库中添加(修改、删除)数据
                $message = '编辑';
        endif;
        
        if(!$verification){$this->error($this->tag->getError());return;}
        $data['id'] = $verification;


        //返回成功信息
        $message = $message.'完成！';
        $this->success($message,'',$data);
    }

    /**
     * 删除标签
     * @param  string $id
     * @return [type]
     */
    public function delete($id){

        $data = $_REQUEST;
        $data['id'] = !$data['id'] ? $id : $data['id'];
        if(!$data['id']){$this->error('id不存在');return;}

        $verification = $this->tag->where(array('id'=>$data['id']))->delete();
        if(!$verification){$this->error($this->tag->getError());return;}

        //返回成功信息
        $message = '删除完成！';
        $this->success($message,'',$data);
    }
}