The footer character is a transparent PNG prepared from the user-supplied Memoji using the built-in imagegen tool. The website mirrors and crops it with SVG/CSS, keeping a separate forearm crop for animation.

Prompt: Preserve the supplied smiling male Memoji, face, hair, plaid shirt, pose and rendering; remove the background to true transparency. Keep the original orientation and square composition, with the head left and raised hand right. No text, outline or other elements.

Asset: `assets/manager.png`.

Status: disabled across the site at the owner's request. Preserved for possible reuse:
- `assets/manager.png`: transparent character asset.
- `scripts/manager.mjs`: linked character markup and separate arm crops.
- `manager.css`: positioning, curved label, outline and wave animation.

To restore, import `managerPeek` from `./manager.mjs` in `scripts/build.mjs`, insert `${managerPeek}` before the shared closing footer tag, and load `/manager.css` after `/laptop.css`. Run `node scripts/build-pages.mjs` to regenerate both outputs. The stylesheet must remain unloaded while disabled because it reserves footer space for the character.
