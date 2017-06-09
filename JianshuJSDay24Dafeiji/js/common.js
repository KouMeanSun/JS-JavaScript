

		function getStyle(target){
			if(target.currentStyle){
				return target.currentStyle;
			}else{
				return getComputedStyle(target,null);
			}
		}

		//获取一个指定范围的随机数
		function randomInt(min,max){
			return Math.floor(Math.random()*(max-min+1))+min;
		};
		//字符串前后去空格
		function trim(str){
			return str.replace(/^\s+/,"").replace(/\s+$/,"");
		};
	
		//事件监听的兼容函数
		function log(obj){
			console.log(obj);
		}
		
		//根据样式名称获取元素
		function getByClassName(classname){
			if(document.getElementsByClassName){
				return document.getElementsByClassName(classname);
			}else{
				var all = document.getElementsByTagName("*");
				var arr = [];
				for(var i=0;i<all.length ; i++){
					if(all[i].className == classname){
						arr.push(all[i]);
					}
				}
				return arr;
			}
		}
	
		//得到子元素节点
		function getChildElement(obj){
			var nodeList = obj.childNodes;
			var arr = new Array();
			for(var i=0;i<nodeList.length;i++){
				if(nodeList[i].nodeType == 1){
					arr.push(nodeList[i]);
				}
			}
			return arr;
		}

	//获取cookie
	 function getCookie(key){
	 	var list = document.cookie.split(";");
	 	for(var i in list){
	 		var keyVal = list[i].split("=");
	 		if(key==trim([0])){
	 			return keyVal[1];
	 		}
	 	}
	 	return "";
	 }
	 
	 //检测碰撞
    function isCrash(el1, el2) {
        var e1 = {
            x: getDefaultStyle(el1, 'left'),
            y: getDefaultStyle(el1, 'top'),
            w: getDefaultStyle(el1, 'width'),
            h: getDefaultStyle(el1, 'height')
        }
        var e2 = {
            x: getDefaultStyle(el2, 'left'),
            y: getDefaultStyle(el2, 'top'),
            w: getDefaultStyle(el2, 'width'),
            h: getDefaultStyle(el2, 'height')
        }
        var px, py;
        px = e1.x <= e2.x ? e2.x : e1.x;
        py = e1.y <= e2.y ? e2.y : e1.y;
        //判断点在同时在两个对象中
        if (px >= e1.x && px <= e1.x + e1.w && py >= e1.y && py <= e1.y + e1.h && px >= e2.x && px <= e2.x + e2.w && py >= e2.y && py <= e2.y + e2.h) {
            return true;
        } else {
            return false;
        }
    }
    function getDefaultStyle(obj, attribute) {
        return parseInt(obj.currentStyle ? obj.currentStyle[attribute] : document.defaultView.getComputedStyle(obj, false)[attribute]);
    }