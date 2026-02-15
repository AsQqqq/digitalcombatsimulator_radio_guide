registerSection({
  id: "carrier-landing",
  category: "carrier",
  order: 2,
  number: "3.2",
  title: { ru: "Посадка на авианосец — CASE I", en: "Carrier Landing — CASE I" },
  cards: [
    {
      lang: "both",
      icon: "\u{1F6EC}",
      title: "CASE I Recovery",
      type: "carrier",
      phrases: [
        { label: "Strike (50+ nm)", text: "Strike, {cs}, flight of 1, Mother's 250 for 55, Angels 12. State 5.4, no alibis", speaker: "pilot" },
        { label: "Strike (response)", text: "{cs}, Sweet/Sweet, Mother is VFR, Case 1. Contact Marshall on Button 2", speaker: "atc" },
        { label: "Marshall (10+ nm)", text: "Marshall, {cs}, 250 for 52, Angels 9, State 5.3", speaker: "pilot" },
        { label: "Marshall (response)", text: "{cs}, Case 1, BRC is 010, Altimeter 29.92, hold marshall stack angels 2. Report see me at 10", speaker: "atc" },
        { label: "At 10 nm", text: "{cs}, see you at 10", speaker: "pilot" },
        { label: "At 10 nm (response)", text: "{cs}, switch Tower on Button 1", speaker: "atc" },
        { label: "LSO (\u00BE mile)", text: "{cs}, commencing", speaker: "pilot" },
        { label: "LSO (call the ball)", text: "3/4 mile, call the ball", speaker: "atc" },
        { label: "Ball call", text: "{cs}, hornet, ball, state 4.8", speaker: "pilot" },
        { label: "LSO (roger)", text: "Roger ball", speaker: "atc" }
      ],
      explanation: {
        title: "Расшифровка / Glossary",
        items: [
          "<strong>Mother's 250 for 75</strong> — обратный курс 250\u00B0 от авианосца, удаление 75 миль",
          "<strong>Angels 9</strong> — высота 9000 футов",
          "<strong>State 5.4</strong> — остаток топлива 5.4",
          "<strong>Sweet/Sweet</strong> — подтверждение понимания",
          "<strong>Ball</strong> — вижу шар IFLOLS",
          "<strong>Clara</strong> — НЕ вижу шар, нужны корректировки LSO"
        ]
      }
    }
  ]
});
