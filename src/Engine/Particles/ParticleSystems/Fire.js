function Fire(xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset){
    ParticleSystem.call(this, "assets/ParticleSystem/flameparticle.png", xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset, [1,0,0,1], [3.5,.4,.3,.6], 1);
}

gEngine.Core.inheritPrototype(Fire,ParticleSystem);

