function generateResume() {
    const template =
        localStorage.getItem("selectedTemplate") || "template1";

    fetch(`./templates/${template}.html`)
        .then(res => {
            if (!res.ok) {
                throw new Error(
                    `Template not found: ${res.status} ${res.statusText}`
                );
            }

            return res.text();
        })
        .then(html => {
            html = html.replace(
                /{{name}}/g,
                document.getElementById("name").value
            );

            html = html.replace(
                /{{title}}/g,
                document.getElementById("title").value
            );

            html = html.replace(
                /{{email}}/g,
                document.getElementById("email").value
            );

            html = html.replace(
                /{{phone}}/g,
                document.getElementById("phone").value
            );

            html = html.replace(
                /{{address}}/g,
                document.getElementById("address").value
            );

            html = html.replace(
                /{{summary}}/g,
                document.getElementById("summary").value
            );

            html = html.replace(
                /{{education}}/g,
                document.getElementById("education").value
            );

            html = html.replace(
                /{{experience}}/g,
                document.getElementById("experience").value
            );

            html = html.replace(
                /{{skills}}/g,
                document.getElementById("skills").value
            );

            document.getElementById("resumePreview").innerHTML = html;
            document.getElementById("downloadBtn").style.display = "block";
        })
        .catch(err => {
            console.error("Error loading template:", err);
        });
}