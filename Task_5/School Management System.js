class Person {
    #email;
    #id;
    name;

    constructor(name, email, id) {
        this.name = name;
        this.email = email;
        this.id = id;
    }

    get email() {
        return this.#email;
    }

    set email(value) {
        if (value.includes("@")) {
            this.#email = value;
        } else {
            console.log("Invalid email");
        }
    }


    get id() {
        return this.#id;
    }

    set id(value) {
        if (value > 0) {
            this.#id = value;
        } else {
            console.log("Invalid ID");
        }
    }

    describeRole() {
        console.log(`${this.name} is a school member.`);
    }
}


class Principal extends Person {
    constructor(name, email, id) {
        super(name, email, id);
        this.members = [];
    }

    addMember(member) {
        this.members.push(member);
        console.log(`${member.name} added.`);
    }

    removeMember(name) {
        this.members = this.members.filter(member => member.name !== name);
        console.log(`${name} removed.`);
    }

    listMembers() {
        console.log("School Members:");

        this.members.forEach(member => {
            console.log(member.name);
        });
    }

    describeRole() {
        console.log(`${this.name} is the Principal.`);
    }
}


class Teacher extends Person {
    constructor(name, email, id, subject) {
        super(name, email, id);
        this.subject = subject;
        this.grades = [];
    }

    gradeStudent(studentName, grade) {
        this.grades.push({
            studentName,
            grade
        });

        console.log(`${studentName} received ${grade}`);
    }

    listGrades() {
        console.log("Grades:");

        this.grades.forEach(student => {
            console.log(`${student.studentName}: ${student.grade}`);
        });
    }

    describeRole() {
        console.log(`${this.name} teaches ${this.subject}.`);
    }
}


class Student extends Person {
    constructor(name, email, id) {
        super(name, email, id);
        this.subjects = [];
    }

    enroll(subject) {
        this.subjects.push(subject);
        console.log(`${this.name} enrolled in ${subject}`);
    }

    viewSubjects() {
        console.log(`${this.name}'s Subjects:`);

        this.subjects.forEach(subject => {
            console.log(subject);
        });
    }

    describeRole() {
        console.log(`${this.name} is a Student.`);
    }
}


const principal = new Principal(
    "Mr. Ahmed",
    "principal@school.com",
    1
);

const teacher = new Teacher(
    "Ms. Sara",
    "teacher@school.com",
    2,
    "Mathematics"
);

const student = new Student(
    "Habiba",
    "habiba@gmail.com",
    3
);


console.log("========== Principal ==========");

principal.addMember(teacher);
principal.addMember(student);

principal.listMembers();


console.log("\n========== Teacher ==========");

teacher.gradeStudent("Habiba", 95);
teacher.gradeStudent("Ali", 88);

teacher.listGrades();


console.log("\n========== Student ==========");

student.enroll("Mathematics");
student.enroll("English");

student.viewSubjects();


console.log("\n========== Roles ==========");

const members = [principal, teacher, student];

members.forEach(member => {
    member.describeRole();
});