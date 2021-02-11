import { mount } from '@vue/test-utils'
import '@testing-library/jest-dom'
import UserLogout from '@/components/UserLogout'

describe('UserLogout.vue', () => {
    const wrapper = mount(UserLogout);
    it('renders a button', () => {
        expect(wrapper.find('.userlogout__button').element).toBeVisible();
    });
    it('toggles the leave modal', async () => {
        expect(wrapper.find('.notifications').exists()).toBe(false);
        await wrapper.find('.userlogout__button').trigger('click');
        expect(wrapper.find('.notifications').exists()).toBe(true);
        expect(wrapper.find('.note .btn').element).toBeVisible();
        expect(wrapper.find('.note .link').element).toBeVisible();
        await wrapper.find('.note .link').trigger('click');
        expect(wrapper.find('.notifications').exists()).toBe(false);
    });
    it.skip('logs out the user', () => {

    });
});
