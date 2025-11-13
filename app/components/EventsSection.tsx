"use client";
import { useEffect, useState } from "react";

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
}

export default function EventsSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/events") // publikus endpoint
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Események
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md p-6 animate-pulse h-64"
              />
            ))}
          </div>
        ) : events.length === 0 ? (
          <p className="text-center text-gray-500 text-xl">Nincs esemény.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-500 opacity-0 animate-fadeIn"
                style={{ animationFillMode: "forwards", animationDelay: `${event.id * 100}ms` }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-semibold text-gray-800">{event.title}</h3>
                  <span className="text-xl text-gray-500">
                    {new Date(event.date).toLocaleDateString("hu-HU")}
                  </span>
                </div>
                <p className="text-gray-700 text-xl md:text-lg leading-relaxed">{event.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fade-in keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease forwards;
        }
      `}</style>
    </section>
  );
}
