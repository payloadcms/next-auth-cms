import { Payload } from "payload"

export const seedHomepage = async (payload: Payload): Promise<void> => {
  // On init, we'll check to see if there is a homepage
  const homepageQuery = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      }
    }
  })

  // If there isn't, then seed a homepage
  if (homepageQuery.docs.length === 0) {
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Home',
        content: [
          {
            children: [
              {
                text: "Payload+NextJS Auth Example"
              }
            ],
            type: "h3"
          },
          {
            children: [
              {
                text: "This is a demonstration for how Payload's powerful "
              },
              {
                type: "link",
                url: "https://payloadcms.com/docs/authentication/overview",
                children: [
                  {
                    text: "Authentication"
                  }
                ]
              },
              {
                text: " can be used easily within NextJS projects."
              }
            ]
          }
        ]
      }
    })

    payload.logger.info('Homepage seeded successfully!')
  }
}