<script lang="ts">
	import { clipboard, toast, ui } from '@kksh/api/ui/custom';
	import { Button } from '@kksh/svelte5';
	import { onMount } from 'svelte';
	import { Inspect } from 'svelte-inspect-value';

	let rawJson = $state('');
	let jsonData = $state(undefined);

	function loadJsonFromClipboard() {
		clipboard.readText().then((text) => {
			rawJson = text;
		});
	}

	onMount(() => {
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				ui.goBack();
			}
		});
		ui.showBackButton({
			bottom: 0.5,
			right: 0.5
		});
		ui.hideMoveButton();
		loadJsonFromClipboard();
	});

	$effect(() => {
		if (!rawJson) return;
		try {
			jsonData = JSON.parse(rawJson);
		} catch (error) {
			toast.error('Invalid JSON');
		}
	});
</script>

<div class="h-12" data-kunkun-drag-region></div>
<main class="container">
	<Inspect value={jsonData} />
	<div class="fixed bottom-2 left-0 grid w-full grid-cols-2 justify-center gap-2 px-2">
		<Button
			onclick={() => {
				clipboard
					.writeText(JSON.stringify(jsonData, null, 2))
					.then(() => {
						toast.success('Copied to Clipboard');
					})
					.catch(() => {
						toast.error('Failed to copy to clipboard');
					});
			}}
			disabled={!jsonData}
			class="">Copy to Clipboard</Button
		>
		<Button onclick={loadJsonFromClipboard} class="">Load JSON from Clipboard</Button>
	</div>
</main>
