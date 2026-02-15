registerSection({
  id: "engine-fail",
  category: "emergency",
  order: 6,
  number: "E.6",
  title: { ru: "Отказ двигателя", en: "Engine Failure" },
  cards: [
    {
      lang: "ru",
      icon: "\u2699\uFE0F",
      title: "Отказ двигателя",
      type: "emergency",
      phrases: [
        { label: "Борт \u2192 РП", text: "Сенаки, {cs}, отказ двигателя, высота 1800 метров, 317 узлов", speaker: "pilot" },
        { label: "Если двигатель заработал", text: "{cs}, отмена, двигатель в работе", speaker: "pilot" }
      ]
    },
    {
      lang: "en",
      icon: "\u2699\uFE0F",
      title: "Engine Failure",
      type: "emergency",
      phrases: [
        { label: "ACFT \u2192 ATC", text: "MAYDAY MAYDAY MAYDAY, {cs}, engine failure, 1800 meters, 317 knots", speaker: "pilot" },
        { label: "If engine restarts", text: "{cs}, CANCEL DISTRESS, engine serviceable", speaker: "pilot" }
      ]
    }
  ]
});
