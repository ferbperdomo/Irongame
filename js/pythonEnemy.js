class PythonEnemy {
    constructor(ctx, pythonEnemyX, pythonEnemyY, pythonEnemyWidth, pythonEnemyHeight, gameLimits, playerPos, speed = 5 ) {
        this.ctx = ctx
        this.pythonEnemyPos = {x: pythonEnemyX, y: pythonEnemyY}
        this.pythonEnemySize = {w: pythonEnemyWidth, h: pythonEnemyHeight}
        this.gameLimits =  gameLimits
        this.playerPos = playerPos
        this.speed = speed
        this.imageInstance = undefined
        
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = 'img/pythonEnemy.png'
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.pythonEnemyPos.x, this.pythonEnemyPos.y, this.pythonEnemySize.w, this.pythonEnemySize.h)
    }

    move(playerPos) {
        this.pythonEnemyPos.x += (playerPos.x - this.pythonEnemyPos.x)*0.01
        this.pythonEnemyPos.y += (playerPos.y - this.pythonEnemyPos.y)*0.01
        this.checkCollision()
        
    }
    checkCollision() {
        if (this.pythonEnemyPos.x + this.pythonEnemySize.w >= this.gameLimits.r || this.pythonEnemyPos.x <= this.gameLimits.l ) {
            this.turn()
        }
    }
        
    turn() {
        this.speed *= -1
    }

}


