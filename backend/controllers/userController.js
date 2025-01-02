const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const College = require("../models/College");
const Faculty = require('../models/Faculty');
const mongoose=require('mongoose');
const Task = require('../models/Task');
const Student = require('../models/Student');
const SECRET_KEY = '12345';


exports.register = async (req, res) => {
    try {
        const { username, email, password, maxFacultyAccounts } = req.body;
        if (!username || !email || !password || !maxFacultyAccounts) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const existingUser = await College.findOne({ 'adminCredentials.email': email }); if (existingUser) return res.status(400).json({ message: 'User already exists!' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new College({
            name: username,
            adminCredentials: {
                email: email,
                password: hashedPassword,
            },
            maxFacultyAccounts: maxFacultyAccounts,
            faculties: [],
        });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id, email: newUser.adminCredentials.email, role: 'college' }, SECRET_KEY, { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered successfully!', token ,user:newUser});
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal server error' });
    }
};



exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const [user1, user2, user3] = await Promise.all([
            College.findOne({ 'adminCredentials.email': email }),
            Faculty.findOne({ 'email': email }),
            Student.findOne({ 'email': email })
        ]);

        const user = user1 || user2 || user3;

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        let isPasswordValid;
        if (user.adminCredentials) {
            isPasswordValid = await bcrypt.compare(password, user.adminCredentials.password);
        } else {
            isPasswordValid = await bcrypt.compare(password, user.password);
        }

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email,
            role: user.adminCredentials ? 'college' : (user.college ? 'faculty' : 'student')
        }, SECRET_KEY, { expiresIn: '1h' });


        res.json({ message: 'Login successful!', token, user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};





exports.createFaculty = async (req, res) => {
    try {
        const college = await College.find({ _id: req.user.id });
        console.log(req.body)
        if (req.user.role !== 'college') return res.status(404).json({ message: 'Access Denied' });
        const { username, email, password, maxStudentAccounts } = req.body;
        if (!username || !email || !password || !maxStudentAccounts) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const existingUser = await Faculty.findOne({ 'email': email });
        if (existingUser) return res.status(400).json({ message: 'User already exists!' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Faculty({
            name: username,
            email: email,
            password: hashedPassword,
            college: req.user.id,
            tasks:[],
            maxStudentAccounts: maxStudentAccounts,
            students: [],
        });
        await college[0].faculties.push(newUser._id);
        await college[0].save();
        await newUser.save();
        console.log(college);

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal server error' });
    }
}






exports.createStudent = async (req, res) => {
    try {

        const faculty = await Faculty.find({ _id: req.user.id });
        console.log(req.user)
        if (req.user.role !== 'faculty') return res.status(404).json({ message: 'Access Denied' });
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const existingUser = await Student.findOne({ 'email': email });
        if (existingUser) return res.status(400).json({ message: 'User already exists!' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Student({
            faculty:req.user.id,
            name: username,
            email: email,
            password: hashedPassword,
            progress: [],
        });
        await faculty[0].students.push(newUser._id);
        await faculty[0].save();
        await newUser.save();
        console.log(faculty);

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.assignTasks = async (req, res) => {
    try {
        if (req.user.role !== 'faculty') {
            return res.status(400).json({ message: 'Access Denied' });
        }

        const  tasks  = req.body;

        if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
            return res.status(400).json({ message: 'Tasks are unavailable or empty' });
        }

        const user = await Faculty.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'Faculty not found' });
        }

        // Filter out tasks that already exist in the user's tasks array
        const newTasks = tasks.filter((task) => 
            !user.tasks.some((existingTask) => existingTask.id === task.id)
        );
        const studentList=user.students;
        console.log(studentList);
        if (newTasks.length > 0) {
            user.tasks.push(...newTasks);
            for(let i=0;i<studentList.length;i++){
                const student=await Student.findById(studentList[i]);
                console.log(student);
                for(let j=0;j<newTasks.length;j++){
                    const task=newTasks[j];
                    student.progress.push({...task,status:"pending",completionDate:null});
                }
                await student.save();
            }
            await user.save();
            return res.status(200).json({ message: 'Tasks added successfully', addedTasks: newTasks });
        } else {
            return res.status(200).json({ message: 'No new tasks to add' });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};















exports.viewTasks = async (req, res) => {
    try {
        if (req.user.role !== 'student') {
            return res.status(400).json({ message: 'Access Denied' });
        }
        console.log(req.user)
        const student=await Student.findById(req.user.id);
        let prog=[]
        for(let i=0;i<student.progress.length;i++){ 
            const task=student.progress[i];
            const task1=await Task.findById(task._id);
            console.log(task1);
            prog.push({task1,task});
        }

        return res.json({tasks:prog})


    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.setTaskSubmitted = async (req, res) => {
    try {
        if (req.user.role !== 'student') {
            return res.status(400).json({ message: 'Access Denied' });
        }
        const student = await Student.findById(req.user.id);
        console.log(req.body)
        const task = student.progress.find((task) => task.id === req.body.taskId);
        console.log(task);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        task.status = 'completed';  
        task.completionDate = new Date();
        console.log(task)
        console.log(task);
        await student.save();
        return res.json({ message: 'Task submitted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }   
};

exports.getMe=async(req,res)=>{
    try {
        console.log(req.user.id)
        const stud=await Student.findById(req.user.id);
        const fac=await Faculty.findById(req.user.id)
        const college=await College.findById(req.user.id)
        let result=stud || fac || college;
        let studentList=[]
        if(fac){
            const students=fac.students;
            for(let i=0;i<students.length;i++){
                const student=await Student.findById(students[i]);

                studentList.push(student);
            }
            console.log(studentList);
        }const facultyList = [];
        if (college) {
            const faculties = college.faculties;
        
            const facultyPromises = faculties.map(async (facultyId) => {
                const faculty = await Faculty.findById(facultyId).lean(); // Convert to plain object
                const studentPromises = faculty.students.map((studentId) => Student.findById(studentId).lean());
                const students = await Promise.all(studentPromises);
                return { faculty: faculty, stu: students };
            });
        
            facultyList.push(...(await Promise.all(facultyPromises))); // Await all faculty promises
        }
        
        console.log(facultyList);
        
        res.status(200).json({user:result,studentList:studentList,facultyList:facultyList});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.setStudentInfo=async(req,res)=>{
    try {
        console.log(req.body)
        const {educationalProfessionalBackground,platformSpecificSkillsAndProgress,activityAndAchievements,preferences,contactAndSocialLinks,optionalData}=req.body;
        const stud=await Student.findById(req.user.id);
        if(educationalProfessionalBackground){
            console.log(educationalProfessionalBackground);
            stud.info.educationalProfessionalBackground=educationalProfessionalBackground;
        }
        if(platformSpecificSkillsAndProgress){
            console.log(platformSpecificSkillsAndProgress);
            stud.info.platformSpecificSkillsAndProgress=platformSpecificSkillsAndProgress;
        }
        if(activityAndAchievements){
            console.log(activityAndAchievements);
            stud.info.activityAndAchievements=activityAndAchievements;
        }
        if(preferences){
            console.log(preferences);
            stud.info.preferences=preferences;
        }
        if(contactAndSocialLinks){
            console.log(contactAndSocialLinks);
            stud.info.contactAndSocialLinks=contactAndSocialLinks;
        }
        if(optionalData){
            console.log(optionalData);
            stud.info.optionalData=optionalData;
        }   
        await stud.save();
        res.status(200).json(stud);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getStudentTasks = async (req, res) => {
    try {
        const stud = await Student.findById(req.body.id);
        if (!stud) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const tasks = await Promise.all(
            stud.progress.map(async (task) =>({task:await Task.findById(task._id),status:task.status,completionDate:task.completionDate}))
        );

        res.status(200).json({ tasks }); // Sending resolved tasks
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
