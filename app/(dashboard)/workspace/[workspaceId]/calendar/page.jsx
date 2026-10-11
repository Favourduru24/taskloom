"use client";

import { useState } from "react";

export default function ScoreDashboard() {
  const [scores, setScores] = useState({
    math: {
      test1: "",
      test2: "",
      test3: "",
    },
    english: {
      test1: "",
      test2: "",
      test3: "",
    },
  });

  const handleChange = (subject, test, value) => {
    setScores((prev) => ({
      ...prev,
      [subject]: {
        ...prev[subject],
        [test]: value,
      },
    }));
  };

  const calculateTotal = (subject) => {
    return Object.values(scores[subject]).reduce(
      (total, score) => total + (Number(score) || 0),
      0
    );
  };

  const calculateAverage = (subject) => {
    return (calculateTotal(subject) / 3).toFixed(2);
  };

  const mathTotal = calculateTotal("math");
  const englishTotal = calculateTotal("english");

  const overallTotal = mathTotal + englishTotal;
  const overallAverage = (overallTotal / 6).toFixed(2);

  const subjects = [
    { key: "math", name: "Math" },
    { key: "english", name: "English" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Student Score Dashboard
          </h1>
          <p className="mt-2 text-gray-500">
            Enter your Test 1, Test 2, and Test 3 scores.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Math Total</p>
            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              {mathTotal}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">English Total</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {englishTotal}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Overall Total</p>
            <h2 className="mt-2 text-3xl font-bold text-purple-600">
              {overallTotal}
            </h2>
          </div>
        </div>

        {/* Score Table */}
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Subject
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Test 1
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Test 2
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Test 3
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Total
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Average
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {subjects.map((subject) => (
                  <tr key={subject.key}>
                    <td className="px-6 py-5 font-semibold text-gray-900">
                      {subject.name}
                    </td>

                    {["test1", "test2", "test3"].map((test) => (
                      <td key={test} className="px-6 py-5 text-center">
                        <input
                          type="number"
                          min="0"
                          placeholder="0"
                          value={scores[subject.key][test]}
                          onChange={(e) =>
                            handleChange(
                              subject.key,
                              test,
                              e.target.value
                            )
                          }
                          className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-center outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </td>
                    ))}

                    <td className="px-6 py-5 text-center font-bold text-blue-600">
                      {calculateTotal(subject.key)}
                    </td>

                    <td className="px-6 py-5 text-center font-bold text-green-600">
                      {calculateAverage(subject.key)}
                    </td>
                  </tr>
                ))}

                {/* Overall Row */}
                <tr className="bg-gray-50">
                  <td
                    colSpan="4"
                    className="px-6 py-5 text-right font-bold text-gray-900"
                  >
                    Overall
                  </td>

                  <td className="px-6 py-5 text-center text-lg font-bold text-purple-600">
                    {overallTotal}
                  </td>

                  <td className="px-6 py-5 text-center text-lg font-bold text-purple-600">
                    {overallAverage}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}