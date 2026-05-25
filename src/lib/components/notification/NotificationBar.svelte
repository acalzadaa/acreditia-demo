<script lang="ts">
	interface Props {
		showNotificationBar: boolean;
	}

	const { showNotificationBar }: Props = $props();
</script>

{#if showNotificationBar}
	<section class="notification-panel" aria-label="Panel de Notificaciones">
		<h3 class="notification-panel--header text-body">Notificaciones</h3>
		<div class="notification-panel--content text-body">
			<ul class="notification-list text-body-sm">
				<li class="notification-list--item">
					<span class="notification-list--dot" aria-hidden="true"></span>
					<span>Nuevo documento de acreditación</span>
				</li>
				<li class="notification-list--item">
					<span class="notification-list--dot"></span>
					<span>Recordatorio: Revisión FIMPES</span>
				</li>
				<li class="notification-list--item">
					<span class="notification-list--dot"></span>
					<span>Evaluación de calidad completada</span>
				</li>
			</ul>
		</div>
	</section>
{/if}

<style>
	/* notification */
	.notification-panel {
		position: absolute;
		display: flex;
		flex-direction: column;
		top: calc(var(--header-height) + var(--subheader-height));
		right: 0;
		width: 200px;
		box-shadow: var(--shadow-md);
		border: var(--border-width-thin) solid var(--border-light);
		border-radius: var(--border-radius-none);
		border-top-left-radius: var(--border-radius-lg);
		border-bottom-left-radius: var(--border-radius-lg);
		animation: slideDown 0.3s ease-in-out;
		z-index: var(--z-drawer);
		background-color: var(--bg-drawer);
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.notification-panel--header {
		padding: var(--space-4);
		text-align: left;
		border-bottom: var(--border-width-thin) solid var(--border-regular);
		background-color: var(--bg-drawer); /* Mismo fondo */
	}

	.notification-panel--content {
		padding: 0 var(--space-4) var(--space-4) var(--space-4);
	}

	/* Notification List */
	.notification-list {
		display: flex;
		flex-direction: column;
		margin: 0;
		padding: 2px;
		list-style: none;
	}

	.notification-list--item {
		gap: 10px 10px;
		display: flex;
		align-items: center;
		padding: var(--space-4);
		border: var(--border-width-thin) solid var(border-regular);
		border-radius: var(--border-radius-md);
		cursor: pointer;
		transition: background-color 0.2s ease;
		background-color: transparent;
	}

	.notification-list--item:hover {
		background-color: var(--bg-raised-hover);
		cursor: pointer;
	}

	.notification-list--dot {
		flex-shrink: 0;
		width: 8px;
		height: 8px;
		background-color: var(--secondary-500);
		border-radius: var(--border-radius-full);
	}
</style>
