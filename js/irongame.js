const irongame = {
    appName: 'Irongame',
    author: 'Cristian Perdomo and Ricardo Molpeceres' ,
    version: '1.0.0',
    license: undefined,
    gameSize: { w: 900, h: 500 },
    ctx: undefined,
    player: undefined,
    octoEnemies: [],
    pythonEnemies: [],
    bonus: [],
    bullets: [],
    seconds: 45, 
    countdown: undefined,
    FPS: 60,
    framesIndex: 0,
    gameLimits: {l: 90, r: 770, t: 50, b: 400},
    randomSize: 1,
    intervalID: undefined,

    init() {
        this.setContext()
        this.createBackground()
        this.createCountdown()
        this.createPlayer()
        this.createBonus()
        this.createPythonEnemy()
        this.createOctoEnemy() 
        this.createLifeBar() 
        this.drawAll()
        this.setEventHandlers()
        this.clearAll()
    },

    setContext() {
        this.ctx = document.querySelector('#myCanvas').getContext('2d')
        console.log(this.ctx)
    },

    drawAll() {
        this.intervalID = setInterval(() => {
        this.framesIndex++
        this.getRandomW()
        this.framesIndex % 80 === 0 ? this.createPythonEnemy() : null
        this.framesIndex % 40 === 0 ? this.createOctoEnemy() : null
        this.framesIndex % 300 === 0 ? this.createBonus() : null
        this.framesIndex % 50 === 0 && this.seconds--
        this.clearAll()
        this.drawBackgroud()
        this.drawCountdown()
        this.drawPlayer()
        this.drawBonus()
        this.drawPythonEnemy()
        this.drawOctoEnemy()
        this.drawLifeBar()
        this.checkPlayerPythonCollision()
        this.checkPlayerOctoCollision()
        this.checkBulletEnemyCollision()
        this.checkPlayerBonusCollision()
        this.bullets.forEach((bullet) => { bullet.draw()})
        this.pythonEnemies.forEach(enemy => { enemy.move(this.player.playerPos)
            enemy.draw()})
        this.octoEnemies.forEach(enemy => { enemy.move(this.player.playerPos)
                enemy.draw()})
        this.checkLife()
        this.checkLife() ? this.gameOver() : null
    }, 20)
    },

    createBackground() {
        this.background = new Background (this.ctx, 0, 0, this.gameSize.w, this.gameSize.h)
    },
    
    drawBackgroud() {
       this.background.draw()
    },

    createPlayer() {
        this.player = new Player (this.ctx, 450, 250, 50, 50)
    },

    drawPlayer() {
        this.player.draw()
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
        this.clearBullets()
    },

    setEventHandlers() {
        document.addEventListener('keydown', event => {
            const { key } = event
            key === 'ArrowRight' ? this.player.moveRight() : null
            key === 'ArrowLeft' ? this.player.moveLeft() : null
            key === 'ArrowUp' ? this.player.moveUp() : null
            key === 'ArrowDown' ? this.player.moveDown() : null
        })
        document.addEventListener("click", (event) => {

            const angle = Math.atan2(
              event.clientY - this.gameSize.h / 2,
              event.clientX - this.gameSize.w / 2
            );
            const speed = {
              x: Math.cos(angle),
              y: Math.sin(angle),
            };
            this.bullets.push( new Bullets(this.ctx, event.clientX, event.clientY, this.player.playerSize.w, this.player.playerSize.h, speed, this.player.playerPos.x, this.player.playerPos.y))
        })
    },

    createPythonEnemy() {
        const newEnemy = new PythonEnemy (this.ctx, this.getRandomX(), this.getRandomY(), 80, 80, this.gameLimits, this.playerPos)
        this.pythonEnemies.push(newEnemy)
    },

    drawPythonEnemy() {
        this.pythonEnemies.forEach(pythonEnemy => {
            pythonEnemy.draw()
        })
    },

    createOctoEnemy() {
        const newEnemy =  new OctoEnemy (this.ctx, this.getRandomX(), this.getRandomY(), this.randomSize, this.randomSize, this.gameLimits, this.playerPos)
        this.octoEnemies.push(newEnemy)
    },
    
    drawOctoEnemy() {
        this.octoEnemies.forEach(octoEnemy => {
            octoEnemy.draw()
        })  
    },

    clearBullets() {
        this.bullets = this.bullets.filter((bullet) => this.gameSize.w > bullet.bulletPos.x && bullet.bulletPos.x > 0 &&
            this.gameSize.h > bullet.bulletPos.y && bullet.bulletPos.y > 0)
    },

    createBonus() {
        const newBonus = new Bonus (this.ctx, this.getRandomX(), this.getRandomY(), 20, 20)
        this.bonus.push(newBonus)
    },

    drawBonus() {
        this.bonus.forEach(bonus => {
            bonus.draw()
        })
    },

    createCountdown() {
        this.countdown = new Countdown(this.ctx)
    },

    drawCountdown() {
        this.countdown.draw(this.seconds)
        if(this.seconds === 0) {
            alert('YOU WON!')
        }
    },

    createLifeBar() {
        this.lifeBar = new Lifebar(this.ctx);
    },

    drawLifeBar() {
        this.lifeBar.draw(this.player.playerHealth);
    },
    
    getRandomY() {
        const random = Math.floor(Math.random() * (this.gameLimits.b - 80 - this.gameLimits.t) + this.gameLimits.t)
        return random
       
    },

    getRandomX() {
        const random = Math.floor(Math.random() * (this.gameLimits.r - 80 - this.gameLimits.l) + this.gameLimits.l)
        return random
    },

    getRandomW() {
        const random = Math.floor(Math.random() * (50 - 15) + 15)
        this.randomSize = random
    },

    checkPlayerPythonCollision() {
        this.pythonEnemies.forEach((pythonEnemy, i) => {        
        if (this.player.playerPos.x  < pythonEnemy.pythonEnemyPos.x + pythonEnemy.pythonEnemySize.w &&
            this.player.playerPos.x  + this.player.playerSize.w > pythonEnemy.pythonEnemyPos.x &&
            this.player.playerPos.y < pythonEnemy.pythonEnemyPos.y + pythonEnemy.pythonEnemySize.h &&
            this.player.playerSize.h + this.player.playerPos.y > pythonEnemy.pythonEnemyPos.y) {
            this.pythonEnemies.splice(i, 1)
            this.player.playerHealth -= 100
            }
        })      
    },

    checkPlayerOctoCollision() {
        this.octoEnemies.forEach((octoEnemy, i) => {        
        if (this.player.playerPos.x  < octoEnemy.octoEnemyPos.x + octoEnemy.octoEnemySize.w &&
            this.player.playerPos.x  + this.player.playerSize.w > octoEnemy.octoEnemyPos.x &&
            this.player.playerPos.y < octoEnemy.octoEnemyPos.y + octoEnemy.octoEnemySize.h &&
            this.player.playerSize.h + this.player.playerPos.y > octoEnemy.octoEnemyPos.y) {
            this.octoEnemies.splice(i, 1)
            this.player.playerHealth -= 100
            }
        })
    },

    checkPlayerBonusCollision() {
        this.bonus.forEach((bonus, i) => {        
        if (this.player.playerPos.x  < bonus.bonusPos.x + bonus.bonusSize.w &&
            this.player.playerPos.x  + this.player.playerSize.w > bonus.bonusPos.x &&
            this.player.playerPos.y < bonus.bonusPos.y + bonus.bonusSize.h &&
            this.player.playerSize.h + this.player.playerPos.y > bonus.bonusPos.y) {
            this.bonus.splice(i, 1)
            this.player.playerHealth += 100 
            } 
        })
    },
    
    checkBulletEnemyCollision() {
        this.bullets.forEach((bullet, i, bullets) => {
          this.octoEnemies.forEach((octoEnemy, j, octoEnemies) => {
            if (bullet.bulletPos.x < octoEnemy.octoEnemyPos.x + octoEnemy.octoEnemySize.w &&
              bullet.bulletPos.x + bullet.bulletSize.w > octoEnemy.octoEnemyPos.x &&
              bullet.bulletPos.y < octoEnemy.octoEnemyPos.y + octoEnemy.octoEnemySize.h &&
              bullet.bulletSize.h + bullet.bulletPos.y > octoEnemy.octoEnemyPos.y) {
              bullets.splice(i, 1)
              octoEnemies.splice(j, 1)
            }
          })
        })
    
        this.bullets.forEach((bullet, i, bullets) => {
        this.pythonEnemies.forEach((pythonEnemy, j, pythonEnemies) => {
            if (bullet.bulletPos.x < pythonEnemy.pythonEnemyPos.x + pythonEnemy.pythonEnemySize.w &&
              bullet.bulletPos.x + bullet.bulletSize.w > pythonEnemy.pythonEnemyPos.x &&
              bullet.bulletPos.y < pythonEnemy.pythonEnemyPos.y + pythonEnemy.pythonEnemySize.h &&
              bullet.bulletSize.h + bullet.bulletPos.y > pythonEnemy.pythonEnemyPos.y) {
              bullets.splice(i, 1);
              pythonEnemies.splice(j, 1);
            }
          })
        })
    },
  
    checkLife() {
        // console.log(this.player.playerHealth)
        if (this.player.playerHealth === 0) {
            clearInterval(this.intervalID)
            // alert('You died') 
            // window.location.reload(false)
        }

    },

    gameOver() {
        clearInterval(this.interval)
    },

}

