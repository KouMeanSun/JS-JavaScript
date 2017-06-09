

//子弹，构造函数
function Bullet(){
	//随机id（一个随机的数字字符串，给一个唯一的属性名）
	this.id = parseInt(Math.random()*100000)+"";
	
	//属性ele
	this.ele = document.createElement("div");
	
	//初始化方法
	this.init = function(){
		document.body.appendChild(this.ele);//添加到body上
		
		//将子弹添加到对象bulletList中
		gameEngine.bulletList[this.id] = this;
		
		this.ele.className = "bullet";//css样式
		
		//位置：
		var left = myPlane.ele.offsetLeft+myPlane.ele.offsetWidth/2-this.ele.offsetWidth/2;
		this.ele.style.left = left + "px";
		this.ele.style.top = myPlane.ele.offsetTop - this.ele.offsetHeight + "px";
		
		return this;
	};
	//方法
	//子弹移动
	this.move = function(){
		var self = this;//保存this
		this.timer = setInterval(function(){
			//当子弹移动到消失时，则让其停止移动，让子弹消失
			if(self.ele.offsetTop<-18){
				clearInterval(self.timer);
				self.destroy();//销毁子弹
				
				//属性的调用方式，obj.name /  obj[name]
				//删除bulletList中对应的子弹
				delete gameEngine.bulletList[self.id];
			}
			self.ele.style.top  = self.ele.offsetTop - 10 + "px";
		},50);
	};
	
	//子弹爆炸
	this.boom = function(){
		//停止定时器，停止移动
		clearInterval(this.timer);
		this.ele.className = "bullet-die";//修改css样式为子弹销毁
		
		var self = this;
		//爆炸时的动画图片
		var dieImgs = ["images/die1.png","images/die2.png"];
		var index = 0;
		var dieTimer  = setInterval(function(){
			//动画图片显示完成后
			if(index == dieImgs.length){
				clearInterval(dieTimer);//清除定时器
				self.destroy();//销毁子弹
			}else{
				//切换图片
				self.ele.style.background = "url("+dieImgs[index]+")";
				index++;
			}
		},50);
		
	};
	
	//子弹销毁
	this.destroy = function(){
		document.body.removeChild(this.ele);
	};
}
