var pHight = Math.floor(document.getElementById("timeLine").clientHeight);
var currentText = "";
var boxWidth = 400;
var oldMarker = null;
  
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
  document.getElementById("share").style.visibility = "hidden";
  document.getElementById("name").value = "";
  document.getElementById("wrapper").style.opacity = "1";
}

/* comment functions */
var j = 0;
function commentDoc() {
  var boundingBox = document.getElementById("bounding-box");

  var newComment = document.createElement('div');
  newComment.className = "comment-box";
  newComment.setAttribute('id', 'comment-box-' + j);
  
  var closeComment = document.createElement('div');
  closeComment.className = 'close-comment';
  closeComment.setAttribute('id', 'close-comment-' + j);
  closeComment.innerHTML = 'X';
  
  var box = document.createElement('div');

  var jessicaPic = document.createElement('div');
  jessicaPic.innerHTML = "<img class='comment-img' src='images/jessica.jpg'/>";

  var commentInput = document.createElement('input');
  commentInput.className = "comment-input";
  commentInput.idName = "comment-input";
  commentInput.setAttribute('type', 'text');
  commentInput.setAttribute('size', '55');
  
  var commentBoxButton = document.createElement('div');
  commentBoxButton.className = 'comment-box-button';
  commentBoxButton.setAttribute('id', 'comment-box-button');
  commentBoxButton.innerHTML = "<div id='comment-text'>Comment</div>";

  box.appendChild(jessicaPic);
  box.appendChild(closeComment);
  box.appendChild(commentInput);
  box.appendChild(commentBoxButton);
  newComment.appendChild(box);
  boundingBox.appendChild(newComment);

  $( newComment ).draggable({ containment: '#bounding-box',
                              scroll: false,
                              axis: "y"});
  $( commentInput ).focus();

  // add script to cancel and close comment input box
  var close = document.getElementById('close-comment-' + j);
  if (close.addEventListener)
      close.addEventListener("click", cancelComment, false);
  else if (close.attachEvent)
      close.attachEvent('onclick', cancelComment);
  
  // after clicking comment the condensed version
  $( commentBoxButton ).click(function () {

    // x.top, x.right, x.bottom, x.left
    var x = newComment.getBoundingClientRect();
    var x_pos = x.left;
    var y_pos = x.top;

    newComment.parentNode.removeChild(newComment);
  
    var boundingBox = document.getElementById("bounding-box");
  
    var finishedComment = document.createElement('div');
    finishedComment.className = 'finished-comment';
    finishedComment.setAttribute('id', 'finished-comment' + j);
    finishedComment.style.position = "absolute";
    finishedComment.style.left = x_pos+'px';
    finishedComment.style.top = y_pos+'px';
  
    var jessicaPic = document.createElement('div');
    jessicaPic.innerHTML = "<img class='comment-img' src='images/jessica.jpg'/>";
  
    var time = document.createElement('div');
    time.className = "finished-comment-time";
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
    var fullText = document.createElement('div');
    fullText.innerHTML = commentInput.value;
    if (commentInput.value.length > 15) {
      text.innerHTML = "<p>" + commentInput.value.substring(0,15) + "..." + "</p>";
    } else {
      text.innerHTML = "<p>" + commentInput.value + "</p>";
    }
    text.className = 'finished-comment-text';
    text.setAttribute('id', commentInput.value);
  
    finishedComment.appendChild(jessicaPic);
    finishedComment.appendChild(time);
    finishedComment.appendChild(text);
    boundingBox.appendChild(finishedComment);

    // add script to expand out a condensed comment
    var condensedComment = document.getElementById('text');
    if (text.addEventListener)
        text.addEventListener("click", expandComment, false);
    else if (text.attachEvent)
        text.attachEvent('onclick', expandComment);

  });

  j++;

}

function expandComment() {
  var commentText = this.childNodes[0].innerHTML;
  var fullText = this.id;
  var lines = fullText.match(/(.{1,15})/g);
  var numNewLines = lines.length - 1;
  if (numNewLines > 0) {
    var height = $ ('.finished-comment').height()
    var newHeight = height + (10 * numNewLines);
    this.innerHTML = fullText;
    this.style.height = newHeight + 'px';
    this.style.backgroundColor='red';
  }
}

function cancelComment() {
  var commentID = this.id.split('-').pop();
  var commentToDelete = document.getElementById("comment-box-" + commentID);
  commentToDelete.parentNode.removeChild(commentToDelete);
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

/* publish functions */
function Publish() {
  document.getElementById("publish").style.visibility = "visible";
  document.getElementById("wrapper").style.opacity = ".25";
  $( "#versionNote" ).focus();
}


function cancelPublish() {
  document.getElementById("publish").style.visibility = "hidden";
  document.getElementById("wrapper").style.opacity = "1";
  document.getElementById("versionNote").value = "";
}

$('#close-publish').click(function () {
  cancelPublish();
});

$('#publish').keyup(function(event){
  if(event.keyCode == 13){
    pushVersion();
  }
});

function pushVersion() {
  var message = document.getElementById('versionNote');
  if (message.value == '') {
    alert("Please enter a message for your collaborators");
    return;
  }
  if (message.value.length < 60){
    newVersionFunc(message.value);
  }
  else{
    var sub = message.value.substring(0, 57);
    newVersionFunc(sub + "...");
  }
  
  cancelPublish();
}


/* Timeline Functions */
tinymce.init({
  mode : "exact",
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
  toolbar1: 'undo redo | copy paste | styleselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent',
  image_advtab: true,
  });


var lastElement = document.getElementById("5");
var numberToGive = 6;
function newVersionFunc(passedText) {

      //push current textEditor text into Versions stack
      Versions.push(tinyMCE.activeEditor.getContent());

      //grab the timeline
      var timeLine = document.getElementById("timeLine");

      //start the new element block in the timeline that things will be added to
      var newEvent = document.createElement('div');
      var newNum = numberToGive;
      newEvent.id = newNum;
      newEvent.onclick = function() {oldVersion(newNum)};
      newEvent.className = "timeline-item";


      //This Bit Makes the flipper
      var flipContainer = document.createElement('div');
      flipContainer.className = "flip-container";
      var flipper = document.createElement('div');
      flipper.className = "flipper";
      var front = document.createElement('div');
      front.className = "front";
      front.innerHTML = "<img class='profile-pic' src='images/jessica.jpg'/>";
      var back = document.createElement('div');
      back.className = "back";
      back.innerHTML = "<p>" + passedText + "</p>";
      flipper.appendChild(front);
      flipper.appendChild(back);
      flipContainer.appendChild(flipper);
      newEvent.appendChild(flipContainer);


      //This Bit Makes the Marker And Dot
      var marker = document.createElement('span');
      marker.className = "marker";
      var dot = document.createElement('span');
      dot.className = "dot";
      marker.appendChild(dot)
      newEvent.appendChild(marker);

      //This bit makes the time stamp
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

      //let the next event know where in the stack he will be
      numberToGive += 1;
}


function goBack(){
  console.log("ITried");
  onOriginal = true;
  tinyMCE.activeEditor.setContent(OriginalText);
  oldMarker.style.backgroundColor = "white";
  oldMarker = null;
  var title = document.getElementById("timeline-title");
  title.style.visibility = "visible";
  var goBack = document.getElementById("goBack");
  goBack.style.visibility = "hidden";
}

function oldVersion(number) {
  if (onOriginal){
    console.log("ok");
    var title = document.getElementById("timeline-title");
    title.style.visibility = "hidden";
    var goBack = document.getElementById("goBack");
    goBack.style.visibility = "visible";
  }
  


  //This handles the marker
  var marker = document.getElementById(number).getElementsByClassName("marker")[0];
  if (oldMarker) {
    oldMarker.style.backgroundColor = "white";
  }
  marker.style.backgroundColor = "#6EBFAB";
  oldMarker = marker;

  //This removes the last seen tag
  if (number == 3){
    lastSeen = document.getElementById("last");
    lastSeen.innerHTML = "";
  }

  //this changes the text and holds Original Text
  if (onOriginal){
    OriginalText = tinyMCE.activeEditor.getContent();
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


setInterval(function makeAutoSaveText(){
  showAutoSaveText();
  setTimeout(hideAutoSaveText, 3000);
}, 12000);

function showAutoSaveText(){
  document.getElementById('autosave').style.opacity=1;
}

function hideAutoSaveText(){
  document.getElementById('autosave').style.opacity=0;
}





var Versions = new Array();
//First Version:
Versions.push("<p><span style='background-color: #98ff98;'>John Smith, hereinafter referred to as Prospective Husband, and Sally Wilson, hereinafter referred to as Prospective Wife, hereby agree on this 3rd day of April, in the year 2016, as follows:</span></p><ol><li><span style='background-color: #98ff98;'>Prospective Husband and Prospective Wife contemplate marriage in the near future and wish to establish their respective rights and responsibilities regarding each other's income and property and the income and property that may be acquired, either separately or together, during the marriage.</span></li><li><span style='background-color: #98ff98;'>Prospective Husband and Prospective Wife have made a full and complete disclosure to each other of all of their financial assets and liabilities, as more fully set forth in the accompanying Financial Statements.</span></li><li><span style='background-color: #98ff98;'>Exhibits A and B. Except as otherwise provided below, Prospective Husband and Prospective Wife waive the following rights:</span><ol><li><span style='background-color: #98ff98;'>To share in each other's estates upon their death.</span></li><li><span style='background-color: #98ff98;'>To spousal maintenance, both temporary and permanent.</span></li><li><span style='background-color: #98ff98;'>To share in the increase in value during the marriage of the separate property of the parties.</span></li><li><span style='background-color: #98ff98;'>To share in the pension, profit sharing, or other retirement accounts of the other.</span></li><li><span style='background-color: #98ff98;'>To the division of the separate property of the parties, whether currently held or hereafter acquired.</span></li><li><span style='background-color: #98ff98;'>To any claims based on the period of cohabitation of the parties.</span></li></ol></li><li><span style='background-color: #98ff98;'>Both Prospective Husband and Prospective Wife are represented by separate and independent legal counsel of their own choosing.</span></li><li><span style='background-color: #98ff98;'>Both Prospective Husband and Prospective Wife have separate income and assets to independently provide for their own respective financial needs.</span></li><li><span style='background-color: #98ff98;'>This agreement constitutes the entire agreement of the parties and may be modified only in a writing executed by both Prospective Husband and Prospective Wife.</span></li><li><span style='background-color: #98ff98;'>In the event it is determined that a provision of this agreement is invalid because it is contrary to applicable law, that provision is deemed separable from the rest of the agreement, such that the remainder of the agreement remains valid and enforceable.</span></li><li><span style='background-color: #98ff98;'>This agreement is made in accordance with the laws of the state of Massachuseets, and any dispute regarding its enforcement will be resolved by reference to the laws of that state.</span></li><li><span style='background-color: #98ff98;'>This agreement will take effect immediately upon the solemnization of the parties' marriage.</span></li></ol><p>&nbsp;</p><p><span style='background-color: #98ff98;'>I HAVE READ THE ABOVE AGREEMENT, I HAVE TAKEN TIME TO CONSIDER ITS IMPLICATIONS, I FULLY UNDERSTAND ITS CONTENTS, I AGREE TO ITS TERMS, AND I VOLUNTARILY SUBMIT TO ITS EXECUTION. John Smith Prospective Husband Sally Wilson Prospective Wife</span></p>");
//Second Version:
Versions.push("<p><span style='background-color: #ffffff;'><span style='background-color: #98ff98;'>John Smith, hereinafter referred to as Prospective Husband, and Sally Wilson, hereinafter referred to as Prospective Wife,</span> <span style='background-color: #ff6161;'>John Smith and Sally Wilson</span> hereby agree on this 3rd day of April, in the year 2016, as follows:</span></p><ol><li><span style='background-color: #98ff98;'><span style='background-color: #ffffff;'><span style='background-color: #ff6161;'>John Smith and Sally Wilson want to get married soon; however, they want to establish whos stuff is whos</span>&nbsp;<span style='background-color: #98ff98;'>Prospe</span></span>ctive Husband and Prospective Wife contemplate marriage in the near future and wish to establish their respective rieghts and responsibilities regarding each other's income and property and the income and property that may be acquired, either separately or together, during the marriage.</span></li><li><span style='background-color: #ffffff;'>Prospective Husband and Prospective Wife have made a full and complete disclosure to each other of all of their financial assets and liabilities, as more fully set forth in the accompanying Financial Statements.</span></li><li><span style='background-color: #ffffff;'>Exhibits A and B. Except as otherwise provided below, Prospective Husband and Prospective Wife waive the following rights:</span>&nbsp;<ol><li><span style='background-color: #ffffff;'>To share in each other's estates upon their death.</span></li><li><span style='background-color: #ffffff;'>To spousal maintenance, both temporary and permanent.</span></li><li><span style='background-color: #ffffff;'>To share in the increase in value during the marriage of the separate property of the parties.</span></li><li><span style='background-color: #98ff98;'>To share in the pension, profit sharing, or other retirement accounts of the other.</span></li><li><span style='background-color: #98ff98;'>To the division of the separate property of the parties, whether currently held or hereafter acquired.</span></li><li><span style='background-color: #98ff98;'>To any claims based on the period of cohabitation of the parties.</span></li></ol></li><li><span style='background-color: #ff6161;'>The Children of the parties will be raised Catholic</span></li><li><span style='background-color: #ffffff;'>Both Prospective Husband and Prospective Wife are represented by separate and independent legal counsel of their own choosing.</span></li><li><span style='background-color: #ffffff;'>Both Prospective Husband and Prospective Wife have separate income and assets to independently provide for their own respective financial needs.</span></li><li><span style='background-color: #98ff98;'>This agreement constitutes the entire agreement of the parties and may be modified only in a writing executed by both Prospective Husband and Prospective Wife.</span></li><li><span style='background-color: #98ff98;'>In the event it is determined that a provision of this agreement is invalid because it is contrary to applicable law, that provision is deemed separable from the rest of the agreement, such that the remainder of the agreement remains valid and enforceable.</span></li><li><span style='background-color: #98ff98;'>This agreement is made in accordance with the laws of the state of Massachuseets, and any dispute regarding its enforcement will be resolved by reference to the laws of that state.</span></li><li><span style='background-color: #98ff98;'>This agreement will take effect immediately upon the solemnization of the parties' marriage.</span></li></ol><p><span style='background-color: #ffffff;'>&nbsp;</span></p><p><span style='background-color: #98ff98;'>I HAVE READ THE ABOVE AGREEMENT, I HAVE TAKEN TIME TO CONSIDER ITS IMPLICATIONS, I FULLY UNDERSTAND ITS CONTENTS, I AGREE TO ITS TERMS, AND I VOLUNTARILY SUBMIT TO ITS EXECUTION. John Smith Prospective Husband Sally Wilson Prospective Wife</span></p>");
//Third Version:
Versions.push("<p><span style='background-color: #ffffff;'><span style='background-color: #98ff98;'>John Smith, hereinafter referred to as Prospective Husband, and Sally Wilson, hereinafter referred to as Prospective Wife,</span> hereby agree on this 3rd day of April, in the year 2016, as follows:</span></p><ol><li><span style='background-color: #98ff98;'><span style='background-color: #ffffff;'><span style='background-color: #98ff98;'>Prospe</span></span>ctive Husband and Prospective Wife contemplate marriage in the near future and wish to establish their respective rieghts and responsibilities regarding each other's income and property and the income and property that may be acquired, either separately or together, during the marriage.</span></li><li><span style='background-color: #ffffff;'>Prospective Husband and Prospective Wife have made a full and complete disclosure to each other of all of their financial assets and liabilities, as more fully set forth in the accompanying Financial Statements.</span></li><li><span style='background-color: #ffffff;'>Exhibits A and B. Except as otherwise provided below, Prospective Husband and Prospective Wife waive the following rights:</span>&nbsp;<ol><li><span style='background-color: #ffffff;'>To share in each other's estates upon their death.</span></li><li><span style='background-color: #ffffff;'>To spousal maintenance, both temporary and permanent.</span></li><li><span style='background-color: #ffffff;'>To share in the increase in value during the marriage of the separate property of the parties.</span></li><li><span style='background-color: #98ff98;'>To share in the pension, profit sharing, or other retirement accounts of the other.</span></li><li><span style='background-color: #ff6161;'>To share all stock market investments.</span></li><li><span style='background-color: #98ff98;'>To the division of the separate property of the parties, whether currently held or hereafter acquired.</span></li><li><span style='background-color: #ffffff;'>To any claims based on the period of cohabitation of the parties.</span></li></ol></li><li><span style='background-color: #ff6161;'>The Children of the parties will be raised Catholic</span></li><li><span style='background-color: #ffffff;'>Both Prospective Husband and Prospective Wife are represented by separate and independent legal counsel of their own choosing.</span></li><li><span style='background-color: #ffffff;'>Both Prospective Husband and Prospective Wife have separate income and assets to independently provide for their own respective financial needs.</span></li><li><span style='background-color: #ffffff;'>This agreement constitutes the entire agreement of the parties and may be modified only in a writing executed by both Prospective Husband and Prospective Wife.</span></li><li><span style='background-color: #ffffff;'>In the event it is determined that a provision of this agreement is invalid because it is contrary to applicable law, that provision is deemed separable from the rest of the agreement, such that the remainder of the agreement remains valid and enforceable.</span></li><li><span style='background-color: #98ff98;'>This agreement is made in accordance with the laws of the state of Massachuseets, and any dispute regarding its enforcement will be resolved by reference to the laws of that state.</span></li><li><span style='background-color: #98ff98;'>This agreement will take effect immediately upon the solemnization of the parties' marriage.</span></li></ol><p><span style='background-color: #ffffff;'>&nbsp;</span></p><p><span style='background-color: #ffffff;'>I HAVE READ THE ABOVE AGREEMENT, I HAVE TAKEN TIME TO CONSIDER ITS IMPLICATIONS, I FULLY UNDERSTAND ITS CONTENTS, I AGREE TO ITS TERMS, AND I VOLUNTARILY SUBMIT TO ITS EXECUTION. John Smith Prospective Husband Sally Wilson Prospective Wife</span></p>");
//Fourth Version:
Versions.push("<p><span style='background-color: #ffffff;'>John Smith, hereinafter referred to as Prospective Husband, and Sally Wilson, hereinafter referred to as Prospective Wife, hereby agree on this 3rd day of April, in the year 2016, <span style='background-color: #ff6161;'>and forever after,</span> as follows:</span></p><ol><li><span style='background-color: #98ff98;'><span style='background-color: #ffffff;'><span style='background-color: #98ff98;'>Prospe</span></span>ctive Husband and Prospective Wife contemplate marriage in the near future and wish to establish their respective ri<span style='background-color: #ff6161;'>e</span>ghts <span style='background-color: #ff6161;'> and beliefs,</span>&nbsp;and responsibilities regarding each other's income and property and the income and property that may be acquired, either separately or together, during the marriage.</span></li><li><span style='background-color: #ffffff;'>Prospective Husband and Prospective Wife have made a full and complete disclosure to each other of all of their financial assets and liabilities, as more fully set forth in the accompanying Financial Statements.</span></li><li><span style='background-color: #ffffff;'>Exhibits A and B. Except as otherwise provided below, Prospective Husband and Prospective Wife waive the following rights:</span>&nbsp;<ol><li><span style='background-color: #ffffff;'>To share in each other's estates upon their death.</span></li><li><span style='background-color: #ffffff;'>To spousal maintenance, both temporary and permanent.</span></li><li><span style='background-color: #ffffff;'>To share in the increase in value during the marriage of the separate property of the parties.</span></li><li><span style='background-color: #98ff98;'>To share in the pension, profit sharing, or other retirement accounts of the other.</span></li><li><span style='background-color: #98ff98;'>To the division of the separate property of the parties, whether currently held or hereafter acquired.</span></li><li><span style='background-color: #ffffff;'>To any claims based on the period of cohabitation of the parties.</span></li></ol></li><li><span style='background-color: #ffffff;'>Both Prospective Husband and Prospective Wife are represented by separate and independent legal counsel of their own choosing.</span></li><li><span style='background-color: #ffffff;'>Both Prospective Husband and Prospective Wife have separate income and assets to independently provide for their own respective financial needs.</span></li><li><span style='background-color: #ffffff;'>This agreement constitutes the entire agreement of the parties and may be modified only in a writing executed by both Prospective Husband and Prospective Wife.</span></li><li><span style='background-color: #ffffff;'>In the event it is determined that a provision of this agreement is invalid because it is contrary to applicable law, that provision is deemed separable from the rest of the agreement, such that the remainder of the agreement remains valid and enforceable.</span></li><li><span style='background-color: #ffffff;'>This agreement is made in accordance with the laws of the state of Massachuseets, and any dispute regarding its enforcement will be resolved by reference to the laws of that state.</span></li><li><span style='background-color: #ffffff;'>This agreement will take effect immediately upon the solemnization of the parties' marriage.</span></li></ol><p><span style='background-color: #ffffff;'>&nbsp;</span></p><p><span style='background-color: #ffffff;'>I HAVE READ THE ABOVE AGREEMENT, I HAVE TAKEN TIME TO CONSIDER ITS IMPLICATIONS, I FULLY UNDERSTAND ITS CONTENTS, I AGREE TO ITS TERMS, AND I VOLUNTARILY SUBMIT TO ITS EXECUTION. John Smith Prospective Husband Sally Wilson Prospective Wife</span></p>");
//Fifth Version:
Versions.push("<p><span style='background-color: #ffffff;'>John Smith, hereinafter referred to as Prospective Husband, and Sally Wilson, hereinafter referred to as Prospective Wife, hereby agree on this 3rd day of April, in the year 2016,&nbsp;as follows:</span></p><ol><li><span style='background-color: #ffffff;'>Prospective Husband and Prospective Wife contemplate marriage in the near future and wish to establish their respective rights and responsibilities regarding each other's income and property and the income and property that may be acquired, either separately or together, during the marriage.</span></li><li><span style='background-color: #ffffff;'>Prospective Husband and Prospective Wife have made a full and complete disclosure to each other of all of their financial assets and liabilities, as more fully set forth in the accompanying Financial Statements.</span></li><li><span style='background-color: #ffffff;'>Exhibits A and B. Except as otherwise provided below, Prospective Husband and Prospective Wife waive the following rights:</span>&nbsp;<ol><li><span style='background-color: #ffffff;'>To share in each other's estates upon their death.</span></li><li><span style='background-color: #ffffff;'>To spousal maintenance, both temporary and permanent.</span></li><li><span style='background-color: #ffffff;'>To share in the increase in value during the marriage of the separate property of the parties.</span></li><li><span style='background-color: #98ff98;'>To share in the pension, profit sharing, or other retirement accounts of the other.</span></li><li><span style='background-color: #98ff98;'>To the division of the separate property of the parties, whether currently held or hereafter acquired.</span></li><li><span style='background-color: #ffffff;'>To any claims based on the period of cohabitation of the parties.</span></li></ol></li><li><span style='background-color: #ffffff;'>Both Prospective Husband and Prospective Wife are represented by separate and independent legal counsel of their own choosing.</span></li><li><span style='background-color: #ffffff;'>Both Prospective Husband and Prospective Wife have separate income and assets to independently provide for their own respective financial needs.</span></li><li><span style='background-color: #ffffff;'>This agreement constitutes the entire agreement of the parties and may be modified only in a writing executed by both Prospective Husband and Prospective Wife.</span></li><li><span style='background-color: #ffffff;'>In the event it is determined that a provision of this agreement is invalid because it is contrary to applicable law, that provision is deemed separable from the rest of the agreement, such that the remainder of the agreement remains valid and enforceable.</span></li><li><span style='background-color: #ffffff;'>This agreement is made in accordance with the laws of the state of Massachuseets, and any dispute regarding its enforcement will be resolved by reference to the laws of that state.</span></li><li><span style='background-color: #ffffff;'>This agreement will take effect immediately upon the solemnization of the parties' marriage.</span></li></ol><p><span style='background-color: #ffffff;'>&nbsp;</span></p><p><span style='background-color: #ffffff;'>I HAVE READ THE ABOVE AGREEMENT, I HAVE TAKEN TIME TO CONSIDER ITS IMPLICATIONS, I FULLY UNDERSTAND ITS CONTENTS, I AGREE TO ITS TERMS, AND I VOLUNTARILY SUBMIT TO ITS EXECUTION. John Smith Prospective Husband Sally Wilson Prospective Wife</span></p>");
//Sixth Version:
Versions.push("<p>John Smith, hereinafter referred to as Prospective Husband, and Sally Wilson, hereinafter referred to as Prospective Wife, hereby agree on this 3rd day of April, in the year 2016, as follows:</p><ol><li>Prospective Husband and Prospective Wife contemplate marriage in the near future and wish to establish their respective rights and responsibilities regarding each other's income and property and the income and property that may be acquired, either separately or together, during the marriage.</li><li>Prospective Husband and Prospective Wife have made a full and complete disclosure to each other of all of their financial assets and liabilities, as more fully set forth in the accompanying Financial Statements.</li><li>Exhibits A and B. Except as otherwise provided below, Prospective Husband and Prospective Wife waive the following rights:<ol><li>To share in each other's estates upon their death.</li><li>To spousal maintenance, both temporary and permanent.</li><li>To share in the increase in value during the marriage of the separate property of the parties.</li><li>To share in the pension, profit sharing, or other retirement accounts of the other.</li><li>To the division of the separate property of the parties, whether currently held or hereafter acquired.</li><li>To any claims based on the period of cohabitation of the parties.</li></ol></li><li>Both Prospective Husband and Prospective Wife are represented by separate and independent legal counsel of their own choosing.</li><li>Both Prospective Husband and Prospective Wife have separate income and assets to independently provide for their own respective financial needs.</li><li>This agreement constitutes the entire agreement of the parties and may be modified only in a writing executed by both Prospective Husband and Prospective Wife.</li><li>In the event it is determined that a provision of this agreement is invalid because it is contrary to applicable law, that provision is deemed separable from the rest of the agreement, such that the remainder of the agreement remains valid and enforceable.</li><li>This agreement is made in accordance with the laws of the state of Massachuseets, and any dispute regarding its enforcement will be resolved by reference to the laws of that state.</li><li>This agreement will take effect immediately upon the solemnization of the parties' marriage.</li></ol><p>&nbsp;</p><p>I HAVE READ THE ABOVE AGREEMENT, I HAVE TAKEN TIME TO CONSIDER ITS IMPLICATIONS, I FULLY UNDERSTAND ITS CONTENTS, I AGREE TO ITS TERMS, AND I VOLUNTARILY SUBMIT TO ITS EXECUTION. John Smith Prospective Husband Sally Wilson Prospective Wife</p>");
var OriginalText = null;
var onOriginal = true;



//This will Run If Document Resizes So that Text Editor Will be correct height
$(window).resize(larg);


function larg(){
  tinymce.activeEditor.theme.resizeTo(700,Math.floor(document.getElementById("timeLine").clientHeight));
}




