import { watch } from 'fs';
import { join } from 'path';
import { refreshTemplateWorkerCommand } from '@kksh/api/dev';
import { $ } from 'bun';

const entrypoints = ['./headless-src/index.ts'];

async function build() {
	try {
		for (const entrypoint of entrypoints) {
			await $`bun build --minify --target=browser --outdir=./headless-dist ${entrypoint}`;
		}
		if (Bun.argv.includes('dev')) {
			await refreshTemplateWorkerCommand();
		}
	} catch (error) {
		console.error(error);
	}
}

const srcDir = join(import.meta.dir, 'headless-src');

await build();

if (Bun.argv.includes('dev')) {
	console.log(`Watching ${srcDir} for changes...`);
	watch(srcDir, { recursive: true }, async (event, filename) => {
		await build();
	});
}
