
let amount = document.querySelector('#amount');
let description = document.querySelector('#description');
let myForm = document.querySelector('#my-form');
let category = document.querySelector('#category');



myForm.addEventListener('submit', onSubmit);
function onSubmit(e) {
    e.preventDefault();
    if (amount.value === '' || description.value === '' || category.value === '') {
        alert('Please enter all fields');
    }
    else {

        const details = {
            Amount: amount.value,
            Description: description.value,
            Category: category.value,
        };
        const token=localStorage.getItem("token")
        axios.post("/add-expense/expense", details, { headers: {"Authorization" : token} }).
            then(({ data }) => {
                amount.value='';
                description.value='';
                category.value='';
                const ID = data.Success.id
                console.log("this is the Success is----------------------------------- ----->"+data.Success.id)
                // addonedetail(ID);
                alert('Details Successfully Saved!');
            })
            .catch((err) => {
                console.error(err);
                alert("Something went wrong")
            });
    }
}


var sidemenu=document.getElementById('sidemenu');
function openmenu(){
    sidemenu.style.right="0"
   
}
function closemenu(){
    sidemenu.style.right="-200px"
   
}
