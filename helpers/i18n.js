import { Localization } from 'expo';
import i18n from 'i18n-js';
import { fr, en } from "../constants/Languages";

i18n.fallbacks = true;
i18n.translations = { fr, en };
i18n.locale = Localization.locale.substring(0,2);

export default i18n;