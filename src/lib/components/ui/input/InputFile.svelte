<script lang="ts">
	import IconButton from '../IconButton.svelte';

	type Status = 'normal' | 'success' | 'error' | 'warning' | 'info';

	interface Props {
		name: string;
		label?: string;
		value: File | null;
		errors?: string | string[];
		required?: boolean;
		status?: Status;
		disabled?: boolean;
		class?: string;
		accept?: string[];
		maxSizeMB?: number;
		[key: string]: unknown;
	}

	let {
		name,
		label = '',
		value = $bindable(null),
		errors = [],
		required = false,
		status = 'normal',
		disabled = false,
		class: className = '',
		accept = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
		maxSizeMB = 5,
		...props
	}: Props = $props();

	let isDragging = $state(false);
	let internalError = $state('');

	// Normalizar errors externos (Zod / server action) siempre a string[]
	const externalErrorList = $derived(Array.isArray(errors) ? errors : errors ? [errors] : []);

	const errorList = $derived(
		internalError ? [...externalErrorList, internalError] : externalErrorList
	);
	const hasErrors = $derived(errorList.length > 0);

	const effectiveStatus = $derived(hasErrors ? 'error' : status);

	function getFileExtension(filename: string) {
		return filename.split('.').pop()?.toLowerCase() ?? '';
	}

	const extensionMap: Record<string, string> = {
		jpg: 'image/jpeg',
		jpeg: 'image/jpeg',
		png: 'image/png',
		gif: 'image/gif',
		pdf: 'application/pdf'
	};

	function isValidType(file: File) {
		if (accept.includes(file.type)) return true;
		const ext = getFileExtension(file.name);
		return accept.includes(extensionMap[ext]);
	}

	function isValidSize(file: File) {
		return file.size <= maxSizeMB * 1024 * 1024;
	}

	function formatFileSize(bytes: number) {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	}

	function trySetFile(file: File) {
		internalError = '';

		if (!isValidType(file)) {
			internalError = `${file.name}: tipo de archivo no válido`;
			return;
		}
		if (!isValidSize(file)) {
			internalError = `${file.name}: excede el tamaño máximo de ${maxSizeMB}MB`;
			return;
		}

		value = file;
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
		if (disabled) return;
		isDragging = true;
	}

	function handleDragLeave(event: DragEvent) {
		event.preventDefault();
		isDragging = false;
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		isDragging = false;
		if (disabled) return;
		const dropped = event.dataTransfer?.files;
		if (dropped && dropped.length > 0) {
			trySetFile(dropped[0]);
		}
	}

	function handleFileSelect(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			trySetFile(input.files[0]);
		}
		// Permitir volver a seleccionar el mismo archivo si se quita y se re-agrega
		input.value = '';
	}

	function clearFile() {
		value = null;
		internalError = '';
	}

	let acceptMimeTypes = $derived(accept.join(','));
</script>

<div
	class={[
		'form-field',
		className,
		{
			[`form-field--${effectiveStatus}`]: effectiveStatus !== 'normal'
		}
	]}
>
	{#if label}
		<label for={name} class="form-label text-caption">
			{label}
			{#if required}
				<span class="required">*</span>
			{/if}
		</label>
	{/if}

	{#if value}
		<div class="file-selected">
			<div class="file-info">
				<span class="file-name text-body-small">{value.name}</span>
				<span class="file-size text-caption-small">{formatFileSize(value.size)}</span>
			</div>
			{#if !disabled}
				<IconButton name="close" onClick={clearFile} ariaLabel={`Quitar ${value.name}`} />
			{/if}
		</div>
	{:else}
		<div
			class="dropzone"
			class:dropzone--active={isDragging}
			class:dropzone--disabled={disabled}
			ondragover={handleDragOver}
			ondragleave={handleDragLeave}
			ondrop={handleDrop}
			role="group"
			aria-labelledby={label ? name : undefined}
		>
			<div class="dropzone-content">
				{#if isDragging}
					<p class="text-body-small">Suelta el archivo aquí...</p>
				{:else}
					<p class="text-body-small">
						Deposita aquí el archivo o
						<label class="dropzone-browse">
							elige un archivo
							<input
								type="file"
								id={name}
								accept={acceptMimeTypes}
								{disabled}
								onchange={handleFileSelect}
								class="dropzone-input"
								aria-invalid={hasErrors ? 'true' : undefined}
								aria-required={required}
								aria-describedby={hasErrors ? `${name}-error` : undefined}
								{...props}
							/>
						</label>
					</p>
				{/if}

				<div class="dropzone-requirements text-caption-small">
					<span>Formatos: {accept.map((t) => t.split('/')[1]?.toUpperCase()).join(', ')}</span>
					<span>Máx: {maxSizeMB}MB</span>
				</div>
			</div>
		</div>
	{/if}

	{#if hasErrors}
		<div class="form-feedback-container" id="{name}-error" role="alert">
			{#each errorList as err (err)}
				<span class="form-feedback form-feedback--{effectiveStatus} text-body-small">
					{err}
				</span>
			{/each}
		</div>
	{/if}
</div>

<style>
	.dropzone {
		border: var(--form-input-border-width) dashed var(--form-input-border);
		border-radius: var(--form-input-border-radius);
		padding: var(--space-6);
		text-align: center;
		background-color: var(--form-input-bg);
		transition:
			border-color 0.2s ease,
			background-color 0.2s ease;
	}

	.dropzone:hover:not(.dropzone--disabled) {
		border-color: var(--form-input-border-hover);
		background-color: var(--form-input-bg-hover);
	}

	.dropzone--active {
		border-color: var(--form-input-border-focus);
		background-color: var(--form-input-bg-focus);
		box-shadow: 0 0 0 3px var(--primary-100);
	}

	.dropzone--disabled {
		background-color: var(--form-input-bg-disabled);
		cursor: not-allowed;
		opacity: 0.7;
	}

	.form-field--error .dropzone {
		border-color: var(--form-input-border-error);
	}

	.form-field--success .dropzone {
		border-color: var(--form-input-border-success);
	}

	.form-field--warning .dropzone {
		border-color: var(--form-input-border-warning);
	}

	.dropzone-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		align-items: center;
		color: var(--text-muted);
	}

	.dropzone-browse {
		color: var(--border-brand);
		text-decoration: underline;
		cursor: pointer;
	}

	.dropzone--disabled .dropzone-browse {
		cursor: not-allowed;
		pointer-events: none;
	}

	.dropzone-input {
		position: absolute;
		width: 1px;
		height: 1px;
		opacity: 0;
		overflow: hidden;
	}

	.dropzone-requirements {
		display: flex;
		gap: var(--space-3);
		color: var(--text-placeholder);
	}

	.file-selected {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3);
		padding: var(--space-2) var(--space-3);
		background-color: var(--bg-raised);
		border: var(--border-input);
		border-radius: var(--form-input-border-radius);
	}

	.file-info {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		flex-wrap: wrap;
		min-width: 0;
	}

	.file-name {
		color: var(--text-on-surface);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.file-size {
		color: var(--text-muted);
	}

	.file-remove {
		flex-shrink: 0;
		background: none;
		border: none;
		font-size: var(--size-3);
		line-height: 1;
		cursor: pointer;
		color: var(--text-muted);
		padding: 0 var(--space-1);
	}

	.file-remove:hover {
		color: var(--form-feedback-error);
	}

	.form-feedback-container {
		margin-top: var(--form-feedback-margin-top);
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}
</style>
