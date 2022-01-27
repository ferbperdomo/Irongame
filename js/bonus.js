class Bonus {
    constructor(ctx, bonusPosX, bonusPosY, bonusSizeW, bonusSizeH) {
        this.ctx = ctx
        this.bonusPos = {x: bonusPosX, y:bonusPosY}
        this.bonusSize = {w: bonusSizeW, h: bonusSizeH}
        this.imageInstance = undefined
        
        this.init()
    }
    
    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = 'img/bonus.png'
        this.imageInstance.frames = 4
        this.imageInstance.framesIndex = 0
    }

    draw(framesIndex) {
        this.ctx.drawImage(this.imageInstance, this.imageInstance.framesIndex * (this.imageInstance.width / this.imageInstance.frames), 0,
            this.imageInstance.width / this.imageInstance.frames,
            this.imageInstance.height, this.bonusPos.x, this.bonusPos.y, (this.bonusSize.w = 50), (this.bonusSize.h = 50))
            this.animate(framesIndex)
        }
        animate(framesIndex) {
          if (framesIndex % 5 == 0) {
            this.imageInstance.framesIndex++
          }
          if (this.imageInstance.framesIndex >= this.imageInstance.frames) {
            this.imageInstance.framesIndex = 0
        }
    }
}