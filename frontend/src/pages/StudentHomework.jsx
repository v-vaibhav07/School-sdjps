import { useEffect, useState } from "react"
import API from "../services/api"
import { useNavigate } from "react-router-dom"

function StudentHomework() {

  const [subjects, setSubjects] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchSubjects()
  }, [])

  const fetchSubjects = async () => {
    try {
      const res = await API.get("/student/subjects")
      setSubjects(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">Homework</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        {subjects.map(sub => (
          <div key={sub.id} className="bg-white p-5 rounded-xl shadow">

            <h2 className="text-lg font-semibold">{sub.name}</h2>

            <button
              onClick={() => navigate(`/student/homework/${sub.id}`)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Open Homework
            </button>

          </div>
        ))}

      </div>

    </div>
  )
}

export default StudentHomework