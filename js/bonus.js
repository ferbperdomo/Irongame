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
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.bonusPos.x, this.bonusPos.y, this.bonusSize.w, this.bonusSize.h)
    }

}