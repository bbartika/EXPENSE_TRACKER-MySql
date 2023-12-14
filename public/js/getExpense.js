document.addEventListener('DOMContentLoaded', function () {
    getExpense(1); // Load the first page initially
});

async function getExpense(page) {
    try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`/get-expense/expense?page=${page}`, { headers: { "Authorization": token } });
        if (res.status === 200) {
            const elist = document.getElementById("expenses-list");
            elist.innerHTML = "";

            const expenses = res.data.data;
            console.log('----------------------------------------------------------------',expenses)
            const itemsPerPage = 5;
            const totalPages = Math.ceil(expenses.length / itemsPerPage);

            expenses.slice((page - 1) * itemsPerPage, page * itemsPerPage).forEach((expense) => {
                const eItem = document.createElement("div");
                const deletebtn = document.createElement("button");
                deletebtn.className = 'delete';

                eItem.innerHTML = `
                <div class="property">
                <span class="label">Date:</span> <span class="value">${expense.createdAt}</span>
            </div>
                    <div class="property">
                        <span class="label">Amount:</span> <span class="value">${expense.amount}</span>
                    </div>
                    <div class="property">
                        <span class="label">Category:</span> <span class="value">${expense.category}</span>
                    </div>
                    <div class="property">
                        <span class="label">Description:</span> <span class="value">${expense.description}</span>
                    </div>
                `;
                deletebtn.textContent = "Delete";

                deletebtn.addEventListener("click", async () => {
                    try {
                        const token = localStorage.getItem("token");
                        const res = await axios.delete(`/delete-expense/delete/${expense.id}`, { headers: { "Authorization": token } });

                        if (res.status === 200) {
                            eItem.remove();
                        } else {
                            console.error("Error deleting expense");
                        }
                    } catch (err) {
                        console.error(err);
                    }
                });

                eItem.appendChild(deletebtn);
                elist.appendChild(eItem);
            });

            if (totalPages > 1) {
                createPagination(totalPages, page);
            }
        } else {
            console.error("something went wrong");
        }
    } catch (error) {
        console.error("something went wrong", error);
    }
}

function createPagination(totalPages, currentPage) {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement("a");
        pageLink.href = "#";
        pageLink.textContent = i;

        if (i === currentPage) {
            pageLink.classList.add("active");
        }

        pageLink.addEventListener("click", function () {
            getExpense(i);
        });

        paginationContainer.appendChild(pageLink);
    }
}

function goToPage() {
    const pageSearch = document.getElementById("pageSearch").value;
    const page = parseInt(pageSearch, 10);
    if (!isNaN(page) && page > 0) {
        getExpense(page);
    }
}


var sidemenu=document.getElementById('sidemenu');
function openmenu(){
    sidemenu.style.right="0"
   
}
function closemenu(){
    sidemenu.style.right="-200px"
   
}
