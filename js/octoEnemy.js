class OctoEnemy {
    constructor(ctx, octoEnemyX, octoEnemyY, octoEnemyWidth, octoEnemyHeight, gameLimits) {
        this.ctx = ctx
        this.octoEnemyPos = {x: octoEnemyX, y: octoEnemyY}
        this.octoEnemySize = {w: octoEnemyWidth, h: octoEnemyHeight}
        this.gameLimits =  gameLimits
        this.speed = 3
        this.imageInstance = undefined
        
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = 'img/octoEnemy.png'
        this.imageInstance.frames = 7
        this.imageInstance.framesIndex = 0
    }

    draw(framesIndex) {
        this.ctx.drawImage(this.imageInstance, this.imageInstance.framesIndex * (this.imageInstance.width / this.imageInstance.frames), 0,
        this.imageInstance.width / this.imageInstance.frames, this.imageInstance.height,
        this.octoEnemyPos.x, this.octoEnemyPos.y, this.octoEnemySize.w, this.octoEnemySize.h)
        this.animate(framesIndex)
    }
    
    animate(framesIndex) {
        if (framesIndex % 5 == 0) {this.imageInstance.framesIndex++}
        if (this.imageInstance.framesIndex >= this.imageInstance.frames) {
        this.imageInstance.framesIndex = 0}
    }

    normalize(x, y) {
        return Math.sqrt(x * x + y * y)
    }

    move(playerPos) {
        let normal = this.normalize( playerPos.x - this.octoEnemyPos.x, playerPos.y - this.octoEnemyPos.y)
      
          playerPos.x != this.octoEnemyPos.x &&
         (this.octoEnemyPos.x += ((playerPos.x - this.octoEnemyPos.x) / normal) * this.speed)
          playerPos.y != this.octoEnemyPos.y &&
          (this.octoEnemyPos.y +=((playerPos.y - this.octoEnemyPos.y) / normal) * this.speed)
                
    }


}