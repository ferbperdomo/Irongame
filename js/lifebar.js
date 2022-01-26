class Lifebar {
    constructor(ctx) {
      this.ctx = ctx;
      this.imagesLifeBar = [
        "img/0lifebar.png",
        "img/10lifebar.png",
        "img/20lifebar.png",
        "img/40lifebar.png",
        "img/60lifebar.png",
        "img/80lifebar.png",
        "img/100lifebar.png",
      ];
  
      this.init();
    }
  
    init() {
      this.image = new Image();
    }
  
    draw(playerHealth) {
      this.chooseLifeBar(playerHealth);
      this.ctx.drawImage(this.image, 90, 425, 300, 50);
    }
  
    chooseLifeBar(playerHealth) {
      switch (playerHealth) {
        case 500:
          this.image.src = this.imagesLifeBar[6];
          break;
        case 400:
          this.image.src = this.imagesLifeBar[5];
          break;
        case 300:
          this.image.src = this.imagesLifeBar[4];
          break;
        case 200:
          this.image.src = this.imagesLifeBar[3];
          break;
        case 100:
          this.image.src = this.imagesLifeBar[1];
          break;
        case 0:
          this.image.src = this.imagesLifeBar[0];
          break;
        default:
          console.log("Case not managed");
      }
    }
}