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

            // Get form values
            const name = document.getElementById("name").value;
            const title = document.getElementById("title").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;
            const address = document.getElementById("address").value;
            const summary = document.getElementById("summary").value;
            const education = document.getElementById("education").value;
            const experience = document.getElementById("experience").value;
            const skills = document.getElementById("skills").value;


            // Replace template placeholders
            html = html.replace(/{{name}}/g, name);
            html = html.replace(/{{title}}/g, title);
            html = html.replace(/{{email}}/g, email);
            html = html.replace(/{{phone}}/g, phone);
            html = html.replace(/{{address}}/g, address);
            html = html.replace(/{{summary}}/g, summary);
            html = html.replace(/{{education}}/g, education);
            html = html.replace(/{{experience}}/g, experience);
            html = html.replace(/{{skills}}/g, skills);


            // Show resume
            document.getElementById("resumePreview").innerHTML = html;


            // Show download button
            document.getElementById("downloadBtn").style.display = "block";

        })

        .catch(err => {
            console.error("Error loading template:", err);
        });
}



/* =========================
   DOWNLOAD PDF
   ========================= */

function downloadPDF() {

    const resume = document.getElementById("resumePreview");


    // Check if resume exists
    if (!resume.innerHTML.trim()) {

        alert("Please generate your resume first.");

        return;
    }


    html2canvas(resume, {

        scale: 2,

        useCORS: true,

        backgroundColor: "#ffffff"

    })

    .then(canvas => {

        const imgData =
            canvas.toDataURL("image/png");


        const { jsPDF } = window.jspdf;


        const pdf =
            new jsPDF("p", "mm", "a4");


        const pageWidth = 210;

        const pageHeight = 297;


        const imgWidth = pageWidth;

        const imgHeight =
            (canvas.height * imgWidth) /
            canvas.width;


        let heightLeft = imgHeight;

        let position = 0;


        // Add first page

        pdf.addImage(

            imgData,

            "PNG",

            0,

            position,

            imgWidth,

            imgHeight

        );


        heightLeft -= pageHeight;


        // Add more pages if necessary

        while (heightLeft > 0) {

            position =
                heightLeft - imgHeight;


            pdf.addPage();


            pdf.addImage(

                imgData,

                "PNG",

                0,

                position,

                imgWidth,

                imgHeight

            );


            heightLeft -= pageHeight;

        }


        // Download PDF

        pdf.save("My-Resume.pdf");

    })

    .catch(error => {

        console.error(
            "PDF generation error:",
            error
        );

        alert(
            "Something went wrong while creating the PDF."
        );

    });
}