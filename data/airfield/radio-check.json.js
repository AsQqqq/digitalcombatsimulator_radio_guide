registerSection({
  id: "radio-check",
  category: "airfield",
  order: 1,
  number: "1.1",
  title: { ru: "Проверка связи", en: "Radio Check" },
  cards: [
    {
      lang: "ru",
      icon: "\u{1F4FB}",
      title: "Проверка связи",
      type: "normal",
      defaultOpen: true,
      phrases: [
        { label: "Борт \u2192 РП", text: "Сенаки, {cs}, проверка связи", speaker: "pilot" },
        { label: "РП \u2192 Борт", text: "{cs}, Сенаки, слышу вас на 5", speaker: "atc" }
      ],
      explanation: {
        title: "Что это значит",
        items: [
          "<strong>\u00ABслышу вас на 5\u00BB</strong> \u2014 качество связи отличное (шкала 1\u20135)",
          "РП понимает, что вы на частоте и можете работать"
        ]
      }
    },
    {
      lang: "en",
      icon: "\u{1F4FB}",
      title: "Radio Check",
      type: "normal",
      phrases: [
        { label: "ACFT \u2192 ATC", text: "Senaki, {cs}, radio check", speaker: "pilot" },
        { label: "ATC \u2192 ACFT", text: "{cs}, Senaki, read you 5", speaker: "atc" }
      ],
      explanation: {
        title: "What it means",
        items: [
          "<strong>\"read you 5\"</strong> \u2014 signal quality is excellent (scale 1\u20135)",
          "ATC acknowledges you are on frequency and can work together"
        ]
      }
    }
  ]
});
