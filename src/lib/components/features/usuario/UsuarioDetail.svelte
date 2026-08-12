<script lang="ts">
	import EmptySection from '$lib/components/common/EmptySection.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import PageHeader from '$lib/components/common/PageHeader.svelte';
	import CardColumn from '$lib/components/ui/card/CardColumn.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardContent from '$lib/components/ui/card/CardContent.svelte';
	import CardContentItem from '$lib/components/ui/card/CardContentItem.svelte';
	import type { UsuarioItem } from '$lib/schemas/usuario.schema';
	
	interface Props {
		item?: UsuarioItem;
		showHeader?: boolean;
		title?: string;
		subtitle?: string;
	}

	const { item, showHeader = true, title = 'Detalle de usuario', subtitle = '' }: Props = $props();
</script>

<main class="main-panel--inline">
	{#if showHeader}
		<PageHeader {title} {subtitle} />
	{/if}

	<section class="list-view--table">
		{#if item}
			<div class="table-container">
				<table class="data-table text-body">
					<thead class="text-body-strong">
						<tr>
							<th class="col-label">Código</th>
							<th class="col-label">Email</th>
							<th class="col-label">Nombre</th>
							<th class="col-label">Apellido</th>
							<th class="col-badge">Estatus</th>
						</tr>
					</thead>

					<tbody class="text-body">
							<tr class="table-row tr-expandable">
								<td class="col-label">{item.authUserId}</td>
								<td class="col-label">{item.email}</td>
								<td class="col-label">{item.firstName}</td>
								<td class="col-text">{item.lastName}</td>
								<td class="col-badge">
									<Badge variant={item.isDeleted ? 'error' : 'success'}>
										{item.isDeleted ? 'borrado' : 'activo'}
									</Badge>
								</td>
							</tr>
					</tbody>
				</table>
			</div>
		{:else}
			<EmptySection />
		{/if}
	</section>

	<section class="list-view--cards">
		{#if item}
			<CardColumn minWidth="360px" maxWidth="2700px">
					<Card>
						<CardHeader subtitle={item.authUserId} title={item.email}>
							<Badge variant={item.isDeleted ? 'error' : 'success'}>
								{item.isDeleted ? 'borrado' : 'activo'}
							</Badge>
						</CardHeader>

						<CardContent>
							<CardContentItem label="Nombre" value={item.firstName} />
							<CardContentItem label="Apellido" value={item.lastName} />
						</CardContent>
					</Card>
			</CardColumn>
		{:else}
			<EmptySection message="No hay elementos"></EmptySection>
		{/if}
	</section>
</main>

<style>
	/* Por default (>= 1500px) gana la tabla; las cards quedan ocultas
	   y fuera del flujo para no pelear por el flex del panel. */
	.list-view--table {
		display: contents;
	}

	.list-view--cards {
		display: none;
	}

	/* Ajustar el max-width dependiendo el contenido! */
	@media (max-width: 2700px) {
		.list-view--table {
			display: none;
		}

		.list-view--cards {
			display: flex;
			flex-direction: column;
			flex: 1;
			min-height: 0;
		}
	}
</style>
