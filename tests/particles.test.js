const { chromium } = require('playwright')

describe('Particles', () => {
  let browser
  let page

  beforeAll(async () => {
    browser = await chromium.launch({ headless: false }) // Change to true for headless mode
  })

  afterAll(async () => {
    await browser.close()
  })

  beforeEach(async () => {
    page = await browser.newPage()
  })

  afterEach(async () => {
    await page.close()
  })

  it('should display orbs', async () => {
    // Replace with the URL where your HeroParticles component is rendered
    await page.goto('http://localhost:3000')
    await page.waitForTimeout(5000) // Wait for 5 seconds to see the orbs

    // Add any assertions you'd like to check if the orbs are visible or behaving as expected
  })
})
