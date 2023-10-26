import axios from 'axios';
import {useEffect, useState } from "react";


function Student()
{
    const [studentId, setId] = useState('');
    const [studentName, setName] = useState("");
    const [dob, setDOB] = useState("");
    const [className, setClass] = useState("");
    const [division, setDivision] = useState("");
    const [gender, setGender] = useState("");
    const [students, setUsers] = useState([]);
    const [sortedStudents, setStudents] = useState([]);  
  
   
  useEffect(() => {
    (async () => await Load())();
    }, []);
   
   
    async function  Load()
    {
       const result = await axios.get(
           "http://localhost:8081/api/v1/student/getAll");
           setUsers(result.data);
           console.log(result.data);
           const sortedStudents = result.data.sort((a, b) => a.studentName.localeCompare(b.studentName));
          setStudents(sortedStudents);
    }

    const isAlphabet = (input) => /^[A-Za-z ]+$/.test(input);

  const handleStudentNameChange = (event) => {
    const inputValue = event.target.value;
    if (isAlphabet(inputValue) || inputValue === "") {
      setName(inputValue);
    }
  };
   
  
    
       async function save(event)
      {
          event.preventDefault();
      try
          {
           await axios.post("http://localhost:8081/api/v1/student/save",
          {
            studentName: studentName,
            dob: dob,
            className: className,
            division: division,
            gender: gender
          });
            alert("Student Registrated Successfully");
            setId("");
            setName("");
            setDOB("");
            setClass("");
            setDivision("");
            setGender("");
            Load();
          }
      catch(err)
          {
            alert("Student Registation Failed");
          }
     }
  
   
     async function editStudent(students)
     {
      setName(students.studentName);
      setDOB(students.dob);
      setClass(students.className);
      setDivision(students.division); 
      setGender(students.gender);
      setId(students._id);
     }
   
     async function deleteStudent(studentId)
     {
          await axios.delete("http://localhost:8081/api/v1/student/delete/" + studentId); 
          alert("Student deleted Successfully");
          Load();
     }
   
     async function update(event)
     {
      event.preventDefault();
   
     try
         {
          await axios.put("http://localhost:8081/api/v1/student/edit/" + studentId ,
         {
  
          studentName: studentName,
          dob: dob,
          className: className,
          division: division,
          gender: gender
         });
           alert("Student Updated");
           setId("");
           setName("");
           setDOB("");
           setClass("");
           setDivision("");
           setGender("");
           Load();
         }
     catch(err)
         {
           alert("Student Update Failed");
         }
    }


    //design
    return (
        <div>
           <h1>Student Details</h1>
           <div className="row">
           <div className="col-md-6" >
              <form>
                 
                  <div class="form-group">
                    <label>Student Name</label>
                    <input  type="text" class="form-control" id="studentName"
                    value={studentName}
                    onChange={handleStudentNameChange}
                    />
                  </div>
    
    
                  <div class="form-group">
                    <label>Date of Birth</label>
                    <input  type="date" class="form-control" id="dob" 
                     value={dob}
                      onChange={(event) =>
                        {
                          setDOB(event.target.value);      
                        }}
                    />
                  </div>
    
                  <div class="form-group">
                    <label>Class</label>
                    <select 
                    class="form-control" id="className" 
                    value={className}
                    onChange={(event) =>
                        {
                          setClass(event.target.value);      
                        }}
                    >
                    <option value="">Select Class</option>
                    <option value="I">I</option>
                    <option value="II">II</option>
                    <option value="III">III</option>
                    <option value="IV">IV</option>
                    <option value="V">V</option>
                    <option value="VI">VI</option>
                    <option value="VII">VII</option>
                    <option value="VIII">VIII</option>
                    <option value="IX">IX</option>
                    <option value="X">X</option>
                    <option value="XI">XI</option>
                    <option value="XII">XII</option>
                    </select>
                  </div>

                    <div class="form-group">
                    <label>Division</label>
                    <select class="form-control" id="division" 
                      value={division}
                    onChange={(event) =>
                      {
                        setDivision(event.target.value);      
                      }}
                      >
                      <option value="">Select Division</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>  
                      </select>
                    </div>

                    <div class="form-group">
                    <label>Gender</label>
                    <div>
                        <label>
                            <input
                            type="radio"
                            id="gender"
                            value="Male"
                            checked={gender === "Male"}
                            onChange={(event) =>
                                {
                                  setGender(event.target.value);      
                                }} 
                                /> Male
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                            type="radio"
                            id="gender"
                            value="Female"
                            checked={gender === "Female"}
                            onChange={(event) =>
                                {
                                  setGender(event.target.value);      
                                }} 
                                />
                                Female
                        </label>
                    </div>
                  </div>


                  <div>
                  <button   class="btn btn-primary mt-4"  onClick={save}>Submit</button><br></br>
    
                  <button   class="btn btn-warning mt-4"  onClick={update}>Update</button>
                  </div>   
                </form>
              </div>
                    <br/>
                    <div className="col-md-6">
          <h1>Student Display</h1>
          <table className="table table-light" align='right'>
            <thead>
          <tr>
            <th scope='col'>Admission Number</th>
            <th scope="col">Student Name</th>
            <th scope="col">Student DOB</th>
            <th scope="col">Student Class</th>
            <th scope="col">Student Division</th>
            <th scope="col">Student Gender</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {sortedStudents.map((student) => (
            <tr key={student._id}>
              <td>{student.admissionNumber}</td>
              <td>{student.studentName}</td>
              <td>{student.dob}</td>
              <td>{student.className}</td>
              <td>{student.division}</td>
              <td>{student.gender}</td>
              <td>
                        <button type="button" class="btn btn-warning"  onClick={() => editStudent(student)} >Edit</button>  
                        <button type="button" class="btn btn-danger" onClick={() => deleteStudent(student._id)}>Delete</button>
                    </td>
            </tr>
          ))}
        </tbody>
      </table>
           </div>
           </div>
           </div>
                );
            }
      
      export default Student;