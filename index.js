let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deletebtn = document.getElementById("delete-btn")
const tabBtn=document.getElementById("tab-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

inputEl.addEventListener("keypress",function(event)
{
    if(event.key === "Enter")
    {
        event.preventDefault()
        inputBtn.click()
    }
})

tabBtn.addEventListener("click",function()
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        if(!myLeads.includes(tabs[0].url))
        {
            myLeads.push(tabs[0].url)
            localStorage.setItem("myLeads",JSON.stringify(myLeads))
            render(myLeads)
        }
    })
})

deletebtn.addEventListener("dblclick", function () {
    myLeads = []
    localStorage.clear()
    render(myLeads)
})

inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    render(myLeads)
    inputEl.value = ""

    localStorage.setItem("myLeads", JSON.stringify(myLeads))
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `<li><a target='_blank' href='${leads[i]}'>${leads[i]}</a></li>`
    }
    ulEl.innerHTML = listItems
}