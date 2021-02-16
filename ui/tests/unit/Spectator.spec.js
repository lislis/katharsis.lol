import { shallowMount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import Spectator from '@/views/Spectator';

describe('Spectator.vue', () => {
    const wrapper = shallowMount(Spectator);
    it('renders the title', () => {
        expect(wrapper.find('.centerstage__title').element).toBeVisible();
    });
});
