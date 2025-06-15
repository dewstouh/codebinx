interface DemoStep {
    title: string
    description: string
    code: string
    language: string
}

export const demoSteps: DemoStep[] = [
    {
        title: "Paste your code",
        description: "Start by pasting your code snippet",
        code: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
        language: "javascript",
    },
    {
        title: "Choose settings",
        description: "Configure privacy and sharing options",
        code: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55`,
        language: "javascript",
    },
    {
        title: "Share instantly",
        description: "Get a shareable link in seconds",
        code: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55
console.log("Shared on CodeBinX!");`,
        language: "javascript",
    },
]
