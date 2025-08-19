"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import * as Tabs from "@radix-ui/react-tabs";

export default function Home() {
  const [birthDetails, setBirthDetails] = useState<any>(null);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [rasiChart, setRasiChart] = useState<any>(null);
  const [chartDetails, setChartDetails] = useState<any>(null);

  // Chat birth details (only 4)
  const handleBirthSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      date: e.target.date.value,
      time: e.target.time.value,
      place: e.target.place.value,
    };
    setBirthDetails(data);
    setMessages([
      {
        role: "assistant",
        content:
          "✨ I have your birth details. What would you like to explore first — love, career, health, or something else?",
      },
    ]);
  };

  // Chat message submit
  const handleChatSubmit = async (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/astrology", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ birthDetails, messages: newMessages }),
    });
    const data = await res.json();
    setMessages([...newMessages, { role: "assistant", content: data.answer }]);
    setLoading(false);
  };

  // Rasi chart fetch
  const handleChartSubmit = async (e: any, requireAll: boolean) => {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.target).entries());

    const finalDetails = requireAll ? values : { ...birthDetails, ...values };
    setChartDetails(finalDetails);

    const res = await fetch("/api/planets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalDetails),
    });
    const chartData = await res.json();
    setRasiChart(chartData);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-indigo-300 via-purple-200 to-pink-100">
      {/* Header */}
      <header className="p-4 text-center border-b bg-white/70 backdrop-blur-md shadow-sm">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
          🔮 AI Astrologer
        </h1>
      </header>

      {/* Tabs Always Visible */}
      <Tabs.Root defaultValue="chat" className="flex flex-col flex-1">
        <Tabs.List className="flex border-b bg-white/60 backdrop-blur-md shadow-sm">
          <Tabs.Trigger
            value="chat"
            className="flex-1 p-3 text-center hover:bg-purple-100 font-medium"
          >
            💬 Chat
          </Tabs.Trigger>
          <Tabs.Trigger
            value="rasi"
            className="flex-1 p-3 text-center hover:bg-purple-100 font-medium"
          >
            🌌 Rāsi Chart
          </Tabs.Trigger>
        </Tabs.List>

        {/* Chat Section */}
        {/* Chat Section */}
        <Tabs.Content value="chat" className="flex-1 flex flex-col">
          {!birthDetails ? (
            // Ask 4 fields
            <div className="flex-1 flex items-center justify-center">
              <form
                onSubmit={handleBirthSubmit}
                className="backdrop-blur-md bg-white/70 p-6 rounded-2xl shadow-xl w-full max-w-md space-y-4"
              >
                <h2 className="text-lg font-semibold text-center">
                  ✨ Enter Birth Details
                </h2>
                <input
                  name="name"
                  placeholder="Name"
                  className="w-full border p-3 rounded-xl"
                  required
                />
                <input
                  type="date"
                  name="date"
                  className="w-full border p-3 rounded-xl"
                  required
                />
                <input
                  type="time"
                  name="time"
                  className="w-full border p-3 rounded-xl"
                  required
                />
                <input
                  name="place"
                  placeholder="Place of Birth"
                  className="w-full border p-3 rounded-xl"
                  required
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-pink-500 text-white w-full py-3 rounded-xl shadow-md hover:scale-105 transition-transform cursor-pointer"
                >
                  Start Reading
                </button>
              </form>
            </div>
          ) : (
            // Chat Interface
            <div className="flex flex-col flex-1">
              <div className="flex-1 overflow-y-auto space-y-4 p-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`px-4 py-3 rounded-2xl shadow-md max-w-[75%] transition-all ${
                      msg.role === "user"
                        ? "ml-auto bg-gradient-to-r from-purple-500 to-pink-400 text-white"
                        : "bg-gradient-to-r from-indigo-100 to-purple-50 text-gray-800"
                    }`}
                  >
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="italic text-gray-500 flex items-center gap-2">
                    <span className="animate-spin">🌌</span> Reading the
                    stars...
                  </div>
                )}
              </div>

              <form
                onSubmit={handleChatSubmit}
                className="flex gap-2 p-3 border-t bg-white/70 backdrop-blur-md"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about love, career, health..."
                  className="flex-1 border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none p-3 rounded-xl"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 rounded-xl shadow-md cursor-pointer hover:scale-105 hover:shadow-lg transition-transform"
                >
                  Ask
                </button>
              </form>
            </div>
          )}
        </Tabs.Content>

        {/* Rasi Chart Section */}
        <Tabs.Content
          value="rasi"
          className="flex-1 flex flex-col p-4 overflow-y-auto"
        >
          {!chartDetails ? (
            // If no chart details
            <form
              onSubmit={(e) => handleChartSubmit(e, !birthDetails)}
              className="backdrop-blur-md bg-white/70 p-6 rounded-2xl shadow-xl w-full max-w-lg mx-auto space-y-4"
            >
              <h2 className="text-lg font-semibold text-center">
                🌠 Enter Birth Details for Rāsi Chart
              </h2>
              {/* If no birthDetails, ask everything */}
              {!birthDetails && (
                <>
                  <input
                    name="name"
                    placeholder="Name"
                    className="w-full border p-3 rounded-xl"
                    required
                  />
                  <input
                    type="date"
                    name="date"
                    className="w-full border p-3 rounded-xl"
                    required
                  />
                  <input
                    type="time"
                    name="time"
                    className="w-full border p-3 rounded-xl"
                    required
                  />
                  <input
                    name="place"
                    placeholder="Place of Birth"
                    className="w-full border p-3 rounded-xl"
                    required
                  />
                </>
              )}
              {/* Always needed */}
              <input
                name="latitude"
                placeholder="Latitude"
                className="w-full border p-3 rounded-xl"
                required
              />
              <input
                name="longitude"
                placeholder="Longitude"
                className="w-full border p-3 rounded-xl"
                required
              />
              <input
                name="timezone"
                placeholder="Timezone (e.g. 5.5)"
                className="w-full border p-3 rounded-xl"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white w-full py-3 rounded-xl shadow-md"
              >
                Show Chart
              </button>
            </form>
          ) : !rasiChart ? (
            <p className="text-center text-gray-600">Loading chart...</p>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-purple-700">
                🌌 Rāsi Chart
              </h2>
              <table className="w-full border text-sm rounded-xl overflow-hidden shadow-md">
                <thead>
                  <tr className="bg-purple-100 text-gray-800">
                    <th className="p-2 border">Planet</th>
                    <th className="p-2 border">Sign</th>
                    <th className="p-2 border">Degree</th>
                    <th className="p-2 border">Retrograde</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(rasiChart.output[1]).map(
                    ([planet, data]: any, i) => (
                      <tr
                        key={planet}
                        className={
                          i % 2 === 0 ? "bg-white/70" : "bg-purple-50/50"
                        }
                      >
                        <td className="border p-2 font-medium">{planet}</td>
                        <td className="border p-2">{data.current_sign}</td>
                        <td className="border p-2">
                          {data.normDegree.toFixed(2)}°
                        </td>
                        <td
                          className={`border p-2 ${
                            data.isRetro === "true"
                              ? "text-red-600 font-semibold"
                              : "text-gray-700"
                          }`}
                        >
                          {data.isRetro === "true" ? "Yes" : "No"}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
