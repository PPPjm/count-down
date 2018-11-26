var WINDOW_WIDTH = 1230;
var WINDOW_HEIGHT = 668;
var RADIUS = 8;
var MARGIN_TOP = 60;//数字距离画布上面
var MARGIN_LEFT = 30;//第一个数字距离画布左边

const endTime = new Date(2018,11,30,10,00,00);//月份从0开始
var curShowTimeSeconds = 0

var balls = [];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]

window.onload = function(){
//屏幕自适应
//  WINDOW_WIDTH=document.body.clientWidth
//  WINDOW_HEIGHT=document.body.clientHeight
//  
//  MARGIN_LEFT=Math.round(WINDOW_WIDTH / 10);//时钟文字占屏幕4/5，两边合起来占1/5，一边占1/10   round() 方法可把一个数字舍入为最接近的整数。
//  RADIUS=Math.round(WINDOW_WIDTH * 4 / 5 / 108)-1//93+15=108
//  MARGIN_TOP=Math.round(WINDOW_HEIGHT / 5);

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");//获得上下文的绘制环境，这里是2d环境

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurrentShowTimeSeconds()//对两个时间进行计算
    setInterval(
        function(){
            render( context );//定义的函数,绘制
            update();
        }
        ,
        50
    );
}

function getCurrentShowTimeSeconds() {
  var curTime = new Date();//获取当前时间
  var ret = endTime.getTime() - curTime.getTime();
  ret = Math.round( ret/1000 )//round转化成整数

  return ret >= 0 ? ret : 0;//如果当前时间在截止时间后面，返回0
    
    
    //修改为时钟效果
//  var curTime=new Date();
//  var ret=curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();
//  return ret;
}

function update(){

    var nextShowTimeSeconds = getCurrentShowTimeSeconds();//下一次显示的时间是多少，下次显示时间和算的时间差值curShowTimeSeconds是否有变化，
	                                                              //一旦有变化，就改变curShowTimeSeconds

    var nextHours = parseInt( nextShowTimeSeconds / 3600);
	var nextHours1=nextHours/10
    var nextMinutes = parseInt( (nextShowTimeSeconds - nextHours * 3600)/60 )
    var nextSeconds = nextShowTimeSeconds % 60
    
    var curHours = parseInt( curShowTimeSeconds / 3600);
    var curHours1=curHours/10
    var curMinutes = parseInt( (curShowTimeSeconds - curHours * 3600)/60 )
    var curSeconds = curShowTimeSeconds % 60
    
    if(nextSeconds!=curSeconds){
    	curShowTimeSeconds=nextShowTimeSeconds;
    }

  if( nextSeconds != curSeconds ){
  	if(curHours>99){
	  	if( parseInt(curHours/100) != parseInt(nextHours/100) ){
	          addBalls( MARGIN_LEFT , MARGIN_TOP , parseInt(curHours/10) );
	      }
	      if( parseInt(curHours1%10) != parseInt(nextHours1%10) ){
	          addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(curHours1%10) );
	      }
	      if( parseInt(curHours%10) != parseInt(nextHours%10) ){
	          addBalls( MARGIN_LEFT + 30*(RADIUS+1) , MARGIN_TOP , parseInt(curHours%10) );
	      }
	      if( parseInt(curMinutes/10) != parseInt(nextMinutes/10) ){
	          addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes/10) );
	      }
	      if( parseInt(curMinutes%10) != parseInt(nextMinutes%10) ){
	          addBalls( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes%10) );
	      }
	
	      if( parseInt(curSeconds/10) != parseInt(nextSeconds/10) ){
	          addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(curSeconds/10) );
	      }
	      if( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
	          addBalls( MARGIN_LEFT + 108*(RADIUS+1) , MARGIN_TOP , parseInt(nextSeconds%10) );
	      }
  	}
  	else{
	  	 if( parseInt(curHours/10) != parseInt(nextHours/10) ){
	          addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(curHours/10) );
	      }
	      if( parseInt(curHours%10) != parseInt(nextHours%10) ){
	          addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(curHours%10) );
	      }
	
	      if( parseInt(curMinutes/10) != parseInt(nextMinutes/10) ){
	          addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes/10) );
	      }
	      if( parseInt(curMinutes%10) != parseInt(nextMinutes%10) ){
	          addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes%10) );
	      }
	
	      if( parseInt(curSeconds/10) != parseInt(nextSeconds/10) ){
	          addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(curSeconds/10) );
	      }
	      if( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
	          addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(nextSeconds%10) );
	      }
  	}
      

      curShowTimeSeconds = nextShowTimeSeconds;
  }

   updateBalls();
   
   
}

function updateBalls(){

    for( var i = 0 ; i < balls.length ; i ++ ){

        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if( balls[i].y >= WINDOW_HEIGHT-RADIUS ){//当小球到达底部的时候，会反弹
            balls[i].y = WINDOW_HEIGHT-RADIUS;
            balls[i].vy = - balls[i].vy*0.75;//0.75为摩擦系数
        }
    }
    
    
//维护内存（小球一直增加，吃内存，下面进行优化）    
   var cnt=0//记录多少个小球保存在画布中
    for(var i=0;i<balls.length;i++){
    	if(balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH){//第一个条件：小球的右边缘大于0；第二个条件：小球的左边缘比小于画面宽度
    		balls[cnt++]=balls[i]
    	}
    }
    while(balls.length>cnt){
    	balls.pop()//删除数组末尾小球，这样数组内的小球总是出现在画面上，维护了内存
    }
    
   
    
    
}
function addBalls( x , y , num ){//增加球
    for( var i = 0  ; i < digit[num].length ; i ++ )
        for( var j = 0  ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                var aBall = {
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),//半径前面已经声明过是全局变量，在这里不需要写
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:1.5+Math.random(),//1.5加上0-1之间的随机数，使求看着活泼
                    vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,//Math.random()*1000 取0-1000之间的随机数，又取了下整，又是-1的多少次方
                                                                            //Math.pow( -1 , Math.ceil( Math.random()*1000 ) )结果是1或-1
                    vy:-5,//在蹦出来的时候，会有一个向上抛的动作
                    color: colors[ Math.floor( Math.random()*colors.length ) ]//floor向下取整
                }

                balls.push( aBall )
            }
}

function render( cxt ){

    cxt.clearRect(0,0,WINDOW_WIDTH, WINDOW_HEIGHT);//该函数对一个矩形空间内的图像进行刷新操作

    var hours = parseInt( curShowTimeSeconds / 3600);
    var hours1=hours/10
    var minutes = parseInt( (curShowTimeSeconds - hours * 3600)/60 )
    var seconds = curShowTimeSeconds % 60

    if(hours>99){
		renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/100),cxt)//前两个 表示从哪开始绘制
		renderDigit( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(hours1%10) , cxt )
		renderDigit( MARGIN_LEFT + 30*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , cxt )
		renderDigit( MARGIN_LEFT + 45*(RADIUS+1) , MARGIN_TOP ,10 , cxt )
		renderDigit( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , cxt )
		renderDigit( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , cxt )
		renderDigit( MARGIN_LEFT + 84*(RADIUS+1) , MARGIN_TOP , 10, cxt )
		renderDigit( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt )
		renderDigit( MARGIN_LEFT + 108*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt )
		
	}
	else{
		renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt)//前两个 表示从哪开始绘制	
		renderDigit( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(hours1%10) , cxt )		
		renderDigit( MARGIN_LEFT + 30*(RADIUS + 1) , MARGIN_TOP , 10 , cxt )//10在点阵中代表是冒号
	    renderDigit( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , cxt);
	    renderDigit( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , cxt);
	    renderDigit( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , 10 , cxt);
	    renderDigit( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt);
	    renderDigit( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt);
    }

    for( var i = 0 ; i < balls.length ; i ++ ){
        cxt.fillStyle=balls[i].color;

        cxt.beginPath();
        cxt.arc( balls[i].x , balls[i].y , RADIUS , 0 , 2*Math.PI , true );
        cxt.closePath();

        cxt.fill();//真正的fill让小球渲染到屏幕上
    }
}

function renderDigit( x , y , num , cxt ){

    cxt.fillStyle = "rgb(0,102,153)";

    for( var i = 0 ; i < digit[num].length ; i ++ )
        for(var j = 0 ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                cxt.beginPath();
                cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI )
                cxt.closePath()

                cxt.fill()
            }
}

