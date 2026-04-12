import { useEffect, useState } from "react"
import API from "../services/api"

const formatDate = (iso) => {
  if (!iso) return "—"
  return new Date(iso).toLocaleDateString(undefined, {
    day: "numeric", month: "short", year: "numeric"
  })
}

  

const opSymbols = {
  "+": "Addition",
  "-": "Subtraction",
  "*": "Multiply",
  "/": "Division",
}

const formatOps = (ops) =>
  (ops || "")
    .split(",")
    .map(o => opSymbols[o] || o)
    .join(", ")

function MatchHistory() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/games/match-history")
        setData(res.data)
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load match history")
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-6 animate-pulse">
        <div className="h-5 bg-slate-100 rounded w-40 mb-4" />
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-14 bg-slate-100 rounded-2xl" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white border border-red-200 rounded-3xl p-6 text-red-500 text-sm">
        {error}
      </div>
    )
  }

  const { history = [], wins = 0, losses = 0, total = 0 } = data || {}
  const winRate = total > 0 ? Math.round((wins / total) * 100) : 0

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-slate-800">🏆 Match History</h2>
        <span className="text-xs text-slate-400">{total} game{total !== 1 ? "s" : ""} played</span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-center">
          <p className="text-2xl font-extrabold text-emerald-600">{wins}</p>
          <p className="text-xs text-emerald-500 mt-0.5">Wins</p>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-2xl p-4 text-center">
          <p className="text-2xl font-extrabold text-red-500">{losses}</p>
          <p className="text-xs text-red-400 mt-0.5">Losses</p>
        </div>
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 text-center">
          <p className="text-2xl font-extrabold text-indigo-600">{winRate}%</p>
          <p className="text-xs text-indigo-400 mt-0.5">Win Rate</p>
        </div>
      </div>

      {/* Match list */}
      {history.length === 0 ? (
        <div className="text-center py-10 text-slate-400">
          <p className="text-3xl mb-2">🎮</p>
          <p className="text-sm">No matches played yet</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
          {history.map((match, i) => {
            const accuracy = match.questions_answered > 0
              ? Math.round((match.correct_answers / match.questions_answered) * 100)
              : 0

            return (
              <div
                key={i}
                className={`flex items-center gap-4 rounded-2xl border px-4 py-4 transition-colors ${
                  match.won
                    ? "bg-emerald-50 border-emerald-100"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                {/* Result badge */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 ${
                  match.won
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-slate-200 text-slate-500"
                }`}>
                  {match.won ? "W" : "L"}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-slate-800 truncate">
                      Room {match.room_code}
                    </span>
                    <span className="text-xs text-slate-400 shrink-0">
                      {formatDate(match.started_at)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">
                    {formatOps(match.operations)} · {match.total_questions} questions
                  </p>
                </div>

                {/* Score */}
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-slate-700">
                    {match.correct_answers}
                    <span className="text-slate-400 font-normal">/{match.questions_answered}</span>
                  </p>
                  <p className="text-xs text-slate-400">{accuracy}% acc</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default MatchHistory