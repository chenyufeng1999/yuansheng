var audio=document.getElementById("audio");
var button=document.getElementById("button");
var vo=document.getElementById("volume");
audio.control=false;
function change1(){
	if(audio.paused||audio.ended){
		button.value="||";
		audio.play();
	}
	else{
		button.value=">";
		audio.pause();
	}
}
function change2(){
	audio.volume=volume.value;
}
//获取video对象
var myVideo = document.getElementById("myVideo");
//控制播放/暂停的方法
function playPause()
{
    var ppButton=document.getElementById("playPause");
    if (myVideo.paused){
        myVideo.play();
        ppButton.innerHTML="暂停";
    }
    else{
        myVideo.pause();
        ppButton.innerHTML="播放";
    }
}