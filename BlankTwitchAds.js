// ==UserScript==
// @name     BlankTwitchAds
// @version  1
// @grant    none
// ==/UserScript==
console.log('blanktwitchads loaded')
let videohidden = false
let mutedbefore = false
let duringad=false
// function getAllParentsWithoutSpan(elem){
// 	if(elem.parentElement && elem.parentElement.get
// }
function hideVideo(hide){
  var videoelements=document.querySelectorAll("video, audio")
//   console.log('hidevideo found videoelements '+videoelements.length)
//   var elemouter = videoelements[0].parentElement.parentElement;
  var eleminner=videoelements[0]
//   console.log('elem was '+eleminner)
  if (hide) {
//     console.log('muting video')
    if (eleminner.muted && !duringad) {
//       console.log('setting mutedbefore to true')
      mutedbefore = true
    } else {
//       console.log('not setting mutedbefore to true '+mutedbefore)
      eleminner.muted = true
    }
    videohidden = true
//     console.log('hiding video')
    eleminner.style = "display:none;"
    duringad=true
  } else {
    videohidden = false
//               console.log('unmuting video maybe'+mutedbefore)
      //only unmute if it wasn't muted before the ad started
    if (!mutedbefore) {
//       console.log('not mutedbefore, so unmuting')
      eleminner.muted = false
    }
    else{
//     	console.log('not unmuting')
    }
    mutedbefore = false
//     console.log('showing video')
    eleminner.style = "display:block;"
    duringad=false
  }
}
// function hideVideo(hide) {
//   var videoelements=document.querySelectorAll("video, audio")
//   console.log('hidevideo found videoelements '+videoelements.length)
//   var elem = videoelements[0];
//   console.log('elem was '+elem)
//   if (hide) {
//     console.log('muting video')
//     if (elem.muted) {
//       console.log('setting mutedbefore to true')
//       mutedbefore = true
//     } else {
//       console.log('not setting mutedbefore to true '+mutedbefore)
//       elem.muted = true
//     }
//     videohidden = true
//     console.log('hiding video')
//     elem.style = "display:none;"
//   } else {
//     videohidden = false
//               console.log('unmuting video')
//       //only unmute if it wasn't muted before the ad started
//     if (!mutedbefore) {
//       console.log('not mutedbefore, so unmuting')
//       elem.muted = false
//     }
//     else{
//     	console.log('not unmuting')
//     }
//     mutedbefore = false
//     console.log('showing video')
//     elem.style = "display:block;"
//   }
// }

function isAdPlaying() {
//   console.log('isadplaying')
  let allspan = document.getElementsByTagName('span')
  for (var i = 0; i < allspan.length; i++) {
    let re = /\d:\d\d\)?$/
    let matches = re.exec(allspan[i].textContent)
    if (matches && matches.length > 0 && allspan[i].classList[0] !=
      "text-fragment" && allspan[i].classList[0] != 'live-time') {
      //this segment for skipping if attributes indicate the span is part of the chat
      var skipchat=false
      for(var j=0;j<allspan[i].attributes.length;j++){
      	if(allspan[i].attributes[j].nodeValue.includes("chat") || allspan[i].attributes[j].name.includes("chat")){
        	skipchat=true
          break
        }
      }
      if(skipchat){
      	continue
      }
      
      let numstr = matches[0].replace(/\D/g, '');
      if (numstr.length > 4) {
        continue
      }
//             console.log('found counter match '+numstr)
//       console.log(allspan[i])
      if (Number.parseInt(numstr) > 0) {
        return true
      }
    }
  }
  return false
}
setInterval(function() {
    if (isAdPlaying()) {
      hideVideo(true)
    } else {
      if (videohidden) {
        hideVideo(false)
      }
    }
  },
  1000)

