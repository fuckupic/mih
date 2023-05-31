import React, { useState, useEffect } from 'react'

interface House {
  width: string
}

interface Block {
  height: string
  padding: string
  gap: string
  houses: House[]
}

// Random number generator within range
const randomIntFromRange = (min: number, max: number): number =>
  Math.random() * (max - min + 0.3) + min
const randomFloorIntFromRange = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 0.3) + min)

// Function to generate a city block with random properties
const generateBlock = (type: 'left' | 'right'): Block => {
  const blockHeight = randomIntFromRange(4, 10)
  const padding = randomIntFromRange(0, 0)
  const gap = randomIntFromRange(0.4, 0.8)

  const houseCount = randomFloorIntFromRange(2, 4)
  let houses: number[] = []

  for (let i = 0; i < houseCount; i++) {
    const isBigHouse =
      (type === 'left' && i === 0) || (type === 'right' && i === houseCount - 1)
    const houseWidth = isBigHouse
      ? randomIntFromRange(40, 60)
      : randomIntFromRange(
          40,
          60 - houses.reduce((acc, house) => acc + house, 0)
        )
    houses.push(houseWidth)
  }

  return {
    height: `${blockHeight}rem`,
    padding: `${padding}rem`,
    gap: `${gap}rem`,
    houses: houses.map((width) => ({ width: `${width}%` })),
  }
}

// Function to generate an array of city blocks
const generateCityBlocks = (
  blockCount: number,
  type: 'left' | 'right'
): Block[] => {
  const cityBlocks: Block[] = []
  for (let i = 0; i < blockCount; i++) {
    cityBlocks.push(generateBlock(type))
  }
  return cityBlocks
}

const CityBackground: React.FC = () => {
  const [windowHeight, setWindowHeight] = useState<number>(0)
  const [windowWidth, setWindowWidth] = useState<number>(0)
  const [leftCityBlocks, setLeftCityBlocks] = useState<Block[]>([])
  const [rightCityBlocks, setRightCityBlocks] = useState<Block[]>([])

  useEffect(() => {
    setWindowHeight(window.innerHeight)
    setWindowWidth(window.innerWidth)

    var blockCount = 0

    // if window width is not mobile
    if (window.innerWidth > 640) {
      blockCount = Math.ceil(window.innerHeight / 25) // 80 is an average height of a block
    } else {
      blockCount = Math.ceil(window.innerHeight / 5) // 80 is an average height of a block
    }

    setLeftCityBlocks(generateCityBlocks(blockCount, 'left'))
    setRightCityBlocks(generateCityBlocks(blockCount, 'right'))
  }, [])

  return (
    <div className="top-0 left-0 z-[0] absolute w-[100%] h-[100%] flex items-start justify-center overflow-hidden">
      <div className="w-[100%] h-[100%] relative flex flex-row gap-[2] z-10">
        <div className="w-[49%] h-[100%] flex flex-col items-start justify-start relative gap-2">
          {leftCityBlocks.map((block, i) => (
            <div
              key={i}
              className="leftCityBlock justify-end relative w-[100%]"
              style={{
                height: block.height,
                padding: block.padding,
                gap: block.gap,
              }}
            >
              {block.houses.map((house, j) => (
                <div
                  key={j}
                  className="house h-[100%] bg-black"
                  style={{ width: house.width }}
                ></div>
              ))}
            </div>
          ))}
        </div>
        <div className="w-[2%] h-[100%] flex flex-col relative gap-12"></div>
        <div className="w-[49%] h-[100%] flex flex-col items-end justify-start relative gap-2">
          {rightCityBlocks.map((block, i) => (
            <div
              key={i}
              className="rightCityBlock justify-start relative w-[100%]"
              style={{
                height: block.height,
                padding: block.padding,
                gap: block.gap,
              }}
            >
              {block.houses.map((house, j) => (
                <div
                  key={j}
                  className="house h-[100%] bg-black"
                  style={{ width: house.width }}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CityBackground
