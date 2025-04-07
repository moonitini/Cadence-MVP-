"use client"

import { useState } from "react"
import "../styles/index.css"
import Nav from "../components/Nav"
import { ArrowDown, ArrowUp, X } from "lucide-react"

function FavoriteSongs() {
  const [songs, setSongs] = useState(["Song Title 1", "Song Title 2", "Song Title 3", "Song Title 4", "Song Title 5"])
  const [visibility, setVisibility] = useState("private")
  const [hoveredSong, setHoveredSong] = useState(null)

  const handleMoveUp = (index) => {
    if (index === 0) return
    const newSongs = [...songs]
    const temp = newSongs[index]
    newSongs[index] = newSongs[index - 1]
    newSongs[index - 1] = temp
    setSongs(newSongs)
  }

  const handleMoveDown = (index) => {
    if (index === songs.length - 1) return
    const newSongs = [...songs]
    const temp = newSongs[index]
    newSongs[index] = newSongs[index + 1]
    newSongs[index + 1] = temp
    setSongs(newSongs)
  }

  const handleDelete = (index) => {
    const newSongs = songs.filter((_, i) => i !== index)
    setSongs(newSongs)
  }

  const handleDeleteAll = () => {
    setSongs([])
  }

  const handleSoulmate = () => {
    // Implement soulmate functionality
    console.log("Soulmate clicked")
  }

  const handleEnemy = () => {
    // Implement enemy functionality
    console.log("Enemy clicked")
  }

  return (
    <div className="w-full min-h-screen bg-customBlue">
      <Nav />

      <div className="flex flex-col items-center pt-12">
        <h1 className="text-4xl text-white mb-8">My Favorite Songs</h1>

        <div className="w-full max-w-4xl px-4">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {/* Soulmate/Enemy buttons */}
            <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-md flex flex-row md:flex-col gap-4 md:gap-2 justify-center">
              <button
                onClick={handleSoulmate}
                className="bg-customBlue text-white py-2 px-4 rounded-md font-cursive text-xl hover:bg-blue-700"
              >
                Soulmate
              </button>
              <button
                onClick={handleEnemy}
                className="bg-customBlue text-white py-2 px-4 rounded-md font-cursive text-xl hover:bg-blue-700"
              >
                Enemy
              </button>
            </div>

            {/* Visibility options */}
            <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-md">
              <h3 className="font-semibold mb-2">List Visibility</h3>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="public"
                    name="visibility"
                    value="public"
                    checked={visibility === "public"}
                    onChange={() => setVisibility("public")}
                    className="h-4 w-4"
                  />
                  <label htmlFor="public">Public</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="private"
                    name="visibility"
                    value="private"
                    checked={visibility === "private"}
                    onChange={() => setVisibility("private")}
                    className="h-4 w-4"
                  />
                  <label htmlFor="private">Private</label>
                </div>
              </div>
            </div>

            {/* Delete All button */}
            <div className="flex items-center">
              <button
                onClick={handleDeleteAll}
                className="bg-white border border-gray-300 rounded px-4 py-2 hover:bg-gray-100 font-medium"
              >
                Delete All Songs
              </button>
            </div>
          </div>

          {/* Songs list */}
          <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-md">
            <div className="flex flex-col gap-2">
              {songs.map((song, index) => (
                <div
                  key={index}
                  className={`border border-gray-200 rounded p-3 flex items-center justify-between ${hoveredSong === index ? "bg-yellow-200" : ""}`}
                  onMouseEnter={() => setHoveredSong(index)}
                  onMouseLeave={() => setHoveredSong(null)}
                >
                  <span>{song}</span>
                  {hoveredSong === index && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleMoveUp(index)}
                        className="p-1 hover:bg-gray-200 rounded"
                        disabled={index === 0}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleMoveDown(index)}
                        className="p-1 hover:bg-gray-200 rounded"
                        disabled={index === songs.length - 1}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(index)} className="p-1 hover:bg-gray-200 rounded">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {songs.length === 0 && (
                <div className="text-center py-4 text-gray-500">No songs in your favorites list</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FavoriteSongs

