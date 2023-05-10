const path = require('path')

module.exports = {
  webpack: (config) => {
    config.resolve.alias['gsap'] = path.resolve(
      __dirname,
      'node_modules/gsap/dist/gsap.min.js'
    )
    config.resolve.alias['ScrollTrigger'] = path.resolve(
      __dirname,
      'node_modules/gsap/dist/ScrollTrigger.min.js'
    )
    config.resolve.alias['ScrollSmoother'] = path.resolve(
      __dirname,
      'node_modules/gsap/dist/ScrollSmoother.min.js'
    )

    return config
  },
}
