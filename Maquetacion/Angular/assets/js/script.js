$(function () {
    $("#tabs").tabs();
});
function cambioPerfil() {
    var perfilSeleccionado = document.getElementById('perfil').value;
    if (perfilSeleccionado == 1) {
        window.location.href = "desarrollo-cv.html"
    } else if (perfilSeleccionado == 2) {
        window.location.href = "helpdesk-cv.html"
    }
}






$('#botonDatos, #botonDatos1, #botonDatos2').click(function () {
    $('#sidebar').fadeToggle('slow');
});

$('#botonDatosD').click(function () {
    $('#sidebarD').fadeToggle('slow');
});


$('#tituloFormacion').click(function () {
    $('#formacion').slideToggle('slow');
});

$('#tituloForm-academica').click(function () {
    $('#form-academica').slideToggle('slow');
    $('#otra-formacion').slideUp('slow');
});

$('#tituloOtra-formacion').click(function () {
    $('#form-academica').slideUp('slow');
    $('#otra-formacion').slideToggle('slow');
});

$(document).ready(function () {

    var bars = $('.progress-bar');

    for (var i = 0; i < bars.length; i++) {
        console.log(i);
        var progress = $(bars[i]).attr('aria-valuenow');
        $(bars[i]).width(progress + '%');

        if (progress >= "65") {
            $(bars[i]).addClass("bar-success");
        } else if (progress >= "40" && progress < "65") {
            $(bars[i]).addClass("bar-warning");
        } else {
            $(bars[i]).addClass("bar-error");
        }
    }
});

var template = document.getElementById('experiencia-template');
var articles = document.getElementById('articles');
for (var i = 1; i <= 5; i++) {
    var clonado = template.cloneNode(true);
    clonado.setAttribute('id', 'trabajo' + i);
    var h2 = clonado.getElementsByTagName('h2')[0];
    h2.innerHTML = h2.textContent + ' ' + i;
    articles.appendChild(clonado);
}

$('#html').click(function () {
    alert("Hola");
})



$('#tab1').click(function () {
    $('#tabs-formacion').hide().slideDown('slow');

});
$('#tab2').click(function () {
    $('#tabs-experiencia').hide().slideDown('slow');
});
$('#tab3').click(function () {
    $('#tabs-conocimientos').hide().slideDown('slow');
});
$('#tab4').click(function () {
    $('#tabs-habilidades').hide().slideDown('slow');
});




