<script lang="ts">
	import IconButton from '../ui/IconButton.svelte';
	import Breadcrumb from '../ui/Breadcrumb.svelte';

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
		showNotificationBar = false
	}: Props = $props();
</script>

<nav class="subheader subheader-panel" aria-label="Control de navegacion y notificaciones">
	<section class="navigation-control">
		<IconButton
			name="hamburger"
			variant="ghost"
			size="md"
			shape="round"
			isActive={showNavigationBar}
			onClick={onClickNavigationBar}
			onKeydown={onKeydownNavigationBar}
			ariaLabel={showNavigationBar ? 'Ocultar barra de navegacion' : 'Mostrar barra de navegacion'}
			ariaExpanded={showNavigationBar}
			ariaControls="navbar-panel"
		/>

		<div class="breadcrumb-wrapper text-body">
			<Breadcrumb />
		</div>
	</section>

	<section class="notification-control">
		<IconButton
			name="bell"
			variant="ghost"
			shape="round"
			isActive={showNotificationBar}
			isFilled={showNotificationBar}
			onClick={onClickNotificationBar}
			onKeydown={onKeydownNotificationBar}
			ariaLabel={showNotificationBar
				? 'Ocultar barra de notificaciones'
				: 'Mostrar barra de notificaciones'}
			ariaExpanded={showNotificationBar}
			ariaControls="notification-panel"
		/>
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
		gap: var(--space-2);
	}

	/* Separador visual entre hamburger y breadcrumb */
	.breadcrumb-wrapper {
		border-left: var(--border-width-regular) solid var(--border-regular);
		padding-left: var(--space-4);
	}

	@media (max-width: 768px) {
		.breadcrumb-wrapper {
			font-size: 0.85rem;
		}
	}
</style>
