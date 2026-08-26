import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import DownloadButtons from './DownloadButtons.vue'

vi.mock('../analytics', () => ({
  captureEvent: vi.fn(),
}))

describe('DownloadButtons', () => {
  it('renders links to both app stores', () => {
    const wrapper = mount(DownloadButtons)

    expect(wrapper.findAll('a')).toHaveLength(2)
    expect(wrapper.get('a[href*="apps.apple.com"]')).toBeTruthy()
    expect(wrapper.get('a[href*="play.google.com"]')).toBeTruthy()
  })

  it('calls captureEvent with apple store data when App Store link is clicked', async () => {
    const { captureEvent } = await import('../analytics')
    const wrapper = mount(DownloadButtons)

    await wrapper.get('a[href*="apps.apple.com"]').trigger('click')

    expect(captureEvent).toHaveBeenCalledWith('download_store_clicked', { store: 'apple' })
  })

  it('calls captureEvent with google play data when Google Play link is clicked', async () => {
    const { captureEvent } = await import('../analytics')
    const wrapper = mount(DownloadButtons)

    await wrapper.get('a[href*="play.google.com"]').trigger('click')

    expect(captureEvent).toHaveBeenCalledWith('download_store_clicked', { store: 'google_play' })
  })
})