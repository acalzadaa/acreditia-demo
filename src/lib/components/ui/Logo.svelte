<script lang="ts">
	interface Props {
		companyName?: string;
		logoSrc?: string;
		alt?: string;
		size?: number; // en rem
	}

	let { companyName = '', logoSrc = '', alt = 'Logo', size = 4 }: Props = $props();

	let imageError = $state(false);

	function getInitials(): string {
		if (!companyName) return '?';

		// Manejar nombres de empresas comunes
		const words = companyName.trim().split(/\s+/);

		if (words.length === 1) {
			// Si es una palabra, tomar hasta 2 letras
			return words[0]!.slice(0, 2).toUpperCase();
		}

		// Tomar primera letra de primera y última palabra
		return (words[0]!.charAt(0) + words[words.length - 1]!.charAt(0)).toUpperCase();
	}

	$effect(() => {
		if (logoSrc) imageError = false;
	});
</script>

<div class="logo-container" style="--size: {size}rem">
	{#if logoSrc && !imageError}
		<img
			src={logoSrc}
			alt={alt || companyName || 'Logo'}
			class="logo-image"
			onerror={() => (imageError = true)}
			loading="eager"
		/>
	{:else}
		<div
			class="logo-placeholder"
			style="background-color: var(--neutral-400)"
			aria-label={alt || companyName || 'Logo'}
		>
			<span class="logo-initials">
				{getInitials()}
			</span>
		</div>
	{/if}
</div>

<style>
	.logo-container {
		display: flex;
		align-items: center;
		height: 60px;
		width: 60px;
	}

	.logo-image,
	.logo-placeholder {
		width: 60px;
		height: 60px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.logo-image {
		object-fit: cover;
	}

	.logo-placeholder {
		background-color: var(--secondary-200);
		color: var(--text-primary);
	}

	.logo-initials {
		font-weight: 600;
		font-size: calc(var(--size) * 0.4);
		color: white;
		text-transform: capitalize;
	}
</style>
