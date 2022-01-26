class Player {
    constructor(ctx, playerPosX, playerPosY, playerWidth, playerHeight, gameSizeW, gameSizeH) {
        this.ctx = ctx
        this.playerPos = {x: playerPosX, y: playerPosY}
        this.gameSize = {w: gameSizeW, h: gameSizeH}
        this.playerSize = {w: playerWidth, h: playerHeight}
        this.gameLimits =  {l: 90, r: 770, t: 50, b: 375},
        this.imageInstance = undefined
        this.playerHealth = 500

        
        this.init()
    }
    
    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = 'img/player.png'
    }

    draw() {
        this.healthCounter()
        this.ctx.drawImage(this.imageInstance, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
    }


    // Las condiciones se modificarán cuando tengamos el background final
    
    moveLeft() {
      if (this.playerPos.x > this.gameLimits.l) {
        this.playerPos.x -= 15
      } else {
        this.playerPos.x = this.gameLimits.l
      }
    }

    moveRight() {
        if (this.playerPos.x < this.gameLimits.r) {
          this.playerPos.x += 15
        } else {
          this.playerPos.x = this.gameLimits.r
        }
    }
    
    moveUp() {
        if (this.playerPos.y > this.gameLimits.t) {
          this.playerPos.y -= 15
        } else {
          this.playerPos.y = this.gameLimits.t
        }
    }
    
    moveDown() {
        if (this.playerPos.y < this.gameLimits.b) {
          this.playerPos.y += 15
        } else {
          this.playerPos.y = this.gameLimits.b
        }
    }
    
    healthCounter() {
      this.ctx.fillStyle = 'red'
      this.ctx.fillRect(50, 425, this.health === 0, this.health, 35)
    }
}