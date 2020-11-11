$("#add-song").on("click", ()=>{
    console.log("button working"); 
    $(location).attr("href", "/newsong");
})