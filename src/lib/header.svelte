<script>
  import { slide } from 'svelte/transition';
  import About from "$lib/header/about_toggle.svelte";
  import Contact from "$lib/header/contact_toggle.svelte";
  import Logo from '$lib/header/logo.svelte';

  let current = undefined;
  let toggles = {
    "contact":Contact,
    "about":About,
  };

  function p_enter(e){
    current = e;
  }

  function p_leave(){
    current = undefined;
  }
  
</script>

<header class="
  flex
  justify-between
  px-4 py-1 bg-black
  text-white
  uppercase
  relative
  font-roboto
">
  <h2 on:pointerenter={()=>{p_enter("about")}} on:pointerout={p_leave}>
    About
  </h2>

  <h2 on:pointerenter={()=>{p_enter("contact")}} on:pointerout={p_leave}>
    Contact
  </h2>

  {#key current}
  {#if current != undefined}
  <aside transition:slide class="absolute z-20 left-0 top-full bg-black w-full p-4">
    <svelte:component this={toggles[current]}/>
  </aside>
  {/if}
  {/key}

  <a href="/" class="absolute top-full z-10 mt-6">

  <Logo/>
  
  </a>
</header>
