学习笔记

### 浏览器工作原理
  URL（HTTP）--> HTML(parse) -->css(computing) --> DOM with css(layout) --> DOM with position(render) --> bitmap

### 有限状态机
有限状态机由一组状态、一个初始状态、输入和根据输入及现有状态转换为下一个状态的转换函数组成。在Gof的23种设计模式里的state模式是一种面向对象的状态机思想，可以适应非常复杂的状态管理。
 * Moore状态机：它的每个机器都有确定的下一个状态，不管接受什么样的输入
 * Mealy状态机：每个机器根据输入决定下一个状态，用的更多

### 网络模型
物理层、数据链路层、网络层、传输层、会话层、表示层、应用层

物理层、数据链路层：4G/5G/WI-FI  
网络层： internet  
传输层： TCP (require('net'))  
会话层、表示层、应用层： HTTP(require('http'))  

### HTTP请求
TCP与IP基础知识
1. 流
TCP的数据传输概念像水流一样，没有明显的分割单位，只保证前后顺序是正确的

2. 端口
网卡的数据哪一个是分配给哪一个软件的由端口决定

3. 数据包
TCP的传输概念就是一个一个数据包的概念

4. IP地址
IP地址可以帮包找到应该从哪到哪

5. libnet
负责构造IP包并且发送

6. libpcap
负责从网卡抓所有流经你网卡的IP包

### HTTP  
HTTP协议是Hyper Text Transfer Protocol（超文本传输协议）的缩写,是用于从万维网（WWW:World Wide Web ）服务器传输超文本到本地浏览器的传送协议。。
HTTP是一个基于TCP/IP通信协议来传递数据（HTML 文件, 图片文件, 查询结果等）。

课上内容：
#### 实现一个HTTP的请求
* 设计一个HTTP请求的类
* content type是一个必要的字段，要有默认值
* body是KV格式
* 不同的content-type影响body的格式
#### send函数编写
* 在Request的构造器中收集必要的信息
* 设计一个send函数，把请求真实发送到服务器
* send函数应该是异步的，所以返回Promise
* response格式
  > status line  
  > headers  
  > 空行分隔  
  > body
#### 发送请求
* 设计支持已有的connection或者自己的connection
* 收到数据传给parser
* 根据parser的状态resolve Promise
#### response解析
* Response必须分段构造，所以我们要用一个ResponseParser来“装配”
* RresponseParser分段处理ResponseText，我们用状态机来分析文本的结构
#### response body解析
* Response的body可能根据Content-Type有不同的结构，因此我们会采用Parser的结构来解决问题
* 以TrunkedBodyParser为例，我们同样用状态机来处理body的格式