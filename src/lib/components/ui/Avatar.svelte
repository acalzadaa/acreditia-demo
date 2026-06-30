<script lang="ts">
	interface Props {
		src?: string;
		username?: string;
		size?: number;
	}

	let { src = '', username = '', size = 48 }: Props = $props();

	let imageError = $state(false);

	const identiconSeed = $derived(username || 'default');

	// Generar hash simple
	function hashCode(str: string): number {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = (hash << 5) - hash + str.charCodeAt(i);
			hash |= 0;
		}
		return Math.abs(hash);
	}

	// Generar patrón simétrico 5x5
	function generatePattern(hash: number): boolean[][] {
		const pattern: boolean[][] = Array(5)
			.fill(null)
			.map(() => Array(5).fill(false));
		let hashValue = hash;

		for (let y = 0; y < 5; y++) {
			for (let x = 0; x < 3; x++) {
				const bit = hashValue & 1;
				pattern![y]![x] = bit === 1;
				pattern![y]![4 - x] = bit === 1;
				hashValue >>= 1;
				if (hashValue === 0) hashValue = hash;
			}
		}

		return pattern;
	}

	// Generar colores basados en el hash usando OKLCH
	function getColors(hash: number): { primary: string; secondary: string } {
		// OKLCH: lightness (0-1), chroma (0-0.4 typical), hue (0-360)
		const hue = hash % 360;

		// Lightness: entre 0.55 y 0.75 (más brillante que HSL)
		const lightness = 0.55 + (hash % 25) / 100;

		// Chroma: entre 0.12 y 0.28 (colores vibrantes pero naturales)
		const chroma = 0.12 + (hash % 17) / 100;

		// Para el color secundario: hue + 40, chroma ligeramente reducido, lightness más oscuro
		const secondaryHue = (hue + 40) % 360;
		const secondaryLightness = lightness - 0.1;
		const secondaryChroma = Math.max(0.08, chroma - 0.04);

		return {
			primary: `oklch(${lightness} ${chroma} ${hue})`,
			secondary: `oklch(${secondaryLightness} ${secondaryChroma} ${secondaryHue})`
		};
	}

	const hash = $derived(hashCode(identiconSeed));
	const pattern = $derived(generatePattern(hash));
	const colors = $derived(getColors(hash));
	const scale = 5;

	$effect(() => {
		if (src) {
			imageError = false;
		}
	});
</script>

{#if src && !imageError}
	<img
		{src}
		alt="Avatar"
		class="avatar-image"
		style:width="{size}px"
		style:height="{size}px"
		onerror={() => (imageError = true)}
		loading="lazy"
	/>
{:else}
	<div class="avatar-identicon" style:width="{size}px" style:height="{size}px">
		<svg width={size} height={size} viewBox="0 0 {scale} {scale}" style="border-radius: 20%;">
			{#each pattern as row, y}
				{#each row as active, x}
					{#if active}
						<rect
							{x}
							{y}
							width="1"
							height="1"
							fill={colors.primary}
							stroke={colors.primary}
							stroke-width="0.05"
						/>
					{/if}
				{/each}
			{/each}
		</svg>
	</div>
{/if}

<style>
	.avatar-image,
	.avatar-identicon {
		width: 3rem;
		height: 3rem;
		border-radius: var(--border-radius-full);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		border: var(--border-avatar);
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease,
			border-color 0.2s ease;
	}

	.avatar-image {
		object-fit: cover;
	}

	.avatar-identicon {
		padding: 0;
		overflow: hidden;
		background-color: white;
	}

	.avatar-image:hover,
	.avatar-identicon:hover {
		transform: scale(1.05);
		box-shadow: var(--shadow-avatar);
		border-color: var(--border-strong);
	}
</style>
