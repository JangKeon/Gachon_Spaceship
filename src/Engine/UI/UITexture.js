function UITexture(myTexture, position, size) {
    this.mTex = new SpriteRenderable(myTexture);
    UIElement.call(this, this.mTex, position, size);
}
gEngine.Core.inheritPrototype(UITexture, UIElement);

