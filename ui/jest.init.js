import { config } from "@vue/test-utils"; //2.0.0-beta.5
import translations from "./src/i18n/index";

const locale = "de";

config.global.mocks = {
    $t: (msg) => translations[locale][msg],
    $i18n: {
        locale,
        availableLocales: ['de', 'en']
    }
}
