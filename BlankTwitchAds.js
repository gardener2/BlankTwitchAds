// ==UserScript==
// @name     BlankTwitchAds
// @version  1
// @grant    none
// ==/UserScript==
let videohidden = false
let mutedbefore = false

function hideVideo(hide) {
  var elem = document.querySelectorAll("video, audio")[0];
  if (hide) {
    //       console.log('muting video')
    if (elem.muted) {
      mutedbefore = true
    } else {
      elem.muted = true
    }
    videohidden = true
    elem.style = "display:none;"
  } else {
    videohidden = false
      //         console.log('unmuting video')
      //only unmute if it wasn't muted before the ad started
    if (!mutedbefore) {
      elem.muted = false
    }
    mutedbefore = false
    elem.style = "display:block;"
  }
}

function isAdPlaying() {
  let allspan = document.getElementsByTagName('span')
  for (var i = 0; i < allspan.length; i++) {
    let re = /\d:\d\d\)?$/
    let matches = re.exec(allspan[i].textContent)
    if (matches && matches.length > 0 && allspan[i].classList[0] !=
      "text-fragment" && allspan[i].classList[0] != 'live-time') {
      let numstr = matches[0].replace(/\D/g, '');
      if (numstr.length > 4) {
        continue
      }
      //       console.log('found counter match '+numstr)
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
