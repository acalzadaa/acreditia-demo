<script lang="ts">
	import type { IconName } from '$lib/types/icon.types';

	interface Props {
		name: IconName;
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		color?: string;
		isFilled?: boolean;
		weight?: number;
		class?: string;
		rotate?: number;
		[key: string]: any;
	}

	let {
		name,
		size = 'md',
		color = 'currentColor',
		isFilled = false,
		weight = 2,
		class: className = '',
		rotate = 0,
		...restProps
	}: Props = $props();

	const sizeMap = {
		xs: '1em', // 16px
		sm: '1.25em', // 20px
		md: '1.5em', // 24px
		lg: '2em', // 32px
		xl: '2.5em' // 40px
	};

	const currentSize = $derived(sizeMap[size]);
</script>

<svg
	viewBox="0 0 24 24"
	fill={isFilled ? 'currentColor' : 'none'}
	stroke={color}
	stroke-width={weight}
	stroke-linecap="round"
	stroke-linejoin="round"
	width={currentSize}
	height={currentSize}
	class={className}
	aria-hidden="true"
	style:transform="rotate({rotate}deg)"
	style:display="block"
	{...restProps}
>
	<use href={`sprites.svg#${name}`} />
</svg>
