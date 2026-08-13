<script lang="ts">
	/**
	 * Dot — punto/indicador circular.
	 *
	 * Uso:
	 * <Dot size="md" color="var(--bg-brand-primary)" />
	 * <Dot size="sm" color="var(--bg-success-bold)" borderColor="var(--bg-sunken)" />
	 */
	export type DotSize = 'xs' | 'sm' | 'md' | 'lg';

	interface Props {
		size?: DotSize;
		color?: string;
		borderColor?: string;
		borderWidth?: string;
	}

	let {
		size = 'md',
		color = 'var(--bg-brand-primary)',
		borderColor = '',
		...rest
	}: Props = $props();

	const sizeMap = {
		xs: '0.25em',
		sm: '0.5rem',
		md: '1rem',
		lg: '1.5rem'
	};
	const dimension = $derived(sizeMap[size]);
</script>

<span
	class="dot"
	style:width={dimension}
	style:height={dimension}
	style:background-color={color}
	style:border={borderColor ? `var(--border-dot)` : 'none'}
	{...rest}
></span>

<style>
	.dot {
		display: inline-block;
		flex-shrink: 0;
		border-radius: var(--border-radius-full, 9999px);
		box-sizing: border-box;
	}
</style>
