$(document).ready(function() {
    $('#commandesTable').DataTable($.extend({}, datatableDefaults, {
        "ajax": Routing.generate('cem_commandes_liste'),
        "columns": [
            {"data": "numero"},
            {"data": "affaire"},
            {"data": "fournisseur"},
            {"data": "societe"},
            {"data": "dateBDC"},
            {"data": "livre"},
            {"data": "commentairePublic"},
            {"data": "commentairePrive"},
            {"data": "details", "orderable": false}
        ]
    }));
});