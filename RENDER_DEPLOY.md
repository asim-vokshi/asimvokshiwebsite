# Render Deployment Guide

This project is prepared as a **static frontend website**. There is no backend server required for deployment.

## Render settings

| Setting | Value |
|---|---|
| Service type | Static Site / Web Service with `runtime: static` |
| Build command | `pnpm install --frozen-lockfile && pnpm build` |
| Publish directory | `dist/public` |
| Node version | `22.x` |

## Recommended deployment method

Connect the GitHub repository to Render and use the included `render.yaml` Blueprint. Render should detect the static service and use the settings automatically.

If creating the service manually, use the same build command and publish directory shown above.

## Updating content

Edit the file below, then redeploy:

```text
client/src/content/site-content.ts
```

## Updating media

Replace files in these folders, keeping the same filenames if you do not want to edit code:

```text
client/public/images/
client/public/videos/
```

The site references media from frontend public folders only.
