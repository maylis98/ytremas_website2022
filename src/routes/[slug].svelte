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
import AboutToggle from "$lib/header/about_toggle.svelte";
import ContactToggle from "$lib/header/contact_toggle.svelte";
import Logo from "$lib/header/logo.svelte";
import ImageContainer from "$lib/image_container.svelte";
</script>

<a href="/" class="absolute top-5 left-4 z-10 mt-6">
  <div
   style="width:150%; height:auto;">
   <Logo/>
  </div>
</a>

<div class="relative" style="height:69vh; max-width:100%;">

  <Carousel>
    {#each project.carousel as c}
      <div
        style="
        aspect-ratio: {c.width} / {c.height};
        height:100%; width:auto;">

        <!-- {#if c.type == "image"} -->
        <ImageContainer {...c} />
        <!-- {/if} -->
        <!-- {#if c.type == "video"}
          TO DO -----------------------------------
        <VideoContainer {...c}/>
        {/if} -->

      </div>
    {/each}
  </Carousel>

</div>

<aside class="p-4 pt-6 font-roboto">
  <div class="grid grid-flow-col gap-4">
    <div class="text-lg">
      <h1 class="text-4xl mb-4 uppercase font-sneakers leading-4">
      {project.title}
      </h1>
      <p class="text-slate-500">{project.type}</p>
      <p class="uppercase font-bold">{project.package}</p>
      <p class="text-slate-500">{project.date}</p>

      <div class="pt-4 font-roboto">
      {@html project.body}
      </div>
  </div>

    <ul>
      {#each project.fields as field}
      <li class="font-bold uppercase">{field}</li>
      {/each}
      <br>
      <li class="uppercase text-slate-500 text-sm">Contents</li>
      {#each project.contents as content}
      <li>{content}</li>
      {/each}
    </ul>
  </div>
</aside>
