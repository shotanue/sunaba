import { useCallback, useEffect, useRef, useState } from "react";

interface Triangle {
	points: [number, number][];
	color: string;
}

interface GeometricPatternProps {
	triangleCount?: number;
	backgroundColor?: string;
	colorPalette?: string[];
	strokeOpacity?: number;
	displacementFactor?: number;
	className?: string;
	seed?: number;
}

// Seeded random number generator (Mulberry32)
function createSeededRandom(seed: number) {
	return () => {
		seed += 0x6d2b79f5;
		let t = seed;
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

const generateTriangles = (
	width: number,
	height: number,
	count: number,
	palette: string[],
	displacement: number,
	random: () => number,
): Triangle[] => {
	const triangles: Triangle[] = [];

	// Calculate grid size based on desired triangle count
	// Each cell creates 2 triangles
	const gridSize = Math.ceil(Math.sqrt(count / 2));
	const cellWidth = width / gridSize;
	const cellHeight = height / gridSize;

	// Generate grid points with displacement
	const points: [number, number][][] = [];

	for (let i = 0; i <= gridSize; i++) {
		points[i] = [];
		for (let j = 0; j <= gridSize; j++) {
			let x = i * cellWidth;
			let y = j * cellHeight;

			// Add random displacement to interior points only
			if (i > 0 && i < gridSize && j > 0 && j < gridSize) {
				x += (random() - 0.5) * cellWidth * displacement;
				y += (random() - 0.5) * cellHeight * displacement;
			}

			// Clamp edge points to boundaries
			if (i === 0) x = 0;
			if (i === gridSize) x = width;
			if (j === 0) y = 0;
			if (j === gridSize) y = height;

			points[i][j] = [x, y];
		}
	}

	// Create triangles from grid cells
	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			const topLeft = points[i][j];
			const topRight = points[i + 1][j];
			const bottomLeft = points[i][j + 1];
			const bottomRight = points[i + 1][j + 1];

			// Randomly choose diagonal direction for variety
			const useDiagonal1 = random() > 0.5;

			if (useDiagonal1) {
				// Top-left to bottom-right diagonal
				triangles.push({
					points: [topLeft, topRight, bottomRight],
					color: palette[Math.floor(random() * palette.length)],
				});
				triangles.push({
					points: [topLeft, bottomRight, bottomLeft],
					color: palette[Math.floor(random() * palette.length)],
				});
			} else {
				// Top-right to bottom-left diagonal
				triangles.push({
					points: [topLeft, topRight, bottomLeft],
					color: palette[Math.floor(random() * palette.length)],
				});
				triangles.push({
					points: [topRight, bottomRight, bottomLeft],
					color: palette[Math.floor(random() * palette.length)],
				});
			}
		}
	}

	return triangles;
};

export function GeometricPattern({
	triangleCount = 80,
	backgroundColor = "#27272a",
	colorPalette = [
		"#1f1f23",
		"#27272a",
		"#3f3f46",
		"#52525b",
		"#71717a",
		"#a1a1aa",
		"#d4d4d8",
		"#e4e4e7",
		"#f4f4f5",
	],
	strokeOpacity = 0.1,
	displacementFactor = 0.6,
	className = "",
	seed,
}: GeometricPatternProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const { width, height } = entry.contentRect;
				setDimensions({ width, height });
			}
		});

		resizeObserver.observe(container);

		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	const drawPattern = useCallback(
		(ctx: CanvasRenderingContext2D, width: number, height: number) => {
			// Clear canvas
			ctx.fillStyle = backgroundColor;
			ctx.fillRect(0, 0, width, height);

			// Create random function (seeded or default)
			const random =
				seed !== undefined ? createSeededRandom(seed) : Math.random;

			// Generate triangles
			const triangles = generateTriangles(
				width,
				height,
				triangleCount,
				colorPalette,
				displacementFactor,
				random,
			);

			// Draw triangles
			triangles.forEach((triangle) => {
				ctx.fillStyle = triangle.color;
				ctx.beginPath();
				ctx.moveTo(triangle.points[0][0], triangle.points[0][1]);
				ctx.lineTo(triangle.points[1][0], triangle.points[1][1]);
				ctx.lineTo(triangle.points[2][0], triangle.points[2][1]);
				ctx.closePath();
				ctx.fill();

				// Add subtle stroke for depth
				ctx.strokeStyle = `rgba(0, 0, 0, ${strokeOpacity})`;
				ctx.lineWidth = 1;
				ctx.stroke();
			});
		},
		[
			backgroundColor,
			seed,
			triangleCount,
			colorPalette,
			displacementFactor,
			strokeOpacity,
		],
	);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Set canvas size
		canvas.width = dimensions.width;
		canvas.height = dimensions.height;

		drawPattern(ctx, dimensions.width, dimensions.height);
	}, [dimensions, drawPattern]);

	return (
		<div ref={containerRef} className={`w-full h-full ${className}`}>
			<canvas ref={canvasRef} className="w-full h-full" />
		</div>
	);
}
