import { mount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import AppHeader from '@/components/AppHeader';

describe('AppHeader.vue', () => {
    const wrapper = mount(AppHeader, {
        stubs: ['router-link']
    });
    it.skip('renders logo link', () => {
        expect(wrapper.find('.outsidenav__logo svg').element).toBeVisible();
    });
});
