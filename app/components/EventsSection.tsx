"use client";
import Image from "next/image";
import events from "../../public/data/events.json"; // JSON fájl import

export default function EventsSection() {
  return (
    <section id="events" className="bg-[#FDF7E4] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Események
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="relative w-full h-56">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{event.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{event.date}</p>
                <p className="text-gray-700 mb-4">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
