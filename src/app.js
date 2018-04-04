const https     = require("https");
const fs        = require("fs");
const token     = require("./token.js");

const shouldFilterGrads = process.argv[2];
getCurrentStudents(handleCurrentStudents);

function getCurrentStudents(callback) {
    var options = {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        hostname: "www.bloc.io",
        path: "/api/v1/dashboard/students_visible_on_dashboard"
    }

    https.get(options, callback);
}

function handleCurrentStudents(response) {
    var body = "";
    var now = new Date();
    var fileName = `./output/emails_${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()}.${now.getHours()}.${now.getMinutes()}.${now.getSeconds()}`;

    response.setEncoding("utf8");
    response.on("data", function handleData(response) {
        body += response;
    });
    response.on("end", function handleEnd() {
        var students = JSON.parse(body);
        var emails = getStudentEmails(students, shouldFilterGrads);
        fs.mkdir('./output', function(err) {
            if (err) {
                if (err.code !== "EEXIST") {
                    console.log(err);
                }
                return;
            }
        });
        fs.writeFile(fileName, emails);
    });
}

function getStudentEmails(students, filterGrads = true) {
    if (filterGrads === false) {
        students = students.filter(student => new Date(student.enrollment.program_end_date).getTime() > new Date().getTime());
    }
    return students.map(student => student.email);
}
