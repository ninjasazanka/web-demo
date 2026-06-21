var fd = "监听器";

/*全局快捷键是否启用*/
var using_KEY = true;
var using_KEY_Enter = true;
var using_KEY_Space = false;

/*变量*/

var submit_Count = 0;	//搜索执行次数。

//页面加载完成后
window.addEventListener("load", (event) => {

	fd = new FDLIB();
	fd.Monitor = () => {
		try {
			//快捷键启用与否
			
			//第一次执行搜索且输入框没有值
			if (submit_Count==1 && document.querySelectorAll("#search-text")[0].value == ""){
				document.querySelectorAll("#search-text")[0].placeholder = "";
				document.querySelectorAll("#search-text")[0].value = "伊利亚";
				submit_Count++;
				fd.console(`重新执行搜索[${submit_Count}]`);
				fd.Search(document.querySelectorAll("#search-text")[0].value);
			}
			
		} catch (error) {
			fd.console("err");
		}
	};

	fd.Init();
	//fd.Cease();
	
	//键盘事件
	document.addEventListener("keydown", (event) => {
		if (using_KEY) {
			if (using_KEY_Enter && (event.keyCode == "13" || event.keyCode == "100")) {
				fd.console("按下回车");
				submit_Count++;
				fd.console(`执行搜索[${submit_Count}]`);
				fd.Search(document.querySelectorAll("#search-text")[0].value);
			}
			if (using_KEY_Space && (event.keyCode == "32")) {
				fd.console("按下空格");
				submit_Count++;
				fd.console(`执行搜索[${submit_Count}]`);
				fd.Search(document.querySelectorAll("#search-text")[0].value);
			}
		};
	});

	//搜索按钮被按下
	document.querySelectorAll("#search-submit")[0].addEventListener("click", (event) => {
		submit_Count++;
		fd.console(`执行搜索[${submit_Count}]`);
		fd.Search(document.querySelectorAll("#search-text")[0].value);
	});

	//
	document.querySelectorAll("#search-engine")[0].style.display = "none";
	document.querySelectorAll("#search-tag")[0].addEventListener("click",(event) => {
		try{
			//fd.console("选择引擎");
			if(document.querySelectorAll("#search-engine")[0].style.display == "flex"){
				document.querySelectorAll("#search-engine")[0].style.display = "none";
				return;
			}
			if(document.querySelectorAll("#search-engine")[0].style.display == "none"){
				document.querySelectorAll("#search-engine")[0].style.display = "flex";
				return;
			}
			throw new Error;
		}catch(error){
			fd.console(error);
		}
	});
	
	//搜索引擎选择
	document.querySelectorAll("#search-engine li")[0].addEventListener("click",(event) =>{
		//code
		fd.console("选择引擎[百度]");
		set_searchTag_css1("./img/Baidu.png");
		fd.__search_engine__ = "baidu";
	});
	document.querySelectorAll("#search-engine li")[1].addEventListener("click",(event) =>{
		//code
		fd.console("选择引擎[谷歌];地区限制,Google搜索暂时不可用");
		set_searchTag_css1("./img/Google.png");
		fd.__search_engine__ = "google";
	});
	document.querySelectorAll("#search-engine li")[2].addEventListener("click",(event) =>{
		//code
		fd.console("选择引擎[搜狗]");
		set_searchTag_css1("./img/Sougou.png");
		fd.__search_engine__ = "sougou";
	});
	document.querySelectorAll("#search-engine li")[3].addEventListener("click",(event) =>{
		//code
		fd.console("选择引擎[B站]");
		set_searchTag_css1("./img/Bilibili.png");
		fd.__search_engine__ = "bilibili";
	});
	document.querySelectorAll("#search-engine li")[4].addEventListener("click",(event) =>{
		//code
		fd.console("选择引擎[帕琪站]");
		set_searchTag_css1("./img/Patchy.png");
		fd.__search_engine__ = "Patchy";
	});
	
	//复用部分
	function set_searchTag_css1(imageSrc){
		document.querySelectorAll("#search-tag")[0].style.backgroundImage = `url(${imageSrc})`;
		document.querySelectorAll("#search-tag")[0].style.backgroundSize = "60% 60%";
		document.querySelectorAll("#search-tag")[0].click();//在点击一次，关闭
	}
	
});

//假如鼠标被按下，

/* addEventListener("click",(event)=>{
	fd.console("搜索按钮被按下");
	//fd.Search(document.querySelectorAll("#search-text")[0].value);
}); */
