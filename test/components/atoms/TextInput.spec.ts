import { mount } from '@vue/test-utils'
import TextInput from '~/components/atoms/TextInput.vue'

describe('TextInput spec', () => {
  it('inputが存在するはず', () => {
    const wrapper = mount(TextInput)

    expect(wrapper).toContain('input')
  })
})
