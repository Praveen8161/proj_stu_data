const perObj = {
    firstName:"praveen",
    lastName:"ps",
    position:"mentor",
    workplace:"remote",
    address:{
        state:"tamil nadu",
        country:"india",
    },
}

let {address:{state,country}} = perObj;
let {address:add1,hollow = 56} = perObj;
console.log(add1);
console.log(hollow);
console.log(state);
console.log(country);

function job({position}){
    return position;
}
44g
console.log(job(perObj));