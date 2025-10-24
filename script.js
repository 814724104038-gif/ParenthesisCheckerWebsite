const textarea = document.getElementById("expression");
const resultDiv = document.getElementById("result");
const themeButton = document.getElementById("themeToggle");

textarea.addEventListener("input", checkParenthesis);

function checkParenthesis() {
  const expr = textarea.value.trim();
  if (expr === "") {
    resultDiv.innerHTML = "";
    return;
  }

  const stack = [];
  const map = { ")": "(", "]": "[", "}": "{" };

  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];
    if (["(", "{", "["].includes(ch)) {
      stack.push(ch);
    } else if ([")", "}", "]"].includes(ch)) {
      if (stack.length === 0) {
        showResult(`❌ Unbalanced at position ${i + 1}: unexpected '${ch}'`, "red");
        return;
      } else if (stack[stack.length - 1] !== map[ch]) {
        showResult(
          `❌ Mismatch at position ${i + 1}: expected '${getExpected(
            stack[stack.length - 1]
          )}' but found '${ch}'`,
          "red"
        );
        return;
      } else {
        stack.pop();
      }
    }
  }

  if (stack.length === 0) {
    showResult("✅ Expression is Balanced!", "green");
  } else {
    showResult(`❌ Missing '${getExpected(stack[stack.length - 1])}'`, "red");
  }
}

function showResult(message, color) {
  resultDiv.innerHTML = message;
  resultDiv.style.color = color;
}

function getExpected(ch) {
  if (ch === "(") return ")";
  if (ch === "[") return "]";
  if (ch === "{") return "}";
  return "";
}

// Dark Mode Toggle
function toggleTheme() {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    themeButton.textContent = "☀️ Light Mode";
  } else {
    themeButton.textContent = "🌙 Dark Mode";
  }
}
