
import { useNavigate } from "react-router-dom"

function ClassLeaderboardCard({ data, isTeacher }) {

  const navigate = useNavigate()

  const openLeaderboard = () => {
    if (isTeacher) {
      navigate(`/teacher/leaderboard/${data.id}`) // ✅ teacher route
    } else {
      navigate(`/leaderboard/${data.id}`) // admin route
    }
  }

  return (

    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col justify-between h-32 hover:shadow-lg transition">

      {/* Top Section */}
      <div>
        <h2 className="text-xl font-bold text-indigo-600">
          {data.class_name || data.name}
        </h2>

        <p className="text-indigo-400 text-sm font-medium">
          {data.teacher_name || ""}
        </p>

        <p className="text-gray-400 text-xs">
          Section {data.section || ""}
        </p>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-end mt-3">

        <button
          type="button"
          onClick={openLeaderboard}
          className="px-4 py-1.5 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          View Leaderboard
        </button>

      </div>

    </div>

  )
}

export default ClassLeaderboardCard