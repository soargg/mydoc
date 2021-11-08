# Fetch

fetch是一种HTTP数据请求的方式，是`XMLHttpRequest`的一种替代方案，fetch不是`ajax`的进一步封装，而是JS原生的API。

## ajax

- **创建一个ajax**
  1. 创建一个`XMLHttpRequest`对象，（可设置一些配置参数）
  2. 调用`open`方法打开链接，设置基本请求信息
  3. 调用`send`的方法，发送请求数据
  4. 监听`onreadystatechange`事件，拿到返回结果
  5. 拿到返回值，想咋玩咋玩

- **code**

```javascript
/**
 * 1. 创建Ajax对象
 * 2. 链接服务器
 * 3. 发送
 * 4. 接收，监听状态变化 0、UNSENT 1、OPENED  2、HEADERS_RECEIVED LOADING  3、LOADING  4、DONE
 */
function ajax({
    method='GET',
    url,
    data,
    success,
    error,
    user=null, // 可选的用户名用于认证用途
    password=null  // 可选的密码用于认证用途
}) {
    // 1
    const oAjax = window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    oAjax.timeout = 10000;
    oAjax.setRequestHeader('Content-type', 'application/json');
    oAjax.withCredentials = true;
    // 2
    oAjax.open(method, url, true, user, password);
    // 3
    oAjax.send(JSON.stringify(data));
    // 4
    oAjax.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            success && success(this.responseText);
        } else {
            error && error();
        }
    };

  	return oAjax;
}
```

## fetch

- **使用**

  - 第一个参数是url 或者 一个[Request](https://developer.mozilla.org/zh-CN/docs/Web/API/Request)对象
  - 第二个参数可选，可以控制不同配置的init配置对象
  - 返回结果是用 Promise来处理

- **调用**

  ```typescript
  Promise<Respons>fetch(input[, init]);
  ```



但遇到网络错误是，`fetch()`返回的Promise会被reject，并传回TypeError，虽然这也可能因为权限或其他问题，成fetch检查不仅要包括Promise的resolve，还要包括Response.ok为true。 HTTP 404状态并不会认为是网络错误。



