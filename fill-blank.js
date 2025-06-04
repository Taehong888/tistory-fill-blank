// ──────────────────────────────────────────────────────────────────
// 빈칸 채우기 모드 토글 & 오답노트 기능 (fill-blank.js)
// ──────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function() {
  const fillToggleBtn = document.getElementById("fill-toggle");
  const wrongNoteBtn = document.getElementById("wrong-note");
  let isFillMode = false;
  const wrongAnswers = [];

  fillToggleBtn.addEventListener("click", function() {
    if (!isFillMode) {
      // 1) 빈칸 <span> → <input>
      const blanks = document.querySelectorAll("span.blank");
      blanks.forEach(function(span) {
        const answer = span.getAttribute("data-answer").trim();
        const input = document.createElement("input");
        input.type = "text";
        input.className = "fill-input";
        input.setAttribute("data-answer", answer);
        input.placeholder = "입력";
        // span을 input으로 교체
        span.parentNode.replaceChild(input, span);
      });
      fillToggleBtn.textContent = "제출하기";
      isFillMode = true;
    } else {
      // 2) <input> → <span class="correct-blank"> 또는 <span class="incorrect-blank">
      const inputs = document.querySelectorAll("input.fill-input");
      inputs.forEach(function(input) {
        const userAnswer = input.value.trim();
        const correctAnswer = input.getAttribute("data-answer").trim();

        // 틀린 경우 오답노트에 저장
        if (userAnswer !== correctAnswer) {
          if (!wrongAnswers.includes(correctAnswer)) {
            wrongAnswers.push(correctAnswer);
          }
        }

        // 새 <span> 생성
        const newSpan = document.createElement("span");
        if (userAnswer === correctAnswer) {
          newSpan.className = "correct-blank";
          newSpan.textContent = correctAnswer;
        } else {
          newSpan.className = "incorrect-blank";
          newSpan.textContent = correctAnswer;
        }
        newSpan.setAttribute("data-answer", correctAnswer);

        input.parentNode.replaceChild(newSpan, input);
      });
      fillToggleBtn.textContent = "빈칸 채우기 모드";
      isFillMode = false;
    }
  });

  // 3) “오답노트” 버튼 클릭
  wrongNoteBtn.addEventListener("click", function() {
    if (wrongAnswers.length === 0) {
      alert("현재까지 틀린 빈칸이 없습니다!");
      return;
    }
    alert("오답노트:\n" + wrongAnswers.join(", "));
    // → 만약 커스텀 팝업을 쓰려면 아래 함수 호출로 대체하세요.
    // showWrongNotePopup(wrongAnswers);
  });

  // 커스텀 팝업 예시 함수 (필요 시 주석 해제하여 사용)
  function showWrongNotePopup(wrongList) {
    const existing = document.getElementById("wrong-note-popup");
    if (existing) existing.remove();

    const popup = document.createElement("div");
    popup.id = "wrong-note-popup";

    const title = document.createElement("h3");
    title.textContent = "오답노트";
    popup.appendChild(title);

    const ul = document.createElement("ul");
    wrongList.forEach(function(wrong) {
      const li = document.createElement("li");
      li.textContent = wrong;
      ul.appendChild(li);
    });
    popup.appendChild(ul);

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "닫기";
    closeBtn.className = "close-popup";
    closeBtn.addEventListener("click", function() {
      popup.remove();
    });
    popup.appendChild(closeBtn);

    document.body.appendChild(popup);
  }
});
