<script context="module">
  export async function load({
    fetch
  }) {
    const projects_list = await fetch(`/data/projects_list.json`)
      .then((r) => r.json());
    return {
      props: {
        projects_list
      }
    };
  }
</script>
<script>
  export let projects_list;
  import ImageContainer from "$lib/image_container.svelte"
  import Carousel from "$lib/carousel/carousel.svelte"
  import Logo from "$lib/header/logo.svelte";

</script>

<a href="/" class="absolute top-7 left-4 z-10 mt-6">
  <div
   style="width:250%; height:auto;">
   <Logo/>
  </div>
</a>

<Carousel>
{#each projects_list as project}
  <a href="/{project.slug}"
  class="relative"
    style="
  aspect-ratio: {project.vignette.ratio};
  height:100%; width:auto;">
  
    <h3 class="title-carousel">{project.title}</h3>
    <ImageContainer {...project.vignette}/>
  </a>
{/each}
</Carousel>

<style lang="postcss">

.title-carousel{
  @apply
  z-10
  text-y_yellow
  font-sneakers
  uppercase
  text-5xl
  text-center
  tracking-wide
  absolute
  top-1/2
  left-1/2
  transform
  -translate-x-1/2
  -translate-y-1/2;
}

.title-carousel:hover{
  @apply
  text-white
  /* -webkit-text-stroke: 1px black; */
}

</style>
