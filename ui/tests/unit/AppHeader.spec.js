import { shallowMount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import AppHeader from '@/components/AppHeader';

describe('AppHeader.vue', () => {
    const wrapper = shallowMount(AppHeader, {
        stubs: ['router-link']
    });
    it('renders logo link', () => {
        expect(wrapper.find('.outsidenav__logo').text()).toMatch('Katharsis.lol');
    });
});
