import { mount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import OutSideNav from '@/components/OutSideNav';

describe('OutSideNav.vue', () => {
    const wrapper = mount(OutSideNav, {
        stubs: ['router-link']
    });
    it('renders two links', () => {
        expect(wrapper.find('.outsidenav__logo').element).toBeVisible();
        expect(wrapper.find('.outsidenav__link').element).toBeVisible();
    });
});
