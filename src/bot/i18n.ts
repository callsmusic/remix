import i18n from "i18n";
import env from "../env";

i18n.configure({ directory: "locales" });

i18n.setLocale(env.LOCALE);

export default (key: string, replacements?: i18n.Replacements) =>
  replacements ? i18n.__(key, replacements) : i18n.__(key);
