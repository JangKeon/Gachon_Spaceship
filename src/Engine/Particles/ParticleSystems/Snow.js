function Snow(xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset){
    ParticleSystem.call(this, "assets/ParticleSystem/snowparticle.png", xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset, [.1,.1,.1,1], [.1,.1,.1,1], -1);
    this.setSizeBase(1.5);
}

gEngine.Core.inheritPrototype(Snow,ParticleSystem);




