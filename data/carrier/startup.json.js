registerSection({
  id: "carrier-startup",
  category: "carrier",
  order: 1,
  number: "3.1",
  title: { ru: "Запуск на авианосце", en: "Carrier Startup & Launch" },
  cards: [
    {
      lang: "both",
      icon: "\u{1F6A2}",
      title: "Startup \u2192 Catapult \u2192 Launch",
      type: "carrier",
      phrases: [
        { label: "a) Ready report", text: "Tower, {cs}, ready", speaker: "pilot" },
        { label: "b) Weapons ready", text: "Tower, {cs}, weapon ready", speaker: "pilot" },
        { label: "c) Request start up", text: "Tower, {cs}, request start up", speaker: "pilot" },
        { label: "c) ATC response", text: "{cs}, Tower, start up approved, catapult 1, wind 270 at 7 kts, QFE 30.00, Overcast 030, departure CASE I", speaker: "atc" },
        { label: "d) Catapult & takeoff", text: "Tower, {cs}, catapult 1, request take-off", speaker: "pilot" },
        { label: "d) ATC response", text: "{cs}, Tower, start-up", speaker: "atc" },
        { label: "e) Airborne", text: "{cs}, airborne", speaker: "pilot" }
      ]
    }
  ]
});
