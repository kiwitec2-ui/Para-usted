// =========================
// Decoración: corazones
// =========================
(function makeHearts(){
  const hearts = document.querySelector(".hearts");
  if(!hearts) return;

  const colors = ["#ff4d6d","#ff758f","#ffd166","#ffffff","#ff9f1c","#ffb3c1"];
  const count = 24;

  for(let i=0;i<count;i++){
    const h = document.createElement("div");
    h.className = "heart";
    const size = 10 + Math.random()*18;
    h.style.width = size + "px";
    h.style.height = size + "px";
    h.style.left = (Math.random()*100) + "vw";
    h.style.color = colors[Math.floor(Math.random()*colors.length)];
    h.style.animationDuration = (6 + Math.random()*10) + "s";
    h.style.animationDelay = (-Math.random()*10) + "s";
    h.style.opacity = (0.35 + Math.random()*0.55).toFixed(2);
    hearts.appendChild(h);
  }
})();

// =========================
// Música: guardar links
// =========================
function getKey(){
  // cada página guarda su propia lista
  const pageId = document.body.getAttribute("data-page") || "default";
  return "songs_" + pageId;
}

function loadSongs(){
  const list = document.getElementById("songList");
  if(!list) return;

  list.innerHTML = "";
  const key = getKey();
  const songs = JSON.parse(localStorage.getItem(key) || "[]");

  songs.forEach((url, idx) => {
    const div = document.createElement("div");
    div.className = "item";

    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = url;

    const del = document.createElement("button");
    del.textContent = "Quitar";
    del.onclick = () => {
      songs.splice(idx, 1);
      localStorage.setItem(key, JSON.stringify(songs));
      loadSongs();
    };

    div.appendChild(a);
    div.appendChild(del);
    list.appendChild(div);
  });
}

function addSong(){
  const input = document.getElementById("songInput");
  if(!input) return;

  const url = input.value.trim();
  if(url.length < 5){
    alert("Pegá un link válido (ej: Spotify o YouTube).");
    return;
  }

  const key = getKey();
  const songs = JSON.parse(localStorage.getItem(key) || "[]");
  songs.push(url);
  localStorage.setItem(key, JSON.stringify(songs));

  input.value = "";
  loadSongs();
}

window.addEventListener("DOMContentLoaded", loadSongs);
