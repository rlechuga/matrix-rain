'use client';

import useRain from './rain/useRain';

export default function Home() {
  const { RainCanvas } = useRain();
  return RainCanvas;
}
