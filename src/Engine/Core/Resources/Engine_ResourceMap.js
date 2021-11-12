
"use strict";  
var gEngine = gEngine || { };


 
gEngine.ResourceMap = (function () {
    
    var MapEntry = function (rName) {
        this.mAsset = rName;
        this.mRefCount = 1;
    };

    // Number of outstanding load operations
    var mNumOutstandingLoads = 0;

    // Callback function when all textures are loaded
    var mLoadCompleteCallback = null;

    // Resource storage
    var mResourceMap = {};

    
    var asyncLoadRequested = function (rName) {
        mResourceMap[rName] = new MapEntry(rName); // place holder for the resource to be loaded
        ++mNumOutstandingLoads;
    };

     
    var asyncLoadCompleted = function (rName, loadedAsset) {
        if (!isAssetLoaded(rName)) {
            alert("gEngine.asyncLoadCompleted: [" + rName + "] not in map!");
        }
        mResourceMap[rName].mAsset = loadedAsset;
        --mNumOutstandingLoads;
        if(gEngine.LoadingIconConfig.isLevelSet()){
            gEngine.LoadingIconConfig.loadingUpdate();
        }
        _checkForAllLoadCompleted();
    };

    var _checkForAllLoadCompleted = function () {
        if ((mNumOutstandingLoads === 0) && (mLoadCompleteCallback !== null)) {
            var funToCall = mLoadCompleteCallback;
            mLoadCompleteCallback = null;
            funToCall();
        }
    };

    
    var setLoadCompleteCallback = function (funct) {
        mLoadCompleteCallback = funct;
        // in case all loading are done
        _checkForAllLoadCompleted();
    };

    var retrieveAsset = function (rName) {
        var r = null;
        if (rName in mResourceMap) {
            r = mResourceMap[rName].mAsset;
        } else {
            alert("gEngine.retrieveAsset: [" + rName + "] not in map!");
        }
        return r;
    };

     
    var isAssetLoaded = function (rName) {
        return (rName in mResourceMap);
    };

     
    var incAssetRefCount = function (rName) {
        mResourceMap[rName].mRefCount += 1;
    };

    
    var unloadAsset = function (rName) {
        var c = 0;
        if (rName in mResourceMap) {
            mResourceMap[rName].mRefCount -= 1;
            c = mResourceMap[rName].mRefCount;
            if (c === 0) {
                delete mResourceMap[rName];
            }
        }
        return c;
    };
    
    var getNumOutstandingLoads = function() {
        return mNumOutstandingLoads;
    };
     var mPublic = {

        asyncLoadRequested: asyncLoadRequested,
        asyncLoadCompleted: asyncLoadCompleted,
        setLoadCompleteCallback: setLoadCompleteCallback,
        retrieveAsset: retrieveAsset,
        unloadAsset: unloadAsset,
        isAssetLoaded: isAssetLoaded,
        incAssetRefCount: incAssetRefCount,
        getNumOutstandingLoads: getNumOutstandingLoads
    };
    return mPublic;
}());
