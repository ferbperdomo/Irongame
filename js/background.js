class Background {
    constructor(ctx, backgroundPosX, backgroundPosY, backgroundSizeW, backgroundSizeH) {
      this.ctx = ctx
      this.backgroundPos = { x: backgroundPosX, y: backgroundPosY }
      this.backgroundSize = { w: backgroundSizeW, h: backgroundSizeH }
      this.imageInstance = undefined
  
      this.init();
    }
  
    init() {
      this.imageInstance = new Image();
      this.imageInstance.src = 'img/background.png'
    }

    draw() {
      this.ctx.drawImage(
        this.imageInstance,
        this.backgroundPos.x,
        this.backgroundPos.y,
        this.backgroundSize.w,
        this.backgroundSize.h
      )
    }

}