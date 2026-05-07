# Debouncing Search API in React

Debouncing is a technique used to delay an action until the user stops typing or triggering events for a certain amount of time.

It is mainly used to:

Reduce unnecessary API calls
Improve performance
Avoid server overload
Improve user experience in search inputs

With Debouncing

The API call happens only after the user stops typing for a specific delay (example: 500ms).

Basic Flow
User Typing
    ↓
Wait for delay
    ↓
If typing stops
    ↓
Make API call

# Using useEffect + setTimeout
import React, { useEffect, useState } from 'react'

const SearchUsers = () => {

  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [users, setUsers] = useState([])

  // Debouncing logic
  useEffect(() => {

    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 500)

    // Cleanup function
    return () => {
      clearTimeout(timer)
    }

  }, [search])

  // API Call
  useEffect(() => {

    if (debouncedSearch) {
      fetchUsers()
    }

  }, [debouncedSearch])

  const fetchUsers = async () => {

    try {

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?name=${debouncedSearch}`
      )

      const data = await response.json()

      setUsers(data)

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div style={{ padding: "20px" }}>

      <h2>User Search</h2>

      <input
        type="text"
        placeholder="Search user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {
          users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))
        }
      </ul>

    </div>
  )
}

export default SearchUsers

# Reusable Custom Hook for Debouncing
useDebounce.js

import { useEffect, useState } from "react"

const useDebounce = (value, delay) => {

  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {

    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)

  }, [value, delay])

  return debouncedValue
}

export default useDebounce

--Using Custom Hook--

import React, { useEffect, useState } from 'react'
import useDebounce from './useDebounce'

const App = () => {

  const [search, setSearch] = useState("")

  const debouncedSearch = useDebounce(search, 500)

  useEffect(() => {

    if (debouncedSearch) {
      console.log("API CALL :", debouncedSearch)
    }

  }, [debouncedSearch])

  return (
    <div>

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

    </div>
  )
}

export default App

#    GEMINI API SETUP
    ----------------------------

    1. Steps to set api key
        - Go to Google AI Studio: https://aistudio.google.com/prompts/new_chat
        - Login with Gmail
        - Click Get API Key
        - Create Key : AIzaSyCTMoTrWcEUnYOuy_YjayYKiKIo6dT15tE
        - 
