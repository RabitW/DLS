# 说明
DNS Log Server是用来记录DNS 解析记录。

本应用启动前应先启动DNS Server守护进程, 并进行监听53端口。
在接收到DNS请求时，会记录在数据库中，并返回一个的响应包。
仅在linux环境下运行

# 安装
```
git clone git@github.com:imjdl/DLS.git
cd DLS
pip install requerments.txt
```
# 使用
1. 启动DNS服务

     在settings.py 里将DNSHOST改为你的VPS IP
     
    `python manage.py DNServerd --run start`
2. 迁移数据
    
    `python manage.py migrate`
3. 启动Web页面

    `python manage.py runserver 0.0.0.0:8080`

4. 访问 http://youip:8080

注：执行`python manage.py DNServerd --run stop` 关闭DNS Server

# 更新日志

2018年10月24日：添加，16进制解码功能。
![](demo/Selection_222.png)
![](demo/Selection_223.png)

# 相关文章

https://blog.0dayhub.ga/2018/10/24/DNS-LOG/