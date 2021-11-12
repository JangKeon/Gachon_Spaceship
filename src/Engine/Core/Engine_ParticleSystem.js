 "use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Static refrence to gEngine
 * @type gEngine
 */
var gEngine = gEngine || { };
    // initialize the variable while ensuring it is not redefined

 
gEngine.ParticleSystem = (function () {
    var mSystemtAcceleration = [0, -50.0];
    
    // the follows are scratch workspace for vec2
    var mFrom1to2 = [0, 0];
    var mCircleCollider = null; 
    
     
    var resolveCirclePos = function (circShape, particle) {
        var collided = false;
        var pos = particle.getPosition();
        var cPos = circShape.getCenter();
        vec2.subtract(mFrom1to2, pos, cPos);
        var dist = vec2.length(mFrom1to2);
        if (dist < circShape.getRadius()) {
            vec2.scale(mFrom1to2, mFrom1to2, 1/dist);
            vec2.scaleAndAdd(pos, cPos, mFrom1to2, circShape.getRadius());
            collided = true;
        }
        return collided;
    };
    
     
    var resolveRectPos = function (rectShape, xf) {
        if (mCircleCollider === null)
            mCircleCollider = new RigidCircle(null, 0.0);  // radius of 0.0 
        mCircleCollider.setTransform(xf);
        if (mCircleCollider.boundTest(rectShape)) {
            var rPInfo = new CollisionInfo();
            if (rectShape.collisionTest(mCircleCollider, rPInfo)) {
                // make sure info is always from rect towards particle
                vec2.subtract(mFrom1to2, mCircleCollider.getCenter(), rectShape.getCenter());
                if (vec2.dot(mFrom1to2, rPInfo.getNormal()) < 0)
                    mCircleCollider.adjustPositionBy(rPInfo.getNormal(), -rPInfo.getDepth());
                else
                    mCircleCollider.adjustPositionBy(rPInfo.getNormal(), rPInfo.getDepth());
            }
        }
    };
    
    
    var processObjSet = function(obj, pSet) {
        var s1 = obj.getRigidBody();  // a RigidShape
        var i, p;
        for (i=0; i<pSet.size(); i++) {
            var x = pSet.getObjectAt(i).getX();
            p = pSet.getObjectAt(i).getParticle();  // a Particle
            s1.resolveParticleCollision(p,x);
        }
    };
    
     
    var collideWithRigidSet = function(objSet, pSet) {
        var i;
        for (i=0; i<objSet.size(); i++) {
            processObjSet(objSet.getObjectAt(i), pSet);
        }
    };
    
     
    var getSystemtAcceleration = function() { return mSystemtAcceleration; };
    
     
    var setSystemtAcceleration = function(g) { mSystemtAcceleration = g; };
    
     
    var update = function(pSet){
        pSet.update();
    };
    
    var mPublic = {
        getSystemtAcceleration: getSystemtAcceleration,
        setSystemtAcceleration: setSystemtAcceleration,
        resolveCirclePos: resolveCirclePos,
        resolveRectPos: resolveRectPos,
        processObjSet: processObjSet,
        collideWithRigidSet: collideWithRigidSet,
        update: update
    };

    return mPublic;
}());
