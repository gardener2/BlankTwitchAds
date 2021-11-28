// ==UserScript==
// @name     BlankTwitchAds
// @version  1
// @grant    none
// ==/UserScript==
let videohidden=false
function hideVideo(hide) {
    var elem=document.querySelectorAll("video, audio")[0];
    elem.muted = hide;
  	if(hide){
//       console.log('muting video')
      elem.muted = true
      videohidden=true
    	elem.style="display:none;"
    }
  	else{
      	videohidden=false
//         console.log('unmuting video')
      	elem.muted=false
    		elem.style="display:block;"
    }
}
function isAdPlaying(){
  let allspan=document.getElementsByTagName('span')
  for(var i=0;i<allspan.length;i++){
    let re=/\d:\d\d\)?$/
    let matches=re.exec(allspan[i].textContent)
    if(matches && matches.length>0 && allspan[i].classList[0]!="text-fragment" && allspan[i].classList[0]!='live-time'){
      let numstr=matches[0].replace(/\D/g,'');
//       console.log('found counter match '+numstr)
      if(Number.parseInt(numstr)>0){
        return true
      }
    }
  }
  return false
}
setInterval(function(){
		if(isAdPlaying()){
    	hideVideo(true)
    }
  	else{
      if(videohidden){
    		hideVideo(false)
      }
    }
	},
  1000)
