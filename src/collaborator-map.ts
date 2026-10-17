export type MapLocation = {
  location: string
  country: string
  latitude: number
  longitude: number
  collaborators: { name: string }[]
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function startCollaboratorMap(mapElement: HTMLDivElement, collaboratorMapLocations: MapLocation[]) {
  if (!collaboratorMapLocations.length) return undefined
    const leafletMapElement = mapElement

    let active = true
    let map: import('leaflet').Map | undefined
    let observer: IntersectionObserver | undefined
    let initialized = false

    function isMapNearViewport() {
      const rect = leafletMapElement.getBoundingClientRect()
      return rect.top < window.innerHeight + 700 && rect.bottom > -700
    }

    async function initializeMap() {
      if (initialized || !active) return
      initialized = true
      mapElement.dataset.mapState = 'loading'
      mapElement.setAttribute('aria-busy', 'true')
      mapElement.textContent = mapElement.dataset.loadingMessage ?? 'Loading map…'

      await import('leaflet/dist/leaflet.css')
      const leaflet = (await import('leaflet')).default

      if (!active) return

      mapElement.textContent = ''
      map = leaflet.map(leafletMapElement, {
        attributionControl: true,
        maxBounds: [[-85, -190], [85, 190]],
        maxBoundsViscosity: 0.75,
        minZoom: 1,
        scrollWheelZoom: false,
        worldCopyJump: true,
        zoomControl: true,
      })

      leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map)

      const markerLayer = leaflet.featureGroup()

      collaboratorMapLocations.forEach((point) => {
        const collaboratorNames = point.collaborators
          .map((collaborator) => `<li>${escapeHtml(collaborator.name)}</li>`)
          .join('')

        const marker = leaflet.marker([point.latitude, point.longitude], {
          icon: leaflet.divIcon({
            className: 'collaborator-leaflet-marker',
            html: `<span><b>${point.collaborators.length}</b></span>`,
            iconAnchor: [15, 30],
            iconSize: [30, 30],
            popupAnchor: [0, -28],
          }),
          title: point.location,
        }).bindPopup(`
          <strong>${escapeHtml(point.location)}</strong>
          <small>${escapeHtml(point.country)}</small>
          <ul>${collaboratorNames}</ul>
        `)

        marker.on('add', () => marker.getElement()?.setAttribute('aria-label', `${point.location}: ${point.collaborators.map(person => person.name).join(', ')}`))
        markerLayer.addLayer(marker)
      })

      markerLayer.addTo(map)
      map.fitBounds(markerLayer.getBounds(), { maxZoom: 3, padding: [28, 28] })

      mapElement.dataset.mapState = 'ready'
      mapElement.setAttribute('aria-busy', 'false')
      window.setTimeout(() => map?.invalidateSize(), 120)
    }

    function initializeSafely() {
      void initializeMap().catch(() => {
        if (!active) return
        map?.remove()
        mapElement.dataset.mapState = 'error'
        mapElement.setAttribute('aria-busy', 'false')
        mapElement.textContent = mapElement.dataset.errorMessage ?? 'The map could not load. Use the location list below.'
      })
    }

    function handleViewportCheck() {
      if (isMapNearViewport()) {
        window.removeEventListener('scroll', handleViewportCheck)
        window.removeEventListener('resize', handleViewportCheck)
        window.clearInterval(viewportCheckInterval)
        observer?.disconnect()
        initializeSafely()
      }
    }

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer?.disconnect()
          initializeSafely()
        }
      }, { rootMargin: '600px 0px' })
      observer.observe(mapElement)
    }

    window.addEventListener('scroll', handleViewportCheck, { passive: true })
    window.addEventListener('resize', handleViewportCheck)
    const viewportCheckInterval = window.setInterval(handleViewportCheck, 700)
    handleViewportCheck()

    return () => {
      active = false
      observer?.disconnect()
      window.clearInterval(viewportCheckInterval)
      window.removeEventListener('scroll', handleViewportCheck)
      window.removeEventListener('resize', handleViewportCheck)
      map?.remove()
    }
}
