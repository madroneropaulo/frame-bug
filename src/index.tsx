import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
import { Box, Heading, Text, VStack } from './ui.js'

export const app = new Frog({
})

app.frame('/', (c) => {
  return c.res({
    image: (
      <Box
        grow
        alignHorizontal="center"
        backgroundColor="background"
        padding="32"
      >
        <VStack gap="4">
          <Heading>FrogUI 🐸</Heading>
          <Text color="text200" size="20">
            Build consistent frame experiences
          </Text>
        </VStack>
      </Box>
    )
  })
})

const isCloudflareWorker = typeof caches !== 'undefined'
if (isCloudflareWorker) {
  const manifest = await import('__STATIC_CONTENT_MANIFEST')
  const serveStaticOptions = { manifest, root: './' }
  app.use('/*', serveStatic(serveStaticOptions))
  devtools(app, { assetsPath: '/frog', serveStatic, serveStaticOptions })
} else {
  devtools(app, { serveStatic })
}

export default app
