const students = [
    { id: "S01", name: "Nguyen Van A", age: 20, gpa: 3.5, status: "active" },
    { id: "S02", name: "Tran Thi B", age: 21, gpa: 3.8, status: "active" },
    { id: "S03", name: "Le Van C", age: 22, gpa: 2.9, status: "inactive" },
    { id: "S04", name: "Pham Thi D", age: 19, gpa: 3.2, status: "active" },
    { id: "S05", name: "Hoang Van E", age: 23, gpa: 3.0, status: "inactive" }
];

let condition = true;

const showMenu = () => {
    let choice = +prompt(`----- STUDENT MANAGEMENT SYSTEM -----
1. Create Student
2. Update Student
3. Soft Delete Student
4. Restore Student
5. View Students (Pipeline Mode)
6. Analytics Dashboard
7. Exit
------------------------------------
Enter choice : `);
    return choice;
}

const createNewStudent = () => {

    let id, fullname, age, gpa, status1;

    while (true) {
        id = prompt("Enter id (Example : S01): ");
        if (id === "" || id === null) {
            alert("Invalid id or can't be left blank !");
            continue;
        }
        let exist = students.some(s => s.id === id);
        if (exist) {
            alert("This ID already exists. Please enter a different ID.");
            continue;
        }
        break;
    }

    while (true) {
        fullname = prompt("Enter name : ").trim();
        if (fullname === "" || fullname === null) {
            alert("Invalid name or can't be left blank !")
            continue;
        }
        break;
    }

    while (true) {
        age = parseInt(prompt("Enter age (16 - 60): "));
        if (isNaN(age)) {
            alert("Age must be a number !");
            continue;
        }

        if (age < 16 || age > 60) {
            alert("Age must be between 16 and 60. Please re-enter.");
            continue;
        }

        if (!Number.isInteger(age)) {
            alert("Age must be an integer.");
            continue;
        }
        break;
    }

    while (true) {
        gpa = parseFloat(prompt("Enter GPA (0 - 10): "));
        if (gpa === "" || gpa === null) {
            alert("Invalid gpa or can't be left blank !");
            continue;
        }
        if (gpa < 0 || gpa > 10) {
            alert("GPA must be between 0 and 10. Please re-enter.");
            continue;
        }
        break;
    }

    while (true) {
        status1 = prompt("Enter status (active or inactive): ").toLowerCase();
        if (status1 === "" || status1 === null) {
            alert("Invalid status or can't be left blank !");
            continue;
        }
        if (status1 !== "active" && status1 !== "inactive") {
            alert("Invalid status ! Must be active or inactive !");
            continue;
        }
        break;
    }

    let newStudent = {
        id: id,
        name: fullname,
        age: age,
        gpa: gpa,
        status: status1,
        createAt: new Date().toLocaleString(),
        updateAt: null,
        deleteAt: null,
    };

    students.push(newStudent);
    alert(`Student create successfully !\n id : ${newStudent.id}, name : ${newStudent.name}, ${newStudent.createAt}`);
    console.log(newStudent);
}

const updateStudentProfile = () => {
    let updateByid = prompt("Enter id to update : ");

    let student = students.find(s => s.id === updateByid);

    if (!student) {
        alert("Student not found !");
        return;
    } else {
        alert(`Found : id : ${student.id}, name : ${student.name}, age : ${student.age}, gpa : ${student.gpa}, status : ${student.status}`);
        student.name = prompt("Enter new name:", student.name);
        student.age = +prompt("Enter new age : ", student.age);
        student.gpa = +prompt("Enter new gpa:", student.gpa);
        student.status = prompt("Enter new status : ", student.status);
    }
    student.updateAt = new Date().toLocaleString();
    alert(`Update Successfully : ${student.id}`);
}

const softDeleteStudent = () => {
    let deleteByid = prompt("Enter id to delete : ");

    let student = students.find(s => s.id === deleteByid);

    if (!student) {
        alert("Student not found !");
        return;
    }

    let confirm = prompt(`Are you sure you want to delete ? \n` +
        `id : ${student.id}, name : ${student.name}, age : ${student.age}, gpa : ${student.gpa}, status : ${student.status} \n` +
        `Type "yes" to confirm : `
    );
    if (confirm.toLowerCase() === "yes") {
        alert("Soft delete successfully !");
        student.status = "inactive";
        student.deleteAt = new Date().toLocaleString();
    } else {
        alert("Delete cancelled !")
    }

}

const restoreStudent = () => {
    let restoreByid = prompt("Enter id to restore : ");

    let student = students.find(s => s.id === restoreByid);
    if (!student) {
        alert("Student not found !");
        return;
    }

    if (student.status !== "inactive" || student.deleteAt === null) {
        alert("Students still exist.");
        return;
    }

    let confirm = prompt(`Are you sure you want to restore ? \n` +
        `id : ${student.id}, name : ${student.name}, age : ${student.age}, gpa : ${student.gpa}, status : ${student.status} \n` +
        `Type "yes" to confirm : `
    );
    if (confirm.toLowerCase() === "yes") {
        alert("Restore student successfully !");
        student.status = "active";
        student.deleteAt = null;
        student.updateAt = new Date().toLocaleString();
    } else {
        alert("Restore cancelled !")
    }

}

const viewStudentPipline = () => {
    let keyword = prompt("Enter keyword to find name : ").toLowerCase();
    let filterStatus = prompt("Enter status to filter (active / inactive / all) : ").toLowerCase();
    let sortGpa = prompt("Enter option (asc / desc) : ").toLowerCase();

    let pageSize = 5;
    let page = 1;

    let list = [...students];

    if (keyword) {
        list = list.filter(s => s.name.toLowerCase().includes(keyword));
    }

    if (filterStatus !== "all") {
        list = list.filter(s => s.status === filterStatus);
    }

    if (sortGpa === "asc") {
        list = list.sort((a, b) => a.gpa - b.gpa);
    }

    if (sortGpa === "desc") {
        list = list.sort((a, b) => b.gpa - a.gpa);
    }

    if (list.length === 0) {
        console.log("No students found");
        return;
    }

    let totalPages = Math.ceil(list.length / pageSize);

    while (true) {

        console.clear();

        let start = (page - 1) * pageSize;
        let pageData = list.slice(start, start + pageSize);

        console.table(pageData);

        let nav = prompt(`
Page ${page}/${totalPages}
Total records: ${list.length}
1. Next
2. Prev
3. First
4. Last
5. Exit
`);

        switch (nav) {

            case "1":
                if (page < totalPages) page++;
                break;

            case "2":
                if (page > 1) page--;
                break;

            case "3":
                page = 1;
                break;

            case "4":
                page = totalPages;
                break;

            default:
                return;
        }
    }
}

const analyticsDashboard = () => {
    const overview = students.reduce((acc, s) => {
        acc.total++;
        s.status === "active" ? acc.active++ : acc.inactive++;
        acc.gpaSum += s.gpa;
        return acc;
    }, { total: 0, active: 0, inactive: 0, gpaSum: 0 });

    const avgGpa = overview.total ? overview.gpaSum / overview.total : 0;

    console.log("Total:", overview.total);
    console.log("Active:", overview.active);
    console.log("Inactive:", overview.inactive);
    console.log("Average GPA:", avgGpa.toFixed(2));

    const gpaByStatus = students.reduce((acc, s) => {
        acc[s.status] ??= { sum: 0, count: 0 };

        acc[s.status].sum += s.gpa;
        acc[s.status].count++;

        return acc;
    }, {});

    console.log("GPA by Status:", gpaByStatus);

    console.table(
        [...students]
            .sort((a, b) => b.gpa - a.gpa)
            .slice(0, 5)
    );

    console.table(
        [...students]
            .sort((a, b) => a.age - b.age)
            .slice(0, 5)
    );

    const gpaZero = students.filter(s => s.gpa === 0);
    const gpaRisk = students.filter(s => s.gpa < 3);

    console.log("GPA = 0");
    console.table(gpaZero);

    console.log("GPA < 3");
    console.table(gpaRisk);

    console.log("Total risk students:", gpaRisk.length);

    const distribution = students.reduce((acc, s) => {

        const level =
            s.gpa < 3 ? "poor" :
                s.gpa < 5 ? "weak" :
                    s.gpa < 7 ? "average" :
                        s.gpa < 8.5 ? "good" :
                            "excellent";

        acc[level] = (acc[level] || 0) + 1;

        return acc;

    }, {});

    console.log(distribution);
}

const eachChoice = () => {
    do {
        switch (showMenu()) {
            case 1: {
                createNewStudent();
                break;
            }

            case 2: {
                updateStudentProfile();
                break;
            }

            case 3: {
                softDeleteStudent();
                break;
            }

            case 4: {
                restoreStudent();
                break;
            }

            case 5: {
                viewStudentPipline();
                break;
            }

            case 6: {
                analyticsDashboard();
                break;
            }

            case 7: {
                alert("Goodbye! Thank you for using Student Management System !");
                condition = false;
                break;
            }

            default: {
                alert("Invalid choice! Please enter a number from 1 to 7 !");
                break;
            }
        }
    } while (condition);
}
eachChoice();