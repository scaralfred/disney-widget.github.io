(function () {
"use strict";

var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true; 
}

let currentVideo = 1;
let videoAudio = false;
let isVideoPlaying = false;
let firstLoopCompleted = false;
let stopVideoLoop = () => clearInterval(videoLoop);
let getVideo = (currentVideo) => document.getElementById("video" + currentVideo + "-container");
let pauseVideo = (currentVideo) => document.getElementById("video" + currentVideo).pause();
let reloadVideo = (currentVideo) => document.getElementById("video" + currentVideo).currentTime = 0;
let playVideo = (currentVideo) => document.getElementById("video" + currentVideo).play();
let getBackgroundImage = () => document.getElementById("fairies-pic");
let getFooter = () => document.getElementById('i-footer');

isMobile ? null : playVideo(currentVideo);
getFooter().classList.add('banner-slide-in');
getVideo(currentVideo).style.left = "0%";
let moveSlideBack = (slide) => {
        slide.style.transition = "none";
        slide.style.left = "-100%";
        setTimeout(() => { slide.style.transition = "all 0.5s linear"; }, 100);
}
let moveSlideRight = (slide) => {
        slide.style.transition = "none";
        slide.style.left = "100%";
        setTimeout(() => { slide.style.transition = "all 0.5s linear"; }, 100);
}
moveSlideBack(getBackgroundImage());

if(!isMobile) { 
    var videoLoop = setInterval(() => {
    getVideo(currentVideo).style.left = "-100%";
    pauseVideo(currentVideo);
    if (currentVideo < 5) { 
        if (currentVideo === 4) { moveSlideRight(getBackgroundImage()) }
        if (currentVideo === 3) { moveSlideRight(getVideo(5)) }
        if (currentVideo === 2) { moveSlideRight(getVideo(4)) }
        if (currentVideo === 1) { moveSlideRight(getVideo(3)) }
        if (currentVideo === 0) { moveSlideRight(getVideo(2)) };
        getVideo(++currentVideo).style.left = "0%";
        playVideo(currentVideo);
    } else if (currentVideo === 5) {
        getBackgroundImage().style.left = "0%";
        getFooter().classList.add('banner-slide-out');
        pauseVideo(currentVideo);
        reloadVideo(currentVideo);
        currentVideo = 0;
        stopVideoLoop();
        moveSlideRight(getVideo(1));
        firstLoopCompleted = true;
    }
}, 2000);
};

document.getElementById("button-right").addEventListener("click", () => {
    isMobile ? displayPlayButton() : stopVideoLoop();
        if (currentVideo === 0) {
            moveSlideRight(getVideo(2));
            getBackgroundImage().style.left = "-100%";
            getFooter().classList.remove('banner-slide-out');
            getFooter().classList.add('banner-slide-in');
            getVideo(++currentVideo).style.left = "0%";
            isMobile ? null : playVideo(currentVideo);
            if (firstLoopCompleted) { unmuteVideos(); }
        } else if (currentVideo === 5) {
            moveSlideRight(getVideo(1));
            pauseVideo(currentVideo);
            reloadVideo(currentVideo);
            getVideo(currentVideo).style.left = "-100%";
            currentVideo = 0;
            getBackgroundImage().style.left = "0%";
            getFooter().classList.add('banner-slide-out');
            if (!firstLoopCompleted) { firstLoopCompleted = true }
        } else {
            if (currentVideo === 4) { moveSlideRight(getBackgroundImage())}
            if (currentVideo === 3) { moveSlideRight(getVideo(5))}
            if (currentVideo === 2) { moveSlideRight(getVideo(4))}
            if (currentVideo === 1) { moveSlideRight(getVideo(3))};
            reloadVideo(currentVideo);
            getVideo(currentVideo).style.left = "-100%";
            pauseVideo(currentVideo);
            getVideo(++currentVideo).style.left = "0%";
            isMobile ? null : playVideo(currentVideo);
        }
        if(videoAudio) { startSlowVideoLoop() }
});

document.getElementById("button-left").addEventListener("click", () => {
    isMobile ? displayPlayButton() : stopVideoLoop();
    if (currentVideo === 0) {
        getBackgroundImage().style.left = "100%";
        getFooter().classList.remove('banner-slide-out');
        getFooter().classList.add('banner-slide-in');
        currentVideo = 5
        getVideo(currentVideo).style.left = "0%";
        isMobile ? null : playVideo(currentVideo);
        moveSlideBack(getVideo(4));
        if (firstLoopCompleted) { unmuteVideos(); }
    } else if (currentVideo === 1) {
        pauseVideo(currentVideo);
        reloadVideo(currentVideo);
        getVideo(currentVideo).style.left = "100%";
        getBackgroundImage().style.left = "0%";
        getFooter().classList.remove('banner-slide-in');
        getFooter().classList.add('banner-slide-out');
        currentVideo = 0;
        moveSlideBack(getVideo(5));
        if (!firstLoopCompleted) { firstLoopCompleted = true }
    } else {
        if (currentVideo === 5) { moveSlideBack(getVideo(3)) }
        if (currentVideo === 4) { moveSlideBack(getVideo(2)) }
        if (currentVideo === 3) { moveSlideBack(getVideo(1)) }
        if (currentVideo === 2) { moveSlideBack(getBackgroundImage()) };
        pauseVideo(currentVideo);
        reloadVideo(currentVideo);
        getVideo(currentVideo).style.left = "100%";
        getVideo(--currentVideo).style.left = "0%";
        isMobile ? null : playVideo(currentVideo);
        if (firstLoopCompleted) { unmuteVideos(); }
    }
});

let unmuteVideos = () => {
            let videos = document.getElementsByClassName('button-speaker');
            for (let i = 0; i < videos.length; i++) {
                videos[i].style.display = 'none';
            };
            for (let i = 1; i <= document.querySelectorAll('video').length; i++) {
                document.getElementById("video" + i).muted = false;
                document.getElementById("video" + i).loop = false;
            };
            videoAudio = true;
            isMobile ? null : stopVideoLoop();
            isMobile ? null : startSlowVideoLoop();
        };

let muteVideos = document.querySelectorAll('.button-speaker');

for (let i = 0; i < muteVideos.length; i++) {
    muteVideos[i].addEventListener('click', () => unmuteVideos());
}

let startSlowVideoLoop = () => {

if (currentVideo !== 0) {
    let video = document.getElementById("video" + currentVideo);
    video.onended = function () {
        getVideo(currentVideo).style.left = "-100%";
        if (currentVideo < 5) {
            if (currentVideo === 4) { moveSlideRight(getBackgroundImage()) }
            if (currentVideo === 3) { moveSlideRight(getVideo(5)) }
            if (currentVideo === 2) { moveSlideRight(getVideo(4)) }
            if (currentVideo === 1) { moveSlideRight(getVideo(3)) }
            if (currentVideo === 0) { moveSlideRight(getVideo(2)) };
            ++currentVideo;
            getVideo(currentVideo).style.left = "0%";
            isMobile ? null : playVideo(currentVideo);
            document.getElementById("video" + currentVideo).loop = false;
            startSlowVideoLoop();
        } else if (currentVideo === 5) {
            currentVideo = 0;
            getBackgroundImage().style.left = "0%";
            getFooter().classList.remove('banner-slide-in');
            getFooter().classList.add('banner-slide-out');
            moveSlideRight(getVideo(1));
        }
      }
    };
};

document.getElementById("i-footer").addEventListener('click', () => {
        getBackgroundImage().style.left = "0%";
        getVideo(currentVideo).style.left = "100%";
        for (let i = 1; i < 5; i++) {
            moveSlideRight(getVideo(i));
        }
        moveSlideBack(getVideo(5));
        pauseVideo(currentVideo);
        reloadVideo(currentVideo);
        currentVideo = 0;
        getFooter().classList.remove('banner-slide-in');
        getFooter().classList.add('banner-slide-out');
    
});

/// MOBILE LOGIC  ///

let displayPlayButton = () => {
    let playIcon = document.getElementsByClassName("play-button");
    for (let i = 0; i < playIcon.length; i++) {
        playIcon[i].style.display = "block";
        isVideoPlaying = false;
    }
};

if (isMobile) {
    displayPlayButton();
    let videos = document.getElementsByTagName("video");
    let playIcon = document.getElementsByClassName("play-button");
    for (let i = 1; i <= videos.length; i++) {
        document.getElementById('video'+ i + '-container').addEventListener('click', ()=> {
            
            if (!isVideoPlaying) {
                playVideo(currentVideo);
                isVideoPlaying = true;
                playIcon[i-1].style.display = "none";
            } else {
                pauseVideo(currentVideo);
                isVideoPlaying = false;
                playIcon[i-1].style.display = "block";
            }
        });
    }
};

})();