var darkmode=0;
function change(){
    if(darkmode==0){
        document.getElementById("stylesheet").href="light.css";
        darkmode=1;
    }else{
        document.getElementById("stylesheet").href="dark.css";
        darkmode=0;
    }
    console.log(document.getElementById("stylesheet").href)
}