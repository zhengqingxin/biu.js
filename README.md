
# biu.js

> biu.js is a JavaScript library for barrage.🔫 


## How to use

### In a browser:

```
<script src="biu.min.js"></script>
```
```js
var options = {
  defaultQueue:[
    {text:"biu~biu~biu 一┳═┻︻▄ "}
  ]
}
var biu = new Biu(options);
biu.start();
```

### Using npm:

```
npm i --save biujs
```
```js
import Biu from 'biujs';

var options = {
  defaultQueue:[
    {text:"biu~biu~biu 一┳═┻︻▄ "}
  ]
}
var biu = new Biu(options);
biu.start()
```


## Options

### instance option
```js
var options = {
  socket:'https://localhost:8360', //websocket server address
  defaultQueue:[{text:'biu',style:{color:'red'}}]    //default barrage list
  defaultQueueInterval:2000,     // show default queue in an random interval based on this field, default 2000.
  duration:10000,    // barrage duration in the page. generate random value based on this field, default 10000.
  minDuration:5000,   //min duration,default 5000
  colors:['#f55b15', '#764ba5', '#00a762', '#0193e6', '#e0463c'],  //text colors,barrage will pick a random color within them. default ['#f55b15', '#764ba5', '#00a762', '#0193e6', '#e0463c']
  onMessage:()=>{}   // callback when a barrage is coming.
}
var biu = new Biu(options);
biu.start();
```

### barrage option
This options means then configuration of specific barrage, it can overwrite the options above. You can custom `text`,`style`,`duration`. For example:

```js
var options = {
  colors:['#f55b15', '#764ba5', '#00a762', '#0193e6', '#e0463c'],  
  duration:10000,
  minDuration:5000
}
var biu = new Biu(options);
biu.start();

var barrage = {
  text:'boss barrage!'
  style:{color:'red','font-size':'300%'},
  duration:2000
}
biu.push(barrage);
```
