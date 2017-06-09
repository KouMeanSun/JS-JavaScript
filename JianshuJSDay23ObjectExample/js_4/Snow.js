	

	//构造函数
	//雪花类
	//属性ele
	//方法 ：down（）
	//randomPoint（）
	
	function Snow(){
		//属性ele
		this.ele = document.createElement("img");
		this.ele.src = "images/snow.gif";
		//位置
		this.ele.style.left = this.randomPoint().left + "px";
		this.ele.style.top  = 0;
		document.body.appendChild(this.ele);
		
		//掉落
		this.down();
	}
	//随机数
	Snow.prototype.randomPoint = function (){
		var x = parseInt(Math.random()*document.documentElement.clientWidth);
		var y = parseInt(Math.random()*document.documentElement.clientHeight);
		return {left:x,top:y};
	}
	
	//下雪
	Snow.prototype.down = function(){
//		var self = this;
//		var y    = this.ele.offsetTop + 15;
//		animate(this.ele,{top:y},{callback:function(){
//			self.down();
//		}});

		//保存this到self
		var self = this;
		//匀速运动
		var timer = setInterval(function(){
			//当前值
			var current = self.ele.offsetTop;
			//速度
			var speed = 4;
			//目标
			var top = current + speed;
			//当雪花即将落地时，让其又从顶部开始往下掉落
			if(top>document.documentElement.clientHeight-100){
				top = 0;
			}
			//改变top的值
			self.ele.style.top = top +"px";
			
		},50);
	}
