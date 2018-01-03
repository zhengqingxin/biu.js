
# biu.js

> 一个弹幕js.🔫 


## How to use

### In a browser:

```
<script src="biu.min.js"></script>
```
```js
var anime = new Biu.anime();
var biu = new Biu({
  name: 'biubiu',
  socket: location.protocol + '//' + location.hostname + (location.port ? ':'+location.port : '') ,
  onMessage:(data)=>{
    anime.run(data)
  }
});
```

### Using npm:

```
npm i --save biujs
```
```js
import Biu from 'biujs';

var anime = new Biu.anime();
var biu = new Biu({
  name: 'biubiu',
  socket: location.protocol + '//' + location.hostname + (location.port ? ':'+location.port : '') ,
  onMessage:(data)=>{
    anime.run(data)
  }
});
```

Biu 用来接收服务端消息，Biu.anime 是一个动画扩展，你可以直接使用，如果不满足你的需求，也可以在 `onMessage` 里自己写。

### Biu

#### 配置项

**name**：在[服务端](https://github.com/zhengqingxin/biu)申请的项目名称，实际对应 `socket.io` 中的一个 `namespace`

**socket**：服务端地址

**onConnect**：连接成功时的回调

**onMessage**：接收消息时的回调

#### 方法

**open**：连接ws，实例化时自动调用

**stop**：关闭

**send**：发送消息，接收 string 或者 object 的参数，object时一定要有`text`字段（弹幕内容）


### Biu.anime

**colors**：弹幕颜色，接收一个数组，默认值：['#f55b15', '#764ba5', '#00a762', '#0193e6', '#e0463c']

**maxDuration**：弹幕最大时间

**minDuration**：弹幕最小时间（每个弹幕会在最大最小时间中取一个随机值）

#### 方法

**run**：显示弹幕

**show**：显示

**hide**：隐藏
