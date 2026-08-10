<script lang="ts">
	import { Dialog } from 'bits-ui';
	import type { Snippet } from 'svelte';

	type Props = {
		open: boolean;
		onOpenChange: (open: boolean) => void;
		title?: string;
		titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
		titleClass?: string;
		description?: string;
		class?: string;
		children?: Snippet;
	};

	let {
		open,
		onOpenChange,
		title,
		titleLevel = 2,
		titleClass = '',
		description,
		class: className = '',
		children
	}: Props = $props();
</script>

<Dialog.Root {open} {onOpenChange}>
	<Dialog.Portal>
		<Dialog.Overlay class="modal-overlay" />
		<Dialog.Content class="modal-content {className}">
			{#if title}
				<Dialog.Title class="modal-title {titleClass}" level={titleLevel}>{title}</Dialog.Title>
			{/if}
			{#if description}
				<Dialog.Description class="modal-description">{description}</Dialog.Description>
			{/if}
			{@render children?.()}
			<Dialog.Close class="modal-close" aria-label="Close">
				<i class="fa-solid fa-xmark"></i>
			</Dialog.Close>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>