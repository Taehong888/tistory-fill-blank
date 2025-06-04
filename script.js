// ────────────────────────────────────────────
// 빈칸 채우기 동작 로직 (tistory용 fill-blank.js)
// ────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".fill-blank").forEach(function(container) {
    const checkBtn = container.querySelector(".check-btn");
    const showBtn = container.querySelector(".show-btn");
    const resultDiv = container.querySelector(".result");
    const inputs = container.querySelectorAll("input[data-answer]");

    // “정답 확인” 버튼
    checkBtn.addEventListener("click", function() {
      let allCorrect = true;

      inputs.forEach(function(input) {
        const userAnswer = input.value.trim();
        const correctAnswer = input.getAttribute("data-answer").trim();

        if (userAnswer === "") {
          allCorrect = false;
          input.classList.remove("correct", "incorrect");
          input.classList.add("blank");
        } else if (userAnswer === correctAnswer) {
          input.classList.remove("blank", "incorrect");
          input.classList.add("correct");
        } else {
          allCorrect = false;
          input.classList.remove("blank", "correct");
          input.classList.add("incorrect");
        }
      });

      if (allCorrect) {
        resultDiv.textContent = "🎉 모든 답이 맞았습니다!";
        showBtn.classList.add("hide");
      } else {
        resultDiv.textContent = "일부 답이 틀렸거나 채워지지 않았습니다.";
        showBtn.classList.remove("hide");
      }
    });

    // “정답 보기” 버튼
    showBtn.addEventListener("click", function() {
      inputs.forEach(function(input) {
        const correctAnswer = input.getAttribute("data-answer").trim();
        input.value = correctAnswer;
        input.classList.remove("blank", "incorrect");
        input.classList.add("correct");
      });
      resultDiv.textContent = "정답을 모두 채워드렸습니다.";
      showBtn.classList.add("hide");
    });
  });
});
