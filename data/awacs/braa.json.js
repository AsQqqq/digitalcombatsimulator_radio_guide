registerSection({
  id: "braa",
  category: "awacs",
  order: 1,
  number: "4.1",
  title: { ru: "Вызов BRAA", en: "BRAA Call" },
  cards: [
    {
      lang: "both",
      icon: "\u{1F4E1}",
      title: "BRAA — Bearing, Range, Altitude, Aspect",
      type: "awacs",
      phrases: [
        { label: "Пример (RU)", text: "BRAA, 183/10, 2 тысячи, горячий", speaker: "atc", lang: "ru" },
        { label: "Example (EN)", text: "BRAA, 183/10, 2 thousand, hot", speaker: "atc", lang: "en" }
      ],
      explanation: {
        title: { ru: "Расшифровка", en: "Breakdown" },
        items: [
          "<strong>183</strong> — bearing/пеленг 183\u00B0 от вас",
          "<strong>10</strong> — range/дальность 10 NM",
          "<strong>2 thousand</strong> — altitude/высота 2000 ft",
          "<strong>Hot</strong> — aspect/аспект: идёт на вас"
        ]
      },
      infoBox: "<strong>Hot</strong> — на вас / heading towards you<br><strong>Drag</strong> — от вас / heading away<br><strong>Beam</strong> (L/R) — перпендикулярно / perpendicular<br><strong>Flank</strong> (L/R) — между hot и beam / between hot & beam"
    }
  ]
});
