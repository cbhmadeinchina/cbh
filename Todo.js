function todolist(additem,clearall,itemlist,newitem){
    this.additem = additem;
    this.clearall = clearall;
    this.itemlist = itemlist;
    this.newitem = newitem;
    var data_list = [];

    additem.addEventListener("click",addListItem);
    clearall.addEventListener("click",clearAllItem);
    window.addEventListener("load", load);
    function addListItem(){

        var data_node ={
            text:"",
            status:1,
        };
        if(newitem.value.length != 0) {
            data_node.text = newitem.value;
            data_list.push(data_node);
            saveData(data_list);
            newitem.value = "";
            load();
            alert("添加了新事项");
        }
        else{
            alert("内容不要为空！");
            return ;
        }

    }

    function load() {
        var itemString ="";
        data_list = loadData();
        for (var i = 0; i < data_list.length; i++) {
            if(data_list[i].status == 2) {

                itemString += "<li>"
                    + "<input type='checkbox' id='item-check-" + i + "' checked/>"
                    + "<p id='item-text-" + i + "'>" + data_list[i].text + "</p>"
                    + "<a onclick= 'remove(" + i + ")'>删除</a>"
                    + "<a onclick= 'edit(" + i + ")'>编辑</a>"
                    + "<a onclick= 'setStatus(" + i + ")'>设置</a>"
                    + "</li>";
            }
            else{
                itemString += "<li>"
                    + "<input type='checkbox' id='item-check-" + i + "' />"
                    + "<p id='item-text-" + i + "'>" + data_list[i].text + "</p>"
                    + "<a onclick='remove(" + i + ")'>删除</a>"
                    + "<a onclick='edit(" + i + ")'>编辑</a>"
                    + "<a onclick='setStatus(" + i + ")'>设置</a>"
                    + "</li>";
            }
            itemString +="<input type='range' id='progress-"+i+"' min='0' max='24' step='0.5'/>";
        }
        itemlist.innerHTML= itemString;
    }
    function clearAllItem() {
        var itemString = "";
        itemlist.innerHTML= itemString;
        clear();
    }
    this.edit1 = function edit (i) {
        var p = document.getElementById('item-text-' + i),
            pContent = p.innerText,
            inputId;
        data_list = loadData();

        function confirm() {
            if (inputId.value.length === 0) {
                p.innerHTML = pContent;
                alert("内容不能为空");
            }
            else {
                data_list[i].text=inputId.value;
                saveData(data_list);
                load();
            }
        }

        function enter(e) {
            if (e.keyCode == 13){
                confirm();
            }
        }

        p.innerHTML = "<input type='text' id='input-"+i+"' value='"+pContent+"'>";
        inputId = document.getElementById('input-'+i);
        inputId.focus();
        inputId.onblur = confirm;
        inputId.onkeypress = enter;
    }

    this.setStatus1 = function setStatus(i) {
        data_list[i].status = data_list[i].status == 1 ? 2:1;
        saveData(data_list);
        load();
    }

    this.remove1 = function remove(i) {
        data_list.splice(i, 1);
        saveData(data_list);
        load();
    }

    function saveData(data) {
        localStorage.setItem("mytodolist", JSON.stringify(data));   //JS对象转换成JSON对象存进本地缓存
    }

    function loadData() {
        var hisTory = localStorage.getItem("mytodolist");
        if(hisTory !=null){
            return JSON.parse(hisTory);     //JSON对象转换为JS对象
        }
        else { return []; }
    }

    function clear() {
        localStorage.clear();
        load();
    }
}



var additem = document.getElementById("add-item");
var clearall = document.getElementById("clearAll");
var itemlist =document.getElementById("item-list");
var newitem = document.getElementById("newitem");

var obj = new todolist(additem,clearall,itemlist,newitem);

function remove(i){
    obj.remove1(i);
}
function edit(i){
    obj.edit1(i);
}
function setStatus(i){
    obj.setStatus1(i);
}






