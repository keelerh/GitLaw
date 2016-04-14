// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
var car = {type:"Fiat", model:"500", color:"white"};




var pHight = Math.floor(document.getElementById("timeLine").clientHeight * .94);
var currentText = "";
var boxWidth = 400;
  
function centerBox() {
    
    /* Preliminary information */
    var winWidth = $(window).width();
    var winHeight = $(document).height();
    var scrollPos = $(window).scrollTop();
    /* auto scroll bug */
    
    /* Calculate positions */
    
    var disWidth = (winWidth - boxWidth) / 2
    var disHeight = scrollPos + 150;
    
    /* Move stuff about */
    $('.popup-box').css({'width' : boxWidth+'px', 'left' : disWidth+'px', 'top' : disHeight+'px'});
    // $('#blackout').css({'width' : winWidth+'px', 'height' : winHeight+'px'});
  
    return false;
}

$(window).resize(centerBox);
$(window).scroll(centerBox);
centerBox();  


/* Menu Bar Functions */


function commentMode() {
  document.getElementById("comment").style.visibility = "visible";
  document.getElementById("wrapper").style.opacity = ".25";
}

function addComment() {
  cancelComment();
}

function cancelComment() {
  document.getElementById("comment").style.visibility = "hidden";
  document.getElementById("wrapper").style.opacity = "1";
}

/* SHARE FUNCTIONS */
var shareMode = false;
function shareDoc() {
  document.getElementById("popup-share").style.visibility = "visible";
  document.getElementById("wrapper").style.opacity = ".25";
  shareMode = true;
}

$('#close-share').click(function () {
  cancelShare();
});

function confirmShare() {
  cancelShare();
}

function cancelShare() {
  var scrollPos = $(window).scrollTop();
  document.getElementById("popup-share").style.visibility = "hidden";
  document.getElementById("wrapper").style.opacity = "1";
  $("html,body").css("overflow","auto");
  $('html').scrollTop(scrollPos);
  shareMode = false;
}

/* DOWNLOAD FUNCTIONS */
function downloadDoc() {
  //TODO
}

/* UPLOAD FUNCTIONS */
function uploadDoc() {
  document.getElementById("upload").style.visibility = "visible";
  document.getElementById("wrapper").style.opacity = ".25";
}

function confirmUpload() {
  var fileInput = $('#files');
  var uploadButton = $('#upload');
  if (!window.FileReader) {
    alert('Your browser is not supported')
  }
  var input = fileInput.get(0);
    
  var reader = new FileReader();
  if (input.files.length) {
    var textFile = input.files[0];
    reader.readAsText(textFile);
    $(reader).on('load', processFile);
    newVersionFunc();
    cancelUpload();
  } else {
    alert('Please upload a file before continuing')
  }
}

function processFile(e) {
  var file = e.target.result,
    results;
    console.log(results);
  if (file && file.length) {
    document.getElementById("TText").innerHTML = results;
  }
}

$('#close-upload').click(function () {
  cancelUpload();
});

function cancelUpload() {
  document.getElementById("upload").style.visibility = "hidden";
  document.getElementById("wrapper").style.opacity = "1";
}

$(".timeline-item").hover(function () {
    $(".timeline-item").removeClass("active");
    $(this).toggleClass("active");
    $(this).prev(".timeline-item").toggleClass("close");
    $(this).next(".timeline-item").toggleClass("close");
});

$(".timeline-item").click(function () {
    $(".timeline-item").removeClass("active");
    $(this).toggleClass("active");
    $(this).prev(".timeline-item").toggleClass("close");
    $(this).next(".timeline-item").toggleClass("close");
});

tinymce.init({
  selector: 'textarea',
  height: pHight,
  statusbar: false,
  menubar: false,
  plugins: [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks fullscreen',
    'insertdatetime contextmenu paste code'
  ],
  toolbar: 'print | cut copy paste | insertfile undo redo | styleselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent',
  content_css: [
    '//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
    '//www.tinymce.com/css/codepen.min.css'
  ]
});


var lastElement = document.getElementById("5");

function newVersionFunc() {
      var timeLine = document.getElementById("timeLine");
      var newEvent = document.createElement('div');
      newEvent.onclick = function() {oldVersion()};
      newEvent.className = "timeline-item active";
      var pic = document.createElement('div');
      pic.innerHTML = "<img class='profile-pic' src='http://images.huffingtonpost.com/2016-03-07-1457372468-7442274-trump.jpg' /><span class='marker'><span class='dot'></span></span>"
      newEvent.appendChild(pic);
      var time = document.createElement('div');
      time.className = "timestamp";
      var am = "am";
      var today = new Date();
      var min = today.getMinutes();
      var hour = today.getHours();
      var dd = today.getDate();
      var mm = today.getMonth()+1;
      var yyyy = today.getFullYear();
      if(dd<10) {
          dd='0'+dd;
      } 
      
      if(mm<10) {
          mm='0'+mm;
      } 
      
      if (min<10) {
          min='0'+min;
      }
      if (hour>=12){
        am = "pm"
        if (hour > 12){
          hour = hour-12
        }
      }
      if (hour<10){
        hour = '0' +hour;
      }
      
      today = hour+':'+min+' '+am+" "+mm+'/'+dd+'/'+yyyy;
      time.innerHTML = today;
      newEvent.appendChild(time);
      timeLine.insertBefore(newEvent,lastElement);
      lastElement = newEvent;
}

function oldVersion() {
  alert("Sorry, this function is not implemented yet! However, clicking this would take you back to a previous version of the document.");
}