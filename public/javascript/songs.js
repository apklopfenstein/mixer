$("#add-song").on("click", ()=>{
     
    $(location).attr("href", "/newsong");
})

$(() => {
    $('.modal').modal();
});