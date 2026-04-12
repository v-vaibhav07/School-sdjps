import { useEffect, useState } from "react"
import API from "../services/api"
import { useParams } from "react-router-dom"
import { Check, FileText } from "lucide-react"

function SubjectHomework() {

  const { subjectId } = useParams()
  const [homework, setHomework] = useState([])

  useEffect(() => {
    fetchHomework()
  }, [subjectId])

  const fetchHomework = async () => {
    try {
      const res = await API.get(`/student/homework/${subjectId}`)
      setHomework(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const markDone = async (id) => {
    try {
      await API.patch(`/student/homework/done/${id}`)
      fetchHomework()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">Subject Homework</h1>

      {homework.length === 0 ? (
        <p>No homework</p>
      ) : (
        homework.map(hw => (
          <div key={hw.id} className="bg-white p-4 rounded-xl shadow flex justify-between">

            <div>
              <p className="font-semibold">{hw.title}</p>
              <p className="text-sm text-gray-500">
                {new Date(hw.created_at).toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-3">

              {hw.file_url && (
                <a href={hw.file_url} target="_blank">
                  <FileText />
                </a>
              )}

              <button
                onClick={() => markDone(hw.id)}
                className={`p-2 rounded ${
                  hw.is_done ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <Check className="text-white"/>
              </button>

            </div>

          </div>
        ))
      )}

    </div>
  )
}

export default SubjectHomework