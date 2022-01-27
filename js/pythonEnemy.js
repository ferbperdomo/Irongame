class PythonEnemy {
    constructor(ctx, pythonEnemyX, pythonEnemyY, pythonEnemyWidth, pythonEnemyHeight, gameLimits, playerPos, speed = 0.5 ) {
        this.ctx = ctx
        this.pythonEnemyPos = {x: pythonEnemyX, y: pythonEnemyY}
        this.pythonEnemySize = {w: pythonEnemyWidth, h: pythonEnemyHeight}
        this.gameLimits =  gameLimits
        this.playerPos = playerPos
        this.speed = speed
        this.imageInstance = undefined
        this.frames = undefined
        
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = 'img/pythonEnemy.png'
        //imagen sprite
        this.imageInstance.frames = 5;
        this.imageInstance.framesIndex = 0;
    }

    draw(framesIndex) {
        this.ctx.drawImage(this.imageInstance, this.imageInstance.framesIndex * (this.imageInstance.width / this.imageInstance.frames), 0,
        this.imageInstance.width / this.imageInstance.frames, this.imageInstance.height, 
        this.pythonEnemyPos.x, this.pythonEnemyPos.y, this.pythonEnemySize.w, this.pythonEnemySize.h)
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
        let normal = this.normalize(playerPos.x - this.pythonEnemyPos.x, playerPos.y - this.pythonEnemyPos.y)
    
        playerPos.x != this.pythonEnemyPos.x &&
        (this.pythonEnemyPos.x += ((playerPos.x - this.pythonEnemyPos.x) / normal) * this.speed)
        playerPos.y != this.pythonEnemyPos.y &&
        (this.pythonEnemyPos.y += ((playerPos.y - this.pythonEnemyPos.y) / normal) * this.speed)
      }
   
}


