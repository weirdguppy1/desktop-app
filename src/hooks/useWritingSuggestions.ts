import prompts from "./prompts.json";
// @feature-idea ai funtionality to generate personal prompts!

const useWritingSuggestions = () => {
  const suggestions = prompts.promps;
  const random = () =>
    suggestions[Math.floor(Math.random() * suggestions.length)];
  return { random };
};

export default useWritingSuggestions;
