<?php
ini_set("display_errors","1");
error_reporting(E_ERROR);

require "client.php";
require "config.php";

$folder_id = 'MF81MDA1MDM0X2lJY1BL';

$c = new Opendrive(public_key, sha1(private_key));

$c->setFormat(format);

$url = $c->getUploadURL();
/**
 * Simple Front
 *
 * Add as many files as you need to upload in one step.
 * Response will return status for each file separately.(JSON
 *
 * Use custom1, custom2, custom3 vars to pass your own data.
 * Max size is 150 varchar and can be returned in one response.
 * 
 * How to use this with JqueryUploader? 
 * 
 */
 ?>

<html>
    <head>
        <title>Testing uploader</title>
        <meta http-equiv="Access-Control-Allow-Origin" content="*">
		<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script type="text/javascript" src="js/vendor/jquery.ui.widget.js"></script>
        <script type="text/javascript" src="js/jquery.iframe-transport.js"></script>
        <script type="text/javascript" src="js/jquery.fileupload.js"></script>
        <script type="text/javascript">
            $(function () {
                $('#fileupload').fileupload({
                    url: "http://lpreterite.com:8081/sercer/index.php/session_id=1376465715053601003&level=10&format=json",//<?php echo $url ?>
                    dataType: 'json',
                    formData:{
                        //其实数据在这添加
                        folder_id:$('#folder_id').val(),
                        lang:$('#lang').val()
                    },
                    crossDomain:true,
                    xhrFields: {
                        withCredentials: true
                    },
                    paramName:'file[]',
                    done: function (e, data) {
                        for(var pro in data){
                            if(data[pro].status=="successful"){
                                $('#files').append('<li data-file-id="'+data[pro].file_id+'"><a href="'+data[pro].file_download_link+'">'+data[pro].file_name+'</a></li>');
                            }else{
                                $('#message').append('error:'+data[pro].message);
                            }
                        }
                    }
                    // ,
                    // progressall: function (e, data) {
                    //     var progress = parseInt(data.loaded / data.total * 100, 10);
                    //     $('#progress .bar').css(
                    //         'width',
                    //         progress + '%'
                    //     );
                    // }
                });
                // .prop('disabled', !$.support.fileInput)
                //     .parent().addClass($.support.fileInput ? undefined : 'disabled');
            });
        </script>
    </head>
    <body>
        <form action="<?php echo $url ?>" method="POST" enctype="multipart/form-data">
        <table>
            <tr>
                <td colspan=2>
                    <input type="file" name="file1" />
                </td>
            </tr>
            <tr>
                <td colspan=2>
                    <input type="file" name="file2" />
                </td>
            </tr>
            <tr>
                <td colspan=2>
                    <input type="submit" value="Upload file" />
                </td>
            </tr>
        </table>
        <input id="folder_id" type="hidden" name="folder_id" value="<?php echo $folder_id?>">
        <input type="hidden" name="custom1" value="aaa111">
        <input type="hidden" name="custom2" value="bbb222">
        <input type="hidden" name="custom3" value="ccc333">
		<input id="lang" type="hidden" name="lang" value="en" />
        </form>

        <div id="ajaxUpload">
            <input id="fileupload" type="file" name="file[]" multiple>
        </div>
        <div id="message"></div>
        <ul id="files" class="files"></ul>
    </body>
</html>

