registerSection({
  id: "low-fuel",
  category: "emergency",
  order: 8,
  number: "E.8",
  title: { ru: "Низкий остаток топлива", en: "Low Fuel" },
  cards: [
    {
      lang: "ru",
      icon: "\u26FD",
      title: "Низкое топливо",
      type: "emergency",
      phrases: [
        { label: "Борт", text: "Сенаки, {cs}, низкий остаток топлива", speaker: "pilot" },
        { label: "Борт (объявление)", text: "Сенаки, {cs}, объявляю аварийную ситуацию", speaker: "pilot" },
        { label: "РП", text: "{cs}, доложите остаток топлива", speaker: "atc" }
      ],
      response: {
        title: "Твой ответ",
        text: "Сенаки, {cs}, 5.4"
      }
    },
    {
      lang: "en",
      icon: "\u26FD",
      title: "Low Fuel",
      type: "emergency",
      phrases: [
        { label: "ACFT \u2192 ATC", text: "Senaki, {cs}, low on fuel", speaker: "pilot" },
        { label: "ATC", text: "{cs}, Senaki, do you wish to declare an emergency?", speaker: "atc" },
        { label: "ACFT", text: "Senaki, {cs}, declare emergency", speaker: "pilot" },
        { label: "ATC", text: "{cs}, report endurance", speaker: "atc" }
      ]
    }
  ]
});
