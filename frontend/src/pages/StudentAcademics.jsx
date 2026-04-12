import { useEffect, useState } from "react"
import API from "../services/api"
import { ChevronDown, ChevronUp, Check } from "lucide-react"
import BookLoader from "../components/BookLoader"

function StudentAcademics() {

  const [subjects, setSubjects] = useState([])
  const [openId, setOpenId] = useState(null) // ✅ ADD (missing tha)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAcademics()
  }, [])

  const fetchAcademics = async () => {
    try {
      const res = await API.get("/student/academics")
      setSubjects(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const toggleChapter = async (chapterId) => {
    try {
      await API.patch(`/student/chapter/${chapterId}`)

      // ✅ instant UI update (no reload)
      setSubjects(prev =>
        prev.map(sub => ({
          ...sub,
          chapters: sub.chapters.map(ch =>
            ch.id === chapterId
              ? { ...ch, is_done: !ch.is_done }
              : ch
          )
        }))
      )

    } catch (err) {
      console.log(err)
    }
  }

  // if (loading) return <div className="p-6">Loading...</div>
  if (loading) return <BookLoader />

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Academics</h1>
        <p className="text-gray-500">Track your study progress 📚</p>
      </div>

      {/* SUBJECTS */}
      <div className="space-y-4">

        {subjects.map((sub) => {

          const isOpen = openId === sub.id

          // ✅ PROGRESS CALCULATION
          const total = sub.chapters.length
          const done = sub.chapters.filter(ch => ch.is_done).length
          const percent = total === 0 ? 0 : Math.round((done / total) * 100)

          return (
            <div
              key={sub.id}
              className="bg-white rounded-2xl shadow"
            >

              {/* SUBJECT HEADER */}
              <div
                onClick={() => setOpenId(isOpen ? null : sub.id)}
                className="flex justify-between items-center p-5 cursor-pointer hover:bg-gray-50"
              >
                <div>
                  <h2 className="font-semibold text-lg">{sub.name}</h2>

                  {/* ✅ PROGRESS TEXT */}
                  <p className="text-sm text-gray-500">
                    {done}/{total} done • {percent}%
                  </p>

                  {/* ✅ PROGRESS BAR */}
                  <div className="w-full bg-gray-200 h-2 rounded mt-2">
                    <div
                      className="bg-green-500 h-2 rounded transition-all"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>

                </div>

                {isOpen ? <ChevronUp /> : <ChevronDown />}
              </div>

              {/* CHAPTERS */}
              {isOpen && (
                <div className="px-5 pb-5 space-y-3">

                  {sub.chapters.length > 0 ? (
                    sub.chapters.map((ch) => (
                      <div
                        key={ch.id}
                        className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
                      >
                        <p className={ch.is_done ? "line-through text-gray-400" : ""}>
                          {ch.title}
                        </p>

                        <button
                          onClick={() => toggleChapter(ch.id)}
                          className={`p-2 rounded transition ${
                            ch.is_done
                              ? "bg-green-500"
                              : "bg-gray-300 hover:bg-gray-400"
                          }`}
                        >
                          <Check size={16} className="text-white" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No chapters</p>
                  )}

                </div>
              )}

            </div>
          )
        })}

      </div>  

    </div>
  )
}

export default StudentAcademics