/* ==========================================================
   ⚡ IMPROVE AGAIN BUTTON (View Resume Page)
========================================================== */
async function improveAgain() {

  let resume = document.getElementById("rawData").value;
  let job    = document.getElementById("jobData").value;

  let res = await fetch("/improve_again", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `resume_text=${encodeURIComponent(resume)}&job_text=${encodeURIComponent(job)}`
  });

  let data = await res.json();

  document.getElementById("resumeBox").innerHTML = data.rewritten;
  document.getElementById("rawData").value = data.raw;

  let dl = document.getElementById("downloadText");
  if (dl) dl.value = data.raw;

  if (document.getElementById("score")) {
      document.getElementById("score").innerText = data.score;
  }
}

/* ==========================================================
 🤖 FLOATING CHATBOT
========================================================== */
const chatBox      = document.getElementById("chatContainer");
const chatBtn      = document.getElementById("chatButton");
const chatClose    = document.getElementById("chatClose");
const chatMessages = document.getElementById("chatMessages");
const chatInput    = document.getElementById("chatInput");
const sendBtn      = document.getElementById("chatSendBtn");

if (chatBtn && chatBox) {
  chatBtn.onclick = () => {
    chatBox.style.bottom = "25px";
    chatBtn.style.display = "none";
  };
}

if (chatClose && chatBox) {
  chatClose.onclick = () => {
    chatBox.style.bottom = "-500px";
    setTimeout(() => (chatBtn.style.display = "block"), 350);
  };
}

function appendMsg(sender, text) {
  let div = document.createElement("div");
  div.className = sender === "bot" ? "botMsg" : "userMsg";
  div.innerText = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
let txtField = document.getElementById("txtData");
if (txtField) txtField.value = data.raw;
let docField = document.getElementById("docData");
if (docField) docField.value = data.raw;

async function sendMsg() {
  let text = chatInput.value.trim();
  if (!text) return;

  appendMsg("user", text);
  chatInput.value = "";

  let res = await fetch("/chatbot_api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
  });

  let data = await res.json();
  appendMsg("bot", data.response);
}

if (sendBtn && chatInput) {
  sendBtn.onclick = sendMsg;
  chatInput.addEventListener("keydown", e => e.key === "Enter" && sendMsg());
}
