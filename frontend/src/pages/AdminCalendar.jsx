import { useEffect, useState } from "react"
import API from "../services/api"
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Trash2,
  Pencil,
  CalendarDays,
  Tag,
  AlignLeft,
  Save
} from "lucide-react"

const EVENT_TYPES = [
  { value: "general",  label: "General",   color: "bg-indigo-500",  light: "bg-indigo-50  text-indigo-700  border-indigo-200" },
  { value: "holiday",  label: "Holiday",   color: "bg-red-500",     light: "bg-red-50    text-red-700     border-red-200"    },
  { value: "exam",     label: "Exam",      color: "bg-amber-500",   light: "bg-amber-50  text-amber-700   border-amber-200"  },
  { value: "event",    label: "Event",     color: "bg-green-500",   light: "bg-green-50  text-green-700   border-green-200"  },
  { value: "meeting",  label: "Meeting",   color: "bg-purple-500",  light: "bg-purple-50 text-purple-700  border-purple-200" },
]

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
]

const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

function getTypeInfo(type) {
  return EVENT_TYPES.find(t => t.value === type) || EVENT_TYPES[0]
}

function AdminCalendar() {
  const today       = new Date()
  const [year,  setYear]  = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth() + 1) // 1-indexed

  const [events,       setEvents]       = useState([])
  const [loading,      setLoading]      = useState(true)
  const [selectedDate, setSelectedDate] = useState(null)
  const [showModal,    setShowModal]    = useState(false)
  const [editEvent,    setEditEvent]    = useState(null)
  const [saving,       setSaving]       = useState(false)
  const [showDayPanel, setShowDayPanel] = useState(false)

  const [form, setForm] = useState({
    title:       "",
    description: "",
    event_type:  "general",
    event_date:  ""
  })

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const res = await API.get(`/calendar?month=${month}&year=${year}`)
      setEvents(res.data || [])
    } catch (err) {
      console.log(err)
      setEvents([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchEvents() }, [month, year])

  // ── Calendar grid ──────────────────────────────────────────
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

  // ── Navigation ─────────────────────────────────────────────
  const prevMonth = () => {
    if (month === 1) { setMonth(12); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (month === 12) { setMonth(1); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  // ── Open add modal ─────────────────────────────────────────
  const openAdd = (day) => {
    const dateStr = `${year}-${String(month).padStart(2,"0")}-${String(day).padStart(2,"0")}`
    setEditEvent(null)
    setForm({ title: "", description: "", event_type: "general", event_date: dateStr })
    setShowModal(true)
  }

  // ── Open edit modal ────────────────────────────────────────
  const openEdit = (e, ev) => {
    e.stopPropagation()
    setEditEvent(ev)
    setForm({
      title:       ev.title,
      description: ev.description || "",
      event_type:  ev.event_type,
      event_date:  ev.event_date
    })
    setShowModal(true)
  }

  // ── Save (create or update) ────────────────────────────────
  const handleSave = async () => {
    if (!form.title.trim()) return
    try {
      setSaving(true)
      if (editEvent) {
        await API.put(`/calendar/${editEvent.id}`, form)
      } else {
        await API.post("/calendar", form)
      }
      setShowModal(false)
      fetchEvents()
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to save event")
    } finally {
      setSaving(false)
    }
  }

  // ── Delete ─────────────────────────────────────────────────
  const handleDelete = async (e, id) => {
    e.stopPropagation()
    if (!window.confirm("Delete this event?")) return
    try {
      await API.delete(`/calendar/${id}`)
      fetchEvents()
    } catch (err) {
      alert("Failed to delete event")
    }
  }

  // ── Day panel ──────────────────────────────────────────────
  const openDayPanel = (day) => {
    setSelectedDate(day)
    setShowDayPanel(true)
  }

  const selectedDateEvents = selectedDate ? getEventsForDay(selectedDate) : []
  const todayStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`

  return (
    <div className="p-4 md:p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
            <CalendarDays className="text-indigo-600" size={30} />
            School Calendar
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Click any date to add or view events
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-2">
          {EVENT_TYPES.map(t => (
            <span key={t.value} className={`text-xs px-2.5 py-1 rounded-full border font-medium ${t.light}`}>
              {t.label}
            </span>
          ))}
        </div>
      </div>

      {/* Month Navigator */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
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

        {/* Day Headers */}
        <div className="grid grid-cols-7 border-b border-gray-100">
          {DAYS.map(d => (
            <div key={d} className="py-2.5 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
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
              const isSelected = selectedDate === day && showDayPanel
              const isSunday   = (idx % 7) === 0

              return (
                <div
                  key={idx}
                  onClick={() => day && openDayPanel(day)}
                  className={`
                    min-h-[80px] md:min-h-[100px] p-1.5 md:p-2 border-b border-r border-gray-50
                    cursor-pointer transition-all group
                    ${!day ? "bg-gray-50/50 cursor-default" : "hover:bg-indigo-50/40"}
                    ${isSelected ? "bg-indigo-50 ring-2 ring-inset ring-indigo-300" : ""}
                    ${isSunday && day ? "bg-red-50/30" : ""}
                  `}
                >
                  {day && (
                    <>
                      {/* Date number */}
                      <div className="flex items-center justify-between mb-1">
                        <span className={`
                          w-7 h-7 flex items-center justify-center rounded-full text-sm font-semibold transition
                          ${isToday ? "bg-indigo-600 text-white" : "text-gray-700 group-hover:bg-indigo-100"}
                          ${isSunday ? "text-red-500" : ""}
                        `}>
                          {day}
                        </span>

                        {/* Add button on hover */}
                        <button
                          onClick={(e) => { e.stopPropagation(); openAdd(day) }}
                          className="w-6 h-6 flex items-center justify-center rounded-lg bg-indigo-600 text-white opacity-0 group-hover:opacity-100 transition shadow-sm"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Events */}
                      <div className="space-y-0.5">
                        {dayEvents.slice(0, 2).map(ev => {
                          const t = getTypeInfo(ev.event_type)
                          return (
                            <div
                              key={ev.id}
                              className={`text-xs px-1.5 py-0.5 rounded-md font-medium truncate ${t.light} border`}
                            >
                              {ev.title}
                            </div>
                          )
                        })}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-400 px-1">
                            +{dayEvents.length - 2} more
                          </div>
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

      {/* Day Events Panel */}
      {showDayPanel && selectedDate && (
        <div className="mt-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800 text-lg">
              {MONTHS[month-1]} {selectedDate}, {year}
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAdd(selectedDate)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition"
              >
                <Plus size={15} /> Add Event
              </button>
              <button
                onClick={() => setShowDayPanel(false)}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {selectedDateEvents.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <CalendarDays size={32} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">No events on this day</p>
              <p className="text-xs mt-1">Click "Add Event" to create one</p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedDateEvents.map(ev => {
                const t = getTypeInfo(ev.event_type)
                return (
                  <div key={ev.id} className={`flex items-start gap-3 p-3.5 rounded-xl border ${t.light}`}>
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${t.color}`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{ev.title}</p>
                      {ev.description && (
                        <p className="text-xs mt-0.5 opacity-80">{ev.description}</p>
                      )}
                      <p className="text-xs mt-1 opacity-60">
                        By {ev.users?.full_name || "Admin"} · {t.label}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={(e) => openEdit(e, ev)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/70 hover:bg-white transition"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, ev.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/70 hover:bg-red-100 hover:text-red-600 transition"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition"
            >
              <X size={16} className="text-gray-500" />
            </button>

            <h2 className="text-xl font-bold text-gray-800 mb-1 flex items-center gap-2">
              <CalendarDays size={20} className="text-indigo-600" />
              {editEvent ? "Edit Event" : "Add Event"}
            </h2>
            <p className="text-sm text-gray-400 mb-5">
              {form.event_date}
            </p>

            <div className="space-y-4">

              {/* Title */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <AlignLeft size={12} /> Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Annual Sports Day"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                  Description (optional)
                </label>
                <textarea
                  placeholder="Add details about this event..."
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-400 text-sm resize-none"
                />
              </div>

              {/* Event Type */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Tag size={12} /> Event Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {EVENT_TYPES.map(t => (
                    <button
                      key={t.value}
                      onClick={() => setForm({ ...form, event_type: t.value })}
                      className={`py-2 rounded-xl text-xs font-semibold border transition ${
                        form.event_type === t.value
                          ? t.light + " ring-2 ring-offset-1 " + t.color.replace("bg-", "ring-")
                          : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date (editable) */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                  Date
                </label>
                <input
                  type="date"
                  value={form.event_date}
                  onChange={e => setForm({ ...form, event_date: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
                />
              </div>

            </div>

            <div className="flex gap-3 pt-5">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.title.trim()}
                className={`flex-1 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition ${
                  form.title.trim()
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {saving ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <><Save size={15} /> {editEvent ? "Update" : "Save"}</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminCalendar