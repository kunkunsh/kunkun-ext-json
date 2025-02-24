import { clipboard, expose, HeadlessCommand, toast } from '@kksh/api/headless';

const rawTestString = `{"version":"0.1.27","notes":"See the assets to download this version and install.","pub_date":"2025-02-22T13:51:47.306Z","platforms":{"darwin-aarch64":{"signature":"dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVTRDFLZzdicjlNZFJ3N0ZYaVdzdzVGSzVxUXNWejVMcVJJeWRvTkN2NytYWSs0azlXV3kwZlgyNVpnMHh0OE9XZmdxL0l2bk1wUzBZckQzUTgyaHNyTytTRHFncmxRMUFJPQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzQwMjMxNjI1CWZpbGU6a3Vua3VuLmFwcC50YXIuZ3oKcFBJaFJuTzFua1UrcjNLT2lYelptL0kzOE8yWHRzNkFXK2lJNzJvQ2xWOFY0U2JWNTY4bmc3TUV5Unh6U0pNaWt6cEE5UkRYS0FzSzNJampXMzBiQlE9PQo=","url":"https://download.kunkun.sh/Kunkun-v0.1.27/kunkun_aarch64.app.tar.gz"},"linux-x86_64":{"signature":"dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVTRDFLZzdicjlNZFV0NGRRcVlrVnppZnVVZE5BYXJKZzdVaCt2ZnJKT0NzQkRqT0FmWU5CV3h5REwvb3hybE1jazFVMk1GQTNxeGw5eERMTXFnMGVNRk85WmMyaXJkK2djPQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzQwMjMxNzc1CWZpbGU6a3Vua3VuXzAuMS4yN19hbWQ2NC5BcHBJbWFnZQpRVVFnMm5nRHU1alpXSnF5Y2xVUFN2UjZvRzJIN3NVQzRLakpoUEpSbzV2K0lLSzhLb3QxU1RtWmNZQVdJNWxpdzVxRzJwb25IdFRYUUNUdDE2b3NBQT09Cg==","url":"https://download.kunkun.sh/Kunkun-v0.1.27/kunkun_0.1.27_amd64.AppImage"},"darwin-x86_64":{"signature":"dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVTRDFLZzdicjlNZFNEUlJvTXF4K0oyaGlCekRPSTNuZGIvbmYwRSs5ZFJvbmgyL3F0UldTZFVqN3A5MTdwZENyMDI0OCtQdzdZQ0N6Y3cyeEQwekRXTFpJRHdhSENtNEFFPQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzQwMjMxOTU5CWZpbGU6a3Vua3VuLmFwcC50YXIuZ3oKSHhjeG5MKzg4dkZJdm5oZ2p5amIraVB4bHdNMjFReWN0aTMrNVB2c0lSMWU4RUd3aEdEUW1BbUk3UDNDNHNHSUFubFpyTjRFck0xSFBFRDY3b2FHQkE9PQo=","url":"https://download.kunkun.sh/Kunkun-v0.1.27/kunkun_x64.app.tar.gz"},"windows-x86_64":{"signature":"dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVTRDFLZzdicjlNZFFnV2NPVlNwRnlQS2tFWnJvbU40ZG9XaUp6RWhINHhnRGxZOVplSWNzbFh1Y3J6NU9CVmtPUGE3cE5OelUxRzVzVTZkWFJUQ1RydFBWOWdaTlZuRXc0PQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzQwMjMyMzA0CWZpbGU6a3Vua3VuXzAuMS4yN194NjRfZW4tVVMubXNpCmQ1RWVQeGpuTzNuOVZoV1VoeVlYYkJ0Z1ducnFkRm83R0dmc3V5KzYyUHlzVytCNHlBcmlNbVlTcjBXNUFFdGEzTFJPcG9zTTgyaGkrQ0RwMjFRTEJnPT0K","url":"https://download.kunkun.sh/Kunkun-v0.1.27/kunkun_0.1.27_x64_en-US.msi"}}}`;

class JSONFormatter extends HeadlessCommand {
	async load() {
		try {
			const text = await clipboard.readText();
			const json = JSON.parse(text);
			await clipboard.writeText(JSON.stringify(json, null, 2));
			await toast.success('JSON formatted');
		} catch (error) {
			console.error(error);
			toast.error('Failed to format JSON');
		}
	}
}

expose(new JSONFormatter());
