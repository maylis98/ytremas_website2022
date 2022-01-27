<script>
	import Header from "$lib/header.svelte";
	import Footer from "$lib/footer.svelte";
	import '../app.css';
</script>

<svelte:head>
	<title>YTremas</title>
</svelte:head>

<div class="root-wrap">
	<Header/>
	
	<main class="bg-y_yellow cursor-crosshair">
		<slot></slot>
	</main>

	<Footer/>
</div>
