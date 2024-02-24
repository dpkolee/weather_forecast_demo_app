//@ts-nocheck
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SignInView from '../../views/SignInView.vue'
import router from '../../router/index'
import '../../firebase/firebaseConfig'

describe('Test cases for SignInView.vue', () => {
  it('renders email, password input fields and signIn button properly', () => {
    const wrapper = mount(SignInView, {
      global: {
        plugins: [router]
      }
    })
    // Check if email, password input fields and sign up button exist
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').text()).toContain('Sign In')
  })
  it('updates email and password data when input changes', async () => {
    const wrapper = mount(SignInView, {
      global: {
        plugins: [router]
      }
    })

    const email = 'test@example.com'
    const password = 'password'

    // Simulate user input
    await wrapper.find('input[type=email]').setValue(email)
    await wrapper.find('input[type=password]').setValue(password)

    // Check if data is updated
    expect(wrapper.vm.formData.email).toBe(email)
    expect(wrapper.vm.formData.password).toBe(password)
  })
})
