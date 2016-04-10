$(document).ready(function(){
    document.getElementById('textEditor').contentWindow.document.designMode="on";
    document.getElementById('textEditor').contentWindow.document.close();
    var edit = document.getElementById("textEditor").contentWindow;
    edit.focus();
    $("#bold").click(function(){
        if($(this).hasClass("selected")){
            $(this).removeClass("selected");

        }else{
            $(this).addClass("selected");
        }
        boldIt();
    });
    $("#italic").click(function(){
        if($(this).hasClass("selected")){
            $(this).removeClass("selected");
        }else{
            $(this).addClass("selected");
        }
        ItalicIt();
    });
    $("#fonts").on('change',function(){
        changeFont($("#fonts").val());
    });
    $("#link").click(function(){
        var urlp=prompt("What is the link:","http://");
        url(urlp);
    }); 
    $("#stext").click(function(){
        $("#text").hide();
        $("#textEditor").show();
        $("#controls").show()
    });
    $("#shtml").on('click',function(){
        $("#text").css("display","block");
        $("#textEditor").hide();
        $("#controls").hide();
    });
});
function boldIt(){
    var edit = document.getElementById("textEditor").contentWindow;
    edit.focus();
    edit.document.execCommand("bold", false, "");
    edit.focus();
}
function ItalicIt(){
    var edit = document.getElementById("textEditor").contentWindow;
    edit.focus();
    edit.document.execCommand("italic", false, "");
    edit.focus();
}
function changeFont(font){
    var edit = document.getElementById("textEditor").contentWindow;
    edit.focus();
    edit.document.execCommand("FontName", false, font);
    edit.focus();
}
function url(url){
    var edit = document.getElementById("textEditor").contentWindow;
    edit.focus();
    edit.document.execCommand("Createlink", false, url);
    edit.focus();
}
setInterval(function(){
    var gyt=$("#textEditor").contents().find("body").html().match(/@/g);
    if($("#textEditor").contents().find("body").html().match(/@/g)>=0){}else{
        $("#text").val($("#textEditor").contents().find("body").html());
    }
    $("#text").val($("#textEditor").contents().find("body").html());
},1000);