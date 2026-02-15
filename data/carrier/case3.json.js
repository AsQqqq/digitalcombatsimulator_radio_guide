registerSection({
  id: "carrier-case3",
  category: "carrier",
  order: 3,
  number: "3.3",
  title: { ru: "Посадка на авианосец — CASE III", en: "Carrier Landing — CASE III" },
  cards: [
    {
      lang: "both",
      icon: "\u{1F319}",
      title: "CASE III Recovery (Night / IMC)",
      type: "carrier",
      phrases: [
        { label: "Marshall", text: "Marshall, {cs}, 250 for 52, Angels 14, State 5.3", speaker: "pilot" },
        { label: "Marshall (response)", text: "{cs}, Mother's weather 600 overcast, vis 3 miles, altimeter 29.87. Case 3 recovery, marshall on the 082, 22, angels 7", speaker: "atc" },
        { label: "Commencing", text: "{cs}, commencing, 29.88, state 4.8", speaker: "pilot" },
        { label: "Platform (5000 ft)", text: "{cs}, platform", speaker: "pilot" },
        { label: "LSO (ACLS)", text: "{cs}, say needles", speaker: "atc" },
        { label: "Pilot (needles)", text: "{cs}, fly up, on", speaker: "pilot" },
        { label: "LSO (fly needles)", text: "{cs}, fly your needles", speaker: "atc" }
      ]
    }
  ]
});
