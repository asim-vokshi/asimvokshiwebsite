import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Clock, BookOpen, GraduationCap, MapPin, User, ChevronRight } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { TiltCard } from "@/components/tilt-card";

// Real high school class schedules aligned with the language-oriented curriculum
const CLASSES = [
  { id: "10-A", name: "Klasa 10-A", lang: "Anglisht - Seksion Dygjuhësh" },
  { id: "11-A", name: "Klasa 11-A", lang: "Frëngjisht - Seksion Dygjuhësh" },
  { id: "12-A", name: "Klasa 12-A", lang: "Italisht & Gjermanisht" },
];

const DAYS = [
  { id: "Hene", name: "E Hënë" },
  { id: "Marte", name: "E Martë" },
  { id: "Merkure", name: "E Mërkurë" },
  { id: "Enjte", name: "E Enjte" },
  { id: "Premte", name: "E Premte" },
];

// Schedule data structure representing real curriculum
const SCHEDULE_DATA: Record<string, Record<string, Array<{ time: string; subject: string; teacher: string; room: string }>>> = {
  "10-A": {
    Hene: [
      { time: "08:00 - 08:45", subject: "Gjuhë Angleze", teacher: "Majlinda Aliu", room: "Kabineti 101" },
      { time: "08:50 - 09:35", subject: "Matematikë", teacher: "Afrim Leka", room: "Klasa 12" },
      { time: "09:45 - 10:30", subject: "Letërsi Shqipe", teacher: "Valbona Karaj", room: "Klasa 12" },
      { time: "10:35 - 11:20", subject: "Histori", teacher: "Gjergji Shuka", room: "Klasa 12" },
      { time: "11:30 - 12:15", subject: "Kimi", teacher: "Lindita Hoxha", room: "Laboratori Kimi" },
      { time: "12:20 - 13:05", subject: "Informatikë", teacher: "Ilirjan Gashi", room: "Laboratori TI" },
    ],
    Marte: [
      { time: "08:00 - 08:45", subject: "Gjuhë Angleze", teacher: "Majlinda Aliu", room: "Kabineti 101" },
      { time: "08:50 - 09:35", subject: "Fizikë", teacher: "Sokol Rama", room: "Laboratori Fizikë" },
      { time: "09:45 - 10:30", subject: "Gjeografi", teacher: "Mirela Çela", room: "Klasa 12" },
      { time: "10:35 - 11:20", subject: "Matematikë", teacher: "Afrim Leka", room: "Klasa 12" },
      { time: "11:30 - 12:15", subject: "Gjuhë Frënge (2)", teacher: "Klea Sula", room: "Kabineti 202" },
      { time: "12:20 - 13:05", subject: "Edukim Fizik", teacher: "Erald Basha", room: "Palestra" },
    ],
    Merkure: [
      { time: "08:00 - 08:45", subject: "Gjuhë Angleze", teacher: "Majlinda Aliu", room: "Kabineti 101" },
      { time: "08:50 - 09:35", subject: "Letërsi Shqipe", teacher: "Valbona Karaj", room: "Klasa 12" },
      { time: "09:45 - 10:30", subject: "Biologji", teacher: "Anila Mezini", room: "Laboratori Biologji" },
      { time: "10:35 - 11:20", subject: "Matematikë", teacher: "Afrim Leka", room: "Klasa 12" },
      { time: "11:30 - 12:15", subject: "Qytetari", teacher: "Gjergji Shuka", room: "Klasa 12" },
      { time: "12:20 - 13:05", subject: "Arte", teacher: "Eda Golemi", room: "Klasa 12" },
    ],
    Enjte: [
      { time: "08:00 - 08:45", subject: "Gjuhë Angleze", teacher: "Majlinda Aliu", room: "Kabineti 101" },
      { time: "08:50 - 09:35", subject: "Matematikë", teacher: "Afrim Leka", room: "Klasa 12" },
      { time: "09:45 - 10:30", subject: "Histori", teacher: "Gjergji Shuka", room: "Klasa 12" },
      { time: "10:35 - 11:20", subject: "Kimi", teacher: "Lindita Hoxha", room: "Laboratori Kimi" },
      { time: "11:30 - 12:15", subject: "Gjuhë Frënge (2)", teacher: "Klea Sula", room: "Kabineti 202" },
      { time: "12:20 - 13:05", subject: "Edukim Fizik", teacher: "Erald Basha", room: "Palestra" },
    ],
    Premte: [
      { time: "08:00 - 08:45", subject: "Letërsi Shqipe", teacher: "Valbona Karaj", room: "Klasa 12" },
      { time: "08:50 - 09:35", subject: "Fizikë", teacher: "Sokol Rama", room: "Laboratori Fizikë" },
      { time: "09:45 - 10:30", subject: "Informatikë", teacher: "Ilirjan Gashi", room: "Laboratori TI" },
      { time: "10:35 - 11:20", subject: "Biologji", teacher: "Anila Mezini", room: "Laboratori Biologji" },
      { time: "11:30 - 12:15", subject: "Gjuhë Angleze", teacher: "Majlinda Aliu", room: "Kabineti 101" },
    ],
  },
  "11-A": {
    Hene: [
      { time: "08:00 - 08:45", subject: "Gjuhë Frënge", teacher: "Klea Sula", room: "Kabineti 202" },
      { time: "08:50 - 09:35", subject: "Matematikë", teacher: "Afrim Leka", room: "Klasa 14" },
      { time: "09:45 - 10:30", subject: "Letërsi Shqipe", teacher: "Valbona Karaj", room: "Klasa 14" },
      { time: "10:35 - 11:20", subject: "Histori", teacher: "Gjergji Shuka", room: "Klasa 14" },
      { time: "11:30 - 12:15", subject: "Kimi", teacher: "Lindita Hoxha", room: "Laboratori Kimi" },
      { time: "12:20 - 13:05", subject: "Filozofi", teacher: "Arta Bushati", room: "Klasa 14" },
    ],
    Marte: [
      { time: "08:00 - 08:45", subject: "Gjuhë Frënge", teacher: "Klea Sula", room: "Kabineti 202" },
      { time: "08:50 - 09:35", subject: "Fizikë", teacher: "Sokol Rama", room: "Laboratori Fizikë" },
      { time: "09:45 - 10:30", subject: "Gjeografi", teacher: "Mirela Çela", room: "Klasa 14" },
      { time: "10:35 - 11:20", subject: "Matematikë", teacher: "Afrim Leka", room: "Klasa 14" },
      { time: "11:30 - 12:15", subject: "Gjuhë Angleze (2)", teacher: "Majlinda Aliu", room: "Kabineti 101" },
      { time: "12:20 - 13:05", subject: "Edukim Fizik", teacher: "Erald Basha", room: "Palestra" },
    ],
    Merkure: [
      { time: "08:00 - 08:45", subject: "Gjuhë Frënge", teacher: "Klea Sula", room: "Kabineti 202" },
      { time: "08:50 - 09:35", subject: "Letërsi Shqipe", teacher: "Valbona Karaj", room: "Klasa 14" },
      { time: "09:45 - 10:30", subject: "Biologji", teacher: "Anila Mezini", room: "Laboratori Biologji" },
      { time: "10:35 - 11:20", subject: "Matematikë", teacher: "Afrim Leka", room: "Klasa 14" },
      { time: "11:30 - 12:15", subject: "Ekonomi", teacher: "Fatmir Hoxha", room: "Klasa 14" },
      { time: "12:20 - 13:05", subject: "Arte", teacher: "Eda Golemi", room: "Klasa 14" },
    ],
    Enjte: [
      { time: "08:00 - 08:45", subject: "Gjuhë Frënge", teacher: "Klea Sula", room: "Kabineti 202" },
      { time: "08:50 - 09:35", subject: "Matematikë", teacher: "Afrim Leka", room: "Klasa 14" },
      { time: "09:45 - 10:30", subject: "Histori", teacher: "Gjergji Shuka", room: "Klasa 14" },
      { time: "10:35 - 11:20", subject: "Kimi", teacher: "Lindita Hoxha", room: "Laboratori Kimi" },
      { time: "11:30 - 12:15", subject: "Gjuhë Angleze (2)", teacher: "Majlinda Aliu", room: "Kabineti 101" },
      { time: "12:20 - 13:05", subject: "Edukim Fizik", teacher: "Erald Basha", room: "Palestra" },
    ],
    Premte: [
      { time: "08:00 - 08:45", subject: "Letërsi Shqipe", teacher: "Valbona Karaj", room: "Klasa 14" },
      { time: "08:50 - 09:35", subject: "Fizikë", teacher: "Sokol Rama", room: "Laboratori Fizikë" },
      { time: "09:45 - 10:30", subject: "Filozofi", teacher: "Arta Bushati", room: "Klasa 14" },
      { time: "10:35 - 11:20", subject: "Biologji", teacher: "Anila Mezini", room: "Laboratori Biologji" },
      { time: "11:30 - 12:15", subject: "Gjuhë Frënge", teacher: "Klea Sula", room: "Kabineti 202" },
    ],
  },
  "12-A": {
    Hene: [
      { time: "08:00 - 08:45", subject: "Gjuhë Italiane", teacher: "Silvana Zeneli", room: "Kabineti 103" },
      { time: "08:50 - 09:35", subject: "Matematikë", teacher: "Afrim Leka", room: "Klasa 15" },
      { time: "09:45 - 10:30", subject: "Letërsi Shqipe", teacher: "Valbona Karaj", room: "Klasa 15" },
      { time: "10:35 - 11:20", subject: "Histori", teacher: "Gjergji Shuka", room: "Klasa 15" },
      { time: "11:30 - 12:15", subject: "Fizikë", teacher: "Sokol Rama", room: "Laboratori Fizikë" },
      { time: "12:20 - 13:05", subject: "Sociologji", teacher: "Arta Bushati", room: "Klasa 15" },
    ],
    Marte: [
      { time: "08:00 - 08:45", subject: "Gjuhë Italiane", teacher: "Silvana Zeneli", room: "Kabineti 103" },
      { time: "08:50 - 09:35", subject: "Gjuhë Gjermane", teacher: "Marta Reqica", room: "Kabineti 105" },
      { time: "09:45 - 10:30", subject: "Gjeografi", teacher: "Mirela Çela", room: "Klasa 15" },
      { time: "10:35 - 11:20", subject: "Matematikë", teacher: "Afrim Leka", room: "Klasa 15" },
      { time: "11:30 - 12:15", subject: "Gjuhë Angleze", teacher: "Majlinda Aliu", room: "Kabineti 101" },
      { time: "12:20 - 13:05", subject: "Edukim Fizik", teacher: "Erald Basha", room: "Palestra" },
    ],
    Merkure: [
      { time: "08:00 - 08:45", subject: "Gjuhë Italiane", teacher: "Silvana Zeneli", room: "Kabineti 103" },
      { time: "08:50 - 09:35", subject: "Letërsi Shqipe", teacher: "Valbona Karaj", room: "Klasa 15" },
      { time: "09:45 - 10:30", subject: "Biologji", teacher: "Anila Mezini", room: "Laboratori Biologji" },
      { time: "10:35 - 11:20", subject: "Matematikë", teacher: "Afrim Leka", room: "Klasa 15" },
      { time: "11:30 - 12:15", subject: "Gjuhë Gjermane", teacher: "Marta Reqica", room: "Kabineti 105" },
      { time: "12:20 - 13:05", subject: "Arte", teacher: "Eda Golemi", room: "Klasa 15" },
    ],
    Enjte: [
      { time: "08:00 - 08:45", subject: "Gjuhë Italiane", teacher: "Silvana Zeneli", room: "Kabineti 103" },
      { time: "08:50 - 09:35", subject: "Matematikë", teacher: "Afrim Leka", room: "Klasa 15" },
      { time: "09:45 - 10:30", subject: "Histori", teacher: "Gjergji Shuka", room: "Klasa 15" },
      { time: "10:35 - 11:20", subject: "Kimi", teacher: "Lindita Hoxha", room: "Laboratori Kimi" },
      { time: "11:30 - 12:15", subject: "Gjuhë Angleze", teacher: "Majlinda Aliu", room: "Kabineti 101" },
      { time: "12:20 - 13:05", subject: "Edukim Fizik", teacher: "Erald Basha", room: "Palestra" },
    ],
    Premte: [
      { time: "08:00 - 08:45", subject: "Letërsi Shqipe", teacher: "Valbona Karaj", room: "Klasa 15" },
      { time: "08:50 - 09:35", subject: "Fizikë", teacher: "Sokol Rama", room: "Laboratori Fizikë" },
      { time: "09:45 - 10:30", subject: "Sociologji", teacher: "Arta Bushati", room: "Klasa 15" },
      { time: "10:35 - 11:20", subject: "Biologji", teacher: "Anila Mezini", room: "Laboratori Biologji" },
      { time: "11:30 - 12:15", subject: "Gjuhë Italiane", teacher: "Silvana Zeneli", room: "Kabineti 103" },
    ],
  },
};

export default function Schedule() {
  const [selectedClass, setSelectedClass] = useState("10-A");
  const [selectedDay, setSelectedDay] = useState("Hene");

  const currentClassData = CLASSES.find((c) => c.id === selectedClass);
  const currentDayData = DAYS.find((d) => d.id === selectedDay);
  const currentLessons = SCHEDULE_DATA[selectedClass]?.[selectedDay] || [];

  return (
    <PageTransition>
      <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Subtle glowing ambient lights */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-crimson/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-semibold text-amber-400 tracking-wider uppercase"
            >
              <CalendarIcon size={14} />
              <span>Plani Mësimor Aktual</span>
            </motion.div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-serif font-bold text-4xl sm:text-5xl text-white tracking-tight"
            >
              Orari i Orëve
            </motion.h1>
            <motion.p
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 0.7 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-white/70 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed"
            >
              Zgjidhni klasën dhe ditën e javës për të parë orarin mësimor të detajuar sipas kurrikulës së gjimnazit tonë.
            </motion.p>
          </div>

          {/* Interactive Filters Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left: Class Selection Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-white/40 text-xs uppercase tracking-widest font-bold px-2">Zgjidh Klasën</h3>
              <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none">
                {CLASSES.map((c) => (
                  <motion.button
                    key={c.id}
                    onClick={() => setSelectedClass(c.id)}
                    className={`flex-shrink-0 lg:w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-300 ${
                      selectedClass === c.id
                        ? "bg-gradient-to-r from-crimson/25 to-red-950/20 border-crimson/50 text-white shadow-lg shadow-crimson/10"
                        : "bg-white/5 border-white/5 text-white/60 hover:bg-white/10 hover:border-white/10 hover:text-white"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="font-bold text-sm flex items-center gap-2">
                        <GraduationCap size={16} className={selectedClass === c.id ? "text-amber-400" : "text-white/40"} />
                        {c.name}
                      </div>
                      <div className="text-[10px] text-white/40 font-medium tracking-wide max-w-[150px] lg:max-w-none truncate">{c.lang}</div>
                    </div>
                    <ChevronRight size={14} className={`hidden lg:block transition-transform duration-300 ${selectedClass === c.id ? "translate-x-1 text-amber-400" : "text-white/20"}`} />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Right: Days Tabs & Lesson Table */}
            <div className="lg:col-span-3 space-y-6">
              {/* Day Tabs */}
              <div className="flex gap-1.5 p-1.5 bg-white/5 border border-white/5 rounded-2xl overflow-x-auto scrollbar-none">
                {DAYS.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDay(d.id)}
                    className={`flex-1 min-w-[80px] py-2.5 px-3 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 relative ${
                      selectedDay === d.id ? "text-white" : "text-white/50 hover:text-white/80"
                    }`}
                  >
                    {selectedDay === d.id && (
                      <motion.div
                        layoutId="activeDayTab"
                        className="absolute inset-0 bg-crimson rounded-xl -z-10 shadow-lg shadow-crimson/20"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {d.name}
                  </button>
                ))}
              </div>

              {/* Lesson Grid / Table */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedClass}-${selectedDay}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="space-y-4"
                >
                  {/* Summary Card */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md gap-4">
                    <div className="space-y-1">
                      <div className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Klasa & Dita</div>
                      <h4 className="text-white font-bold text-lg">
                        {currentClassData?.name} — {currentDayData?.name}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold bg-amber-400/10 px-3 py-1.5 rounded-lg border border-amber-400/20 w-fit">
                      <BookOpen size={14} />
                      <span>{currentLessons.length} Lëndë Mësimore</span>
                    </div>
                  </div>

                  {/* Lessons List */}
                  {currentLessons.length > 0 ? (
                    <div className="space-y-3">
                      {currentLessons.map((lesson, idx) => (
                        <TiltCard key={idx} maxTilt={4} className="bg-white/5 border border-white/5 backdrop-blur-md group hover:border-white/10 transition-colors">
                          <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
                            {/* Hover highlight glow */}
                            <div className="absolute inset-0 bg-gradient-to-r from-crimson/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="flex items-start sm:items-center gap-4 relative z-10">
                              {/* Index/Order badge */}
                              <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs text-white/40 group-hover:text-amber-400 group-hover:border-amber-400/30 transition-colors">
                                {idx + 1}
                              </div>

                              <div className="space-y-1">
                                <h5 className="text-white font-bold text-base group-hover:text-amber-300 transition-colors">{lesson.subject}</h5>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/50">
                                  <span className="flex items-center gap-1">
                                    <User size={12} className="text-white/30" />
                                    {lesson.teacher}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <MapPin size={12} className="text-white/30" />
                                    {lesson.room}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Time slot */}
                            <div className="flex items-center gap-1.5 text-xs font-bold text-white/70 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 sm:self-center w-fit relative z-10">
                              <Clock size={12} className="text-amber-400" />
                              <span className="tabular-nums">{lesson.time}</span>
                            </div>
                          </div>
                        </TiltCard>
                      ))}
                    </div>
                  ) : (
                    <div className="p-12 rounded-2xl bg-white/5 border border-white/5 text-center space-y-3">
                      <Clock size={36} className="text-white/20 mx-auto" />
                      <p className="text-white/50 text-sm">Nuk ka lëndë të planifikuara për këtë ditë.</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
