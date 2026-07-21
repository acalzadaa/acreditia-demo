<main class="main-container">
	<!-- Main Panel - Header Section -->
	<section class="main-panel">
		<h1 class="main-panel--header">Mi Panel Principal</h1>
		<p class="main-panel--subheader" style:margin-top="var(--space-2)">
			Bienvenido a su herramienta de mejora continua
		</p>
		
	</section>

	<!-- Dashboard Panel - Content Section -->
	<section class="dashboard-panel">
		<div class="dashboard-panel--item">
			<h3 class="dashboard-panel--title">Indicadores de Calidad</h3>
			<p class="dashboard-panel--content">
				Espacio para gráficos, métricas o cualquier contenido relevante
			</p>
		</div>

		<div class="dashboard-panel--item">
			<h3 class="dashboard-panel--title">Documentación</h3>
			<p class="dashboard-panel--content">Espacio para listas de documentos o archivos recientes</p>
		</div>

		<div class="dashboard-panel--item">
			<h3 class="dashboard-panel--title">Evaluaciones</h3>
			<p class="dashboard-panel--content">Espacio para calendarios o próximas evaluaciones</p>
		</div>
	</section>
</main>

<style>
	/* Main */
	.main-container {
		overflow-y: auto;
		grid-area: main;
		padding: var(--space-6);
		background-color: var(--bg-ground);
		z-index: var(--z-main);
	}

	.main-panel {
		overflow-y: auto;
		max-width: var(--container-max-width);
		margin: 0 auto;
		display: flex;
		flex-direction: column;
	}

	.main-panel--header {
		display: flex;
		justify-content: center;
	}

	.main-panel--subheader {
		display: flex;
		justify-content: center;
	}

	.dashboard-panel {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
		margin-top: var(--space-8);
	}

	.dashboard-panel--item {
		padding: var(--space-6);
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		transition: all var(--transition-fast);
	}

	.dashboard-panel--title {
		margin-bottom: var(--space-4);
		color: var(--text-primary);
	}
</style>
