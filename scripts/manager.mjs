// Two complementary crops keep the face still while the forearm waves at the elbow.
export const managerPeek = `<a class="manager-peek" href="/about.html" aria-label="Meet the manager — about Sam Burke">
<svg class="manager-label" viewBox="0 0 270 150" aria-hidden="true"><defs><path id="manager-label-arc" d="M 23 133 Q 100 -10 252 57"/></defs><text><textPath href="#manager-label-arc" startOffset="50%" text-anchor="middle">Meet the manager</textPath></text></svg>
<svg class="manager-portrait" viewBox="260 0 540 540" aria-hidden="true">
<defs>
<clipPath id="manager-body-crop"><path d="M0 0H330V235H340L315 450L380 470L490 390H800V800H0Z"/></clipPath>
<clipPath id="manager-arm-crop"><path d="M340 235H490V390L380 470L315 450Z"/></clipPath>
<clipPath id="manager-visible-crop"><path d="M0 0H800V520H310L260 410L80 370L0 320Z"/></clipPath>
</defs>
<g transform="translate(800 0) scale(-1 1)"><g clip-path="url(#manager-visible-crop)"><image href="/assets/manager.png" width="800" height="800" clip-path="url(#manager-body-crop)"/></g><g class="manager-arm"><image href="/assets/manager.png" width="800" height="800" clip-path="url(#manager-arm-crop)"/></g></g>
</svg></a>`;
