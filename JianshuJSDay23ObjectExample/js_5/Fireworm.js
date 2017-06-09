
		//构造函数
		//Fireworm 萤火虫
		function Fireworm(){
			//借用构造函数
			Base.call(this,"images/1.jpg");
			
			this.ele.style.left = this.randomPoint().left + "px";
			this.ele.style.top  = this.randomPoint().top  + "px";
			this.ele.style.opacity = 0.5;//透明度
			this.ele.style.filter  = "alpha(opacity=50)";
			//飞
			this.fly();
		}
		
		//原型链继承
		Fireworm.prototype = new Base();
		//飞
		Fireworm.prototype.fly = function(){
			var self = this;
			animate(this.ele,this.randomPoint(),{callback:function(){
				//运动结束后调用
				self.fly();
			}});
		}
		
		
		
