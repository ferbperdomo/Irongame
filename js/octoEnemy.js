class OctoEnemy {
    constructor(ctx, octoEnemyX, octoEnemyY, octoEnemyWidth, octoEnemyHeight, gameLimits, speed = 2) {
        this.ctx = ctx
        this.octoEnemyPos = {x: octoEnemyX, y: octoEnemyY}
        this.octoEnemySize = {w: octoEnemyWidth, h: octoEnemyHeight}
        this.gameLimits =  gameLimits
        this.speed = speed
        this.imageInstance = undefined
        
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = 'img/octoEnemy.png'
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.octoEnemyPos.x, this.octoEnemyPos.y, this.octoEnemySize.w, this.octoEnemySize.h)
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