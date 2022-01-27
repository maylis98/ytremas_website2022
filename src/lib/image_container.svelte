<script>
  export let
    width = 0,
    height = 0,
    ratio = 1,
    alt = "",
    path = "";
  import {
    onMount
  } from "svelte";
  let image_el, loaded = false;
  onMount(() => {
    image_el.src = path;
  });
</script>

<div class="img-wrap" class:hide={!loaded}>
  <img
  bind:this={image_el}
  width={width}
  height={height}
  style="aspect-ratio:{ratio};"
  alt={alt}
  class:hide={!loaded}
  on:load={()=>{loaded = true;}}
  loading="lazy"
  />
</div>

<style lang="postcss">
  .img-wrap{
    @apply bg-slate-400 transition-opacity ease-in duration-300 delay-100;
  }

  img{
    @apply block 
    w-full 
    transition ease-in duration-300;
    border-radius: 2.5rem;
  }
  img.hide{
    @apply opacity-0;
  }

</style>
