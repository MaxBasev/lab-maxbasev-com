'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import styles from './IdeasTransition.module.css'

class Particle {
	x: number;
	y: number;
	originalX: number;
	originalY: number;
	size: number;
	speedX: number;
	speedY: number;
	brightness: number;
	angle: number;
	isForming: boolean = false;
	targetX: number = 0;
	targetY: number = 0;
	isInPosition: boolean = false;
	trail: Array<{ x: number, y: number }> = [];
	maxTrailLength: number = 5;
	explosionSpeed: number = 0;
	explosionAngle: number = 0;
	isExploding: boolean = false;
	isImploding: boolean = false;
	implodeDelay: number = 0;

	constructor(width: number, height: number) {
		this.x = Math.random() * width;
		this.y = Math.random() * height;
		this.originalX = this.x;
		this.originalY = this.y;
		this.size = Math.random() * 2;
		this.speedX = Math.random() * 0.5 - 0.25;
		this.speedY = Math.random() * 0.5 - 0.25;
		this.brightness = Math.random();
		this.angle = Math.random() * 360;
	}

	explode(centerX: number, centerY: number) {
		this.isExploding = true;
		this.isImploding = false;
		const dx = this.x - centerX;
		const dy = this.y - centerY;
		this.explosionAngle = Math.atan2(dy, dx);
		this.explosionSpeed = Math.random() * 20 + 10;
		// Removed implosion delay since we want a one-way transition
	}

	update(width: number, height: number, mouse: { x: number; y: number }) {
		if (this.isExploding) {
			this.explosionSpeed *= 0.96;
			this.x += Math.cos(this.explosionAngle) * this.explosionSpeed;
			this.y += Math.sin(this.explosionAngle) * this.explosionSpeed;
			// Drift after explosion
			this.x += (Math.random() - 0.5) * 2;
			this.y += (Math.random() - 0.5) * 2;
		} else {
			this.angle += 0.5;
			this.x += Math.sin(this.angle * Math.PI / 180) * 0.5;
			this.y += Math.cos(this.angle * Math.PI / 180) * 0.5;

			if (mouse.x !== 0 && mouse.y !== 0) {
				const dx = mouse.x - this.x;
				const dy = mouse.y - this.y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < 100) {
					const force = (100 - distance) / 100;
					const directionX = dx / distance;
					const directionY = dy / distance;
					this.x -= directionX * force * 2;
					this.y -= directionY * force * 2;
				}
			}
		}

		if (this.x < 0) this.x = width;
		if (this.x > width) this.x = 0;
		if (this.y < 0) this.y = height;
		if (this.y > height) this.y = 0;

		this.brightness = Math.sin(Date.now() * 0.001) * 0.5 + 0.5;

		this.trail.unshift({ x: this.x, y: this.y });
		if (this.trail.length > this.maxTrailLength) {
			this.trail.pop();
		}
	}

	draw(ctx: CanvasRenderingContext2D, particles: Particle[]) {
		if (this.isExploding) {
			ctx.fillStyle = `rgba(0, 255, 255, ${this.brightness * 0.3})`;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			ctx.fill();
		} else {
			ctx.fillStyle = `rgba(0, 255, 255, ${this.brightness * 0.3})`;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			ctx.fill();

			particles.forEach((particle, index) => {
				if (index % 2 === 0) return;

				const dx = this.x - particle.x;
				const dy = this.y - particle.y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < 100) {
					ctx.beginPath();
					ctx.strokeStyle = `rgba(0, 255, 255, ${(1 - distance / 100) * 0.2})`;
					ctx.lineWidth = 1;
					ctx.moveTo(this.x, this.y);
					ctx.lineTo(particle.x, particle.y);
					ctx.stroke();
				}
			});

			if (this.trail.length > 1) {
				ctx.beginPath();
				ctx.moveTo(this.trail[0].x, this.trail[0].y);
				this.trail.forEach((point, index) => {
					const alpha = 1 - index / this.maxTrailLength;
					ctx.strokeStyle = `rgba(0, 255, 255, ${alpha * 0.2})`;
					ctx.lineTo(point.x, point.y);
				});
				ctx.stroke();
			}
		}
	}
}

interface IdeasTransitionProps {
	onComplete: () => void;
	onStartExit?: () => void;
}

export default function IdeasTransition({ onComplete, onStartExit }: IdeasTransitionProps) {
	const [isHovered, setIsHovered] = useState(false)
	const [isClicked, setIsClicked] = useState(false)
	const [isFadingOut, setIsFadingOut] = useState(false)
	const [showComingSoon, setShowComingSoon] = useState(false)
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const particlesRef = useRef<Particle[]>([])
	const mouseRef = useRef({ x: 0, y: 0 })

	const handleClick = () => {
		if (isClicked) return;
		setIsClicked(true);

		const button = document.querySelector(`.${styles.loginButton}`) as HTMLElement;
		const buttonRect = button?.getBoundingClientRect();

		if (buttonRect && particlesRef.current) {
			const explosionParticles = Array.from(
				{ length: 300 },
				(_, index) => {
					const particle = new Particle(window.innerWidth, window.innerHeight);
					particle.size = Math.random() * 3 + 1;
					return particle;
				}
			);

			explosionParticles.forEach((particle, index) => {
				const angle = (index / explosionParticles.length) * Math.PI * 2;
				const radius = Math.random() * 20;

				particle.x = buttonRect.x + buttonRect.width / 2 + Math.cos(angle) * radius;
				particle.y = buttonRect.y + buttonRect.height / 2 + Math.sin(angle) * radius;
				particle.brightness = 1;
				particle.explode(
					buttonRect.x + buttonRect.width / 2,
					buttonRect.y + buttonRect.height / 2
				);
			});

			particlesRef.current = [...particlesRef.current, ...explosionParticles];

			particlesRef.current.forEach(particle => {
				const dx = particle.x - (buttonRect.x + buttonRect.width / 2);
				const dy = particle.y - (buttonRect.y + buttonRect.height / 2);
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < 300) {
					particle.explode(
						buttonRect.x + buttonRect.width / 2,
						buttonRect.y + buttonRect.height / 2
					);
				}
			});
		}

		if (button instanceof HTMLElement) {
			button.style.opacity = '0';
			setTimeout(() => button.remove(), 300);
		}

		// Show "Coming Soon" after explosion starts
		setTimeout(() => {
			setShowComingSoon(true);
		}, 800);

		// Wait 3 seconds then fade out
		setTimeout(() => {
			setIsFadingOut(true);
			if (onStartExit) onStartExit();
			setTimeout(() => {
				onComplete();
			}, 1000); // Wait for fade out
		}, 3800); // 800ms + 3000ms delay
	};

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const particleCount = window.innerWidth < 768 ? 150 : 250;

		particlesRef.current = Array.from(
			{ length: particleCount },
			() => new Particle(canvas.width, canvas.height)
		);

		let animationFrameId: number;

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			particlesRef.current.forEach(particle => {
				particle.update(canvas.width, canvas.height, mouseRef.current);
				particle.draw(ctx, particlesRef.current);
			});

			animationFrameId = requestAnimationFrame(animate);
		};

		animate();

		const handleMouseMove = (e: MouseEvent) => {
			mouseRef.current = { x: e.clientX, y: e.clientY };
		};

		window.addEventListener('mousemove', handleMouseMove);

		const handleResize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('resize', handleResize);
			cancelAnimationFrame(animationFrameId);
		};
	}, []);

	return (
		<main className={`${styles.main} ${isFadingOut ? styles.fadeOut : ''}`}>
			<canvas ref={canvasRef} className={styles.canvas} />
			<div
				className={`${styles.loginButton} ${isHovered ? styles.hovered : ''} ${isClicked ? styles.clicked : ''}`}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				onClick={handleClick}
			>
				<div className={styles.buttonContent}>
					<div className={styles.outerRings}>
						{[...Array(3)].map((_, i) => (
							<div key={i} className={styles.ring} />
						))}
					</div>
					<div className={styles.sphere}>
						<div className={styles.sphereGlow} />
						<div className={styles.core} />
					</div>
				</div>
				<div className={`${styles.levelText} ${isHovered ? styles.levelTextVisible : ''} ${isClicked ? styles.levelTextHidden : ''}`}>
					<span className={styles.textParticles}>U</span>
					<span className={styles.textParticles}>N</span>
					<span className={styles.textParticles}>L</span>
					<span className={styles.textParticles}>O</span>
					<span className={styles.textParticles}>C</span>
					<span className={styles.textParticles}>K</span>
					<span className={styles.textParticles}>&nbsp;</span>
					<span className={styles.textParticles}>I</span>
					<span className={styles.textParticles}>D</span>
					<span className={styles.textParticles}>E</span>
					<span className={styles.textParticles}>A</span>
					<span className={styles.textParticles}>S</span>
				</div>
			</div>

			<div className={`${styles.comingSoonContainer} ${showComingSoon ? styles.comingSoonVisible : ''}`}>
				<div className={styles.textLine}>
					{"BETTER DONE".split('').map((char, index) => (
						<span
							key={`l1-${index}`}
							className={styles.comingLetter}
							style={{ animationDelay: `${index * 0.05}s` }}
						>
							{char === ' ' ? '\u00A0' : char}
						</span>
					))}
				</div>
				<div className={styles.textLine}>
					{"THAN PRFECT".split('').map((char, index) => (
						<span
							key={`l2-${index}`}
							className={styles.comingLetter}
							style={{ animationDelay: `${(index + 11) * 0.05}s` }}
						>
							{char === ' ' ? '\u00A0' : char}
						</span>
					))}
				</div>
				<div className={styles.underline}></div>
			</div>
		</main>
	)
}
