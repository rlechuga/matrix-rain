interface SymbolProps {
  x: number;
  y: number;
  fontSize: number;
  canvasHeight: number;
}

class SymbolRain {
  characters =
    'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  x: number;
  y: number;
  fontSize: number;
  text: string;
  canvasHeight: number;

  constructor({ x, y, fontSize, canvasHeight }: SymbolProps) {
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.text = '';
    this.canvasHeight = canvasHeight;
  }

  draw(context: CanvasRenderingContext2D): void {
    this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
    context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);

    if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.95) {
      this.y = 0;
    } else {
      this.y += 1;
    }
  }
}

export default SymbolRain;