<?php
class TagAction extends Action {

    var $tag;

    function _initialize(){
        $this->tag = D('tags');
    }

    public function tags(){
        $condition = $_GET;
        if($_GET['condition'])
            $condition = $_GET['condition'];
        if($_GET['order'])
            $order = $_GET['order'];

        $condition['_URL_'] = null;
        unset($condition['_URL_']);

        return $this->tag->where($condition)->order($order)->select();
    }

    public function _empty(){
        switch ($_SERVER['REQUEST_METHOD']) {
            case 'PUT':
            case 'POST':
                $_PUT = json_decode(file_get_contents('php://input'),true);//取得Put内容
                $this->save($_PUT);
                break;
            case 'GET':
                $result = $this->tags();
                $this->ajaxReturn($result);
                break;
            case 'DELETE':
                $this->delete($_GET['_URL_'][count($_GET['_URL_'])-1]);
                break;
            default:
                # code...
                break;
        }
    }

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