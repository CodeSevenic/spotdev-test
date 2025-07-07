import React, { useEffect, useRef, useLayoutEffect, useState } from 'react';
import styles from '../../styles/hero.module.css';

// No external dependencies needed

interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  backgroundImage?: { src: string; alt: string };
  primaryColor: string;
  secondaryColor: string;
  showAnimatedArrow: boolean;
  typingMessage1: string;
  typingMessage2: string;
  typingMessage3: string;
  typingSpeed: number;
  deletingSpeed: number;
  pauseAfterTyping: number;
  pauseAfterDeleting: number;
}

export default function HeroIsland({
  title,
  subtitle,
  description,
  ctaText,
  ctaUrl,
  backgroundImage,
  primaryColor,
  secondaryColor,
  showAnimatedArrow,
  typingMessage1,
  typingMessage2,
  typingMessage3,
  typingSpeed,
  deletingSpeed,
  pauseAfterTyping,
  pauseAfterDeleting,
}: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const typingRef = useRef<HTMLHeadingElement>(null);

  // Typing animation state
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const typingMessages = [
    typingMessage1 || "Hi, I'm Sibs",
    typingMessage2 || 'Scroll down to see',
    typingMessage3 || 'The Advanced Calculator',
  ].filter(Boolean); // Remove empty messages

  // Typing animation effect
  useEffect(() => {
    const currentMessage = typingMessages[currentIndex];
    const currentTypingSpeed = isDeleting
      ? deletingSpeed || 50
      : typingSpeed || 100;
    const pauseTime = isDeleting
      ? pauseAfterDeleting || 1000
      : pauseAfterTyping || 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        if (currentText.length < currentMessage.length) {
          setCurrentText(currentMessage.slice(0, currentText.length + 1));
        } else {
          // Finished typing, pause then start deleting
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // Deleting backward
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          // Finished deleting, move to next message
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % typingMessages.length);
        }
      }
    }, currentTypingSpeed);

    return () => clearTimeout(timeout);
  }, [
    currentText,
    currentIndex,
    isDeleting,
    typingMessages,
    typingSpeed,
    deletingSpeed,
    pauseAfterTyping,
    pauseAfterDeleting,
  ]);

  // Immediate height fix before any rendering
  useLayoutEffect(() => {
    if (heroRef.current) {
      const element = heroRef.current;
      const height = window.innerWidth <= 768 ? '600px' : '700px';

      // Calculate proper header height
      const headerHeight = 80; // Standard header height
      const padding =
        window.innerWidth <= 768
          ? `${headerHeight - 20}px 0 0 0`
          : `${headerHeight}px 0 0 0`;

      element.style.height = height;
      element.style.minHeight = height;
      element.style.maxHeight = height;
      element.style.overflow = 'hidden';
      element.style.margin = '0';
      element.style.padding = padding;
      element.style.boxSizing = 'border-box';
      element.style.position = 'relative';
      element.style.top = '0';

      // Prevent any transitions during hydration
      element.style.transition = 'none';
      element.style.transform = 'none';

      // Force layout
      element.offsetHeight;

      // Re-enable transitions after a short delay
      setTimeout(() => {
        element.style.transition = '';
      }, 100);
    }
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;

    // Ensure proper height immediately and LOCK it
    if (heroRef.current) {
      const height = window.innerWidth <= 768 ? '600px' : '700px';
      const headerHeight = 80;
      const padding =
        window.innerWidth <= 768
          ? `${headerHeight - 20}px 0 0 0`
          : `${headerHeight}px 0 0 0`;

      heroRef.current.style.height = height;
      heroRef.current.style.minHeight = height;
      heroRef.current.style.maxHeight = height;
      heroRef.current.style.overflow = 'hidden';
      heroRef.current.style.position = 'relative';
      heroRef.current.style.top = '0';
      heroRef.current.style.margin = '0';
      heroRef.current.style.padding = padding;
      heroRef.current.style.boxSizing = 'border-box';
      heroRef.current.style.transition = 'none';
      heroRef.current.style.transform = 'none';

      // LOCK the position - prevent any movement
      heroRef.current.style.willChange = 'auto';
      heroRef.current.style.backfaceVisibility = 'visible';
    }

    // Only initialize canvas - NO GSAP animations
    if (canvasRef.current) {
      initCanvas();
    }

    return () => {
      // No cleanup needed
    };
  }, []);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to specific dimensions
    const canvasWidth = window.innerWidth || 1200;
    const canvasHeight = window.innerWidth <= 768 ? 600 : 700;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.width = canvasWidth + 'px';
    canvas.style.height = canvasHeight + 'px';

    // Mathematical symbols and objects
    const mathSymbols = [
      '∞',
      '∑',
      '∫',
      '∂',
      '√',
      'π',
      'α',
      'β',
      'γ',
      'δ',
      '∆',
      '∇',
      '≈',
      '≠',
      '≤',
      '≥',
      '±',
      '×',
      '÷',
      '∝',
      '∅',
      '∀',
      '∃',
      '∈',
      '∉',
      '⊂',
      '⊃',
      '∩',
      '∪',
      'θ',
      'φ',
      'ψ',
      'ω',
      'Σ',
      'Π',
      '∴',
      '∵',
      '⟨',
      '⟩',
      '⊥',
      '∥',
      '∠',
      '∡',
      '∢',
      '∣',
      '∤',
      '∥',
      '∦',
      '∧',
      '∨',
      '⊻',
      '⊼',
      '⊽',
      '⊾',
      '⊿',
      '∿',
      '≀',
      '≁',
      '≂',
      '≃',
      '≄',
      '≅',
      '≆',
      '≇',
      '≈',
      '≉',
      '≊',
      '≋',
      '≌',
      '≍',
      '≎',
      '≏',
      '≐',
      '≑',
      '≒',
      '≓',
      '≔',
      '≕',
      '≖',
      '≗',
      '≘',
      '≙',
      '≚',
      '≛',
      '≜',
      '≝',
      '≞',
      '≟',
      '≠',
      '≡',
      '≢',
      '≣',
      '≤',
      '≥',
      '≦',
      '≧',
      '≨',
      '≩',
      '≪',
      '≫',
      '≬',
      '≭',
      '≮',
      '≯',
      '≰',
      '≱',
      '≲',
      '≳',
      '≴',
      '≵',
      '≶',
      '≷',
      '≸',
      '≹',
      '≺',
      '≻',
      '≼',
      '≽',
      '≾',
      '≿',
      '⊀',
      '⊁',
      '⊂',
      '⊃',
      '⊄',
      '⊅',
      '⊆',
      '⊇',
      '⊈',
      '⊉',
      '⊊',
      '⊋',
      '⊌',
      '⊍',
      '⊎',
      '⊏',
      '⊐',
      '⊑',
      '⊒',
      '⊓',
      '⊔',
      '⊕',
      '⊖',
      '⊗',
      '⊘',
      '⊙',
      '⊚',
      '⊛',
      '⊜',
      '⊝',
      '⊞',
      '⊟',
      '⊠',
      '⊡',
      '⊢',
      '⊣',
      '⊤',
      '⊥',
      '⊦',
      '⊧',
      '⊨',
      '⊩',
      '⊪',
      '⊫',
      '⊬',
      '⊭',
      '⊮',
      '⊯',
      '⊰',
      '⊱',
      '⊲',
      '⊳',
      '⊴',
      '⊵',
      '⊶',
      '⊷',
      '⊸',
      '⊹',
      '⊺',
      '⊻',
      '⊼',
      '⊽',
      '⊾',
      '⊿',
      '⋀',
      '⋁',
      '⋂',
      '⋃',
      '⋄',
      '⋅',
      '⋆',
      '⋇',
      '⋈',
      '⋉',
      '⋊',
      '⋋',
      '⋌',
      '⋍',
      '⋎',
      '⋏',
      '⋐',
      '⋑',
      '⋒',
      '⋓',
      '⋔',
      '⋕',
      '⋖',
      '⋗',
      '⋘',
      '⋙',
      '⋚',
      '⋛',
      '⋜',
      '⋝',
      '⋞',
      '⋟',
      '⋠',
      '⋡',
      '⋢',
      '⋣',
      '⋤',
      '⋥',
      '⋦',
      '⋧',
      '⋨',
      '⋩',
      '⋪',
      '⋫',
      '⋬',
      '⋭',
      '⋮',
      '⋯',
      '⋰',
      '⋱',
      '⋲',
      '⋳',
      '⋴',
      '⋵',
      '⋶',
      '⋷',
      '⋸',
      '⋹',
      '⋺',
      '⋻',
      '⋼',
      '⋽',
      '⋾',
      '⋿',
    ];

    // Complimenting color palette
    const colors = [
      primaryColor,
      secondaryColor,
      '#10b981', // emerald
      '#f59e0b', // amber
      '#ef4444', // red
      '#8b5cf6', // violet
      '#06b6d4', // cyan
      '#84cc16', // lime
      '#f97316', // orange
      '#ec4899', // pink
      '#14b8a6', // teal
      '#f43f5e', // rose
      '#8b5cf6', // purple
      '#06b6d4', // sky
      '#84cc16', // green
      '#f97316', // orange
    ];

    interface MathObject {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      type: 'symbol' | 'circle' | 'triangle' | 'square' | 'line' | 'equation';
      symbol?: string;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      pulseSpeed: number;
      pulsePhase: number;
      equation?: string;
    }

    const mathObjects: MathObject[] = [];

    // Create diverse mathematical objects
    for (let i = 0; i < 70; i++) {
      const types = [
        'symbol',
        'circle',
        'triangle',
        'square',
        'line',
        'equation',
      ];
      const type = types[
        Math.floor(Math.random() * types.length)
      ] as MathObject['type'];

      mathObjects.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 30 + 15,
        color: colors[Math.floor(Math.random() * colors.length)],
        type,
        symbol:
          type === 'symbol'
            ? mathSymbols[Math.floor(Math.random() * mathSymbols.length)]
            : undefined,
        equation:
          type === 'equation'
            ? [
                'E=mc²',
                'a²+b²=c²',
                'f(x)=x²',
                'lim→∞',
                'dy/dx',
                '∫f(x)dx',
                '∑n=1',
                'log₂x',
                'sin(x)',
                'cos(x)',
                'tan(x)',
                'x!',
                'n!',
                'P(A∩B)',
                'μ±σ',
                'χ²',
                'F(x)',
                'g(x)',
                'h(x)',
                "f'(x)",
                "f''(x)",
                '∂f/∂x',
                '∇f',
                '∮C',
                '∭V',
                '∬S',
                '∫∫∫',
                '∏i=1',
                '∪∩',
                '⊕⊗',
                '∞→0',
                '≡≢',
                '∀∃',
                '∈∉',
                '⊂⊃',
                '∧∨',
                '⊥∥',
                '∠∡',
              ][Math.floor(Math.random() * 25)]
            : undefined,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.5 + 0.1,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    let animationTime = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animationTime += 0.016; // ~60fps

      mathObjects.forEach((obj) => {
        // Update position
        obj.x += obj.vx;
        obj.y += obj.vy;
        obj.rotation += obj.rotationSpeed;

        // Wrap around edges
        if (obj.x > canvas.width + obj.size) obj.x = -obj.size;
        if (obj.x < -obj.size) obj.x = canvas.width + obj.size;
        if (obj.y > canvas.height + obj.size) obj.y = -obj.size;
        if (obj.y < -obj.size) obj.y = canvas.height + obj.size;

        // Avoid center area (where text is) - create a repulsion zone
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const textZoneWidth = Math.min(canvas.width * 0.7, 900);
        const textZoneHeight = Math.min(canvas.height * 0.5, 400);

        const distanceFromCenter = Math.sqrt(
          Math.pow(obj.x - centerX, 2) + Math.pow(obj.y - centerY, 2),
        );

        if (
          obj.x > centerX - textZoneWidth / 2 &&
          obj.x < centerX + textZoneWidth / 2 &&
          obj.y > centerY - textZoneHeight / 2 &&
          obj.y < centerY + textZoneHeight / 2
        ) {
          // Create repulsion force
          const repulsionForce = 0.8;
          const dx = obj.x - centerX;
          const dy = obj.y - centerY;
          const distance = Math.max(distanceFromCenter, 1);

          obj.vx += (dx / distance) * repulsionForce;
          obj.vy += (dy / distance) * repulsionForce;

          // Limit velocity
          const maxVel = 0.8;
          obj.vx = Math.max(-maxVel, Math.min(maxVel, obj.vx));
          obj.vy = Math.max(-maxVel, Math.min(maxVel, obj.vy));
        }

        // Pulsing opacity with smoother animation
        obj.opacity =
          Math.abs(Math.sin(animationTime * obj.pulseSpeed + obj.pulsePhase)) *
            0.4 +
          0.2;

        // Draw object
        ctx.save();
        ctx.translate(obj.x, obj.y);
        ctx.rotate(obj.rotation);
        ctx.globalAlpha = obj.opacity;

        switch (obj.type) {
          case 'symbol':
            ctx.font = `${obj.size}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
            ctx.fillStyle = obj.color;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(obj.symbol || '∞', 0, 0);
            break;

          case 'equation':
            ctx.font = `${
              obj.size * 0.6
            }px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
            ctx.fillStyle = obj.color;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(obj.equation || 'E=mc²', 0, 0);
            break;

          case 'circle':
            ctx.beginPath();
            ctx.arc(0, 0, obj.size / 2, 0, Math.PI * 2);
            ctx.strokeStyle = obj.color;
            ctx.lineWidth = 2;
            ctx.stroke();
            // Add inner circle
            ctx.beginPath();
            ctx.arc(0, 0, obj.size / 4, 0, Math.PI * 2);
            ctx.strokeStyle = obj.color;
            ctx.lineWidth = 1;
            ctx.stroke();
            break;

          case 'triangle':
            ctx.beginPath();
            ctx.moveTo(0, -obj.size / 2);
            ctx.lineTo(-obj.size / 2, obj.size / 2);
            ctx.lineTo(obj.size / 2, obj.size / 2);
            ctx.closePath();
            ctx.strokeStyle = obj.color;
            ctx.lineWidth = 2;
            ctx.stroke();
            break;

          case 'square':
            ctx.beginPath();
            ctx.rect(-obj.size / 2, -obj.size / 2, obj.size, obj.size);
            ctx.strokeStyle = obj.color;
            ctx.lineWidth = 2;
            ctx.stroke();
            // Add diagonal lines
            ctx.beginPath();
            ctx.moveTo(-obj.size / 2, -obj.size / 2);
            ctx.lineTo(obj.size / 2, obj.size / 2);
            ctx.moveTo(obj.size / 2, -obj.size / 2);
            ctx.lineTo(-obj.size / 2, obj.size / 2);
            ctx.strokeStyle = obj.color;
            ctx.lineWidth = 1;
            ctx.stroke();
            break;

          case 'line':
            ctx.beginPath();
            ctx.moveTo(-obj.size / 2, 0);
            ctx.lineTo(obj.size / 2, 0);
            ctx.strokeStyle = obj.color;
            ctx.lineWidth = 2;
            ctx.stroke();
            // Add perpendicular line
            ctx.beginPath();
            ctx.moveTo(0, -obj.size / 4);
            ctx.lineTo(0, obj.size / 4);
            ctx.strokeStyle = obj.color;
            ctx.lineWidth = 1;
            ctx.stroke();
            break;
        }

        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize with fixed height
    const handleResize = () => {
      const canvasWidth = window.innerWidth || 1200;
      const canvasHeight = window.innerWidth <= 768 ? 600 : 700;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      canvas.style.width = canvasWidth + 'px';
      canvas.style.height = canvasHeight + 'px';
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  };

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const targetElement = document.querySelector(ctaUrl);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={heroRef}
      className={styles.hero}
      style={
        {
          '--primary-color': primaryColor,
          '--secondary-color': secondaryColor,
        } as React.CSSProperties
      }
    >
      <canvas ref={canvasRef} className={styles.heroCanvas} />

      {backgroundImage?.src && (
        <div className={styles.heroBackground}>
          <img src={backgroundImage.src} alt={backgroundImage.alt} />
        </div>
      )}

      <div className={styles.heroContent}>
        <div className={styles.heroTextContainer}>
          <div className={styles.heroText}>
            <h1 ref={typingRef} className={styles.heroTitle}>
              {currentText}
              <span className={styles.cursor}>|</span>
            </h1>
            <h2 className={styles.heroSubtitle}>{subtitle}</h2>
            <div
              className={styles.heroDescription}
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <a
              href={ctaUrl}
              className={styles.heroCta}
              onClick={handleCtaClick}
            >
              {ctaText}
            </a>
          </div>
        </div>
      </div>

      {showAnimatedArrow && (
        <div className={styles.animatedArrow}>
          <svg width="40" height="40" viewBox="0 0 40 40">
            <path
              d="M20 5 L20 30 M12 22 L20 30 L28 22"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
