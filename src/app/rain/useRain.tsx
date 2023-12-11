'use client';

import React, { useEffect, useRef, useState } from 'react';

import RainEffect from './RainEffect';

const useRain = () => {
  const [canvasInfo, setCanvasInfo] = useState({
    width: 0,
    height: 0,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    setCanvasInfo({
      width: canvasWidth,
      height: canvasHeight,
    });

    const fontSize = 25;
    const columns = canvasWidth / fontSize;

    const effect = new RainEffect({
      canvasWidth,
      canvasHeight,
      fontSize,
      columns,
    });

    /// control fps
    let lastTime = 0;
    const fps = 15;
    const nextFrame = 1000 / fps;
    let timer = 0;

    const animate = (timestamp: number) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      if (timer > nextFrame) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.textAlign = 'center';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = createRadialGradient(ctx, width, height); // '#0aff0a';
        ctx.font = `${fontSize}px monospace`;
        effect.symbols.forEach((symbol) => symbol.draw(ctx));
        timer = 0;
      } else {
        timer += deltaTime;
      }

      requestAnimationFrame(animate);
    };

    animate(0);

    /// handle resize
    const handleResize = () => {
      if (!canvasRef.current) return;

      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;

      setCanvasInfo({
        width: canvasWidth,
        height: canvasHeight,
      });

      effect.resize(canvasWidth, canvasHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  /// create radial gradient
  const createRadialGradient = (
    ctx: CanvasRenderingContext2D,
    width: number ,
    height: number
  ): CanvasGradient => {
    let gradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      100,
      width / 2,
      height / 2,
      600
    );
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.2, 'yellow');
    gradient.addColorStop(0.4, 'green');
    gradient.addColorStop(0.6, 'cyan');
    gradient.addColorStop(0.8, 'blue');
    gradient.addColorStop(1, 'magenta');

    return gradient;
  };

  const RainCanvas = (
    <canvas
      ref={canvasRef}
      width={canvasInfo.width}
      height={canvasInfo.height}
    />
  );
  return { RainCanvas };
};

export default useRain;
