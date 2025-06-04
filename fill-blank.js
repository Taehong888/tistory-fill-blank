// ────────────────────────────────────────────────
// 빈칸 채우기 모드 토글 & 오답노트 기능 (fill-blank.js)
// ────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function() {
  // “빈칸 채우기 모드” <button id="fill-toggle">
  const fillToggleBtn = document.getElementById("fill-toggle");
  // “오답노트” <button id="wrong-note">
  const wrongNoteBtn = document.getElementById("wrong-note");
  
  // 현재 모드 (true = 입력 모드, false = 결과 보기 모드)
  let isFillMode = false;

  // 틀린 답(정답 목록)들을 저장할 배열
  const wrongAnswers = [];

  // 1) “빈칸 채우기 모드” 버튼 클릭 이벤트
  fillToggleBtn.addEventListener("click", function() {
    // 현재 안 눌린 상태면 → 입력 모드로 전환
    if (!isFillMode) {
      // 1-1) 모든 <span class="blank" data-answer="..."> 요소를 찾아서 <input>으로 교체
      const blanks = document.querySelectorAll("span.blank");
      blanks.forEach(function(span) {
        const answer = span.getAttribute("data-answer").trim();
        const input = document.createElement("input");
        input.type = "text";
        input.className = "fill-input";
        input.setAttribute("data-answer", answer);
        input.placeholder = "여기에 입력";
        // 기존 span 크기를 유지하기 위해 최소 너비를 설정(필요에 따라 CSS로도 조정)
        input.style.minWidth = "80px";
        // span을 input으로 교체
        span.parentNode.replaceChild(input, span);
      });

      // 1-2) 버튼 텍스트를 “제출(Submit)” 또는 “결과 보기”로 변경
      fillToggleBtn.textContent = "제출하기";
      // 모드를 true (입력 모드)로 설정
      isFillMode = true;
    }
    // 현재 입력 모드이면 → 제출(체크) 모드로 전환
    else {
      // 2-1) 모든 <input class="fill-input" data-answer="..."> 요소를 찾아서 검사
      const inputs = document.querySelectorAll("input.fill-input");
      inputs.forEach(function(input) {
        const userAnswer = input.value.trim();
        const correctAnswer = input.getAttribute("data-answer").trim();

        // 입력값이 비었거나 틀렸으면 오답노트에 기록
        if (userAnswer !== correctAnswer) {
          // 틀린 정답을 중복 없이 배열에 저장
          if (!wrongAnswers.includes(correctAnswer)) {
            wrongAnswers.push(correctAnswer);
          }
        }

        // 2-2) input을 다시 <span>으로 교체하면서 클래스 부착
        const newSpan = document.createElement("span");
        if (userAnswer === correctAnswer) {
          newSpan.className = "correct-blank";
          newSpan.textContent = correctAnswer;
        } else {
          newSpan.className = "incorrect-blank";
          // 오답일 경우에도, 네가 원하는 표시(틀린 단어 + 정답 표시 등)로 조정 가능
          // 여기선 틀린 걸 보여주려면 input.value, 정답을 보여주려면 correctAnswer
          // 예시: newSpan.textContent = `${userAnswer || "빈칸"} (정답: ${correctAnswer})`;
          newSpan.textContent = correctAnswer;
        }
        newSpan.setAttribute("data-answer", correctAnswer);

        input.parentNode.replaceChild(newSpan, input);
      });

      // 2-3) 버튼 텍스트를 다시 “빈칸 채우기 모드”로 변경
      fillToggleBtn.textContent = "빈칸 채우기 모드";
      // 모드를 false (결과 보기 모드)로 설정
      isFillMode = false;
    }
  });

  // 3) “오답노트” 버튼 클릭 이벤트
  wrongNoteBtn.addEventListener("click", function() {
    if (wrongAnswers.length === 0) {
      alert("현재까지 틀린 빈칸이 없습니다!");
      return;
    }

    // 틀린 정답 목록을 alert 창으로 간단히 출력
    // 예) “틀린 단어: 동화 작용, 유기 화합물, …”
    alert("오답노트:\n" + wrongAnswers.join(", "));
    
    // ▼ 만약 팝업 박스로 예쁘게 띄우고 싶다면, 아래 주석 처리된 'showWrongNotePopup' 함수를 사용하세요. ▼
    // showWrongNotePopup(wrongAnswers);
  });

  // ────────────────────────────────────────────────────────────
  // ▼ 추가: 커스텀 팝업(Modal) 형태로 오답노트를 보여주고 싶을 때 사용할 수 있는 함수 예시 ▼
  // ────────────────────────────────────────────────────────────
  function showWrongNotePopup(wrongList) {
    // 팝업이 이미 떠 있으면 지우고 새로 만듭니다.
    const existing = document.getElementById("wrong-note-popup");
    if (existing) existing.remove();

    // 팝업 컨테이너
    const popup = document.createElement("div");
    popup.id = "wrong-note-popup";

    // 제목
    const title = document.createElement("h3");
    title.textContent = "오답노트";
    popup.appendChild(title);

    // 틀린 정답 목록
    const ul = document.createElement("ul");
    wrongList.forEach(function(wrong) {
      const li = document.createElement("li");
      li.textContent = wrong;
      ul.appendChild(li);
    });
    popup.appendChild(ul);

    // 닫기 버튼
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "닫기";
    closeBtn.className = "close-popup";
    closeBtn.addEventListener("click", function() {
      popup.remove();
    });
    popup.appendChild(closeBtn);

    // 팝업을 body에 붙여넣기
    document.body.appendChild(popup);
  }
});
