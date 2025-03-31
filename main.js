import { Plugin } from "obsidian";

export default class YouTubeEmbedPlugin extends Plugin {
    onload() {
        console.log("YouTube Embed Plugin loaded!");
        this.registerMarkdownPostProcessor((element, context) => {
            const links = element.querySelectorAll("a");
            links.forEach(link => {
                const url = link.href;
                const match = url.match(/(?:https?:\/\/)?(?:www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
                if (match) {
                    const videoId = match[2];
                    const iframe = document.createElement("iframe");
                    iframe.src = `https://www.youtube.com/embed/${videoId}`;
                    iframe.width = "560";
                    iframe.height = "315";
                    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                    iframe.allowFullscreen = true;

                    const wrapper = document.createElement("div");
                    wrapper.classList.add("youtube-embed-wrapper");
                    wrapper.appendChild(link.cloneNode(true)); // Keep the original link
                    wrapper.appendChild(iframe);

                    link.replaceWith(wrapper);
                }
            });
        });
    }

    onunload() {
        console.log("YouTube Embed Plugin unloaded!");
    }
}
