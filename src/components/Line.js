

export class Line{

    constructor() {
      this.P1x = 0;
      this.P1y = 0;
      this.P2x = 0;
      this.P2y = 0;
    }

    set setP1x(P1x) {
      this.P1x = P1x
    }

    set setP1y(P1y) {
      this.P1y = P1y
    }

    set setP2x(P2x) {
      this.P2x = P2x
    }

    set setP2y(P2y) {
        this.P2y = P2y
    }

    draw(p5){
        p5.line(this.P1x,this.P1y,this.P2x,this.P2y); 
    }

}

