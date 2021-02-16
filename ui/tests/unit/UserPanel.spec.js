import { mount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import UserPanel from '@/components/UserPanel';

describe('UserPanel.vue', () => {
    const wrapper = mount(UserPanel);
    it('renders logout button', () => {
        expect(wrapper.find('.btn').element).toBeVisible();
    });
    it.skip('renders user name and status', () => {
        expect(wrapper.find('.userdisplay').element).toBeVisible();
    });
});
