<script>
  import { slide } from 'svelte/transition';
  import About from "$lib/header/about_toggle.svelte";
  import Contact from "$lib/header/contact_toggle.svelte";
  import ExperienceToggle from "$lib/header/experience_toggle.svelte";

  let current = undefined;
  let toggles = {
    "contact":Contact,
    "about":About,
    "experience":ExperienceToggle,
  };

  function p_enter(e){
    current = e;
  }

  function p_leave(){
    current = undefined;
  }
  
</script>

<header class="
  z-50
  flex
  justify-between
  px-4 py-1 bg-black
  text-white
  uppercase
  relative
  font-roboto
">
  <h2 class="hover:text-y_yellow" on:pointerenter={()=>{p_enter("about")}} on:pointerout={p_leave}>
    About
  </h2>

  <h2 class="hover:text-y_yellow" on:pointerenter={()=>{p_enter("experience")}} on:pointerout={p_leave}>
    Experience
  </h2>

  <h2 class="hover:text-y_yellow" on:pointerenter={()=>{p_enter("contact")}} on:pointerout={p_leave}>
    Contact
  </h2>

  {#key current}
  {#if current != undefined}
    <aside transition:slide class="absolute z-20 left-0 top-full bg-black w-full p-4 rounded-b-3xl">
      <svelte:component this={toggles[current]}/>
    </aside>
  {/if}
  {/key}

  <!-- <a href="/" class="absolute top-full z-10 mt-6">
  <Logo/>
  </a> -->
</header>
