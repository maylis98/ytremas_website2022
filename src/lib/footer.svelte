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
  text-white
  uppercase
  font-roboto
  ">
  <p>All rights reserved</p>
  <p class="hover:text-y_yellow" on:pointerenter={()=>{p_enter("credits")}} on:pointerout={p_leave}>
    Last update 29/01/2022
  </p>
</footer>

{#key current}
{#if current != undefined}
  <aside transition:slide class="absolute z-30 bottom-8 bg-black w-full p-4 rounded-t-3xl text-slate-500 text-right">
    <svelte:component this={toggles[current]}/>
  </aside>
{/if}
{/key}
