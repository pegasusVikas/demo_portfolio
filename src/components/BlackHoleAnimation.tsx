import React, { useRef, useEffect } from 'react';

const BlackHoleAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(canvas.width, canvas.height) * 0.8;
    const eventHorizonRadius = maxRadius * 0.2;

    let particles: { x: number; y: number; radius: number; angle: number; speed: number; color: string }[] = [];

    // Reduced number of particles for better performance
    for (let i = 0; i < 500; i++) {
      const radius = Math.random() * maxRadius;
      const angle = Math.random() * Math.PI * 2;
      particles.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        radius: Math.random() * 2 + 0.5,
        angle,
        speed: (Math.random() * 0.5 + 0.5) * (radius / maxRadius),
        color: getParticleColor(Math.random()),
      });
    }

    function getParticleColor(t: number): string {
      // Gradient from blood red to white
      const r = Math.floor(139 + (255 - 139) * t);
      const g = Math.floor(0 + 255 * t);
      const b = Math.floor(0 + 255 * t);
      return `rgb(${r}, ${g}, ${b})`;
    }

    function drawEventHorizon() {
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, eventHorizonRadius);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
      gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.8)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, eventHorizonRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawEventHorizon();

      particles.forEach((particle) => {
        particle.angle += particle.speed * 0.02;
        const distanceFromCenter = Math.sqrt(Math.pow(particle.x - centerX, 2) + Math.pow(particle.y - centerY, 2));
        const gravitationalPull = Math.max(0, (maxRadius - distanceFromCenter) / maxRadius) * 2;
        
        const newRadius = Math.max(eventHorizonRadius, distanceFromCenter - gravitationalPull);
        particle.x = centerX + Math.cos(particle.angle) * newRadius;
        particle.y = centerY + Math.sin(particle.angle) * newRadius;

        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.radius * 2);
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
};

export default BlackHoleAnimation;