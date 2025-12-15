async function loadComponents(componentPaths) {
  const root = document.getElementById("root");
  let html = "";

  for (const path of componentPaths) {
    const res = await fetch(path);
    html += await res.text();
  }

  root.innerHTML = html;

  document.dispatchEvent(new Event("componentsLoaded"));
}
