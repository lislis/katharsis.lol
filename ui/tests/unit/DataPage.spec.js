import { shallowMount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import DataPage from '@/views/DataPage';

describe('DataPage.vue', () => {
    const wrapper = shallowMount(DataPage);
    it('renders the title', () => {
        expect(wrapper.find('.index__title').element).toBeVisible();
    });
    it('renders the copy', () => {
        expect(wrapper.find('.index__inner').element).toBeVisible();
    });
});
