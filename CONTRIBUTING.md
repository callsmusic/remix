# Translations

-   Fork the repository.
-   Clone your forked repository.
-   Checkout `translations`:

```bash
git checkout translations
```

-   Open the `locales` directory.

## Modifying an already existing language

-   Open the translation file you want to modify.
-   Make your changes.
-   Add your name to "authors".
-   Commit with a message like "Modify [language name] translations".

## Adding a new language

-   Google your language code and create `your_language_code.json`.
-   Copy translations of another language (one which you are comfortable translating from).
-   Translate all of the strings to that language.
-   Set "authors" to ["your name"].
-   Commit with a message like "Add [language name] translations".

# Other contributions

If you're fixing a bug or adding a new feature, please format your code with the configurations in the [`.prettierrc`](./.prettierrc) and:

-   Avoid using emojis and other non-usual characters in your commit messages.
-   Use verbs in their present forms in your commit messages.
