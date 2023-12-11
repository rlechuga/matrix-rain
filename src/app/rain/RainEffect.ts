import RainSymbol from './RainSymbol';

interface EffectProps {
  canvasWidth: number;
  canvasHeight: number;
  fontSize: number;
  columns: number;
}

class RainEffect {
  canvasWidth: number;
  canvasHeight: number;
  fontSize: number;
  columns: number;
  symbols: RainSymbol[];

  constructor({ canvasWidth, canvasHeight, fontSize, columns }: EffectProps) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = fontSize;
    this.columns = columns;
    this.symbols = this.initialize();
  }

  private initialize(): RainSymbol[] {
    const symbols: RainSymbol[] = [];
    for (let i = 0; i < this.columns; i++) {
      symbols[i] = new RainSymbol({
        x: i,
        y: 0,
        fontSize: this.fontSize,
        canvasHeight: this.canvasHeight,
      });
    }
    return symbols;
  }

  resize(width: number, height: number): void {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = []
    this.symbols = this.initialize();
  }
}

export default RainEffect;