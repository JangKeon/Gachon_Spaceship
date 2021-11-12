function Smoke(xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset){
    ParticleSystem.call(this, "assets/ParticleSystem/smokeparticle.png", xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset, [.1,.1,.1,1], [.1,.1,.1,1], 1);
}

gEngine.Core.inheritPrototype(Smoke,ParticleSystem)



