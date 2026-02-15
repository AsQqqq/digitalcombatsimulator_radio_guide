registerSection({
  id: "fire",
  category: "emergency",
  order: 5,
  number: "E.5",
  title: { ru: "Пожар", en: "Engine Fire" },
  cards: [
    {
      lang: "ru",
      icon: "\u{1F525}",
      title: "Пожар двигателей",
      type: "emergency",
      phrases: [
        { label: "Борт \u2192 РП", text: "Сенаки, {cs}, пожар двигателей, запрашиваю экстренную посадку", speaker: "pilot" }
      ]
    },
    {
      lang: "en",
      icon: "\u{1F525}",
      title: "Engine Fire",
      type: "emergency",
      phrases: [
        { label: "ACFT \u2192 ATC", text: "{cs}, engine on fire, making forced landing Senaki", speaker: "pilot" }
      ]
    }
  ]
});
