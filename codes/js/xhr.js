/**
 * 1. 创建Ajax对象
 * 2. 链接服务器
 * 3. 发送
 * 4. 接收，监听状态变化 0、UNSENT 1、OPENED  2、HEADERS_RECEIVED LOADING  3、LOADING  4、DONE
 */

function ajax({
    method="GET",
    url,
    data,
    success,
    fail,
    timeout=10000,
    user=null,     // 可选的用户名用于认证用途
    password=null, // 可选的密码用于认证用途
}) {
    const oAjax = window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    // 1
    oAjax.timeout = timeout;
    oAjax.setRequestHeader('Content-type', 'application/json');
    oAjax.withCredentials = true;

    oAjax.open(method, url, true, user, password);
    // 3
    oAjax.send(JSON.stringify(data));
    // 4
    oAjax.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            success && success(this.responseText);
        }
    }
}