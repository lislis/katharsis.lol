import { shallowMount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import OutSideNav from '@/components/OutSideNav';

describe('OutSideNav.vue', () => {
    const wrapper = shallowMount(OutSideNav, {
        stubs: ['router-link']
    });
    it('renders two links', () => {
        expect(wrapper.find('.outsidenav__logo').text()).toMatch('Katharsis.lol');
        expect(wrapper.find('.outsidenav__link').element).toBeVisible();
    });
});
