'use client';

import useRain from './rain/useRain';

export default function Home() {
  const { CanvasRain } = useRain();
  return CanvasRain;
}
