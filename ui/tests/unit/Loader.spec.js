import { mount } from '@vue/test-utils'
import '@testing-library/jest-dom'
import Loader from '@/components/Loader.vue'


describe('Loader.vue', () => {
  it('renders a loader', () => {
      const wrapper = mount(Loader);
      expect(wrapper.find('.lds-ripple').element).toBeVisible();
  });
});
