const SKILLS = [
    "python","java","c++","sql","html","css","javascript",
    "react","node","ai","machine learning","ml",
    "data analysis","cloud","aws","git","docker"
];

function analyzeResume() {
    const text = document.getElementById("resumeText").value.toLowerCase();
    if (!text.trim()) {
        alert("Please paste your resume text!");
        return;
    }

    let foundSkills = [];
    SKILLS.forEach(skill => {
        if (text.includes(skill)) {
            foundSkills.push(skill);
        }
    });

    // ATS score logic
    let score = 0;
    score += foundSkills.length * 5;

    if (text.includes("experience")) score += 15;
    if (text.includes("education")) score += 15;
    if (text.includes("project")) score += 10;
    if (text.includes("certification")) score += 10;

    score = Math.min(score, 100);

    // Update UI
    document.getElementById("progress-bar").style.width = score + "%";
    document.getElementById("scoreText").innerText = `Score: ${score} / 100`;

    document.getElementById("skillsFound").innerText =
        foundSkills.length ? foundSkills.join(", ") : "No relevant skills found";

    const suggestions = document.getElementById("suggestions");
    suggestions.innerHTML = "";

    if (score < 60) addSuggestion("Add more job-relevant technical skills");
    if (!text.includes("experience")) addSuggestion("Include a work experience section");
    if (!text.includes("education")) addSuggestion("Add education details");
    if (!text.includes("project")) addSuggestion("Mention projects with outcomes");
    if (!text.includes("certification")) addSuggestion("Add certifications if available");

    if (suggestions.innerHTML === "") {
        addSuggestion("Great resume! ATS friendly ✔");
    }
}

function addSuggestion(msg) {
    const li = document.createElement("li");
    li.innerText = msg;
    document.getElementById("suggestions").appendChild(li);
}
