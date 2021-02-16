import { shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import '@testing-library/jest-dom';
import Index from '@/views/Index';

describe('Index.vue', () => {
    const wrapper = shallowMount(Index);
    it('renders the claim', () => {
        expect(wrapper.find('.index__claim').element).toBeVisible();
    });
    it.skip('renders the default', async () => {
        expect(wrapper.find('.index__overflow').element).toBeVisible();
        await flushPromises();
        expect(wrapper.find('.default-text').element).toBeVisible();
    });
});
