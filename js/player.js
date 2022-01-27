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
        this.imageInstance.frames = 4
        this.imageInstance.framesIndex = 0
    }

    draw(framesIndex) {
      this.ctx.drawImage(this.imageInstance, this.imageInstance.framesIndex * (this.imageInstance.width / this.imageInstance.frames), 0,
      this.imageInstance.width / this.imageInstance.frames, this.imageInstance.height,
      this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
      this.animate(framesIndex)
      this.healthCounter()
    }
  
    animate(framesIndex) {
      if (framesIndex % 5 == 0) {this.imageInstance.framesIndex++}
      if (this.imageInstance.framesIndex >= this.imageInstance.frames) {
      this.imageInstance.framesIndex = 0}
    }
    
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