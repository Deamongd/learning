let users = [
    {id: 1, name: "Jonas", birthday: '1980-10-20', username:"random1" , password:"pass1"},
    {id: 2, name: "Petras", birthday: '1991-01-17', username:"Random2" , password:"pass2"},
    {id: 3, name: "Antanas", birthday: '2003-12-06', username:"Random3" , password:"pass3"},
    {id: 4, name: "Maryte", birthday: '2007-04-01', username:"Random4" , password:"pass4"},
    {id: 5, name: "Daumantas", birthday: '1998-06-08', username:"Random5" , password:"pass5"},
    {id: 6, name: "Karolis", birthday: '2001-12-17', username:"Random6" , password:"pass6"},
    {id: 7, name: "Egle", birthday: '2001-09-11', username:"Random7" , password:"pass7"},
    {id: 8, name: "Angelika", birthday: '1995-08-01', username:"Random8" , password:"pass8"},
    {id: 9, name: "Paulius", birthday: '2005-01-01', username:"Random9" , password:"pass9"},
    {id: 10, name: "Dalia", birthday: '1979-04-15', username:"Random10" , password:"pass10"}
];

/* const names = users.map(el => el.name);
console.log(names) */

/* const names = users.map(el => el.name); */
sort = "ASC"
let sorted = sort === "ASC" ? ((a, b) => a.name.localeCompare(b.name)) : ((a, b) => b.name.localeCompare(a.name));
console.log(sorted)
