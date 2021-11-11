import { mount } from '@vue/test-utils'
import '@testing-library/jest-dom'
import UserLogin from '@/components/UserLogin'

describe('UserLogin.vue', () => {

    it.skip('renders the form', () => {
        const wrapper = mount(UserLogin);
        expect(wrapper.find('.form-group__desc').element).toBeVisible();
        expect(wrapper.find('.form-group').element.children.length).toBe(4);
    });

    it('hides submit btn after clicking', () => {
        const wrapper = mount(UserLogin);
        expect(wrapper.find('input[type=submit]').element).toBeVisible();
        wrapper.find('input[type=submit]').trigger('click');
        expect(wrapper.find('input[type=submit]').element).toBeVisible(false);
    });
});
