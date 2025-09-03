"use client"

import { useState } from "react"
import { SearchBar } from "./Search-bar"
import { AIChat } from "./Aichart"
import { SearchResults } from "./Search-results"

export default function AIChartbot() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    setIsSearching(true)

    // Simulate database search - replace with actual database integration
    setTimeout(() => {
      const mockResults = [
        {
          id: 1,
          title: "Sample Data Entry 1",
          content: "This is sample content from the database...",
          type: "Document",
        },
        { id: 2, title: "Sample Data Entry 2", content: "Another piece of sample content...", type: "Record" },
        { id: 3, title: "Sample Data Entry 3", content: "More sample database content...", type: "File" },
      ].filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.content.toLowerCase().includes(query.toLowerCase()),
      )

      setSearchResults(mockResults)
      setIsSearching(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen pt-[30px] bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Database Search Dashboard</h1>
          <p className="text-muted-foreground">Search your database and ask AI questions about your data</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search Section */}
          <div className="lg:col-span-2 space-y-6">
            <SearchBar onSearch={handleSearch} isSearching={isSearching} />
            <SearchResults results={searchResults} query={searchQuery} isSearching={isSearching} />
          </div>

          {/* AI Chat Section */}
          <div className="lg:col-span-1">
            <AIChat />
          </div>
        </div>
      </div>
    </div>
  )
}
