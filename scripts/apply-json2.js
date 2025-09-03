function applyJson2Global(json2) {
  if (!json2.actions || !Array.isArray(json2.actions)) {
    alert("Ungültiges JSON2-Format");
    return;
  }

  json2.actions.forEach(action => {
    if (action.file === currentFile) {
      if (action.type === "replace") {
        let regex = new RegExp(action.target, "g");
        currentText = currentText.replace(regex, action.value);

      } else if (action.type === "insert_after") {
        let regex = new RegExp(action.target, "g");
        currentText = currentText.replace(regex, action.target + "\n" + action.value);

      } else if (action.type === "delete") {
        let regex = new RegExp(action.target, "g");
        currentText = currentText.replace(regex, "");
      }
    }
  });

  document.getElementById("content").innerHTML = "<pre>" + currentText + "</pre>";
}