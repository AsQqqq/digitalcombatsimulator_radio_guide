registerSection({
  id: "instrument-fail",
  category: "emergency",
  order: 4,
  number: "E.4",
  title: { ru: "Отказ приборов", en: "Instrument Failure" },
  cards: [
    {
      lang: "ru",
      icon: "\u26A0\uFE0F",
      title: "Полный отказ приборов",
      type: "emergency",
      phrases: [
        { label: "Борт \u2192 РП", text: "Сенаки, {cs}, полный отказ приборов, прошу векторение", speaker: "pilot" }
      ],
      explanation: {
        title: "Варианты",
        items: [
          "\u00ABпрошу векторение на ближайший\u00BB",
          "\u00ABпрошу векторение на Сочи\u00BB"
        ]
      }
    },
    {
      lang: "en",
      icon: "\u26A0\uFE0F",
      title: "Total Instrument Failure",
      type: "emergency",
      phrases: [
        { label: "ACFT \u2192 ATC", text: "MAYDAY MAYDAY MAYDAY, {cs}, total instruments failure, request vectors to nearest", speaker: "pilot" }
      ]
    }
  ]
});
