$(document).ready(function(){
  
  $("#grid").mousedown(function (e) {
       
        $("#big-ghost").remove();
        $(".ghost-select").addClass("ghost-active");
        $(".ghost-select").css({
            'left': e.pageX,
            'top': e.pageY
        });

        initialW = e.pageX;
        initialH = e.pageY;

        $(document).bind("mouseup", selectElements);
        $(document).bind("mousemove", openSelector);

    });
  
  
});

function selectElements(e) {
    $("#score>span").text('0');
    $(document).unbind("mousemove", openSelector);
    $(document).unbind("mouseup", selectElements);
    var maxX = 0;
    var minX = 5000;
    var maxY = 0;
    var minY = 5000;
    var totalElements = 0;
    var elementArr = new Array();
    $(".elements").each(function () {
        var aElem = $(".ghost-select");
        var bElem = $(this);
        var result = doObjectsCollide(aElem, bElem);

        console.log(result);
        if (result == true) {
          $("#score>span").text( Number($("#score>span").text())+1 );
          var aElemPos = bElem.offset();
                var bElemPos = bElem.offset();
                var aW = bElem.width();
                var aH = bElem.height();
                var bW = bElem.width();
                var bH = bElem.height();

                var coords = checkMaxMinPos(aElemPos, bElemPos, aW, aH, bW, bH, maxX, minX, maxY, minY);
                maxX = coords.maxX;
                minX = coords.minX;
                maxY = coords.maxY;
                minY = coords.minY;
                var parent = bElem.parent();

                //console.log(aElem, bElem,maxX, minX, maxY,minY);
                if (bElem.css("left") === "auto" && bElem.css("top") === "auto") {
                    bElem.css({
                        'left': parent.css('left'),
                        'top': parent.css('top')
                    });
                }
          $("body").append("<div id='big-ghost' class='big-ghost' x='" + Number(minX - 20) + "' y='" + Number(minY - 10) + "'></div>");

            $("#big-ghost").css({
                'width': maxX + 40 - minX,
                'height': maxY + 20 - minY,
                'top': minY - 10,
                'left': minX - 20
            });
          
          
        }
    });
    
    $(".ghost-select").removeClass("ghost-active");
    $(".ghost-select").width(0).height(0);

    ////////////////////////////////////////////////

}

function openSelector(e) {
    var w = Math.abs(initialW - e.pageX);
    var h = Math.abs(initialH - e.pageY);

    $(".ghost-select").css({
        'width': w,
        'height': h
    });
    if (e.pageX <= initialW && e.pageY >= initialH) {
        $(".ghost-select").css({
            'left': e.pageX
        });
    } else if (e.pageY <= initialH && e.pageX >= initialW) {
        $(".ghost-select").css({
            'top': e.pageY
        });
    } else if (e.pageY < initialH && e.pageX < initialW) {
        $(".ghost-select").css({
            'left': e.pageX,
            "top": e.pageY
        });
    }
}
  
  
function doObjectsCollide(a, b) { // a and b are your objects
    //console.log(a.offset().top,a.position().top, b.position().top, a.width(),a.height(), b.width(),b.height());
    var aTop = a.offset().top;
    var aLeft = a.offset().left;
    var bTop = b.offset().top;
    var bLeft = b.offset().left;

    return !(
        ((aTop + a.height()) < (bTop)) ||
        (aTop > (bTop + b.height())) ||
        ((aLeft + a.width()) < bLeft) ||
        (aLeft > (bLeft + b.width()))
    );
}  

function checkMaxMinPos(a, b, aW, aH, bW, bH, maxX, minX, maxY, minY) {
    'use strict';

    if (a.left < b.left) {
        if (a.left < minX) {
            minX = a.left;
        }
    } else {
        if (b.left < minX) {
            minX = b.left;
        }
    }

    if (a.left + aW > b.left + bW) {
        if (a.left > maxX) {
            maxX = a.left + aW;
        }
    } else {
        if (b.left + bW > maxX) {
            maxX = b.left + bW;
        }
    }
    ////////////////////////////////
    if (a.top < b.top) {
        if (a.top < minY) {
            minY = a.top;
        }
    } else {
        if (b.top < minY) {
            minY = b.top;
        }
    }

    if (a.top + aH > b.top + bH) {
        if (a.top > maxY) {
            maxY = a.top + aH;
        }
    } else {
        if (b.top + bH > maxY) {
            maxY = b.top + bH;
        }
    }

    return {
        'maxX': maxX,
        'minX': minX,
        'maxY': maxY,
        'minY': minY
    };
}
