# 网络请求

## Get与Post请求的区别

最直观的区别就是Get把参数放在了URL中，Post通过`request body` 传参；

- get在浏览器回退时时无害的，而post会再次提交请求；
- get产生的URL的地址可以被Bookmark，post不会；
- get请求会被浏览器主动cache，post请求需要设置请求体；[缓存](#缓存)
- GET请求只能进行URL编码，post支持多种编码方式
- GET请求参数会被保留在浏览器的历史记录里，Post中的参数不会；
- Get请求在URL中传参有长度限制
- 对参数的数据类型，GET只接受ASCII字符，而POST没有限制

- **GET产生一个TCP数据包；POST产生两个TCP数据包。**

