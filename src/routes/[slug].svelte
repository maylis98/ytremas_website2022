<script context="module">
  export async function load({
    params,
    fetch
  }) {
    const slug = params.slug;
    let res = await fetch(`/data/projects/${slug}.json`);
    if (res.status == 404) return {
      status: 404,
      error: new Error(`Ce projet n'existe pas.`)
    }
    let project = await res.json();
    return {
      props: {
        project
      }
    }
  }
</script>

<script>
export let project;
import Carousel from "$lib/carousel/carousel.svelte";
import ImageContainer from "$lib/image_container.svelte";
</script>

<div class="relative" style="height:50vh; max-width:100%;">

  <Carousel>
    {#each project.carousel as c}
      <div
        style="
        aspect-ratio: {c.width} / {c.height};
        height:100%; width:auto;">

        <ImageContainer {...c} />
        
      </div>
    {/each}
  </Carousel>

</div>

<aside class="p-4">
  <div class="grid grid-flow-col gap-4">
    <div>
      <h1 class="text-4xl mb-4 font-sneakers">
      {project.title}
      </h1>
      <div class="font-roboto">
      {@html project.body}
    </div>
    </div>

    <ul>
      {#each project.fields as field}
      <li class="font-roboto">{field}</li>
      {/each}
    </ul>
  </div>
</aside>
