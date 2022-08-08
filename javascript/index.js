// let age = 30;

// console.log(age);

// // const name = 'John'
// const weight = 45
// const handsome = true

// console.log(typeof weight);
// const s ="hello world";
// console.log(s.split());

// // let name= 'abiodun';

// // let John = {name: "John"}
// let Abiodun = {name: "Abiodun", age: 8, address: '3 james road', isRegistered: false}

// Abiodun.name = ''
// console.log(Abiodun.name, Abiodun.address)

// let Js1 = [
//             {name: "John", age: 6, address: '1 james road', isRegistered: true},
//             {name: "Abiodun", age: 8, address: '3 james road', isRegistered: false}
//         ]


// let str = "Apple, Banana, Kiwi"
// let part = str.substring(7);
// let replacement = str.replace('Apple', 'Mango')
// console.log(part)
// console.log(replacement)




//entry test
        //name
        //entry no
        //ask 3 questions
                // what is 1+1
                // what is the name of the president?
                // how old is Nigeria?
// check whether student passed the test
                 // check test score
                    //2
                    //buhari
                    //61
                //the student has passed the test
//student that passes will be admitted
        //store the name
        //store entry no
//fill their bio
        //show the student that he has been admitted





//entry test

let studentName = prompt("enter name"); 
let entryNo = prompt('entry no')
let firstQuestion = prompt("what is 1 + 1?")
let secondQuestion = prompt('what is the name of the president?')
let thirdQuestion = prompt('how old is Nigeria?')


// console.log(studentName, entryNo, firstQuestion, secondQuestion, thirdQuestion)

let NewStudent = {}
let ListOfStudents= []

// check whether student passed the test
if (firstQuestion ==='2' && secondQuestion ==='buhari' && thirdQuestion ==='61'){
    console.log('You have passed')
    NewStudent.name = studentName;
    NewStudent.entryNo = entryNo;
    NewStudent.address = prompt('address')
    ListOfStudents.push(NewStudent)
    console.log(ListOfStudents, 'you have been admitted')
} else console.log('You have failed')


