import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { createI18n } from 'vue-i18n'
import DownloadButtons from './DownloadButtons.vue'

vi.mock('../analytics', () => ({
  captureEvent: vi.fn(),
}))

function mountButtons(locale: 'en' | 'pl' = 'pl') {
  const i18n = createI18n({
    legacy: false,
    locale,
    messages: { en: {}, pl: {} },
  })

  return mount(DownloadButtons, {
    global: { plugins: [i18n] },
  })
}

describe('DownloadButtons', () => {
  it('renders links to both app stores', () => {
    const wrapper = mountButtons()

    expect(wrapper.findAll('a')).toHaveLength(2)
    expect(wrapper.get('a[href*="apps.apple.com"]')).toBeTruthy()
    expect(wrapper.get('a[href*="play.google.com"]')).toBeTruthy()
  })

  it('localizes the app-store badge descriptions', () => {
    const polishWrapper = mountButtons('pl')
    const englishWrapper = mountButtons('en')

    expect(polishWrapper.get('img[alt="Pobierz z App Store"]').exists()).toBe(true)
    expect(polishWrapper.get('img[alt="Pobierz z Google Play"]').exists()).toBe(true)
    expect(englishWrapper.get('img[alt="Download on the App Store"]').exists()).toBe(true)
    expect(englishWrapper.get('img[alt="Get it on Google Play"]').exists()).toBe(true)
  })

  it('calls captureEvent with apple store data when App Store link is clicked', async () => {
    const { captureEvent } = await import('../analytics')
    const wrapper = mountButtons()

    await wrapper.get('a[href*="apps.apple.com"]').trigger('click')

    expect(captureEvent).toHaveBeenCalledWith('download_store_clicked', { store: 'apple' })
  })

  it('calls captureEvent with google play data when Google Play link is clicked', async () => {
    const { captureEvent } = await import('../analytics')
    const wrapper = mountButtons()

    await wrapper.get('a[href*="play.google.com"]').trigger('click')

    expect(captureEvent).toHaveBeenCalledWith('download_store_clicked', { store: 'google_play' })
  })
})