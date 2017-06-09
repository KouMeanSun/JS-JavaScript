

		//构造函数
		//雪花类Snow
		//属性：ele
		//方法：down（）
		//randowPoint（）；
		
		function Snow(){
			//借用构造函数，继承属性
			Base.call(this,"images/snow.gif");
			
			//位置
			this.ele.style.left = this.randomPoint().left + "px";
			this.ele.style.top  = 0;
			
			//掉落
			this.down();
		}
		
		//原型链继承
		Snow.prototype = new Base();
		
		//下雪
		Snow.prototype.down = function(){
//			var self = this;
//			var y = this.ele.offsetTop + 15;
//			animate(this.ele,{top:y},{callback:function(){
//				self.down();
//			}});
			
			//保存this到self
			var self = this;
			
			//匀速运动
			var timer = setInterval(function(){
				//当前值
				var current  = self.ele.offsetTop;
				//速度
				var speed = 4;
				//目标值
				var top = current + speed;
				
				//当雪花即将落地时，又让其从顶部开始下落
				if(top>document.documentElement.clientHeight - 100){
					top = 0;
				}
				//改变top值
				self.ele.style.top = top + "px";
				
			},50);
			
		};
