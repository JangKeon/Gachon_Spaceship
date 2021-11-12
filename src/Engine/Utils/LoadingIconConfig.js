var gEngine = gEngine || { };

gEngine.LoadingIconConfig = (function () {
    

    var levelLoadCount=0;
    

var setup = function(){
    var cwidth=document.getElementById("LoadingIconParent").style.width;
    var cheight=document.getElementById("LoadingIconParent").style.height;
    document.getElementById("GLCanvas").width=cwidth.substr(0,cwidth.length - 2);
    document.getElementById("GLCanvas").height=cheight.substr(0,cheight.length - 2);
    document.write("<div class='LoadingSpinnerAnimation' id='LoadingSpinner'></div>");
    document.write("<p class='LoadingDotsAnimation' id='LoadingDots'>Loading<span>.</span><span>.</span><span>.</span></p>");
    document.write("<div id='LoadingScreenProgress'><div id='LoadingScreenBar'>0%</div></div>");
};


var start = function(){
    document.getElementById("LoadingSpinner").style.display = "block";
    document.getElementById("LoadingDots").style.display="block";
    document.getElementById("LoadingScreenBar").style.display="block";
    document.getElementById("LoadingScreenProgress").style.display="block";
    gEngine.Core.clearCanvas([0,0,0,1]);
};

var stop = function(){
    levelLoadCount=0;
    document.getElementById("LoadingScreenBar").style.width="0%";
    document.getElementById("LoadingScreenBar").innerHTML = "0%";
    document.getElementById("LoadingSpinner").style.display="none";
    document.getElementById("LoadingDots").style.display="none";
    document.getElementById("LoadingScreenBar").style.display="none";
    document.getElementById("LoadingScreenProgress").style.display="none";
};


var loadingUpdate = function() {
    document.getElementById("LoadingScreenBar").style.width=Math.round(((levelLoadCount - gEngine.ResourceMap.getNumOutstandingLoads())/levelLoadCount)*100)-1+"%";
    document.getElementById("LoadingScreenBar").innerHTML = Math.round(((levelLoadCount - gEngine.ResourceMap.getNumOutstandingLoads())/levelLoadCount)*100)-1+"%";
};

var loadCountReset = function() {
        levelLoadCount = 0;
    };
    
    var isLevelSet = function() {
        return levelLoadCount!==0;
    };
    
    var getLevelLoadCount = function() {
        return levelLoadCount;
    };
    
    var loadCountSet = function() {
        levelLoadCount = gEngine.ResourceMap.getNumOutstandingLoads();
    };

var mPublic = {
        setup: setup,
        start: start,
        stop: stop,
        loadingUpdate: loadingUpdate,
        loadCountReset: loadCountReset,
        isLevelSet: isLevelSet,
        getLevelLoadCount: getLevelLoadCount,
        loadCountSet: loadCountSet
    };
    return mPublic;

}());