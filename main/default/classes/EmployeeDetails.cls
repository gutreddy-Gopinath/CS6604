public class EmployeeDetails {
    
    //Creating Variables for Employee
    public String Name;
    Public String Designation;
    Public Integer Salary;
    public decimal SalaryAfterBonus;
   
    
    //Creating method to display employee details
    public void displayDetails(){
        for(Integer bonus = 5;bonus<=100; bonus +=5){
            SalaryAfterBonus = salary + (salary*(bonus/100));
            System.debug('Salary After'+bonus+ 'is'+SalaryAfterBonus);
         }
        System.debug('Employee Name: '+Name);
        System.debug('Employee Designation: '+Designation);
        System.debug('Employee Salary: '+Salary);
        
    }

}