
function oninit() {
    this.getcarro();
    this.getcarromarca();

}

function oninitmarca() {
    this.getcarromarca();
}
function oninitmodelo() {
    this.getcarromodelo();
}
function clearcombobox() {

    var combo = document.getElementById("cboModelo");
    if (combo.innerText != "Nenhum"){
        while (combo.options.length > 0) {                
            combo.remove(0);
        }
    
    }
    document.getElementById("modelo").value = "";

}

function getcarromarca() {

    var that = this;
    var userinputmarca = document.getElementById("marca").value;
    
    var e = document.getElementById("cboMarcas");
    var valuemarca = e.value;
    var text = e.options[e.selectedIndex].text;
    document.getElementById("marca").value = text;

    var oDatset = {
        item: []
    };
    getcarromarca(function (data) {
        var combo = document.getElementById("cboMarcas");
     
       
        if (!userinputmarca) {
            var dados;

            for (var i = 0; i < data.length; i++) {
                oDatset.item.push(dados);
                var elem = document.createElement("option")
                elem.value = data[i].codigo;
                elem.text = data[i].nome;
                combo.appendChild(elem);
               

            }
        }
       
    });
    function getcarromarca(callback) {
        if (!userinputmarca) {
            $.ajax({
                method: "Get",
                url: "https://parallelum.com.br/fipe/api/v1/carros/marcas",
                async: true,
                crossDomain: true,
                jsonpCallback: "getJSON",
                dataType: 'json',
                contentType: "application/json",
            }).done(function (data) {
                callback(data);
            });

        }

    }

};

function getcarromodelo() {
    var that = this;
    var userinputmodelo = document.getElementById("modelo").value;
    
    var e = document.getElementById("cboModelo");
    if (e.innerText!=""){
        var value = e.value;
        var text = e.options[e.selectedIndex].text;
        document.getElementById("modelo").value = text;
    }
   
    getcarromodelo(function (data) {
       

        if (!userinputmodelo) {
            var combo = document.getElementById("cboModelo");
            for (var i = 0; i < data.modelos.length; i++) {

                var elem = document.createElement("option")
                elem.value = data.modelos[i].codigo;
                elem.text = data.modelos[i].nome;
                combo.appendChild(elem);

            }

        }

    });
    function getcarromodelo(callback) {
        var e = document.getElementById("cboMarcas");
        var valuemarca = e.value;
        if (!userinputmodelo) {
            $.ajax({
                method: "Get",
                url: "https://parallelum.com.br/fipe/api/v1/carros/marcas/" + valuemarca + "/modelos",
                async: true,
                crossDomain: true,
                jsonpCallback: "getJSON",
                dataType: 'json',
                contentType: "application/json",
            }).done(function (data) {
                
                callback(data);
            });

        }

    }

}


function getcarro() {
    var that = this;
    var userinput = document.getElementById("modelo").value;
    var oDatset = {
        item: []

    };
    getData(function (data) {
        let corpoTabela = document.getElementById('tbody');
        if (!userinput) {
            var list = data.Carros;
            var dados;

            for (var i = 0; i < list.length; i++) {

                dados = list[i];
                oDatset.item.push(dados);

                var tr = document.createElement('tr');

                var tdModelo = document.createElement('td');
                var tdAno = document.createElement('td');
                var tdValor = document.createElement('td');

                tdAno.textContent = oDatset.item[i].ano;
                tdModelo.textContent = oDatset.item[i].modelo;
                tdValor.textContent = oDatset.item[i].valor;

                tr.appendChild(tdAno);
                tr.appendChild(tdModelo);
                tr.appendChild(tdValor);
                corpoTabela.appendChild(tr);

            }
        } else {

            document.getElementById("ano").value = data.ano;
            document.getElementById("valor").value = data.valor;
            document.getElementById("carro_id").value = data.id;

        }


    });

    function getData(callback) {
        if (!userinput || userinput.length == 0) {
            $.ajax({
                method: "Get",
          
                crossDomain: true,
                jsonpCallback: "getJSON",
                dataType: 'json',
                contentType: "application/json",
            }).done(function (data) {
                callback(data);
            });

        } else {
            $.ajax({
                method: "Get",
                url: "http://127.0.0.1:5000/carro?modelo=" + userinput,
                async: true,
                crossDomain: true,
                jsonpCallback: "getJSON",
                dataType: 'json',
                contentType: "application/json",

            }).done(function (data) {
                callback(data);
            });
        }


    }

};
function salvarcarrocoment() {

    var userinputcomment = document.getElementById("comentario").value;
    var formData = {
        carro_id: parseInt($("#carro_id").val()),
        texto: $("#comentario").val()
    };
    debugger
    if (userinputcomment || userinputcomment.length > 0) {
        $.ajax({
            url: "http://127.0.0.1:5000/comentario",
            method: "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": formData,
            success: function () {
                alert('Cadastrado com Sucesso');
            },
            error: function () {
                alert('Falha ao cadasdtrar');
            }
        });

    } else {
        alert("Prencha comentario");

    }

};
$(document).ready(function () {
    $("form").submit(function (event) {
        var formData = {
            ano: $("#ano").val(),
            modelo: $("#modelo").val(),
            valor: $("#valor").val(),
        };
     
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:5000/carro",
            data: formData,
            dataType: "json",
            encode: true,
            error: function () {
                alert('Erro de cadastro');
            },
        }).done(function () {
            alert('Cadastrado com Sucesso');
            window.location.reload();
        });

        event.preventDefault();
    });
});


function deletecarro() {

    var userinput = document.getElementById("modelo").value;
    if (userinput || userinput.length > 0) {
        $.ajax({
            url: "http://127.0.0.1:5000/carro?modelo=" + userinput,
            method: "DELETE",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "modelo": userinput
            }),
            success: function () {
                alert('Removido com Sucesso');
                window.location.reload();
            },
            error: function () {
                alert('Falha ao remover');
            }
        });

    } else {
        alert("Prencha comentario");

    }
}





