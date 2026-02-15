registerSection({
  id: "taxi-after",
  category: "airfield",
  order: 6,
  number: "1.6",
  title: { ru: "Руление после посадки", en: "Taxi After Landing" },
  cards: [
    {
      lang: "ru",
      icon: "\u{1F17F}\uFE0F",
      title: "Освобождение полосы",
      type: "normal",
      defaultOpen: true,
      phrases: [
        { label: "РП \u2192 Борт", text: "{cs}, выруливайте на Альфу", speaker: "atc" },
        { label: "Борт", text: "Сенаки, {cs}, полосу освободил", speaker: "pilot" },
        { label: "РП (стоянка)", text: "{cs}, ваша стоянка 05", speaker: "atc" }
      ]
    },
    {
      lang: "en",
      icon: "\u{1F17F}\uFE0F",
      title: "Vacate Runway",
      type: "normal",
      phrases: [
        { label: "ATC \u2192 ACFT", text: "{cs}, contact ground Alpha, advise vacated", speaker: "atc" },
        { label: "ATC \u2192 ACFT (stand)", text: "{cs}, your stand 05", speaker: "atc" }
      ]
    }
  ]
});
