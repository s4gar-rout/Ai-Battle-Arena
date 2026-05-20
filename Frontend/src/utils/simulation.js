/**
 * Run simulation results for models by calling the backend API.
 * @param {string} promptText - The user query prompt.
 * @returns {Promise<object>} The generated clash sequence metadata.
 */
export const runSimulation = async (promptText) => {
  try {
    const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
    const response = await fetch(`${apiBaseUrl}/api/battle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ problem: promptText }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    return {
      id: `clash-${Date.now()}`,
      title: promptText.split(" ").slice(0, 3).join(" ") || "Dynamic Sequence",
      prompt: promptText,
      model_1: "Mistral AI",
      model_2: "Cohere",
      engine_1: "Mistral Medium",
      engine_2: "Cohere Command",
      solution_1: data.solution_1 || "No solution provided",
      solution_2: data.solution_2 || "No solution provided",
      judge: {
        solution_1_score: data.judge?.solution_1_score || 0,
        solution_2_score: data.judge?.solution_2_score || 0,
        solution_1_reason: data.judge?.solution_1_reason || "No reasoning provided",
        solution_2_reason: data.judge?.solution_2_reason || "No reasoning provided"
      },
      votes: { model_1: null, model_2: null }
    };
  } catch (error) {
    console.error("Simulation error:", error);
    throw error;
  }
};
