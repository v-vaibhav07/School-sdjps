import { useEffect, useState } from "react"
import API from "../services/api"
import { ChevronLeft, ChevronRight, CalendarDays, X } from "lucide-react"

const EVENT_TYPES = [
  { value: "general",  label: "General",  light: "bg-indigo-50  text-indigo-700  border-indigo-200" },
  { value: "holiday",  label: "Holiday",  light: "bg-red-50    text-red-700     border-red-200"    },
  { value: "exam",     label: "Exam",     light: "bg-amber-50  text-amber-700   border-amber-200"  },
  { value: "event",    label: "Event",    light: "bg-green-50  text-green-700   border-green-200"  },
  { value: "meeting",  label: "Meeting",  light: "bg-purple-50 text-purple-700  border-purple-200" },
]

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
]

const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

function getTypeInfo(type) {
  return EVENT_TYPES.find(t => t.value === type) || EVENT_TYPES[0]
}

function StudentCalendar() {
  const today       = new Date()
  const [year,  setYear]  = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth() + 1)

  const [events,       setEvents]       = useState([])
  const [loading,      setLoading]      = useState(true)
  const [selectedDate, setSelectedDate] = useState(null)
  const [showPanel,    setShowPanel]    = useState(false)

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const res = await API.get(`/calendar?month=${month}&year=${year}`)
      setEvents(res.data || [])
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchEvents() }, [month, year])

  const firstDay    = new Date(year, month - 1, 1).getDay()
  const daysInMonth = new Date(year, month, 0).getDate()

  const calendarCells = []
  for (let i = 0; i < firstDay; i++) calendarCells.push(null)
  for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d)

  const getEventsForDay = (day) => {
    if (!day) return []
    const dateStr = `${year}-${String(month).padStart(2,"0")}-${String(day).padStart(2,"0")}`
    return events.filter(e => e.event_date === dateStr)
  }

  const prevMonth = () => {
    if (month === 1) { setMonth(12); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (month === 12) { setMonth(1); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  const todayStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`

  const selectedEvents = selectedDate ? getEventsForDay(selectedDate) : []

  // Upcoming events this month
  const upcomingEvents = events
    .filter(e => e.event_date >= todayStr)
    .slice(0, 5)

  return (
    <div className="p-4 md:p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
          <CalendarDays className="text-indigo-600" size={30} />
          School Calendar
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          View upcoming school events, exams and holidays
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Month Nav */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <button
              onClick={prevMonth}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-indigo-100 hover:text-indigo-600 transition"
            >
              <ChevronLeft size={18} />
            </button>
            <h2 className="text-lg font-bold text-gray-800">
              {MONTHS[month - 1]} {year}
            </h2>
            <button
              onClick={nextMonth}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-indigo-100 hover:text-indigo-600 transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Day Labels */}
          <div className="grid grid-cols-7 border-b border-gray-100">
            {DAYS.map(d => (
              <div key={d} className="py-2.5 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {d}
              </div>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-7">
              {calendarCells.map((day, idx) => {
                const dayEvents  = getEventsForDay(day)
                const dateStr    = day ? `${year}-${String(month).padStart(2,"0")}-${String(day).padStart(2,"0")}` : null
                const isToday    = dateStr === todayStr
                const isSelected = selectedDate === day && showPanel
                const isSunday   = (idx % 7) === 0

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      if (!day) return
                      setSelectedDate(day)
                      setShowPanel(true)
                    }}
                    className={`
                      min-h-[70px] md:min-h-[90px] p-1.5 md:p-2 border-b border-r border-gray-50
                      transition-all
                      ${!day ? "bg-gray-50/50 cursor-default" : "cursor-pointer hover:bg-indigo-50/40"}
                      ${isSelected ? "bg-indigo-50 ring-2 ring-inset ring-indigo-300" : ""}
                      ${isSunday && day ? "bg-red-50/30" : ""}
                    `}
                  >
                    {day && (
                      <>
                        <span className={`
                          w-7 h-7 flex items-center justify-center rounded-full text-sm font-semibold mb-1
                          ${isToday ? "bg-indigo-600 text-white" : isSunday ? "text-red-500" : "text-gray-700"}
                        `}>
                          {day}
                        </span>

                        <div className="space-y-0.5">
                          {dayEvents.slice(0, 2).map(ev => {
                            const t = getTypeInfo(ev.event_type)
                            return (
                              <div key={ev.id} className={`text-xs px-1.5 py-0.5 rounded-md truncate border ${t.light}`}>
                                {ev.title}
                              </div>
                            )
                          })}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-400 px-1">+{dayEvents.length - 2}</div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="space-y-4">

          {/* Legend */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-700 text-sm mb-3">Event Types</h3>
            <div className="space-y-2">
              {EVENT_TYPES.map(t => (
                <div key={t.value} className="flex items-center gap-2">
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${t.light}`}>
                    {t.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Day Events */}
          {showPanel && selectedDate && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-700 text-sm">
                  {MONTHS[month-1]} {selectedDate}
                </h3>
                <button
                  onClick={() => setShowPanel(false)}
                  className="w-6 h-6 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                >
                  <X size={12} />
                </button>
              </div>

              {selectedEvents.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-4">No events this day</p>
              ) : (
                <div className="space-y-2">
                  {selectedEvents.map(ev => {
                    const t = getTypeInfo(ev.event_type)
                    return (
                      <div key={ev.id} className={`p-3 rounded-xl border ${t.light}`}>
                        <p className="font-semibold text-sm">{ev.title}</p>
                        {ev.description && (
                          <p className="text-xs mt-0.5 opacity-80">{ev.description}</p>
                        )}
                        <p className="text-xs mt-1 opacity-60">{t.label}</p>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* Upcoming Events */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-700 text-sm mb-3">Upcoming Events</h3>
            {upcomingEvents.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-4">No upcoming events</p>
            ) : (
              <div className="space-y-2">
                {upcomingEvents.map(ev => {
                  const t    = getTypeInfo(ev.event_type)
                  const date = new Date(ev.event_date)
                  return (
                    <div key={ev.id} className="flex items-start gap-3">
                      <div className={`text-center min-w-[40px] p-1.5 rounded-xl border ${t.light}`}>
                        <div className="text-xs font-bold leading-none">
                          {date.getDate()}
                        </div>
                        <div className="text-xs opacity-70 mt-0.5">
                          {MONTHS[date.getMonth()].slice(0,3)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">{ev.title}</p>
                        <p className="text-xs text-gray-400">{t.label}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default StudentCalendar