$(document).ready(function() {
    //On est obligé d'appeler l'id de la table main_table pour la gestion de la fermeture de la popup
    //après submit par le main.js
    $('#main_table').DataTable($.extend({}, datatableDefaults, {
        "ajax": Routing.generate('cem_affaires_liste'),
        "columns": [
            {"data": "code"},
            {"data": "adresse"},
            {"data": "complement"},
            {"data": "CP"},
            {"data": "ville"},
            {"data": "client"},
            {"data": "contact"},
            {"data": "mail"},
            {"data": "tel"},
            {"data": "montantTotal"}
        ]
    }));
    
 /* Permet d'afficher la popup d'édition de l'affaire*/
    $('#main_table tbody').on('click', 'td:not(.select-checkbox,.control)', function () {
        var id = $(this).parent().attr("id").split("_")[1];
        openEditModal(Routing.generate('cem_affaires_edit',{'id':id}));
    });
    
    openAddModal(Routing.generate('cem_affaires_edit'));
});
