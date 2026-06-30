<script lang="ts">
	/**
	 * Agregar el nombre del id de los iconos configurados en sprites.svg
	 */
	export type IconName =
		| 'menu'
		| 'bell'
		| 'chevron-down'
		| 'chevron-right'
		| 'home'
		| 'add'
		| 'add-list'
		| 'filter'
		| 'export'
		| 'edit'
		| 'close'
		| 'delete'
		| 'warning'
		| 'success'
		| 'info'
		| 'upload'
		| 'history'
		| 'restore'
		| 'detail'
		| 'play'
		| 'calendar'
		| 'check'
		| 'eye-open'
		| 'eye-closed';

	interface Props {
		name: IconName;
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		color?: string;
		isFilled?: boolean;
		weight?: number;
		class?: string;
		rotate?: number;
		[key: string]: unknown;
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
	<use href={`/sprites.svg#${name}`} />
</svg>
