class OctoEnemy {
    constructor(ctx, octoEnemyX, octoEnemyY, octoEnemyWidth, octoEnemyHeight, gameLimits, speed = 5) {
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
        console.log('tamañoooo:', this.octoEnemyPos.x, this.octoEnemyPos.y)
    }

    move(playerPos) {
        this.octoEnemyPos.x += (playerPos.x - this.octoEnemyPos.x)*0.01
        this.octoEnemyPos.y += (playerPos.y - this.octoEnemyPos.y)*0.01        
    }
    

}