
export function getStringFromFile(e){
	//获取文件
	var file = e.target.files[0];
 
	/*
	 * 使用FileReader对象将文件转换为Base64字符串
	 */
	var reader = new FileReader();
	reader.readAsDataURL(this.file,"UTF-8");
	reader.onload=function(){
		fileStringBase64 = this.result;
		fileStringBase64 = fileStringBase64.substring(fileStringBase64.indexOf(",")+1,fileStringBase64.length);
	}
}