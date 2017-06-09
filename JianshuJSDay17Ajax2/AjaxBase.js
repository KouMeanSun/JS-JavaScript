function createXHR(){
			 	if(window.XMLHttpRequest){
			 		return new XMLHttpRequest();
			 	}
			 	
			 	return  new ActiveXObject("Microsoft.XMLHTTP");
			 }