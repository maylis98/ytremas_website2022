<script>
  import { spring } from 'svelte/motion';

  let carousel;
  let fake_offset = spring(10,{
    stiffness: 0.1,
    damping: 0.8
  });

  let updateInterval = undefined, direction = 0;

  function pointerIn(new_direction){
    if(updateInterval != undefined) return;
    direction = new_direction;
    updateFunc();
    updateInterval = setInterval(updateFunc, 100);
  }

  function pointerOut(){
    if(updateInterval == undefined) return;
    clearInterval(updateInterval);
    updateInterval = undefined;
  }

  function updateFunc(){
    let value = ((carousel.clientWidth * .1) * direction);
    updateScroll(value);
  }

  function wheel(e){
    e.preventDefault();
    updateScroll(e.deltaY * 2);
  }

  function updateScroll(input_value){
    let new_value = Math.min(Math.max($fake_offset + input_value, 0), (carousel.scrollWidth-carousel.clientWidth));
    fake_offset.set(new_value);
  }

  $ : if(carousel) carousel.scrollLeft = $fake_offset;

</script>

<svg class="carousel-arrows left"
  on:pointerover={()=>{pointerIn(-1);}} on:pointerleave={pointerOut}
  viewBox="0 0 20 47" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M17.9595 45C18.3878 37.8333 15.5955 23.5 0.999999 23.5C6.65317 23.3914 17.9595 18.9394 17.9595 2" stroke="#DBFF00" stroke-width="3" stroke-linecap="round"/>
</svg>

<svg class="carousel-arrows right"
  on:pointerover={()=>{pointerIn(1);}} on:pointerleave={pointerOut}
  viewBox="0 0 20 47" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2.04048 2C1.61221 9.16667 4.40453 23.5 19 23.5C13.3468 23.6086 2.04048 28.0606 2.04048 45" stroke="#DBFF00" stroke-width="3" stroke-linecap="round"/>
</svg>

<div bind:this={carousel} on:wheel={wheel} class="carousel relative w-full h-full">
  <div class="c-wrap">
    <slot></slot>
  </div>
</div>

<style lang="postcss">
  .carousel{
    @apply relative 
    w-full h-full 
    overflow-y-hidden;
    scrollbar-width: none;
  }
  .c-wrap{
    @apply absolute flex h-full w-full;
  }
  .carousel-arrows{
    @apply absolute z-20 w-6 top-1/2 -translate-y-1/2;
  }

  .carousel-arrows.left{
    @apply left-6;
  }

  .carousel-arrows.right{
    @apply right-6;
  }

  ::-webkit-scrollbar {
    display: none;
  }
  
</style>
