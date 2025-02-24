<script lang="ts">
	import { clipboard, toast, ui } from '@kksh/api/ui/custom';
	import { Button } from '@kksh/svelte5';
	import { onMount } from 'svelte';
	import { Inspect } from 'svelte-inspect-value';

	let rawJson = $state('');
	let jsonData = $state({});

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
	<div class="fixed bottom-5 left-0 flex w-full justify-center">
		<Button onclick={loadJsonFromClipboard} class="w-[95vw]">Load JSON from Clipboard</Button>
	</div>
</main>
