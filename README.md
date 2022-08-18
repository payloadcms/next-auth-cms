# Payload + NextJS Auth Example

This repo contains a Payload CMS application set up to demonstrate how you can use Payload's authentication within NextJS apps. This repo in specific contains the files that pertain to the Payload app.

The code for the accompanying NextJS app [can be found here](https://github.com/payloadcms/next-auth-frontend).

## Getting Started

Follow the steps below to get started with this boilerplate.

1. Make sure you have Node and a MongoDB to work with.
1. Clone the repo.
1. `yarn` in the root folder of the repo.
1. While still in the root folder, run `cp .env.example .env` to create an `.env` file.
1. Open your newly created `.env` file and take a look at the contents. For most cases, the default values are good to go out of the box.
1. Run `yarn dev` to start the Payload server.

#### Seeded data

This example seeds a homepage as well as two initial users for demo purposes. While great for development, you probably don't need / want this for production, so feel free to delete the `onInit` method out of the `src/payload.config.ts` file.



