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
        expect(wrapper.find('.userlogout__stay').element).toBeVisible();
        expect(wrapper.find('.userlogout__leave').element).toBeVisible();
        await wrapper.find('.userlogout__stay').trigger('click');
        expect(wrapper.find('.notifications').exists()).toBe(false);
    });
    it.skip('logs out the user', () => {

    });
});
