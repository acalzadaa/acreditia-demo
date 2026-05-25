<script lang="ts">
	import IconButton from '../ui/IconButton.svelte';
	import { page } from '$app/state';
	import Icon from '../ui/Icon.svelte';

	interface Props {
		onClickNavigationBar: (e: MouseEvent) => void;
		onKeydownNavigationBar: (e: KeyboardEvent) => void;
		onClickNotificationBar: (e: MouseEvent) => void;
		onKeydownNotificationBar: (e: KeyboardEvent) => void;
		showNavigationBar: boolean;
		showNotificationBar: boolean;
	}

	const {
		onClickNavigationBar,
		onKeydownNavigationBar,
		onClickNotificationBar,
		onKeydownNotificationBar,
		showNavigationBar = false,
		showNotificationBar = false,
	}: Props = $props();

	let segments = $derived(page.url.pathname.split('/').filter(Boolean));
	let isDashboardHome = $derived(segments.length === 1 && segments[0] === 'dashboard');
	let isHomeFilled = $derived(isDashboardHome);

	let breadCrumbItems = $derived(
		segments.map((segment, index) => {
			const path = '/' + segments.slice(0, index + 1) + '/';
			const label = segment
				.split('-')
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(' ');
			const isLast = index === segments.length - 1;
			return { label, path, isLast };
		})
	);
</script>

<nav
	class="subheader subheader-panel"
	aria-label="Control de navegacion y notificaciones"
>
	<section class="navigation-control">
		<IconButton
			name={"hamburger"}
			variant={'ghost'}
			size='md'
			shape={'round'}
			isActive={showNavigationBar}
			onClick={onClickNavigationBar}
			onKeydown={onKeydownNavigationBar}
			ariaLabel={showNavigationBar ? 'Ocultar barra de navegacion' : 'Mostrar barra de navegacion'}
			ariaExpanded={showNavigationBar}
			ariaControls="navbar-panel"
		/>
		<a href="/dashboard" class="home-link text-body" aria-label="Ir al dashboard">
			<Icon name="home" variant="ghost" isFilled={isHomeFilled} />
			<span>Home</span>
		</a>

		{#if !isDashboardHome}
			<span class="separator text-body" aria-hidden="true">/</span>
			<div class="breadcrumb-list text-body">
				{#each breadCrumbItems as item, index (item.path)}
					{#if item.isLast}
						<span class="breadcrumb-current" aria-current="page">
							{item.label}
						</span>
					{:else}
						<a href={item.path} class="breadcrumb-link">
							{item.label}
						</a>

						{#if index < breadCrumbItems.length - 1}
							<span class="separator" aria-hidden="true"></span>
						{/if}
					{/if}
				{/each}
			</div>
		{/if}
	</section>

	<section class="notification-control">
		<IconButton
			name={"bell"}
			variant={'ghost'}
			shape={'round'}
			isActive={showNotificationBar}
			isFilled={showNotificationBar}
			onClick={onClickNotificationBar}
			onKeydown={onKeydownNotificationBar}
			ariaLabel="{showNotificationBar
				? 'Ocultar barra de notificaciones'
				: 'Mostrar barra de notificaciones'}}"
			ariaExpanded={showNotificationBar}
			ariaControls="notification-panel"
		></IconButton>
	</section>
</nav>

<style>
	/* Subheader */
	.subheader-panel {
		grid-area: subheader;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid var(--border-regular);
		background-color: var(--bg-raised);
		box-shadow: var(--shadow-sm);
	}
	.navigation-control,
	.notification-control {
		padding: var(--space-2) var(--space-4);
	}

	.navigation-control {
		display: flex;
		align-items: center;
		gap: 15px;
	}

	/* Home link styling */
	.home-link {
		border-left: var(--border-width-regular) solid var(--border-regular);
		display: flex;
		align-items: center;
		text-decoration: none;
		color: var(--bg-brand-primary);
		padding-left: 20px;
		gap: 10px;
	}

	/* Breadcrumb styles */
	.breadcrumb-list {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.separator {
		color: var(--text-muted);
	}

	.breadcrumb-link {
		color: var(--primary-500);
		text-decoration: none;
		padding: var(--space-1) var(--space-2);
		border-radius: var(--border-radius-sm);
		transition: background-color 0.2s;
	}

	.breadcrumb-link:hover {
		background-color: var(--bg-raised-hover);
		text-decoration: underline;
	}

	.breadcrumb-current {
		color: var(--text-muted);
		padding: var(--space-1) var(--space-2);
	}

	/* Responsive: on mobile, hide breadcrumb if too long? */
	@media (max-width: 768px) {
		.breadcrumb-link,
		.breadcrumb-current {
			font-size: 0.85rem;
		}
	}
</style>
