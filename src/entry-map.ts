import { startCollaboratorMap } from './collaborator-map'
import type { MapLocation } from './collaborator-map'

document.querySelectorAll<HTMLDivElement>('.collaborator-leaflet-map[data-locations]').forEach((element) => {
  const locations: MapLocation[] = JSON.parse(element.dataset.locations ?? '[]')
  startCollaboratorMap(element, locations)
})
