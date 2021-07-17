function $(select) {
    return document.querySelector(select);
  }
function $$(select) {
    return document.querySelectorAll(select);
}
function ajax(ops){
    ops.type=ops.type||'GET';
    ops.async=ops.async||true;
    ops.data=ops.data||null;
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            ops.success(xhr.responseText);
        }
    }
    xhr.open(ops.type,ops.url,ops.async);
    xhr.send(ops.data);
}

//封装一个字符串拼接函数
function rendList(arr){
    var result=arr.map(function(item){
        return `
          <li>
           <a href="#" class="newsItem" title="${item.title}">
            <p class="newsTitle">${item.title}</p>
            <p class="newsDate">${item.date}</p>
           </a>
          </li>     
        `
    }).join('');
   $('.newsPage').innerHTML=result;
}