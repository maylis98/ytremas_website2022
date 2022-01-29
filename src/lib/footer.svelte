<script>
  import { slide } from 'svelte/transition';
  import Credits from '$lib/footer/credits.svelte';

  let current = undefined;
  let toggles = {
    "credits":Credits,
  };

  function p_enter(e){
    current = e;
  }

  function p_leave(){
    current = undefined;
  }
  
</script>

<footer class="
  flex
  justify-between
  px-4 py-1 bg-black
  text-sm
  text-slate-500
  uppercase
  font-roboto
  ">
  <p> ©all rights reserved</p>
  <p class="hover:text-y_yellow" on:pointerenter={()=>{p_enter("credits")}} on:pointerout={p_leave}>
    Last update 29/01/2022
  </p>
</footer>

{#key current}
{#if current != undefined}
  <aside transition:slide class="credits">
    <svelte:component this={toggles[current]}/>
  </aside>
{/if}
{/key}

<style lang="postcss">

  .credits{
    @apply
    fixed 
    z-30 
    bg-black 
    w-full 
    p-4 
    rounded-t-3xl 
    text-slate-500 
    text-right;
    bottom:4%;
  }
</style>
