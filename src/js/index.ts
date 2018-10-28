import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

interface ICustomer { 
    id: number;
    firstName:string;
    lastName: string;
    year: number;
}

let getAllButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("getAllButt");
getAllButton.addEventListener("click", GetAll);

let getByIDButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("getByIdButt");
getByIDButton.addEventListener("click", GetByID);

let deleteByIDButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("deleteByIdButt");
deleteByIDButton.addEventListener("click", DeleteByID);

let postButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("postButt");
postButton.addEventListener("click", Post);

let putButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("putButt");
putButton.addEventListener("click", Put);

// HTTPGet api/customer
function GetAll(): void {
    let uri: string = "https://customerserviceapi.azurewebsites.net/api/customer";
    axios.get<ICustomer[]>(uri)
    .then(function(response: AxiosResponse):void{
        console.log(response.data);
        let result: string = "<ol>";
        response.data.forEach((customer:ICustomer) => {
            if(customer!== null){
            result += "<li>"+ "ID: "+ customer.id + "<br/>"+"Name: " +customer.firstName +"<br/>"+ "Last name: "+ customer.lastName +"<br/>"+"Year of birth: "+ customer.year +"</li>";
        }
        });
        result += "</ol>";
        console.log(result);
        let allCustomers: HTMLDivElement = <HTMLDivElement>document.getElementById("allCustomers")
        allCustomers.innerHTML = result;
    })
    .catch (function(error:AxiosError):void{
        console.log(error);
    });
}

// HTTPGet by ID api/customer/{id}
function GetByID(): void {
    let idInput: HTMLInputElement = <HTMLInputElement>document.getElementById("idInput");
    var id = parseInt(idInput.value) - 1;
    let uri: string = "https://customerserviceapi.azurewebsites.net/api/customer/" + id;
    axios.get(uri)
    .then(function(response: AxiosResponse):void{
        console.log(response.data);
        let result: string = "<ol>";
        let myCustomer: ICustomer = response.data;
        if(myCustomer!== null){
        result += "<li>"+ "ID: "+ myCustomer.id + "<br/>"+"Name: " +myCustomer.firstName +"<br/>"+ "Last name: "+ myCustomer.lastName +"<br/>"+"Year of birth: "+ myCustomer.year +"</li>";
        }
        result += "</ol>";
        console.log(result);
        let allCustomers: HTMLDivElement = <HTMLDivElement>document.getElementById("allCustomers")
        allCustomers.innerHTML = result;
    })
    .catch (function(error:AxiosError):void{
        console.log(error);
    });
}

// HTTPDelete by ID api/customer/{id}
function DeleteByID(): void {
    let idInput: HTMLInputElement = <HTMLInputElement>document.getElementById("idInput");
    var id = parseInt(idInput.value) - 1;
    let uri: string = "https://customerserviceapi.azurewebsites.net/api/customer/" + id;
    axios.delete(uri)
    .then(function(response: AxiosResponse):void{
        console.log(response.data);
        console.log(response.statusText)
        
    })
    .catch (function(error:AxiosError):void{
        console.log(error);
    });
}

//HTTPPost
function Post(): void {
    var myCustomer: ICustomer = {id:10,firstName:"Test",lastName:"Test",year:1000};
    let uri: string = "https://customerserviceapi.azurewebsites.net/api/customer";
    axios.post(uri, myCustomer)
    .then(function(response: AxiosResponse):void{
        console.log(response.data);
        console.log(response.statusText)
    })
    .catch (function(error:AxiosError):void{
        console.log(error.message);
    });
}

//HTTPPut
function Put(): void {
    var myCustomer: ICustomer = {id:20,firstName:"Test2",lastName:"Test2",year:2000};
    let idInput: HTMLInputElement = <HTMLInputElement>document.getElementById("idInput");
    var id = parseInt(idInput.value) - 1;
    let uri: string = "https://customerserviceapi.azurewebsites.net/api/customer/" + id;
    axios.put(uri, myCustomer)
    .then(function(response: AxiosResponse):void{
        console.log(response.data);
        console.log(response.statusText)
    })
    .catch (function(error:AxiosError):void{
        console.log(error.message);
    });
}