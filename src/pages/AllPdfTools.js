import React from "react";
import { Link } from "react-router-dom";
import ToolCard from "../components/ToolCard";

export default function AllPdfTools({ tools }) {
  return (
    <>
      <header className="py-10 text-center bg-white border-b">
        <h1 className="text-3xl font-bold">All PDF Tools</h1>
        <p className="text-gray-600 mt-2">
          Choose a tool to get started
        </p>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, i) => (
            <Link key={i} to={tool.path}>
              <ToolCard {...tool} />
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
