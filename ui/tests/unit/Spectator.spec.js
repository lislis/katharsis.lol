import { mount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import Spectator from '@/views/Spectator';

describe('Spectator.vue', () => {
    const wrapper = mount(Spectator);
    it.skip('renders the title', () => {
        expect(wrapper.find('.centerstage__title').element).toBeVisible();
    });
});
