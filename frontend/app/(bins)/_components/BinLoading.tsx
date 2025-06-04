export default function BinLoading() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center animate-pulse">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6 mx-auto">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none"><path d="M4 4h16v16H4z" /></svg>
                </div>
                <p className="text-gray-600 text-lg">Loading your bin...</p>
            </div>
        </div>
    )
}
  