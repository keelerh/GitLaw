// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.

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
  
    return false;
}

$(window).resize(centerBox);
$(window).scroll(centerBox);
centerBox();  


/* Menu Bar Functions */

/* share functions */
function shareDoc() {
  document.getElementById("share").style.visibility = "visible";
  document.getElementById("wrapper").style.opacity = ".25";
  $( "#name" ).focus();
}

$('#close-share').click(function () {
  cancelShare();
});

$('#share').keyup(function(event){
  if(event.keyCode == 13){
    confirmShare();
  }
});

var newCollaborators = ["<img class='img-circle' src='images/mitch.jpg' /> <p class='user'>",
                        "<img class='img-circle' src='images/robert.jpg' /> <p class='user'>",
                        "<img class='img-circle' src='images/leslie.jpg' /> <p class='user'>",
                        "<img class='img-circle' src='images/johnnie.jpg' /> <p class='user'>",
                        "<img class='img-circle' src='images/frank.jpg' /> <p class='user'>"]
var i = 0;

function confirmShare() {
  var name = document.getElementById('name');
  if (name.value == '') {
    alert("Please enter a name");
    return;
  }
  if (i < 5) {
    document.getElementById("share").style.visibility = "hidden";
    var list = document.getElementById('pictures');
    var entry = document.createElement('li');
    var circle = document.createElement('div');
    circle.className = 'imgWrap';
    circle.innerHTML = newCollaborators[i] + name.value + "</p>";
    entry.appendChild(circle);
    list.appendChild(entry);
    i++
  }
  cancelShare();
}

function cancelShare() {
  var scrollPos = $(window).scrollTop();
  document.getElementById("share").style.visibility = "hidden";
  document.getElementById("name").value = "";
  document.getElementById("wrapper").style.opacity = "1";
  $("html,body").css("overflow","auto");
  $('html').scrollTop(scrollPos);
}

/* comment functions */
function commentDoc() {
  document.getElementById("comment-box").style.visibility = "visible";
  $( "#comment-input" ).focus();
}

$('#close-comment').click(function () {
  cancelComment();
});

$('#comment-box-button').click(function () {
  cancelComment();
  document.getElementById('finished-comment').style.visibility = "visible";
  var finishedComment = document.getElementById('finished-comment');
  finishedComment.className = 'finished-comment';
  var commentPic = document.createElement('div');
  commentPic.innerHTML = "<img class='comment-img' src='images/jessica.jpg' />";
  var time = document.createElement('div');
  time.className = "comment-time";
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
  var text = document.createElement('div');
  var userInput = document.getElementById('comment-input');
  text.innerHTML = "<p>" + userInput.value.substring(0,15) + "..." + "</p>";
  text.className = 'finished-comment-text';
  finishedComment.appendChild(commentPic);
  finishedComment.appendChild(time);
  finishedComment.appendChild(text);
  editor.appendChild(finishedComment);
});

function cancelComment() {
  document.getElementById("comment-box").style.display = "none";
}

/* download function */
function downloadDoc() {
  console.debug(tinyMCE.activeEditor.getContent({format:'text'}));
}

/* upload functions */
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


/* Timeline Functions */
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
  selector: '#myTextArea',
  theme: 'modern',
  height: pHight,
  width:700,
  statusbar: false,
  menubar: false,
  plugins: [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks fullscreen',
    'insertdatetime contextmenu paste code'
  ],
  toolbar: 'print | cut copy paste | insertfile undo redo | styleselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist',
});


var lastElement = document.getElementById("5");
var numberToGive = 6;
function newVersionFunc() {
      var newNum = numberToGive
      lastElement.getElementsByClassName("dot")[0].setAttribute("style", "background-color: white");
      var timeLine = document.getElementById("timeLine");
      var newEvent = document.createElement('div');
      newEvent.onclick = function() {oldVersion(newNum)};
      newEvent.className = "timeline-item active";
      var pic = document.createElement('div');
      pic.innerHTML = "<img class='profile-pic' src='images/jessica.jpg' /><span class='marker'><span class='dot'></span></span>"
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
      numberToGive += 1;
}

function oldVersion(number) {
  if (onOriginal){
    OriginalText = tinyMCE.activeEditor.getContent();
    console.log(OriginalText);
  }
  tinyMCE.activeEditor.setContent(Versions[number]);
  onOriginal = false;
}

// for dragging the comment box
var dragObj;

function down(event) {
    if(~event.target.className.search(/drag/)) {
        dragObj = makeObj(event);
        dragObj.element.style.zIndex="100000000000";
        document.addEventListener("mousemove", freeMovement, false);
    }
}

function freeMovement(event) {
    //Prevents redundantly adding the same event handler repeatedly
    if (typeof(dragObj.element.mouseup) == "undefined")
        document.addEventListener("mouseup", drop, false);
    
    dragObj.element.style.left = Math.max(dragObj.minBoundX, Math.min(event.clientX - dragObj.posX, dragObj.maxBoundX)) + "px";
    dragObj.element.style.top = Math.max(dragObj.minBoundY, Math.min(event.clientY - dragObj.posY, dragObj.maxBoundY)) + "px";
}

function drop() {
    dragObj.element.style.zIndex="1";

    document.removeEventListener("mousemove", freeMovement, false);
    document.removeEventListener("mouseup", drop, false);
}

function makeBoundlessObj(e) {
    var obj = new Object();
    obj.element = e;

    obj.boundX = e.parentNode.offsetWidth - e.offsetWidth;
    obj.boundY = e.parentNode.offsetHeight - e.offsetHeight;

    obj.posX = event.clientX - e.offsetLeft;
    obj.posY = event.clientY - e.offsetTop;

    return obj;
}

function makeObj(event) {
    var obj = new Object(),
    e = event.target; // just make it shorter because we use it everywhere
    
    obj.element = e;

    // parentNode is our bounding box
    // the minimum boundary is based on the top left corner of our container
    obj.minBoundX = e.parentNode.offsetLeft;
    obj.minBoundY = e.parentNode.offsetTop;
    
    // the maximum is the bottom right corner of the container
    // or.. the top left (x,y) + the height and width (h,y) - the size of the square
    obj.maxBoundX = obj.minBoundX + e.parentNode.offsetWidth - e.offsetWidth;
    obj.maxBoundY = obj.minBoundY + e.parentNode.offsetHeight - e.offsetHeight;
    

    obj.posX = event.clientX - e.offsetLeft;
    obj.posY = event.clientY - e.offsetTop;
    
    setHelperBoxPos(obj);

    return obj;
}

function setHelperBoxPos(obj) {
    var minBox = document.getElementById('min');
    minBox.style.left = obj.minBoundX + 'px';
    minBox.style.top = obj.minBoundY + 'px';
    
    var maxBox = document.getElementById('max');
    maxBox.style.left = obj.maxBoundX + 'px';
    maxBox.style.top = obj.maxBoundY + 'px';
}

document.addEventListener("mousedown", down, false);

// for comments
// function relMouseCoords(event){
//     var totalOffsetX = 0;
//     var totalOffsetY = 0;
//     var canvasX = 0;
//     var canvasY = 0;
//     var currentElement = this;

//     do{
//         totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
//         totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
//     }
//     while(currentElement = currentElement.offsetParent)

//       console.log(event.pageX)
//     canvasX = event.pageX - totalOffsetX;
//     canvasY = event.pageY - totalOffsetY;
//     console.log(canvasY)

//     return {x:canvasX, y:canvasY}
// }



// Bellow This will be the previous documents and other stuff I am using Dont Mess With it Bro
var Versions = new Array();
//First Version:
Versions.push("<p><span style='background-color:#98ff98;'>John Smith, hereinafter referred to as Prospective Husband, and Sally Wilson, hereinafter referred to as Prospective Wife, hereby agree on this 3rd day of April, in the year 2016, as follows:</span></p><ol><li><span style='background-color:#98ff98;'>Prospective Husband and Prospective Wife contemplate marriage in the near future and wish to establish their respective rights and responsibilities regarding each other's income and property and the income and property that may be acquired, either separately or together, during the marriage.</span></li><li><span style='background-color:#98ff98;'>Prospective Husband and Prospective Wife have made a full and complete disclosure to each other of all of their financial assets and liabilities, as more fully set forth in the accompanying Financial Statements.</span></li><li><span style='background-color:#98ff98;'>Exhibits A and B. Except as otherwise provided below, Prospective Husband and Prospective Wife waive the following rights:</span><ol><li><span style='background-color:#98ff98;'>To share in each other's estates upon their death.</span></li><li><span style='background-color:#98ff98;'>To spousal maintenance, both temporary and permanent.</span></li><li><span style='background-color:#98ff98;'>To share in the increase in value during the marriage of the separate property of the parties.</span</li><li><span style='background-color:#98ff98;'>To share in the pension, profit sharing, or other retirement accounts of the other.</span></li><li><span style='background-color:#98ff98;'>To the division of the separate property of the parties, whether currently held or hereafter acquired.</span></li><li><span style='background-color:#98ff98;'>To any claims based on the period of cohabitation of the parties.</span></li></ol></li><li><span style='background-color:#98ff98;'>Both Prospective Husband and Prospective Wife are represented by separate and independent legal counsel of their own choosing.</span></li><li><span style='background-color:#98ff98;'>Both Prospective Husband and Prospective Wife have separate income and assets to independently provide for their own respective financial needs.</span></li><li><span style='background-color:#98ff98;'>This agreement constitutes the entire agreement of the parties and may be modified only in a writing executed by both Prospective Husband and Prospective Wife.</span></li><li><span style='background-color:#98ff98;'>In the event it is determined that a provision of this agreement is invalid because it is contrary to applicable law, that provision is deemed separable from the rest of the agreement, such that the remainder of the agreement remains valid and enforceable.</span></li><li><span style='background-color:#98ff98;'>This agreement is made in accordance with the laws of the state of Massachuseets, and any dispute regarding its enforcement will be resolved by reference to the laws of that state.</span></li><li><span style='background-color:#98ff98;'>This agreement will take effect immediately upon the solemnization of the parties' marriage.</span></li></ol><p><span style='background-color:#98ff98;'>&nbsp;</span></p><p><span style='background-color:#98ff98;'>I HAVE READ THE ABOVE AGREEMENT, I HAVE TAKEN TIME TO CONSIDER ITS IMPLICATIONS, I FULLY UNDERSTAND ITS CONTENTS, I AGREE TO ITS TERMS, AND I VOLUNTARILY SUBMIT TO ITS EXECUTION. John Smith Prospective Husband Sally Wilson Prospective Wife</span></p>");
//Second Version:
Versions.push("Hello World <span style='background-color:#98ff98;'> <br>The Quick Brown Fox Jumped Over The Lazy Dog <br>You Know the Quick Brown Fox That Jumped Over The Lazy Dog <br>Yes I Know Of His HE is Very Cool!<br></span>");
//Third Version:
Versions.push("Hello World <br> The Quick Brown Fox Jumped Over The Lazy Dog <br> <span style='background-color:#98ff98;'> You Know the Quick Brown Fox That Jumped Over The Lazy Dog <br> Yes I Know Of His HE is Very Cool!<br></span>");
//Fourth Version:
Versions.push("Hello World <br> The Quick Brown Fox Jumped Over The Lazy Dog <br> You Know the Quick Brown Fox That Jumped Over The Lazy Dog <br> <span style='background-color:#98ff98;'> Yes I Know Of His HE is Very Cool!<br></span>");
//Fifth Version:
Versions.push("Hello World <br> The Quick Brown Fox Jumped Over The Lazy Dog <br> You Know the Quick Brown Fox That Jumped Over The Lazy Dog <br>Yes I Know Of His <span style='background-color:#98ff98;'>HE is Very Cool!<br></span>");
//Sixth Version:
Versions.push("<p>John Smith, hereinafter referred to as Prospective Husband, and Sally Wilson, hereinafter referred to as Prospective Wife, hereby agree on this 3rd day of April, in the year 2016, as follows:</p><ol><li>Prospective Husband and Prospective Wife contemplate marriage in the near future and wish to establish their respective rights and responsibilities regarding each other's income and property and the income and property that may be acquired, either separately or together, during the marriage.</li><li>Prospective Husband and Prospective Wife have made a full and complete disclosure to each other of all of their financial assets and liabilities, as more fully set forth in the accompanying Financial Statements.</li><li>Exhibits A and B. Except as otherwise provided below, Prospective Husband and Prospective Wife waive the following rights:<ol><li>To share in each other's estates upon their death.</li><li>To spousal maintenance, both temporary and permanent.</li><li>To share in the increase in value during the marriage of the separate property of the parties.</li><li>To share in the pension, profit sharing, or other retirement accounts of the other.</li><li>To the division of the separate property of the parties, whether currently held or hereafter acquired.</li><li>To any claims based on the period of cohabitation of the parties.</li></ol></li><li>Both Prospective Husband and Prospective Wife are represented by separate and independent legal counsel of their own choosing.</li><li>Both Prospective Husband and Prospective Wife have separate income and assets to independently provide for their own respective financial needs.</li><li>This agreement constitutes the entire agreement of the parties and may be modified only in a writing executed by both Prospective Husband and Prospective Wife.</li><li>In the event it is determined that a provision of this agreement is invalid because it is contrary to applicable law, that provision is deemed separable from the rest of the agreement, such that the remainder of the agreement remains valid and enforceable.</li><li>This agreement is made in accordance with the laws of the state of Massachuseets, and any dispute regarding its enforcement will be resolved by reference to the laws of that state.</li><li>This agreement will take effect immediately upon the solemnization of the parties' marriage.</li></ol><p>&nbsp;</p><p>I HAVE READ THE ABOVE AGREEMENT, I HAVE TAKEN TIME TO CONSIDER ITS IMPLICATIONS, I FULLY UNDERSTAND ITS CONTENTS, I AGREE TO ITS TERMS, AND I VOLUNTARILY SUBMIT TO ITS EXECUTION. John Smith Prospective Husband Sally Wilson Prospective Wife</p>");
var OriginalText = null;
var onOriginal = true;
