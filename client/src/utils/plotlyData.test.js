import { describe, it, expect, vi, beforeEach } from 'vitest'
import { 
  dataForBarAndPieChart, 
  dataForHistogramAndBoxplot 
} from "./plotlyData"
import { getObservationsForRiver } from "./dataManager"
import { River } from '../models/River.js'
import { Station } from '../models/Station.js'

vi.mock("../utils/dataManager", () => ({
  getObservationsForRiver: vi.fn()
}))

describe("test dataForBarAndPieChart function", () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it("should return count of 0 for each species if no observations are found for rivers", () => {
    getObservationsForRiver.mockReturnValue([])
    const rivers = new Map([
      [1, new River({
        id: 1,
        name: "Test river",
        startDate: "2021-01-01",
      })]
    ])
    const species = ['species1', 'species2']
    const expectedData = new Map([
      ["Test river 2021-01-01", new Map([
        ['species1', 0],
        ['species2', 0]
      ])]
    ])
    
    const data = dataForBarAndPieChart(rivers, 'river', species, false)

    expect(data).toEqual(expectedData)
  })

  it('should return river with no species in data if no species are given', () => {
    getObservationsForRiver.mockReturnValue([
      {
        id: 1,
        species: 'species1',
        length: 10,
        count: 1
      }
    ])
    const rivers = new Map([
      [1, new River({
        id: 1,
        name: "Test river",
        startDate: "2021-01-01",
      })]
    ])
    const species = []
    const expectedData = new Map([
      ["Test river 2021-01-01", new Map()]
    ])

    const data = dataForBarAndPieChart(rivers, 'river', species, false)

    expect(data).toEqual(expectedData)
  })

  it('should return the correct river data when species and observations are given', () => {
    // Mock getObservationsForRiver function to return observations for rivers given their id
    getObservationsForRiver.mockImplementation((river) => {
      if (river.id === 1) {
        return [
          {
            id: 1,
            species: 'species1',
            length: 10,
            count: 1
          },
          {
            id: 2,
            species: 'species2',
            length: 20,
            count: 2
          },
          {
            id: 3,
            species: 'species3',
            length: 10,
            count: 1
          }
        ]
      } else if (river.id === 2) {
        return [
          {
            id: 1,
            species: 'species1',
            length: 10,
            count: 2
          },
          {
            id: 2,
            species: 'species2',
            length: 20,
            count: 1
          }
        ]
      }
    })
    const rivers = new Map([
      [1, new River({
        id: 1,
        name: "Test river",
        startDate: "2021-01-01",
      })],
      [2, new River({
        id: 2,
        name: "Test river 2",
        startDate: "2021-01-02",
      })]
    ])
    const species = ['species1', 'species2', 'species3']
    const expectedData = new Map([
      ["Test river 2021-01-01", new Map([
        ['species1', 1],
        ['species2', 2],
        ['species3', 1]
      ])],
      ["Test river 2 2021-01-02", new Map([
        ['species1', 2],
        ['species2', 1],
        ['species3', 0]
      ])]
    ])

    const data = dataForBarAndPieChart(rivers, 'river', species, false)

    expect(data).toEqual(expectedData)
  })

  it('should return the correct river data when subset species and observations are given', () => {
    // Mock getObservationsForRiver function to return observations for rivers given their id
    getObservationsForRiver.mockImplementation((river) => {
      if (river.id === 1) {
        return [
          {
            id: 1,
            species: 'species1',
            length: 10,
            count: 1
          },
          {
            id: 2,
            species: 'species2',
            length: 20,
            count: 2
          },
          {
            id: 3,
            species: 'species3',
            length: 10,
            count: 1
          }
        ]
      } else if (river.id === 2) {
        return [
          {
            id: 1,
            species: 'species1',
            length: 10,
            count: 2
          },
          {
            id: 2,
            species: 'species2',
            length: 20,
            count: 1
          }
        ]
      }
    })
    const rivers = new Map([
      [1, new River({
        id: 1,
        name: "Test river",
        startDate: "2021-01-01",
      })],
      [2, new River({
        id: 2,
        name: "Test river 2",
        startDate: "2021-01-02",
      })]
    ])
    const species = ['species1']
    const expectedData = new Map([
      ["Test river 2021-01-01", new Map([
        ['species1', 1]
      ])],
      ["Test river 2 2021-01-02", new Map([
        ['species1', 2]
      ])]
    ])

    const data = dataForBarAndPieChart(rivers, 'river', species, false)

    expect(data).toEqual(expectedData)
  })

  it('should return the correct river data when species and observations are given, and it should include others', () => {
    // Mock getObservationsForRiver function to return observations for rivers given their id
    getObservationsForRiver.mockImplementation((river) => {
      if (river.id === 1) {
        return [
          {
            id: 1,
            species: 'species1',
            length: 10,
            count: 1
          },
          {
            id: 2,
            species: 'species2',
            length: 20,
            count: 2
          },
          {
            id: 3,
            species: 'species3',
            length: 10,
            count: 1
          }
        ]
      } else if (river.id === 2) {
        return [
          {
            id: 1,
            species: 'species1',
            length: 10,
            count: 2
          },
          {
            id: 2,
            species: 'species2',
            length: 20,
            count: 1
          }
        ]
      }
    })
    const rivers = new Map([
      [1, new River({
        id: 1,
        name: "Test river",
        startDate: "2021-01-01",
      })],
      [2, new River({
        id: 2,
        name: "Test river 2",
        startDate: "2021-01-02",
      })]
    ])
    const species = ['species1']
    const expectedData = new Map([
      ["Test river 2021-01-01", new Map([
        ['species1', 1],
        ['others', 3]
      ])],
      ["Test river 2 2021-01-02", new Map([
        ['species1', 2],
        ['others', 1]
      ])]
    ])

    const data = dataForBarAndPieChart(rivers, 'river', species, true)

    expect(data).toEqual(expectedData)
  })

  it('should return count of 0 for each species if no observations are found for stations', () => {
    const stations = new Map([
      [1, new Station({
        id: 1,
        name: "Test station",
        date: "2021-01-01",
        observations: []
      })]
    ])
    const species = ['species1', 'species2']
    const expectedData = new Map([
      ["Test station 2021-01-01", new Map([
        ['species1', 0],
        ['species2', 0]
      ])]
    ])
    
    const data = dataForBarAndPieChart(stations, 'station', species, false)

    expect(data).toEqual(expectedData)
  })

  it('should return station with no species in data if no species are given', () => {
    const stations = new Map([
      [1, new Station({
        id: 1,
        name: "Test station",
        date: "2021-01-01",
        observations: [
          {
            id: 1,
            species: 'species1',
            length: 10,
            count: 1
          }
        ]
      })]
    ])
    const species = []
    const expectedData = new Map([
      ["Test station 2021-01-01", new Map()]
    ])

    const data = dataForBarAndPieChart(stations, 'station', species, false)

    expect(data).toEqual(expectedData)
  })

  it('should return the correct station data when species and observations are given', () => {
    const stations = new Map([
      [1, new Station({
        id: 1,
        name: "Test station",
        date: "2021-01-01",
        observations: [
          {
            id: 1,
            species: 'species1',
            length: 10,
            count: 1
          },
          {
            id: 2,
            species: 'species2',
            length: 20,
            count: 2
          },
          {
            id: 3,
            species: 'species3',
            length: 10,
            count: 1
          }
        ]
      })],
      [2, new Station({
        id: 2,
        name: "Test station 2",
        date: "2021-01-02",
        observations: [
          {
            id: 1,
            species: 'species1',
            length: 10,
            count: 2
          },
          {
            id: 2,
            species: 'species2',
            length: 20,
            count: 1
          }
        ]
      })]
    ])
    const species = ['species1', 'species2', 'species3']
    const expectedData = new Map([
      ["Test station 2021-01-01", new Map([
        ['species1', 1],
        ['species2', 2],
        ['species3', 1]
      ])],
      ["Test station 2 2021-01-02", new Map([
        ['species1', 2],
        ['species2', 1],
        ['species3', 0]
      ])]
    ])

    const data = dataForBarAndPieChart(stations, 'station', species, false)

    expect(data).toEqual(expectedData)
  })

  it('should return the correct station data when subset species and observations are given', () => {
    const stations = new Map([
      [1, new Station({
        id: 1,
        name: "Test station",
        date: "2021-01-01",
        observations: [
          {
            id: 1,
            species: 'species1',
            length: 10,
            count: 1
          },
          {
            id: 2,
            species: 'species2',
            length: 20,
            count: 2
          },
          {
            id: 3,
            species: 'species3',
            length: 10,
            count: 1
          }
        ]
      })],
      [2, new Station({
        id: 2,
        name: "Test station 2",
        date: "2021-01-02",
        observations: [
          {
            id: 1,
            species: 'species1',
            length: 10,
            count: 2
          },
          {
            id: 2,
            species: 'species2',
            length: 20,
            count: 1
          }
        ]
      })]
    ])
    const species = ['species1']
    const expectedData = new Map([
      ["Test station 2021-01-01", new Map([
        ['species1', 1]
      ])],
      ["Test station 2 2021-01-02", new Map([
        ['species1', 2]
      ])]
    ])

    const data = dataForBarAndPieChart(stations, 'station', species, false)

    expect(data).toEqual(expectedData)
  })

  it('should return the correct station data when species and observations are given, and it should include others', () => {
    const stations = new Map([
      [1, new Station({
        id: 1,
        name: "Test station",
        date: "2021-01-01",
        observations: [
          {
            id: 1,
            species: 'species1',
            length: 10,
            count: 1
          },
          {
            id: 2,
            species: 'species2',
            length: 20,
            count: 2
          },
          {
            id: 3,
            species: 'species3',
            length: 10,
            count: 1
          }
        ]
      })],
      [2, new Station({
        id: 2,
        name: "Test station 2",
        date: "2021-01-02",
        observations: [
          {
            id: 1,
            species: 'species1',
            length: 10,
            count: 2
          },
          {
            id: 2,
            species: 'species2',
            length: 20,
            count: 1
          }
        ]
      })]
    ])
    const species = ['species1']
    const expectedData = new Map([
      ["Test station 2021-01-01", new Map([
        ['species1', 1],
        ['others', 3]
      ])],
      ["Test station 2 2021-01-02", new Map([
        ['species1', 2],
        ['others', 1]
      ])]
    ])

    const data = dataForBarAndPieChart(stations, 'station', species, true)

    expect(data).toEqual(expectedData)
  })
})

