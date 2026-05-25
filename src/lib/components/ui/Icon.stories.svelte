<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Icon from './Icon.svelte';

	const { Story } = defineMeta({
		title: 'ui/Icon',
		component: Icon,
		tags: ['autodocs'],
	});
</script>

<Story name="primary" />