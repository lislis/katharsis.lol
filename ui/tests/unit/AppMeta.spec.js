import { mount } from '@vue/test-utils'
import '@testing-library/jest-dom'
import AppMeta from '@/components/AppMeta'
import { version } from '../../package.json'

describe('AppMeta.vue', () => {
    const wrapper = mount(AppMeta);
    it('renders the app name', () => {
        expect(wrapper.text()).toMatch('Katharsis.lol');
    });
    it('renders the version number', () => {
        expect(wrapper.text()).toMatch(`Version ${version}`);
    });
    it('renders the link to latest version on GitHub', () => {
        expect(wrapper.find('.appmeta__version').element.href).toBe(`https://github.com/lislis/katharsis.lol/releases/tag/v${version}`);
    });
    it('renders the language switch', () => {
        expect(wrapper.find('select').element.value).toBe('de');
    });
    it.skip('renders the imprint and data protection link', () => {
        //expect(wrapper.find('.appmeta__imprint').element).toBeVisible();
        //expect(wrapper.find('.appmeta__dgpa').element).toBeVisible();
    });

})
