<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import IconButton from './IconButton.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'ui/IconButton',
		component: IconButton,
		tags: ['autodocs'],
		argTypes: {
			name: {
				control: 'select',
				options: [
					'home',
					'search',
					'settings',
					'user',
					'menu',
					'close',
					'chevron-left',
					'chevron-right'
				],
				description: 'Nombre del icono a mostrar'
			},
			variant: {
				control: 'radio',
				options: ['ghost', 'icon'],
				description: 'Variante del botón'
			},
			borderShape: {
				control: 'radio',
				options: ['round', 'square'],
				description: 'Forma del borde'
			},
			size: {
				control: 'radio',
				options: ['sm', 'md', 'lg'],
				description: 'Tamaño del botón'
			},
			isActive: {
				control: 'boolean',
				description: 'Estado activo (sostenido)'
			},
			isFilled: {
				control: 'boolean',
				description: 'Icono relleno o outline'
			},
			isDisabled: {
				control: 'boolean',
				description: 'Estado deshabilitado'
			},
			type: {
				control: 'radio',
				options: ['button', 'submit', 'reset'],
				description: 'Tipo de botón HTML'
			},
			ariaLabel: {
				control: 'text',
				description: 'Etiqueta ARIA para accesibilidad'
			},
			ariaExpanded: {
				control: 'boolean',
				description: 'Estado ARIA expanded'
			},
			ariaControls: {
				control: 'text',
				description: 'ID del elemento controlado'
			}
		},
		args: {
			name: 'home',
			variant: 'ghost',
			borderShape: 'round',
			size: 'md',
			isActive: false,
			isFilled: false,
			isDisabled: false,
			type: 'button',
			ariaLabel: 'Home',
			onClick: fn(),
			onKeyboardHandler: fn()
		},
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component:
						'IconButton component with multiple variants and states for icon-based interactions.'
				}
			}
		}
	});
</script>

<!-- Variantes principales -->
<Story
	name="Ghost"
	args={{
		name: 'home',
		variant: 'ghost'
	}}
/>

<Story
	name="Icon"
	args={{
		name: 'home',
		variant: 'icon'
	}}
/>
