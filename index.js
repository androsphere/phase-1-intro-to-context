// Your code here
function createEmployeeRecord(array){
    let employee = {
        firstName:array[0],
        familyName:array[1],
        title:array[2],
        payPerHour:array[3],
        timeInEvents:[],
        timeOutEvents:[]
    }
    return employee;
}
function createEmployeeRecords(array){
    let newArray = array.map(createEmployeeRecord);
    return newArray;
}
function createTimeInEvent(obj, date){
    let splitDates = date.split(" ");
    const punch = {
        type: "TimeIn",
        hour: parseInt(splitDates[1]),
        date: splitDates[0]
    }
    obj.timeInEvents.push(punch);
    return obj;
}
function createTimeOutEvent(obj, date){
    let splitDates = date.split(" ");
    const punch = {
        type: "TimeOut",
        hour: parseInt(splitDates[1]),
        date: splitDates[0]
    }
    obj.timeOutEvents.push(punch);
    return obj;
}
function hoursWorkedOnDate(employee, date) {
    const clockIns = employee.timeInEvents.filter(time => time.date === date);
    const clockOuts = employee.timeOutEvents.filter(time => time.date === date);
  
    let totalHours = 0;
    for (let i = 0; i < clockIns.length; i++) {
      const clockIn = clockIns[i];
      const clockOut = clockOuts[i];
      totalHours += (clockOut.hour - clockIn.hour) / 100;
    }
  
    return totalHours;
  }
  
  
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    const payRate = employee.payPerHour;
    const totalPay = hoursWorked * payRate;
    return totalPay;
  }
  
  function allWagesFor(employee) {
    const dates = employee.timeInEvents.map(event => event.date);
    const wages = dates.map(date => wagesEarnedOnDate(employee, date));
    const totalWages = wages.reduce((acc, cur) => acc + cur, 0);
    return totalWages;
  }
  function calculatePayroll(employees) {
    const totalWages = employees.reduce((acc, employee) => acc + allWagesFor(employee), 0);
    return totalWages;
  }
  

