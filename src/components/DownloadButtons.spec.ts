import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DownloadButtons from './DownloadButtons.vue'

describe('DownloadButtons', () => {
  it('renders links to both app stores', () => {
    const wrapper = mount(DownloadButtons)

    expect(wrapper.findAll('a')).toHaveLength(2)
    expect(wrapper.get('a[href*="apps.apple.com"]')).toBeTruthy()
    expect(wrapper.get('a[href*="play.google.com"]')).toBeTruthy()
  })
})